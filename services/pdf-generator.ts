export function genererRapportPDF(donnees: any[]) {
  if (typeof window !== 'undefined' && window.jspdf) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titre du rapport
    doc.setFontSize(16);
    doc.text("Rapport de Révision des Comptes", 10, 10);

    // Configuration initiale
    const startY = 20;
    const lineHeight = 10;
    const marginLeft = 10;
    const columnWidths = [30, 40, 30, 30, 30];

    // En-têtes
    const headers = ['Compte', 'Intitulé', 'Solde N', 'Solde N-1', 'Variation'];
    headers.forEach((header, index) => {
      doc.text(header, marginLeft + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), startY);
    });

    // Données
    donnees.forEach((compte, rowIndex) => {
      const y = startY + lineHeight * (rowIndex + 1.5);
      const rowData = [
        compte.compte?.toString() || 'N/A', 
        compte.intitulé?.toString() || 'N/A', 
        compte.soldeN?.toString() || 'N/A', 
        compte.soldeN1?.toString() || 'N/A', 
        compte.variation?.toString() || 'N/A'
      ];

      rowData.forEach((cellValue, colIndex) => {
        doc.text(
          cellValue, 
          marginLeft + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), 
          y
        );
      });
    });

    // Sauvegarde du PDF
    doc.save("rapport-comptes.pdf");
  } else {
    console.error("Bibliothèques PDF non chargées");
    alert("Impossible de générer le PDF. Veuillez réessayer.");
  }
}
