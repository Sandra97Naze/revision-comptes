"use client"

import React, { useState } from 'react'

interface Account {
  numero: string
  intitule: string
  soldeN: number
  soldeN1: number
  variation: number
  statut: string
}

export function RevisionModule() {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      numero: "101",
      intitule: "Capital social",
      soldeN: 100000,
      soldeN1: 100000,
      variation: 0,
      statut: "À réviser"
    }
  ])

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  return (
    <div className="space-y-4">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Révision des Comptes
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  N° Compte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Intitulé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Solde N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Variation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr 
                  key={account.numero}
                  onClick={() => setSelectedAccount(account)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{account.numero}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.intitule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.soldeN.toLocaleString()} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.variation.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {selectedAccount && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              Détails du compte {selectedAccount.numero}
            </h2>
            <button 
              onClick={() => setSelectedAccount(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
