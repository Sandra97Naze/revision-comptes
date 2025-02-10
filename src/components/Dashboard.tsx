import React from 'react';
import { BalanceData } from '../services/ExcelService';

interface DashboardProps {
  comptesN: BalanceData[];
  comptesN1: BalanceData[];
}

export function Dashboard({ comptesN, comptesN1 }: DashboardProps) {
  const getStatistiques = () => {
    const totalActif = comptesN
      .filter(c => c.compte.startsWith('2') || c.compte.startsWith('3') || c.compte.startsWith('4') || c.compte.startsWith('5'))
      .reduce((sum, c) => sum + c.solde_n, 0);

    const totalPassif = comptesN
      .filter(c => c.compte.startsWith('1') || c.compte.startsWith('4') || c.compte.startsWith('5'))
      .reduce((sum, c) => sum + Math.abs(c.solde_n), 0);

    return {
      totalActif,
      totalPassif,
      difference: Math.abs(totalActif - totalPassif)
    };
  };

  const stats = getStatistiques();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Total Actif</h3>
        <p className="text-2xl">{stats.totalActif.toLocaleString()} €</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Total Passif</h3>
        <p className="text-2xl">{stats.totalPassif.toLocaleString()} €</p>
      </div>
      
      <div className={`bg-white p-4 rounded-lg shadow ${stats.difference > 0.01 ? 'border-red-500 border-2' : ''}`}>
        <h3 className="font-bold text-lg mb-2">Différence</h3>
        <p className="text-2xl">{stats.difference.toLocaleString()} €</p>
      </div>
    </div>
  );
}
