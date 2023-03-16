/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents

  let content = `<div class="tooltip-label">`;

  if(d["Country Name"]) {
    content+=`<div class="tooltip-row">Country:${d["Country Name"]}</div>`;
  }

  if(d["Population"]) {
    content += `<div class="tooltip-row">Population:${d["Population"]}</div>`;
  }
  
  if (d["GDP"]) {
    content += `<div class="tooltip-row">GDP:${d["GDP"]}</div>`;
  }

  if (d["CO2"]) {
    content += `<div class="tooltip-row">CO2:${d["CO2"]} metric tons</div>`;
  }
  content+=`</div>`
  return content;
}
