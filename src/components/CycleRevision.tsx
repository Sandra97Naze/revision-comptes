// src/components/CycleRevision.tsx
"use client"

import React, { useState } from 'react';
import { CYCLES } from '../config/cycles';

interface CycleRevisionProps {
  cycle: keyof typeof CYCLES;
  comptes: any[];
  onValidate: (cycleId: string, status: string) => void;
}

export function CycleRevision({ cycle, comptes, onValidate }: CycleRevisionProps) {
  const [notes, setNotes] = useState('');
  const [selectedControles, setSelectedControles] = useState<string[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const cycleInfo = CYCLES[cycle];

  // Filtrer les comptes du cycle
  const cycleComptes = comptes.filter(compte => 
    cycleInfo.comptes.some(prefix => compte.numero.startsWith(prefix))
  );

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleControleToggle = (controle: string) => {
    if (selectedControles.includes(controle)) {
      setSelectedControles(selectedControles.filter(c => c !== controle));
    } else {
      setSelectedControles([...selectedControles, controle]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">{cycleInfo.nom}</h2>

      {/* Synthèse des comptes */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compte
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intitulé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solde N
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variation %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cycleComptes.map(compte => (
              <tr key={compte.numero}>
                <td className="px-6 py-4 whitespace-nowrap">{compte.numero}</td>
                <td className="px-6 py-4 whitespace-nowrap">{compte.intitule}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {compte.soldeN.toLocaleString()} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {((compte.soldeN - compte.soldeN1) / compte.soldeN1 * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Programme de travail */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Programme de travail</h3>
        <div className="space-y-2">
          {cycleInfo.controles.map(controle => (
            <label key={controle} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedControles.includes(controle)}
                onChange={() => handleControleToggle(controle)}
                className="rounded border-gray-300"
              />
              <span>{controle}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Notes de révision */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Notes de révision</h3>
        <textarea
          value={notes}
          onChange={handleNoteChange}
          className="w-full h-32 p-2 border rounded"
          placeholder="Saisissez vos observations..."
        />
      </div>

      {/* Documents justificatifs */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Documents justificatifs</h3>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <div className="mt-2 space-y-1">
          {documents.map((doc, index) => (
            <div key={index} className="text-sm text-gray-600">
              {doc.name}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => onValidate(cycle, 'en_cours')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded"
        >
          Sauvegarder
        </button>
        <button
          onClick={() => onValidate(cycle, 'termine')}
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={selectedControles.length < cycleInfo.controles.length}
        >
          Valider le cycle
        </button>
      </div>
    </div>
  );
}
