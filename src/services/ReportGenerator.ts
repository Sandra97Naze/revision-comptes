import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class GénérateurDeRapports {
  static générerRapport(
    données: any[], 
    commentaires: string = '' // Add a default parameter
  ) {
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
        commentaires // Use the passed commentaires
      ])
    });
    
    return doc;
  }
}
