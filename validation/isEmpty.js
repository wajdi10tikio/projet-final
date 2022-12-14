const isEmpty = value => value === null || value === undefined ||
  typeof (value) === "object" && Object.keys(value).length === 0
  // ya3ni ken l value eli bch nda5lou null wela mch mawjoud wela 0 ya3ni raw feragh donc te9blouch 
  || typeof (value) == "string" && value.trim().length === 0

module.exports = isEmpty
// ken value mte3na string kima des espace donc na3mloulha trim weli bch ytaya7 eli heya des espace donc dsl makch bch tet3ada