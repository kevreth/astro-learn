import { TabulatorFull as Tabulator } from 'tabulator-tables';

export function tabulatorFactory(tData, cols, rowFormatter_) {
  const t = new Tabulator('#dynamic-table', {
    // virtualDomBuffer: 300, // Increase buffer size to control jumping scroll
    data: tData,
    reactiveData: true,
    columns: cols,
    layout: 'fitColumns',
    movableColumns: false,
    initialSort: [
      { column: "priority", dir: "desc" }
    ],
    rowFormatter: rowFormatter_,
  });
  return t;
}
