'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Joke, fetchRandomJoke, fetchJokeByQuery } from '@/services/api/chuckNorris'

export default function Home() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetchJoke()
  }, [])

  function fetchJoke() {
    fetchRandomJoke()
      .then(data => setJoke(data))
      .catch(error => console.error('Failed to fetch the joke:', error))
  }

  function handleSearch() {
    fetchJokeByQuery(inputValue)
      .then(data => setJoke(data))
      .catch(error => console.error('Failed to fetch the joke:', error))
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-evenly content-center p-52 bg-slate-100">
      <header className="text-4xl font-bold">Chuck Norris Facts</header>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          onKeyDown={e => {
            if (e.key === 'Enter') {
              console.log('Enter key pressed')
              handleSearch()
            }
          }}
          type="email"
          placeholder="Search by text"
          onChange={e => setInputValue(e.target.value)}
        />
        <Button type="submit" onClick={handleSearch}>
          Search!
        </Button>
      </div>
      <Card className="shadow-md">
        <CardContent className="flex h-32 items-center">
          <p>{joke?.value}</p>
        </CardContent>
      </Card>
      <Button className="w-56 h-16 shadow-sm" variant="outline" onClick={fetchJoke}>
        Next!
      </Button>
    </main>
  )
}
