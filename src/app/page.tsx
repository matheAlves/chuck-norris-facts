'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button, Input, Spinner, WhatsappShareButton } from '@/components/ui'
import { Joke, fetchRandomJoke, fetchJokeByQuery } from '@/services/api/chuckNorris'

export default function Home() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [notFoundValue, setNotFoundValue] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchJoke()
  }, [])

  function fetchJoke() {
    setLoading(true)
    fetchRandomJoke()
      .then(data => setJoke(data))
      .then(() => setLoading(false))
      .catch(error => console.error('Failed to fetch the joke:', error))
  }

  function handleSearch() {
    setLoading(true)
    fetchJokeByQuery(inputValue)
      .then(data => {
        if (data) {
          setJoke(data)
        }
      })
      .then(() => setLoading(false))
      .catch(error => {
        setNotFoundValue(inputValue)
        setJoke(null)
        setLoading(false)
        console.error('Failed to fetch the joke:', error)
      })
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-evenly content-center sm:p-52 bg-slate-100">
      <header className="text-4xl font-bold">Chuck Norris Facts</header>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="flex flex-row w-full justify-center items-center">
          <Input
            className="w-56"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            type="email"
            placeholder="Search by text"
            onChange={e => setInputValue(e.target.value)}
          />
          <Button type="submit" onClick={handleSearch} className="ml-5 bg-slate-400 hover:bg-zinc-700">
            Search!
          </Button>
        </div>
      </div>
      <Card className="shadow-md">
        <CardContent className="flex sm:h-32 w-48 sm:w-auto items-center justify-center">
          {loading ? (
            <Spinner />
          ) : joke ? (
            joke?.value
          ) : (
            <p className="text-red-500">
              {`There's obviously a Chuck Norris fact involving ${notFoundValue}, but it's too cool to be displayed here
              (truth is we couldn't find one, sorry!)`}
            </p>
          )}
        </CardContent>
      </Card>
      <WhatsappShareButton text={joke?.value || ''} />
      <Button className="w-56 h-16 shadow-sm bg-slate-400 hover:bg-zinc-700" onClick={fetchJoke}>
        Next!
      </Button>
    </main>
  )
}
