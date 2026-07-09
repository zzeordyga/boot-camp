import { useEffect, useState } from 'react'
import Layout from './layout'

export default function DetailsPage() {
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getAdvice = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('https://api.adviceslip.com/advice')
      const result = await res.json()
      setData(result.slip.advice)
    } catch (error) {
      setData('Failed to fetch advice.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAdvice()
  }, [])

  return (
    <Layout>
      <h2 className="text-lg font-semibold mb-4">All Random</h2>
      <div className="bg-pink-100 p-4 rounded-lg shadow-sm">
        {isLoading ? <p>Loading...</p> : <p>💡 {data}</p>}
      </div>
      <button
        onClick={getAdvice}
        className="mt-4 px-4 py-2 bg-[#90e0ef] text-white rounded hover:bg-[#03045e]"
      >
        New Advice
      </button>
    </Layout>
  )
}