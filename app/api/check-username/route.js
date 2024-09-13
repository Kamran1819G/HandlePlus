import { NextResponse } from 'next/server'
import axios from 'axios'
import { websites } from '@/shared/websitesConfig'

// Helper function to check if a response indicates the username is available
function isUsernameAvailable(response, website, username) {
  if (website.checkAvailability) {
    return website.checkAvailability(response, username)
  }

  if (response.status === 404) {
    return true
  }

  if (response.status === 200) {
    const contentType = response.headers['content-type']
    const bodyText = response.data.toString().toLowerCase()

    if (contentType && contentType.includes('text/html')) {
      if (
        bodyText.includes('404') ||
        bodyText.includes('not found') ||
        bodyText.includes("doesn't exist")
      ) {
        return true
      }

      if (website.unavailableIndicators) {
        return !website.unavailableIndicators.some((indicator) =>
          bodyText.includes(indicator.toLowerCase())
        )
      }
    }
  }

  return false
}

// Function to check username availability for a single website
async function checkUsernameForWebsite(website, username) {
  try {
    const url = website.url.replace('{username}', username)
    const response = await axios.get(url, {
      timeout: 5000,
      validateStatus: () => true, // Allow any status code
    })

    return {
      name: website.name,
      available: isUsernameAvailable(response, website, username),
      url: url,
      logo: website.logo,
      status: response.status,
    }
  } catch (error) {
    console.error(`Error checking ${website.name}:`, error.message)
    return {
      name: website.name,
      available: null,
      url: website.url.replace('{username}', username),
      logo: website.logo,
      status: error.response?.status || 'Error',
    }
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
      websites.map((website) => checkUsernameForWebsite(website, username))
    )

    const availability = Object.fromEntries(
      results.map((result) => [result.name, result])
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
