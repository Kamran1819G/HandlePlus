import { NextResponse } from 'next/server'
import axios from 'axios'

async function checkTwitter(username) {
  try {
    const response = await axios.get(`https://twitter.com/${username}`)
    return false // If we can access the page, the username is taken
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return true // Username is available
    }
    console.error(`Error checking Twitter:`, error.message)
    return { error: 'Twitter' }
  }
}

async function checkInstagram(username) {
  try {
    const response = await axios.get(`https://www.instagram.com/${username}/`)
    return false // If we can access the page, the username is taken
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return true // Username is available
    }
    console.error(`Error checking Instagram:`, error.message)
    return { error: 'Instagram' }
  }
}

async function checkGitHub(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`)
    return false // If we get a successful response, the username is taken
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return true // Username is available
    }
    console.error(`Error checking GitHub:`, error.message)
    return { error: 'GitHub' }
  }
}

async function checkFacebook(username) {
  try {
    const response = await axios.get(`https://www.facebook.com/${username}`)
    return false
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return true
    }
    console.error(`Error checking Facebook:`, error.message)
    return { error: 'Facebook' }
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const results = await Promise.all([
      checkTwitter(username),
      checkInstagram(username),
      checkGitHub(username),
      checkFacebook(username),
    ])
    const availability = {
      Twitter: results[0],
      Instagram: results[1],
      GitHub: results[2],
      Facebook: results[3],
    }
    return NextResponse.json({ results: availability })
  } catch (error) {
    console.error('Error checking username availability:', error)
    return NextResponse.json(
      { error: 'An error occurred while checking username availability' },
      { status: 500 }
    )
  }
}
