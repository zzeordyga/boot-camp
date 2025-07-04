import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Layout from './layout'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Index = () => {
  const [fact, setFact] = useState("");

  const fetchFacts = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error("Failed to fetch datch", error)
      setFact("Oops... the cat stole the fact!")
    }
  }

  useEffect(() => {
    fetchFacts()
  },[])

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center'>
        <div className='max-w-3xl'>
          <Table>
            <TableCaption>Bet You Didn’t Know This Fact</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">
                    Your fact
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">{fact || 'Loading your fact...'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className='mt-4'>
          <Button onClick={fetchFacts}>
            Give Me Another Fact
          </Button>
        </div>
        
      </div>
    </Layout>
  )
}

export default Index