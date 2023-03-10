
/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".
  console.log(data)
  const legend = d3.select('.legend')

  const legendPropreties = legend.selectAll('.legend-element')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'legend-element')

  legendPropreties.append('svg')
    .attr('width', 15)
    .attr('height', 15)
    .append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', c => color(c))
    .attr('right', 10)

  legendPropreties.append('text')
    .attr('x', 25)
    .attr('y', 15)
    .text(d => d)
}
