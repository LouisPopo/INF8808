import { legendColor } from 'd3-svg-legend';

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/

  const domain = colorScale.domain().sort();
  colorScale.domain(domain);


  const legend = legendColor()
    .scale(colorScale)
    .ascending(false)
    .labelAlign('start')
    .shapePadding(5)
    .shape('circle')
    .shapeWidth(15)
    .shapeHeight(15)
    .labelOffset(12)
    .title("Legend")


  g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width}, -40)`)
    .call(legend);


}
