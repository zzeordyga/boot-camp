import React, { useEffect, useState } from 'react'
import Layout from '../layout'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const Details = () => {
  const [facts, setFacts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5

  const fetchFacts = async (page) => {
    try {
      const res = await fetch(`https://catfact.ninja/facts?page=${page}&limit=${limit}`)
      const data = await res.json()
      setFacts(data.data)
    } catch (err) {
      console.error('Failed to fetch facts:', err)
      setFacts("Oops... the cat stole the facts!")
    }
  }

  useEffect(() => {
    fetchFacts(currentPage)
  }, [currentPage])

  return (
    <Layout>
      <div className="max-w-2xl space-y-6 mx-3">
        <h1 className="text-xl font-semibold">More Cat Facts 4 You - Page {currentPage}</h1>
        <ul className="space-y-2">
          {facts.map((fact, index) => (
            <li key={index} className="p-4 bg-white rounded shadow hover:bg-gray-50 transition">
              {fact.fact}
            </li>
          ))}
        </ul>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-black hover:text-white rounded-lg'}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => p + 1)}
                className="cursor-pointer hover:bg-black hover:text-white rounded-lg"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  )
}

export default Details
