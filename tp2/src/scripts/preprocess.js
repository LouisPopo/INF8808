
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  // TODO: Clean the player name data
  // DONE !
  return data.map(r => {
    const firstLetter = r.Player.charAt(0).toUpperCase()
    const restOfName = r.Player.slice(1).toLowerCase()
    r.Player = firstLetter + restOfName
    return r
  })
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  // TODO: Find the five top players with the most lines in the play
  const nameCounts = {}

  // Check for each line, if Player in nameCounts, +1 else 1
  data.forEach(r => {
    nameCounts[r.Player] = nameCounts[r.Player] ? nameCounts[r.Player] + 1 : 1
  })

  // convert nameCounts to a list of tuple [[key_1, value_1], [key_2, value_2], etc.]
  // then sort it by item[1] so the value
  // then maps item[0], so return names only
  const sortedNames = Object.entries(nameCounts).sort((first, second) => second[1] - first[1]).map(item => item[0])
  return sortedNames.slice(0, 5)
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  // The reduce() method executes a user-supplied "reducer" callback function on each element of the array,
  // in order, passing in the return value from the calculation on the preceding element.
  // The final result of running the reducer across all elements of the array is a single value.
  const t = data.reduce((acc, curr) => {
    // check if in acc, there is already the Act of curr
    const actExists = acc.some(a => a.Act === curr.Act)
    if (!actExists) { // if no, we create a new object
      acc.push({ Act: curr.Act, Players: [] })
    }
    // Find the index of the curr.Act in the acc
    const actIndex = acc.findIndex(a => a.Act === curr.Act)
    // Check if curr.Player already exists in the act
    const playerExsists = acc[actIndex].Players.some(p => p.Player === curr.Player)
    if (!playerExsists) { // if not, push new object with count 1
      acc[actIndex].Players.push({ Player: curr.Player, Count: 1 })
    } else { // else, find index of player in act and increment
      const playerIndex = acc[actIndex].Players.findIndex(p => p.Player === curr.Player)
      acc[actIndex].Players[playerIndex].Count++
    }
    return acc
  }, [])
  return t
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  // iterate through all act of data
  const g = data.forEach(act => {
    // count the number of lines made by players not in top
    const otherLines = act.Players.reduce((acc, curr) => {
      if (!top.includes(curr.Player)) {
        acc += curr.Count
      }
      return acc
    }, 0)
    // only keep the top players
    act.Players = act.Players.filter(player => top.includes(player.Player))
    // add the other information
    act.Players.push({ Player: 'Other', Count: otherLines })
  })
  return g
}
