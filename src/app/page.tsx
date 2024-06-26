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
    <main className="flex flex-col min-h-screen items-center justify-center bg-slate-100">
      <header className="text-4xl font-bold absolute top-10">Chuck Norris Facts</header>
      <div className="self-center flex flex-col items-center gap-9">
        <div className="flex flex-row justify-center items-center w-full">
          <Input
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

        <Card className="shadow-md w-80 sm:w-auto self-center">
          <CardContent className="flex w-auto  h-80 overflow-x-auto sm:w-80 items-center justify-center text-center">
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
        <Button className="w-56 h-16 shadow-sm bg-slate-400 hover:bg-zinc-700 " onClick={fetchJoke}>
          Next!
        </Button>
        <WhatsappShareButton text={joke?.value || ''} />
      </div>
    </main>
  )
}
