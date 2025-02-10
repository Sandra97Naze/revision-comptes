import React from 'react';
import { BalanceData } from '../services/ExcelService';

interface CycleAnalysisProps {
  cycle: string;
  comptesN: BalanceData[];
  comptesN1: BalanceData[];
}

export function CycleAnalysis({ cycle, comptesN, comptesN1 }: CycleAnalysisProps) {
  const getVariation = (soldeN: number, soldeN1: number) => {
    if (soldeN1 === 0) return '-';
    return ((soldeN - soldeN1) / Math.abs(soldeN1) * 100).toFixed(2) + '%';
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Compte</th>
              <th className="px-4 py-2">Solde N</th>
              <th className="px-4 py-2">Solde N-1</th>
              <th className="px-4 py-2">Variation</th>
              <th className="px-4 py-2">Commentaires</th>
            </tr>
          </thead>
          <tbody>
            {comptesN.map(compte => {
              const compteN1 = comptesN1.find(c => c.compte === compte.compte);
              return (
                <tr key={compte.compte}>
                  <td className="px-4 py-2">{compte.compte} - {compte.intitule}</td>
                  <td className="px-4 py-2">{compte.solde_n.toLocaleString()} €</td>
                  <td className="px-4 py-2">{compteN1?.solde_n.toLocaleString()} €</td>
                  <td className="px-4 py-2">
                    {getVariation(compte.solde_n, compteN1?.solde_n || 0)}
                  </td>
                  <td className="px-4 py-2">
                    <textarea 
                      className="w-full p-2 border rounded"
                      placeholder="Ajouter un commentaire..."
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">Points d'attention</h3>
          <ul className="list-disc pl-4">
            <li>Variations significatives > 20%</li>
            <li>Soldes inhabituels</li>
            <li>Comptes non mouvementés</li>
          </ul>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">Programme de travail</h3>
          <div className="space-y-2">
            {CYCLES[cycle].controles.map((controle, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                {controle}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
