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
    const prompt = `Generate 5 alternative usernames based on "${username}" following these guidelines:
    1. Maintain the essence or theme of the original username
    2. Use creative wordplay, puns, or clever combinations
    3. Incorporate relevant synonyms or related concepts
    4. Consider adding prefixes or suffixes that enhance the meaning
    5. Ensure each suggestion is unique and distinct from the others
    6. Keep the suggestions relatively short and easy to remember
    7. Avoid using numbers unless they're meaningful to the theme
    8. Make sure the suggestions are appropriate and not offensive

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
