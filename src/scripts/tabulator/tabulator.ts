import { Tabulator } from 'tabulator-tables';
import { tabulatorFactory } from './tabulatorFactory';
export function readStaticTableData(doc: Document) {
  const staticTable = doc.querySelector('#static-table tbody');
  if (!staticTable) return [];
  const rows = staticTable.querySelectorAll('tr');
  return Array.from(rows).map(row => {
    const cells = row.querySelectorAll('td');
    const originalName = cells[0].textContent || '';
    const newLocal = cells[1] as HTMLTableCellElement;
    const content = newLocal.textContent as string;
    const url = content.trim();
    const name = url
      ? `<a href="${url}" rel="nofollow sponsored">${originalName}</a>`
      : originalName;
    return {
      OriginalName: originalName,
      Name: name,
      Phone: cells[2].textContent || '',
      Street: cells[3].textContent || '',
      Postal: cells[4].textContent || '',
    };
  });
}
export const sortByName = (
  a: any,
  b: any,
  aRow: { getData: () => { (): any; new (): any; OriginalName: any } },
  bRow: { getData: () => { (): any; new (): any; OriginalName: any } },
  column: any,
  dir: any,
  sorterParams: any
) => {
  let retval = prioritySorter(a, b, aRow, bRow, dir);
  if (retval === 0) {
    let aName = aRow.getData().OriginalName;
    let bName = bRow.getData().OriginalName;
    retval = aName.localeCompare(bName);
  }
  return retval;
};
export const columns = [
  {
    title: 'Name',
    field: 'Name',
    sorter: sortByName,
    headerFilter: 'input',
    formatter: 'html',
    responsive: 0,
    resizable: false,
  },
  {
    title: 'Name',
    field: 'Combined',
    sorter: sortByName,
    headerFilter: 'input',
    formatter: nameAndStreetFormatter,
    visible: false,
    resizable: false,
  },
  {
    title: '',
    field: 'Phone',
    formatter: phoneIconFormatter,
    headerSort: false,
    width: 10,
    resizable: false,
  },
  {
    title: 'Street',
    field: 'Street',
    sorter: StringSorter,
    headerFilter: 'input',
    resizable: false,
  },
  {
    title: 'Postal',
    field: 'Postal',
    sorter: StringSorter,
    headerFilter: 'input',
    width: 100,
    resizable: false,
  },
  {
    title: 'Priority',
    field: 'priority',
    visible: false,
  },
];
export const svgIcon = `
               <?xml version="1.0" encoding="UTF-8"?>
                  <!-- Designed by Vexels.com - 2016 All Rights Reserved - https://vexels.com/terms-and-conditions/  -->
                  <svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22" height="22" viewBox="0 0 1200 1199.999" enable-background="new 0 0 1200 1199.999" xml:space="preserve" style= "vertical-align:middle">
                  <g>
                    <g>
                      <polygon fill="#14327D" points="780.591,711.527 875.591,1004.942 764.349,998.129 704.083,1110.723 606.744,810.472   "/>
                      <polygon fill="#14327D" points="432.025,711.527 337.004,1004.942 448.267,998.129 508.511,1110.723 605.804,810.472   "/>
                      <path fill="#771316" d="M972.423,439.172l-27.964-27.941l15.577-36.316c11.814-27.577-0.963-59.532-28.538-71.349l-41.018-17.572    v-44.552c0-30.006-24.319-54.348-54.304-54.348h-39.642l-14.726-36.797c-11.197-27.826-42.786-41.362-70.658-30.189l-41.293,16.54    l-31.453-31.476c-21.199-21.196-55.586-21.196-76.805,0l-27.944,27.943l-36.316-15.554c-27.598-11.816-59.532,0.963-71.346,28.538    l-17.551,40.995h-44.619c-30.006,0-54.301,24.342-54.301,54.348v39.597l-36.797,14.75c-27.852,11.149-41.409,42.785-30.236,70.634    l16.564,41.293l-31.476,31.453c-21.196,21.22-21.196,55.586,0,76.853l27.964,27.941l-15.575,36.316    c-11.84,27.577,0.963,59.51,28.561,71.325l40.995,17.596v44.552c0,30.007,24.295,54.347,54.301,54.347h39.642l14.729,36.774    c11.173,27.873,42.806,41.386,70.658,30.236l41.293-16.563l31.453,31.475c21.22,21.22,55.606,21.22,76.805,0l27.941-27.942    l36.339,15.577c27.574,11.792,59.486-0.964,71.326-28.562l17.548-40.996h44.619c29.985,0,54.304-24.34,54.304-54.347v-39.642    l36.797-14.682c27.873-11.195,41.385-42.808,30.236-70.658l-16.564-41.272l31.474-31.474    C993.621,494.758,993.621,460.392,972.423,439.172z"/>
                      <path fill="#FFFFFF" d="M893.369,473.904c0,161.276-130.717,291.97-291.97,291.97c-161.229,0-291.946-130.695-291.946-291.97    c0-161.23,130.717-291.946,291.946-291.946C762.652,181.958,893.369,312.675,893.369,473.904z"/>
                      <path fill="#14327D" d="M846.776,473.904c0,135.513-109.863,245.354-245.376,245.354S356.068,609.418,356.068,473.904    c0-135.511,109.818-245.329,245.332-245.329S846.776,338.393,846.776,473.904z"/>
                    </g>
                    <polygon fill="#FFFFFF" points="600.758,335.135 644.161,423.045 741.132,437.13 670.956,505.564 687.543,602.192 600.758,556.585    513.994,602.192 530.579,505.564 460.382,437.13 557.353,423.045  "/>
                  </g>
                  </svg>
            `;
export function prioritySorter(
  a: string,
  b: string,
  aRow: { getData: any },
  bRow: { getData: any },
  dir: string
) {
  const aPriority = aRow.getData().priority ? 1 : 0;
  const bPriority = bRow.getData().priority ? 1 : 0;
  let retval = 0;
  if (aPriority !== bPriority) {
    if (dir === 'asc') retval = aPriority > bPriority ? -1 : 1;
    else if (dir === 'desc') retval = aPriority > bPriority ? 1 : -1;
    else
      throw new DOMException(
        'Invalid dir value: ' + dir + 'whencomparing ' + a + ' and ' + b
      );
  } else retval = 0;
  return retval;
}
export function StringSorter(
  a: string,
  b: string,
  aRow: { getData: any },
  bRow: { getData: any },
  column: null,
  dir: string,
  sorterParams: null
) {
  let retval = prioritySorter(a, b, aRow, bRow, dir);
  if (retval === 0) {
    retval = String(a).toLowerCase().localeCompare(String(b).toLowerCase());
  }
  return retval;
}
export function nameAndStreetFormatter(cell: {
  getRow: () => { (): any; new (): any; getData: { (): any; new (): any } };
}) {
  const rowData = cell.getRow().getData();
  const name = rowData.Name || '';
  const street = rowData.Street || '';
  const priorityIcon = rowData.priority
    ? `<div style="display: inline-block">${svgIcon}</div}`
    : '';
  return `
    ${priorityIcon}
    <div>${name}</div>
    <div style='margin-top: 5px;'>${street}</div>`;
}
export function phoneIconFormatter(cell: { getValue: () => any }) {
  const phoneNumber = cell.getValue();
  const phoneContainer = document.createElement('div');
  phoneContainer.className = 'phone-container';
  phoneContainer.style.display = 'flex';
  phoneContainer.style.alignItems = 'center';
  phoneContainer.style.justifyContent = 'center';
  phoneContainer.style.height = '100%';
  phoneContainer.style.width = '100%';
  if (phoneNumber && phoneNumber.trim() !== '') {
    const icon = document.createElement('span');
    icon.className = 'phone-icon';
    icon.className = 'fa-solid fa-phone'; // phone icon
    icon.style.cursor = 'pointer';
    icon.style.textAlign = 'center';
    icon.style.display = 'block';
    icon.title = 'Click to see phone number';
    icon.addEventListener('click', function () {
      document
        .querySelectorAll('.call-interface')
        .forEach(element => element.remove());
      const modal = document.createElement('div');
      modal.className = 'call-interface';
      modal.style.position = 'fixed';
      modal.style.top = '50%';
      modal.style.left = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.border = '1px solid black';
      modal.style.padding = '20px';
      modal.style.backgroundColor = 'white';
      modal.style.zIndex = '1000';
      const span = document.createElement('span');
      span.textContent = phoneNumber;
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'space-evenly';
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.onclick = function () {
        modal.remove();
      };
      const callButton = document.createElement('button');
      callButton.textContent = 'Call';
      callButton.onclick = function () {
        window.location.href = 'tel:' + phoneNumber;
      };
      buttonContainer.appendChild(cancelButton);
      buttonContainer.appendChild(callButton);
      modal.appendChild(span);
      modal.appendChild(buttonContainer);
      document.body.appendChild(modal);
    });
    phoneContainer.appendChild(icon);
  } else {
    phoneContainer.innerHTML = '';
  }
  return phoneContainer;
}
export function addToggleBtn(doc: Document) {
  const isTabulatorPage = doc.querySelector('#dynamic-table');
  if (!isTabulatorPage) return;
  if (doc.querySelector('.toggle-container')) {
    return;
  }
  var toggleContainer = doc.createElement('div');
  toggleContainer.className = 'toggle-container';
  toggleContainer.style.display = 'flex';
  toggleContainer.style.alignItems = 'center';
  toggleContainer.style.justifyContent = 'flex-start';
  toggleContainer.style.position = 'relative';
  var toggleSwitch = doc.createElement('input');
  toggleSwitch.type = 'checkbox';
  toggleSwitch.className = 'toggle-switch';
  toggleSwitch.id = 'toggleSwitch';
  toggleSwitch.checked = true; // Default toggled on
  toggleSwitch.style.cursor = 'pointer';
  var toggleLabel = doc.createElement('label');
  toggleLabel.className = 'switch';
  toggleLabel.appendChild(toggleSwitch);
  var slider = doc.createElement('span');
  slider.className = 'slider round';
  toggleLabel.appendChild(slider);
  var labelText = doc.createElement('span');
  labelText.classList.add('label-span');
  var labelDiv = doc.createElement('div');
  labelDiv.classList.add('label-div');
  labelDiv.textContent = 'Websites only';
  labelDiv.style.position = 'relative';
  // Information icon
  var infoIcon = doc.createElement('i');
  infoIcon = doc.createElement('span');
  infoIcon.className = 'fas fa-info-circle';
  infoIcon.style.position = 'relative';
  infoIcon.style.top = '-6px';
  infoIcon.style.cursor = 'pointer';
  labelText.appendChild(labelDiv);
  toggleContainer.appendChild(toggleLabel);
  toggleContainer.appendChild(labelText);
  labelText.appendChild(infoIcon);
  var headerElement = doc.querySelector('h1') as HTMLElement;
  var headerContainer = doc.createElement('div') as HTMLElement;
  headerContainer.className = 'header-container';
  const parentNode = headerElement.parentNode as HTMLElement;
  parentNode.insertBefore(headerContainer, headerElement);
  headerContainer.appendChild(headerElement);
  headerContainer.appendChild(toggleContainer);
}
export function createInfoModal(doc: Document, win: Window) {
  const modal = doc.createElement('div');
  modal.id = 'infoModal';
  modal.className = 'modal';
  const modalContent = doc.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.innerHTML = `
      <div class="modal-header">
          <span class="close">&times
      </div>
      <div class="modal-body">
          <p>Inquirita verifies Websites for valid content. If we cannot find a Website for a listing we do not attempt to validate the listing. "Hide listings without Websites" ensures you only view listings where we have examined and verified the phone number and address and the business appears to be operating.</nobr></p>
      </div>
  `;
  modal.appendChild(modalContent);
  doc.body.appendChild(modal);
  const closeButton = modal.querySelector('.close') as HTMLInputElement;
  closeButton.onclick = function () {
    modal.style.display = 'none';
  };
  win.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
  return modal;
}
export function addDynamicTableId(doc: Document) {
  var staticTable = doc.getElementById('static-table') as HTMLElement;
  if (staticTable) {
    var newDiv = doc.createElement('div');
    newDiv.id = 'dynamic-table';
    const parentNode = staticTable.parentNode as HTMLElement;
    parentNode.insertBefore(newDiv, staticTable.nextSibling);
  }
}
export function showDynamicTable(doc: Document) {
  const staticTable = doc.getElementById('static-table') as HTMLElement;
  staticTable.style.display = 'none';
  const dynamicTable = doc.getElementById('dynamic-table') as HTMLElement;
  dynamicTable.style.display = 'block';
}
export function updatePriority(tData: any[], name: string) {
  tData.forEach(item => {
    let priority = false;
    const original = item.OriginalName;
    if (original === name) priority = true;
    item.priority = priority;
  });
}
export function setupInteractions(tabulator: Tabulator, doc: Document) {
  const toggleSwitch = doc.getElementById('toggleSwitch') as HTMLInputElement;
  const infoIcon = doc.querySelector('.fa-info-circle') as HTMLElement;
  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', () => {
      if (toggleSwitch.checked) {
        tabulator.setFilter('Name', 'like', '<a href=');
      } else {
        tabulator.clearFilter(false);
      }
    });

    // Set initial state based on toggle switch
    if (toggleSwitch.checked) {
      tabulator.setFilter('Name', 'like', '<a href=');
    }
  }

  if (infoIcon) {
    infoIcon.addEventListener('click', () => {
      let modal = doc.getElementById('infoModal');
      if (!modal) {
        modal = createInfoModal(doc, window);
      }
      modal.style.display = 'block';
    });
  }
}
export const rowFormatter_ = function (row: {
  getData: () => any;
  getElement: () => any;
  getCells: () => any;
}) {
  let data = row.getData();
  const rowElement = row.getElement();
  if (data.priority) {
    rowElement.style.background =
      'linear-gradient(to bottom, #FFDF77, #FFC107)';
    rowElement.style.color = 'black';
    rowElement.style.fontWeight = 'bold';
    rowElement.style.fontSize = '17px';
    const links = rowElement.querySelectorAll('a');
    links.forEach(
      (link: { style: { color: string; verticalAlign: string } }) => {
        link.style.color = '#003366';
        link.style.verticalAlign = 'middle';
      }
    );
    let cells = row.getCells();
    let firstCellElement = cells[0].getElement();
    if (firstCellElement) {
      const svgName = document.createElement('div');
      svgName.innerHTML = svgIcon;
      svgName.style.display = 'inline-block';
      svgName.style.marginRight = '5px';
      svgName.style.verticalAlign = 'middle';
      firstCellElement.prepend(svgName);
    }
  }
};
export const adjustColumnVisibility = (tabulatorInstance: Tabulator) => {
  if (tabulatorInstance) {
    if (window.innerWidth <= 600) {
      tabulatorInstance.hideColumn('Postal');
      tabulatorInstance.hideColumn('Street');
      tabulatorInstance.hideColumn('Name');
      tabulatorInstance.showColumn('Combined');
    } else {
      tabulatorInstance.showColumn('Postal');
      tabulatorInstance.showColumn('Street');
      tabulatorInstance.showColumn('Name');
      tabulatorInstance.hideColumn('Combined');
    }
    setTimeout(() => {
      tabulatorInstance.redraw(true);
    }, 50);
  }
};
export function buildTable(tab: Tabulator, doc: Document) {
  tab.on('tableBuilt', () => {
    setupInteractions(tab, doc);
    showDynamicTable(doc);
    adjustColumnVisibility(tab);
  });
}
export function getTable(
  doc: Document,
  priority: string,
  cols: (
    | {
        title: string;
        field: string;
        sorter: (
          a: any,
          b: any,
          aRow: { getData: () => { (): any; new (): any; OriginalName: any } },
          bRow: { getData: () => { (): any; new (): any; OriginalName: any } },
          column: any,
          dir: any,
          sorterParams: any
        ) => number;
        headerFilter: string;
        formatter: string;
        responsive: number;
        resizable: boolean;
        visible?: undefined;
        headerSort?: undefined;
        width?: undefined;
      }
    | {
        title: string;
        field: string;
        sorter: (
          a: any,
          b: any,
          aRow: { getData: () => { (): any; new (): any; OriginalName: any } },
          bRow: { getData: () => { (): any; new (): any; OriginalName: any } },
          column: any,
          dir: any,
          sorterParams: any
        ) => number;
        headerFilter: string;
        formatter: (cell: {
          getRow: () => {
            (): any;
            new (): any;
            getData: { (): any; new (): any };
          };
        }) => string;
        visible: boolean;
        resizable: boolean;
        responsive?: undefined;
        headerSort?: undefined;
        width?: undefined;
      }
    | {
        title: string;
        field: string;
        formatter: (cell: { getValue: () => any }) => HTMLDivElement;
        headerSort: boolean;
        width: number;
        resizable: boolean;
        sorter?: undefined;
        headerFilter?: undefined;
        responsive?: undefined;
        visible?: undefined;
      }
    | {
        title: string;
        field: string;
        sorter: (
          a: string,
          b: string,
          aRow: { getData: any },
          bRow: { getData: any },
          column: null,
          dir: string,
          sorterParams: null
        ) => number;
        headerFilter: string;
        resizable: boolean;
        formatter?: undefined;
        responsive?: undefined;
        visible?: undefined;
        headerSort?: undefined;
        width?: undefined;
      }
    | {
        title: string;
        field: string;
        sorter: (
          a: string,
          b: string,
          aRow: { getData: any },
          bRow: { getData: any },
          column: null,
          dir: string,
          sorterParams: null
        ) => number;
        headerFilter: string;
        width: number;
        resizable: boolean;
        formatter?: undefined;
        responsive?: undefined;
        visible?: undefined;
        headerSort?: undefined;
      }
    | {
        title: string;
        field: string;
        visible: boolean;
        sorter?: undefined;
        headerFilter?: undefined;
        formatter?: undefined;
        responsive?: undefined;
        resizable?: undefined;
        headerSort?: undefined;
        width?: undefined;
      }
  )[]
) {
  const tData = readStaticTableData(doc);
  updatePriority(tData, priority);
  if (!tData || tData.length === 0) {
    console.log('Static table ID not found');
    return;
  }
  const t = tabulatorFactory(tData, cols, rowFormatter_);
  buildTable(t, doc);
  return t;
}
export function mounted() {
  const doc: Document = document;
  const props = doc.getElementById('props') as HTMLElement;
  const priority = props.dataset.priority as string;
  addDynamicTableId(doc);
  addToggleBtn(doc);
  const t = getTable(doc, priority, columns);
  if (!t) return;
  window.addEventListener('resize', () => adjustColumnVisibility(t));
  return t;
}
//entry point protected for testing
if (typeof window !== 'undefined') {
  (window as any).mounted = mounted;
}
