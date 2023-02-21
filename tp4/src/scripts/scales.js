/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  // TODO : Set scale


  let populations = []
  data['2000'].forEach((d) => { populations.push(d.Population) });
  data['2015'].forEach((d) => { populations.push(d.Population) });

  const maxPop = d3.max(populations)
  const minPop = d3.min(populations)

  const s = d3.scaleLinear().domain([minPop, maxPop]).range([5,20])

  console.log(s(maxPop))

  return s
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeSet1.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  let continents = new Set();

  data['2000'].forEach((d) => { continents.add(d.Continent) })
  data['2015'].forEach((d) => { continents.add(d.Continent) })
  
  return d3.scaleOrdinal(d3.schemeSet1)
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  let GDPS = []
  
  data['2000'].forEach((d) => { GDPS.push(d.GDP) })
  data['2015'].forEach((d) => { GDPS.push(d.GDP) })

  const maxGDP = d3.max(GDPS)

  return d3.scaleLog().domain([100,maxGDP]).range([0,width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  let CO2S = []
  
  data['2000'].forEach((d) => { CO2S.push(d.CO2) })
  data['2015'].forEach((d) => { CO2S.push(d.CO2) })

  const maxCO2 = d3.max(CO2S)

  return d3.scaleLog().domain([0.01,maxCO2]).range([height,0])
}
