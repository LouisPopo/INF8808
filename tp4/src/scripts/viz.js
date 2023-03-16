import { drawLegend } from "./legend"
import { getContents } from "./tooltip"

/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  // TODO : Position axis labels
  g.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + 40)

  g.select('.y.axis-text')
    .attr('x', -40)
    .attr('y', height / 2)

}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, rScale, colorScale) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

  const g = d3.select('#graph-g').append('g').attr('id', 'circles')

  d3.select('#circles')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', function (d) { return rScale(d.Population)} )
    .attr('fill', function (d) { return colorScale(d.Continent)})
    .attr('fill-opacity', 0.7)
    .attr('stroke', 'white')

}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  const bubbles = d3.select('#circles').selectAll('circle');

  bubbles.on('mouseover', function(event, d) {
    // increase opacity
    const circle = d3.select(d)._groups.at(0).at(0);
    console.log(circle)
    const content=getContents(circle)
    console.log(content)
    d3.select(this).style('opacity', 1);
  });

  bubbles.on('mouseout', function(event, d) {
    // reset opacity
    d3.select(this).style('opacity', 0.7);
  });
  
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCircles (xScale, yScale, transitionDuration) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively

  d3.select('#circles')
    .selectAll('circle')
    .transition(transitionDuration)
    .attr('cx', function (d) { return xScale(d.GDP) })
    .attr('cy', function (d) { return yScale(d.CO2) })

}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
  // TODO : Set the title
}
