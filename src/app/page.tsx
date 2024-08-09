'use client'

import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState<string>('')
  const [endpoints, setEndpoints] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const discoverEndpoints = async () => {
    setLoading(true)
    setEndpoints([])
    try {
      const response = await axios.post('/api/discover', { url })
      setEndpoints(response.data.endpoints || [])
    } catch (error) {
      console.error('Erro ao descobrir endpoints:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <section className='max-w-5xl flex flex-col'>
        <h1 className='text-3xl font-bold mb-6 w-full'>Descobridor de Endpoints</h1>
        <input type='text' placeholder='Digite a URL' value={url} onChange={(e) => setUrl(e.target.value)} className='p-2 border border-gray-300 rounded mb-4 w-full' />
        <button onClick={discoverEndpoints} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
          {loading ? 'Descobrindo...' : 'Descobrir Endpoints'}
        </button>
        <div className='mt-6'>
          {endpoints.length > 0 ? (
            <ul className='list-disc pl-5'>
              {endpoints.map((endpoint, index) => (
                <li key={index} className='mb-2'>
                  <a href={endpoint} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>
                    {endpoint}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className='text-gray-500'>Nenhum endpoint encontrado.</p>
          )}
        </div>
      </section>
    </main>
  )
}
