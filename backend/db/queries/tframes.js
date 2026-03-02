const db = require('../connection');

//Get tframe data by tframe package id
const getTframePkgbyID = (frameId) => {
  const query = `SELECT * FROM parts_list WHERE tf_package_id = $1 ORDER BY part_uid ASC`;
  const data = [frameId];


  return db.query(query, data).then((data) => {
    // console.log("db-query: ", data.rows);
    return data.rows;
  })

};

const getAllFrames = () => {
  const query = `SELECT * FROM tframe_package ORDER BY tf_package_id DESC`;
  
  return db.query(query).then((data) => {
    // console.log("db-query", data.rows)
    return data.rows; // Return frame list
  })
}

module.exports = {
  getTframePkgbyID,
  getAllFrames
};