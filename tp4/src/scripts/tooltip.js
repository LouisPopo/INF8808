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
  const name = d.name;
  const population = d3.format(',')(d.population);
  const gdp = d3.format('$,.2f')(d.gdp);
  const co2 = d3.format(',')(d.co2);

  let content = `<div class="tooltip-label">${name}</div>`;

  if (d.population) {
    content += `<div class="tooltip-row">Population: ${population}</div>`;
  }

  if (d.gdp) {
    content += `<div class="tooltip-row">GDP: ${gdp}</div>`;
  }

  if (d.co2) {
    content += `<div class="tooltip-row">CO2 Emissions: ${co2} metric tons</div>`;
  }
  return content;
}
