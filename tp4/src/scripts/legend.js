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

  console.log(colorScale.domain())
  console.log(colorScale.range())

  const legend = legendColor()
    .scale(colorScale)
    .shapePadding(5)
    .shapeWidth(50)
    .shapeHeight(20)
    .labelOffset(12)
    .title("ABC")

    console.log(legend)

    g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - 100}, 20)`)
    .call(legend);


}
