// /services/api/chuckNorris.ts

export interface Joke {
  icon_url: string
  id: string
  url: string
  value: string
}

const fetchRandomJoke = async (): Promise<Joke> => {
  try {
    const response = await fetch('/api/random-joke', {
      headers: {
        cache: 'no-store'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch random joke')
    }
    const data: Joke = await response.json()
    return data
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to fetch the joke:', err.message)
      throw new Error(err.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}

const fetchJokeByQuery = async (query: string): Promise<Joke | null> => {
  try {
    const response = await fetch(`/api/joke-by-query?query=${query}`)
    if (!response.ok) {
      throw new Error('Failed to fetch joke by query')
    }
    const data = await response.json()
    console.log('data at 39', data)
    return data
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to fetch the joke:', err.message)
      throw new Error(err.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}

export { fetchRandomJoke, fetchJokeByQuery }
