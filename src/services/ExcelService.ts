// src/services/ExcelService.ts
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
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData.map((row: any) => ({
      compte: row['N° Compte'],
      intitule: row['Intitulé'],
      debit_ouv: parseFloat(row['Débit ouverture'] || 0),
      credit_ouv: parseFloat(row['Crédit ouverture'] || 0),
      debit_mvt: parseFloat(row['Débit mouvement'] || 0),
      credit_mvt: parseFloat(row['Crédit mouvement'] || 0),
      debit_clot: parseFloat(row['Débit clôture'] || 0),
      credit_clot: parseFloat(row['Crédit clôture'] || 0),
      solde_n: parseFloat(row['Solde N'] || 0),
      solde_n1: parseFloat(row['Solde N-1'] || 0)
    }));
  }
}
