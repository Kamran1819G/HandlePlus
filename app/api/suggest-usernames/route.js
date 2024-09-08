import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  // Initialize Google Gemini
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  try {
    const prompt = `Generate 5 alternative usernames based on "${username}" for various platforms, following these guidelines:
    1. Create a professional options suitable for various social media platforms (e.g., LinkedIn, Twitter, Instagram).
    2. Maintain the essence or key elements of the original username.
    3. Use creative wordplay, puns, or clever combinations that reflect current social media trends.
    4. Incorporate relevant industry terms, interests, or personality traits if apparent from the original username.
    5. Ensure each suggestion is unique, memorable, and easy to type.
    6. Keep the suggestions relatively short (preferably under 15 characters).
    7. Avoid numbers unless they have a clear purpose or meaning.
    8. Make sure the suggestions are appropriate and not offensive.
    9. For professional options, focus on clarity and personal branding.
    10. For fun options, be creative but still relatable and engaging.

    Please provide only the list of 5 usernames, one per line, without any additional text or numbering.`

    const result = await model.generateContent(prompt)
    const suggestions = result.response
      .text()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5) // Ensure we only get 5 suggestions

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error generating suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}
