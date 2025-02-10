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
use client"

import React, { useState } from 'react';
import { ExcelService } from '../services/ExcelService';
import { CYCLES } from '../config/cycles';
import { CycleRevision } from './CycleRevision';

export function RevisionModule() {
  const [comptes, setComptes] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [cycleStatuts, setCycleStatuts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      try {
        const data = await ExcelService.importBalance(e.target.files[0]);
        setComptes(data);
      } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        alert('Erreur lors de l\'import du fichier');
      }
      setIsLoading(false);
    }
  };

  const handleCycleValidation = (cycleId: string, status: string) => {
    setCycleStatuts(prev => ({
      ...prev,
      [cycleId]: status
    }));
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec import */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Révision des Comptes</h1>
          <div>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <>
          {/* Navigation des cycles */}
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(CYCLES).map(([id, cycle]) => (
              <button
                key={id}
                onClick={() => setSelectedCycle(id)}
                className={`p-4 rounded-lg shadow text-left ${
                  selectedCycle === id ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                }`}
              >
                <h3 className="font-semibold">{cycle
