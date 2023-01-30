
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, data) {
  // TODO : Set domain of color scale
  const minCount = d3.min(data, function (d) { return d.Counts})
  const maxCount = d3.max(data, function (d) { return d.Counts})

  colorScale.domain([minCount, maxCount])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects (data) {
  // TODO : Append SVG rect elements
  const heatmap = d3.select('.heatmap-svg')

  heatmap.selectAll('g')
    .data(data)
    .enter()
    .append('g').append('rect')
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale (xScale, data, width, range) {

  const minYear = d3.min(data, function (d) { return d.Plantation_Year})
  const maxYear = d3.max(data, function (d) { return d.Plantation_Year})

  xScale.domain(range(minYear, maxYear)).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, neighborhoodNames, height) {
  // TODO : Update Y scale
  // Make sure to sort the neighborhood names alphabetically
  yScale.domain(neighborhoodNames.sort(d3.ascending)).range([height, 0])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale) {
  // TODO : Draw X axis
  d3.select('.x.axis')
    //.attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisTop(xScale).tickFormat(x => `${x}`))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  d3.select('.y.axis')
    .attr('transform', 'translate(' + width + ' ,0)')
    .call(d3.axisRight(yScale).tickFormat(x => `${x}`))
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
export function rotateYTicks () {
  // TODO : Rotate Y ticks.
  d3.select('.y.axis')
    .selectAll('text')
    //.attr('transform', 'rotate(-30)')
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects (xScale, yScale, colorScale) {
  // TODO : Set position, size and fill of rectangles according to bound data

  // const rects = d3.select('#heatmap').selectAll('g')

  // rects

  
  //   .attr('x', function (d) { return xScale(d.Plantation_Year)})

}
