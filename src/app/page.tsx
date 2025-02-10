"use client"

import { useState } from 'react'
import { RevisionModule } from '../components/RevisionModule'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={() => setIsAuthenticated(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Se connecter
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4">
      <RevisionModule />
    </main>
  )
}
