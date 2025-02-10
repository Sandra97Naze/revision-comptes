import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BalanceData } from './ExcelService';

export class ReportGenerator {
  static async generateReport(cycle: string, comptesN: BalanceData[], comptesN1: BalanceData[], commentaires: Record<string, string>) {
    const doc = new jsPDF();
    
    // En-tête
    doc.setFontSize(16);
    doc.text(`Rapport de Révision - ${cycle}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 30);

    // Tableau des comptes
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

    doc.autoTable({
      startY: 40,
      head: [['Compte', 'Intitulé', 'Solde N', 'Solde N-1', 'Variation', 'Commentaires']],
      body: tableData,
    });

    // Points d'attention
    const pointsAttention = comptesN
      .filter(compte => {
        const compteN1 = comptesN1.find(c => c.compte === compte.compte);
        if (!compteN1) return false;
        const variation = ((compte.solde_n - compteN1.solde_n) / Math.abs(compteN1.solde_n) * 100);
        return Math.abs(variation) > 20;
      })
      .map(compte => compte.compte + ' - ' + compte.intitule);

    if (pointsAttention.length > 0) {
      doc.addPage();
      doc.text('Points d\'attention :', 20, 20);
      pointsAttention.forEach((point, index) => {
        doc.text('- ' + point, 25, 30 + (index * 10));
      });
    }

    return doc;
  }

  static async generateFullReport(allCycles: string[], comptesN: BalanceData[], comptesN1: BalanceData[], commentaires: Record<string, string>) {
    const doc = new jsPDF();
    let currentPage = 1;

    for (const cycle of allCycles) {
      if (currentPage > 1) doc.addPage();
      await this.generateReport(cycle, comptesN, comptesN1, commentaires);
      currentPage++;
    }

    return doc;
  }
}
