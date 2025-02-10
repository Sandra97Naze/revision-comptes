import React, { useState } from 'react';

interface Document {
  id: string;
  nom: string;
  type: string;
  date: string;
  compte: string;
}

export function DocumentManager({ cycle }: { cycle: string }) {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDocument: Document = {
        id: Date.now().toString(),
        nom: file.name,
        type: file.type,
        date: new Date().toISOString(),
        compte: ''
      };
      setDocuments([...documents, newDocument]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Justificatifs</h2>
      
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0"
        />
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Document</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Compte</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td className="px-4 py-2">{doc.nom}</td>
              <td className="px-4 py-2">{doc.type}</td>
              <td className="px-4 py-2">{new Date(doc.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="border rounded px-2 py-1"
                  placeholder="N° compte"
                  value={doc.compte}
                  onChange={(e) => {
                    const updatedDocs = documents.map(d => 
                      d.id === doc.id ? { ...d, compte: e.target.value } : d
                    );
                    setDocuments(updatedDocs);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
