import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  print(content: string): void {
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('No se pudo abrir la ventana de impresión. Asegúrate de que los bloqueadores de ventanas emergentes estén desactivados.');
    }
  }
}
