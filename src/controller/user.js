const { exec } = require('../db/mysql')
const getGenderList = () => {
  const sql = `select * from genderlist`
  return exec(sql).then(rows => {
    // console.log(rows);
    return rows[0] || {}
  })
}

module.exports = {
  getGenderList
}
