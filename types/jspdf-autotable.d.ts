declare module 'jspdf-autotable' {
  import jsPDF from 'jspdf';

  interface UserOptions {
    head?: any[][];
    body?: any[][];
    startY?: number;
    // Ajoutez d'autres options selon vos besoins
  }

  function autoTable(doc: jsPDF, options: UserOptions): void;
  export = autoTable;
}
