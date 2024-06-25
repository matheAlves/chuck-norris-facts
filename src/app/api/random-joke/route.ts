import { NextRequest, NextResponse } from 'next/server'
import { Joke } from '../../../services/api/chuckNorris'
import { revalidatePath } from 'next/cache'

const fetchRandomJoke = async (): Promise<Joke> => {
  // This is a hack to prevent the browser from caching the response
  const response = await fetch('https://api.chucknorris.io/jokes/random?random=' + Math.random(), {
    headers: {
      cache: 'no-cache'
    }
  })
  if (!response.ok) {
    throw new Error('Network error')
  }
  const data: Joke = await response.json()
  return data
}

export async function GET(req: NextRequest) {
  try {
    const joke = await fetchRandomJoke()
    const path = '/api/random-joke'
    revalidatePath(path)
    return NextResponse.json(joke)
  } catch (error) {
    console.error('Failed to fetch the joke:', error)
    return NextResponse.json({ message: 'Failed to fetch the joke' }, { status: 500 })
  }
}
