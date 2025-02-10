declare module 'jspdf' {
  export default class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string);
    
    text(text: string, x: number, y: number): this;
    save(filename: string): this;
    
    autoTable(options: any): this;
  }
}

declare module 'jspdf-autotable' {
  import jsPDF from 'jspdf';
  
  export default function autoTable(doc: jsPDF, options: any): void;
}
