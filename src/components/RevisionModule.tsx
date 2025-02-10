"use client"

import React, { useState } from 'react';
import { ExcelService, BalanceData } from '../services/ExcelService';
import { CYCLES } from '../config/cycles';
import { CycleRevision } from './CycleRevision';

export function RevisionModule() {
  const [comptes, setComptes] = useState<BalanceData[]>([]);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);
  const [cycleStatuts, setCycleStatuts] = useState<Record<string, string>>({});
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

  const getCycleStatus = (cycleId: string): string => {
    switch (cycleStatuts[cycleId]) {
      case 'termine':
        return '✅ Terminé';
      case 'en_cours':
        return '🔄 En cours';
      default:
        return '⚪ À faire';
    }
  };

  const getCycleTotal = (cycleId: keyof typeof CYCLES): number => {
  const cycle = CYCLES[cycleId];
  if (!cycle) return 0;
  
  const cycleComptes = comptes.filter(compte =>
    cycle.comptes.some(prefixe => compte.compte.startsWith(prefixe))
  );
  
  return cycleComptes.reduce((sum, compte) => sum + compte.solde_n, 0);
};
  return (
    <div className="space-y-6 p-4">
      {/* En-tête avec import */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Révision des Comptes</h1>
          <div className="flex items-center space-x-4">
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
            {comptes.length > 0 && (
              <button
                onClick={() => setComptes([])}
                className="px-4 py-2 bg-red-50 text-red-700 rounded-full hover:bg-red-100"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <>
          {comptes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {/* Navigation des cycles */}
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(CYCLES).map(([id, cycle]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedCycle(id)}
                    className={`p-4 rounded-lg shadow text-left transition-all ${
                      selectedCycle === id ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{cycle.nom}</h3>
                      <span className="text-sm">{getCycleStatus(id)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {cycle.comptes.length} comptes
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      {getCycleTotal(id).toLocaleString()} €
                    </p>
                  </button>
                ))}
              </div>

              {/* Contenu du cycle sélectionné */}
              {selectedCycle && (
                <CycleRevision
                  cycle={selectedCycle}
                  comptes={comptes}
                  onValidate={handleCycleValidation}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-600">
                Importez votre balance pour commencer la révision
              </h2>
              <p className="mt-2 text-gray-500">
                Format accepté : Excel (.xlsx, .xls)
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
const [comptesN1, setComptesN1] = useState<BalanceData[]>([]);

  const handleN1Import = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      try {
        const data = await ExcelService.importBalance(e.target.files[0]);
        setComptesN1(data);
      } catch (error) {
        console.error('Erreur lors de l\'import N-1:', error);
        alert('Erreur lors de l\'import du fichier N-1');
      }
      setIsLoading(false);
    }
  };
