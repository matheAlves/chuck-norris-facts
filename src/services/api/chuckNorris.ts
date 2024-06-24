// /services/api/chuckNorris.ts

export interface Joke {
  icon_url: string
  id: string
  url: string
  value: string
}

const fetchRandomJoke = async (): Promise<Joke> => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    if (!response.ok) {
      throw new Error('Network error')
    }
    const data: Joke = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch the joke:', error)
    throw error
  }
}

const fetchJokeByQuery = async (query: string): Promise<Joke | null> => {
  try {
    const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    if (data.result.length > 0) {
      return data.result[0] as Joke
    } else {
      return null
    }
  } catch (error) {
    console.error('Failed to fetch the joke:', error)
    throw error
  }
}

export { fetchRandomJoke, fetchJokeByQuery }
