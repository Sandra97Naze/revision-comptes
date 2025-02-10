export function genererRapportPDF(donnees: any[]) {
  // Vérification de la disponibilité des bibliothèques
  if (typeof window !== 'undefined' && window.jspdf) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titre du rapport
    doc.text("Rapport de Révision des Comptes", 10, 10);

    // Génération du tableau
    doc.autoTable({
      head: [['Compte', 'Intitulé', 'Solde N', 'Solde N-1', 'Variation']],
      body: donnees.map(compte => [
        compte.compte, 
        compte.intitulé, 
        compte.soldeN?.toString() || 'N/A', 
        compte.soldeN1?.toString() || 'N/A', 
        compte.variation?.toString() || 'N/A'
      ])
    });

    // Sauvegarde du PDF
    doc.save("rapport-comptes.pdf");
  } else {
    console.error("Bibliothèques PDF non chargées");
    alert("Impossible de générer le PDF. Veuillez réessayer.");
  }
}
