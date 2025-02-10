import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class GénérateurDeRapports {
  static async générerRapport(données: any[], données1: any[], commentaires: string) {
    const doc = new jsPDF();

    // Set document properties
    doc.setFontSize(16);
    doc.text('Rapport de Révision des Comptes', 20, 20);

    // Use autoTable with proper typing
    doc.autoTable({
      startY: 30,
      head: [['Compte', 'Intitulé', 'Solde N', 'Solde N-1', 'Variation', 'Commentaires']],
      body: données.map(compte => [
        compte.compte,
        compte.intitulé,
        compte.soldeN,
        compte.soldeN1,
        compte.variation,
        commentaires
      ])
    });

    return doc;
  }
}
    // Ajouter l'en-tête
    doc.setFontSize(16);
    doc.text(`Rapport de Révision - ${cycle}`, 20, 20);

    // Préparer les données pour le tableau
    const tableData = comptesN.map(compte => {
      const compteN1 = comptesN1.find(c => c.compte === compte.compte);
      const variation = compteN1 ? 
        ((compte.solde_n - compteN1.solde_n) / Math.abs(compteN1.solde_n) * 100).toFixed(2) + '%' 
        : '-';

      return [
        compte.compte,
        compte.intitule,
        compte.solde_n.toLocaleString() + ' €',
        (compteN1?.solde_n || 0).toLocaleString() + ' €',
        variation,
        commentaires[compte.compte] || ''
      ];
    });

    // Utiliser autoTable comme une fonction
    autoTable(doc, {
      startY: 40,
      head: [['Compte', 'Intitulé', 'Solde N', 'Solde N-1', 'Variation', 'Commentaires']],
      body: tableData,
    });

    return doc;
  }
}
