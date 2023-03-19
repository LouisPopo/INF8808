/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 *
 */

const one_hundred = 100; 

export function getContents (d) {
  // TODO : Generate tooltip contents

  let content = `<div class="tooltip-label">`;

  if(d["Country Name"]) {
    content+=`<div class="tooltip-row"><b>Country</b>: ${d["Country Name"]}</div>`;
  }

  if(d["Population"]) {
    content += `<div class="tooltip-row"><b>Population</b> : ${d["Population"]}</div>`;
  }
  
  if (d["GDP"]) {
    content += `<div class="tooltip-row"><b>GDP</b> : ${Math.round(d["GDP"] * one_hundred)/one_hundred} $ (USD)</div>`;
  }

  if (d["CO2"]) {
    content += `<div class="tooltip-row"><b>CO2</b> : ${d["CO2"]} metric tonnes</div>`;
  }
  content+=`</div>`
  return content;
}
