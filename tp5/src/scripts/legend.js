import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
  g.append('g')
    .attr('transform', 'translate(50, 150)')
    .call(d3Legend.legendColor()
      .scale(colorScale)
      .shape('circle')
      .shapePadding(10)
      .labelOffset(10)
      .title('Légende')
      .titleWidth(100)
      .labelAlign('start')
      .orient('vertical')
    )
}
