import { NextRequest, NextResponse } from 'next/server'
import { Joke } from '../../../services/api/chuckNorris'

const fetchJokeByQuery = async (query: string): Promise<Joke | null> => {
  const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  if (data.result.length > 0) {
    return data.result[0]
  } else {
    return null
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const joke = await fetchJokeByQuery(query)
    if (joke) {
      return NextResponse.json(joke)
    } else {
      return NextResponse.json({ message: 'No joke found for the query' }, { status: 404 })
    }
  } catch (error) {
    console.error('Failed to fetch the joke:', error)
    return NextResponse.json({ message: 'Failed to fetch the joke' }, { status: 500 })
  }
}
