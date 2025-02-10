import * as XLSX from 'xlsx';

export interface BalanceData {
  compte: string;
  intitule: string;
  debit_ouv: number;
  credit_ouv: number;
  debit_mvt: number;
  credit_mvt: number;
  debit_clot: number;
  credit_clot: number;
  solde_n: number;
  solde_n1: number;
}

export class ExcelService {
  static async importBalance(file: File): Promise<BalanceData[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, {
            type: 'array',
            cellDates: true,
            cellNF: true,
            cellText: false
          });

          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          const balanceData: BalanceData[] = jsonData.map((row: any) => ({
            compte: row['N° Compte']?.toString() || '',
            intitule: row['Intitulé']?.toString() || '',
            debit_ouv: parseFloat(row['Débit ouverture']) || 0,
            credit_ouv: parseFloat(row['Crédit ouverture']) || 0,
            debit_mvt: parseFloat(row['Débit mouvement']) || 0,
            credit_mvt: parseFloat(row['Crédit mouvement']) || 0,
            debit_clot: parseFloat(row['Débit clôture']) || 0,
            credit_clot: parseFloat(row['Crédit clôture']) || 0,
            solde_n: parseFloat(row['Solde N']) || 0,
            solde_n1: parseFloat(row['Solde N-1']) || 0
          }));

          resolve(balanceData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  static formatNumber(number: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(number);
  }

  static calculateVariation(current: number, previous: number): string {
    if (previous === 0) return '-%';
    const variation = ((current - previous) / Math.abs(previous)) * 100;
    return `${variation.toFixed(2)}%`;
  }
}
