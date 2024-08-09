import { NextResponse } from 'next/server'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'endpoints.txt')

const MAX_PARALLEL_REQUESTS = 50

const readEndpointsFromFile = (): string[] => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return data
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  } catch (err) {
    console.error('Erro ao ler o arquivo de endpoints:', err)
    return []
  }
}

export async function POST(request: Request) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ error: 'URL não fornecida' }, { status: 400 })
  }

  const commonEndpoints = readEndpointsFromFile()
  const discoveredEndpoints: string[] = []

  const processBatch = async (endpointsBatch: string[]) => {
    const promises = endpointsBatch.map(async (endpoint) => {
      try {
        const fullUrl = `${url.replace(/\/$/, '')}/${endpoint}`
        const response = await axios.get(fullUrl, {
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        })

        if (response.status === 200) {
          discoveredEndpoints.push(fullUrl)
        }
      } catch (e) {
        console.error(e)
      }
    })

    await Promise.all(promises)
  }

  for (let i = 0; i < commonEndpoints.length; i += MAX_PARALLEL_REQUESTS) {
    const batch = commonEndpoints.slice(i, i + MAX_PARALLEL_REQUESTS)
    await processBatch(batch)
  }

  return NextResponse.json({ endpoints: discoveredEndpoints })
}
