/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  const names = Array.from(new Set(data.map(function (d) {return d.Arrond_Nom})))
  return names
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {

  const filtered = data.filter(function (d) { 
    const date = new Date(d.Date_Plantation).getFullYear()
    return (date >= start) && (date <= end)  
  })
  return filtered
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  // TODO : Construct the required data table
  
  const t = data.reduce((acc, curr) => {

    const currYear = new Date(curr.Date_Plantation).getFullYear()

    // pass on each element of the data list
    const arrondYearExists = acc.some(d => (d.Arrond_Nom === curr.Arrond_Nom) && (d.Plantation_Year === currYear))
    if (!arrondYearExists) {
      acc.push({Arrond_Nom : curr.Arrond_Nom, Plantation_Year : currYear, Counts : 1})
    } else {
      const arrondYearIndex = acc.findIndex(d => (d.Arrond_Nom === curr.Arrond_Nom) && (d.Plantation_Year === currYear))
      acc[arrondYearIndex].Counts++
    }
    return acc
  }, [])
  return t

}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  // TODO : Find missing data and fill with 0
  range(start, end).forEach(y => {
    neighborhoods.forEach(n => {
      const yearNeighExists = data.some(d => (d.Arrond_Nom === n) && (d.Plantation_Year === y))
      if (!yearNeighExists) {
        data.push({Arrond_Nom : n, Plantation_Year : y, Counts : 0})
      }
    })
  });
  return data
}
