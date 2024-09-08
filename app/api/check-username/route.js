import { NextResponse } from 'next/server'
import axios from 'axios'
import { websites } from '@/shared/websitesConfig'

async function checkUsername(website, username) {
  try {
    const url = website.url.replace('{username}', username)
    const response = await axios.get(url, {
      timeout: 5000,
      validateStatus: function (status) {
        return true // Allow any status code to be processed
      },
    })

    // Use custom checking logic if provided
    if (website.checkAvailability) {
      return website.checkAvailability(response, username)
    }

    // Default checking logic
    if (response.status === 404) {
      return true // Username is likely available
    } else if (response.status < 500) {
      if (response.status === 200) {
        const contentType = response.headers['content-type']
        const bodyText = response.data.toString().toLowerCase()

        if (contentType && contentType.includes('text/html')) {
          if (
            bodyText.includes('404') ||
            bodyText.includes('not found') ||
            bodyText.includes("doesn't exists")
          ) {
            return true // Username is likely available
          }

          if (website.unavailableIndicators) {
            for (const indicator of website.unavailableIndicators) {
              if (bodyText.includes(indicator.toLowerCase())) {
                return false // Username is likely taken
              }
            }
          }
        }
      }
      return false // By default, assume the username is taken if we can't determine otherwise
    }

    return false // By default, assume the username is taken if we can't determine otherwise
  } catch (error) {
    console.error(`Error checking ${website.name}:`, error.message)
    return null // Unable to determine availability
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const results = await Promise.all(
      websites.map((website) => checkUsername(website, username))
    )

    const availability = Object.fromEntries(
      websites.map((website, index) => [
        website.name,
        {
          available: results[index] === true,
          url: website.url.replace('{username}', username),
          logo: website.logo,
        },
      ])
    )

    return NextResponse.json({ results: availability })
  } catch (error) {
    console.error('Error checking username availability:', error)
    return NextResponse.json(
      { error: 'An error occurred while checking username availability' },
      { status: 500 }
    )
  }
}
