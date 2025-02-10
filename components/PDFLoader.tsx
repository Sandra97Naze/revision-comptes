import { useEffect } from 'react';

export function PDFLoader() {
  useEffect(() => {
    // Chargement dynamique des scripts PDF
    const loadPDFScripts = () => {
      // Script jsPDF
      const jspdfScript = document.createElement('script');
      jspdfScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      jspdfScript.async = true;
      document.body.appendChild(jspdfScript);

      // Script AutoTable
      const autoTableScript = document.createElement('script');
      autoTableScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.15/jspdf.plugin.autotable.min.js";
      autoTableScript.async = true;
      document.body.appendChild(autoTableScript);
    };

    // Charger les scripts uniquement côté client
    if (typeof window !== 'undefined') {
      loadPDFScripts();
    }
  }, []); // Exécuté une seule fois au montage du composant

  return null; // Composant invisible
}
