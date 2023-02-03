/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  // TODO : Select the squares and set their event handlers
  console.log('testing')



  d3.select('#graph-g')
    .selectAll('rect')
    .on('mouseenter', function() 
      { 
        rectSelected(this, xScale, yScale)
        selectTicks(
          d3.select(this).data()[0].Arrond_Nom, 
          d3.select(this).data()[0].Plantation_Year 
        )
      })
    .on('mouseleave', function() 
      { 
        rectUnselected(this) 
        unselectTicks()
      })

}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected (element, xScale, yScale) {
  // TODO : Display the number of trees on the selected element
  // Make sure the nimber is centered. If there are 1000 or more
  // trees, display the text in white so it contrasts with the background.
  //console.log(d3.select(this).data()[0])
  //console.log(xScale)


  const arrondName = d3.select(element).data()[0].Arrond_Nom
  const year = d3.select(element).data()[0].Plantation_Year
  const counts = d3.select(element).data()[0].Counts

  const fillColor = counts > 1000 ? 'white' : 'black'

  d3.select(element.parentNode)
    .append('text')
    .text(counts)
    .attr("text-anchor", "middle")
    .attr("font-family", "Roboto Slab")
    .attr("font-size", "8px")
    .attr("fill", fillColor)
    .attr('x', xScale(year))
    .attr('y', yScale(arrondName))
    .attr('transform', `translate(${xScale.bandwidth()/2}, ${yScale.bandwidth()/2})` )
    //.attr('fill', 'blue')
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected (element) {
  // TODO : Unselect the element
  //d3.select

  d3.select(element.parentNode).select('text').remove()

}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicks (name, year) {
  
  d3.select('.y.axis')
    .selectAll('.tick')
    .filter(function (d) {
      return d === name
    })
    .select('text')
    .style("font-size", "23px") // ici il faudrait le mettre bold mais j'arrive pas.

  d3.select('.x.axis')
    .selectAll('.tick')
    .filter(function (d) {
      return d === year
    })
    .select('text')
    .style("font-size", "15px") // ici il faudrait le mettre bold mais j'arrive pas.

  
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  
  d3.select('.y.axis')
    .selectAll('.tick')
    .select('text')
    .style('font-size', '10px')

  d3.select('.x.axis')
    .selectAll('.tick')
    .select('text')
    .style('font-size', '10px')

  //console.log(d3.select('.y.axis').selectAll('.tick').data())
  // TODO : Unselect the ticks
}
