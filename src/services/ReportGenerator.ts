import { jsPDF } from 'jspdf';
// Importer avec le bon type
import autoTable from 'jspdf-autotable';

export class ReportGenerator {
  static async generateReport(cycle: string, comptesN: BalanceData[], comptesN1: BalanceData[], commentaires: Record<string, string>) {
    // Créer le document PDF
    const doc = new jsPDF();

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
