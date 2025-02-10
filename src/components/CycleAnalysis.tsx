// src/components/CycleAnalysis.tsx
import React from 'react';
import { BalanceData } from '@/services/ExcelService';
import { CYCLES } from '@/config/cycles';

interface CycleAnalysisProps {
  cycle: string;
  comptes: BalanceData[];
  onValidate: (cycleId: string, status: string) => void;
}

export function CycleAnalysis({ cycle, comptes, onValidate }: CycleAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">Points d'attention</h3>
          <ul className="list-disc pl-4">
            <li>Variations significatives &gt; 20%</li>
            <li>Soldes inhabituels</li>
            <li>Comptes non mouvementés</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
