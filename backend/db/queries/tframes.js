const db = require('../connection');

//Get tframe data by tframe package id
const getTframePkgbyID = (tframeData) => {
  const query = `SELECT * FROM tframe_package WHERE id = $1`;
  const data = [tframeData];


  return db.query(query, values).then((data) => {
    console.log("db-query: ", data.rows);
    return data.rows;
  })

};

const getAllFrames = () => {
  const query = `SELECT * FROM tframe_package ORDER BY tf_package_id DESC`;
  
  return db.query(query).then((data) => {
    return data.rows; // Return frame list
  })
}

module.exports = [
  getTframePkgbyID,
  getAllFrames
];