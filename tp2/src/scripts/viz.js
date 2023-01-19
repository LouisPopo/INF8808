
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  // scale = d3.scaleLinear().domain([d3.min(data.x), d3.max(data.x)]).range([0, width])
  scale.domain(data.map(a => {
    return a.Act
  })).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  // scale = d3.scaleLinear().domain([d3.min(data.y), d3.max(data.y)]).range([0, height])
  const maxLines = Math.max(...data.map(act => Math.max(...act.Players.map(p => p.Count))))
  scale.domain([0, maxLines]).range([height, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  // TODO : Create the groups
  // d3.select('#graph-g').append('g').attr('class', 'group').attr('transform', (d) => `translate(${x(d.Act)}, 0)`)
  console.log('creating group')

  const groups = d3.select('#graph-g')
    .selectAll('.my-class')
    .data(data)

  groups.attr('id', function (d) { return 'groupAct' + d.Act })
    .attr('class', 'my-class')
    .attr('transform', function (d) { return 'translate(' + x(d.Act) + ',0)' })
    .attr('width', x.bandwidth())

  groups.enter()
    .append('g')
    .attr('id', function (d) { return 'groupAct' + d.Act })
    .attr('class', 'my-class')
    .attr('transform', function (d) { return 'translate(' + x(d.Act) + ',0)' })
    .attr('width', x.bandwidth())
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  console.log('drawing bars')
  const groups = d3.select('#graph-g').selectAll('.my-class')

  tip.direction('n')
  tip.offset([-5, 0])

  const bars = groups.selectAll('rect')
    .data(function (d) { return d.Players })

  bars.attr('height', function (d, i) { return height - y(d.Count) })
    .attr('x', function (d) { return xSubgroup(d.Player) })
    .attr('y', function (d) { return y(d.Count) })
    .attr('width', xSubgroup.bandwidth())
    .attr('fill', function (d) { return color(d.Player) })
    .on('mouseover', function () {
      const hoveredElement = d3.select(this).data()[0]
      tip.show(hoveredElement, this)
    })
    .on('mouseleave', tip.hide)

  bars.enter()
    .append('rect')
    .attr('height', function (d, i) { return height - y(d.Count) })
    .attr('x', function (d) { return xSubgroup(d.Player) })
    .attr('y', function (d) { return y(d.Count) })
    .attr('width', xSubgroup.bandwidth())
    .attr('fill', function (d) { return color(d.Player) })
    .on('mouseover', function () {
      const hoveredElement = d3.select(this).data()[0]
      tip.show(hoveredElement, this)
    })
    .on('mouseleave', tip.hide)
}
