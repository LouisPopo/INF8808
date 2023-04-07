/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  // Set the color domain that has range of colors and domain is values from data TYPE_SITE_INTERVENTION
  // TODO : Set the color domain
  color.domain(data.features.map(d => d.properties.TYPE_SITE_INTERVENTION))
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  // to display the neighborhood name.
  // data.features is a list of feature in which geometry is a MultiPolygon
  // TODO : Generate the map background and set the hover handlers
  // TODO : Call showMapLabel when a neighborhood is hovered

  d3.select('#map-g')
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('d', path)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .on('mouseover', function () {
      showMapLabel(this, path)
    })
    .on('mouseout', function () {
      d3.select(this.parentNode)
        .select('text')
        .remove()
    })
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  // TODO : Show the map label at the center of the neighborhood

  const e = d3.select(d)

  const coords = path.centroid(e.data()[0].geometry)
  const nom = e.data()[0].properties.NOM

  d3.select(d.parentNode)
    .append('text')
    .attr('x', coords[0])
    .attr('y', coords[1])
    .attr('text-anchor', 'middle')
    .text(nom)
    .attr('visibility', 'visible')
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.

  console.log(data)

  d3.select('#map-g')
    .selectAll('circle')
    .data(data.features)
    .join('circle')
    .attr('cx', function (d) { return d.x })
    .attr('cy', function (d) { return d.y })
    .attr('stroke', 'white')
    .attr('r', 5)
    .attr('fill', function (d) { return color(d.properties.TYPE_SITE_INTERVENTION) })
    .attr('class', 'marker')
    .on('mouseover', function () {
      d3.select(this)
        .attr('r', 6)
    })
    .on('mouseout', function () {
      d3.select(this)
        .attr('r', 5)
    })
}
