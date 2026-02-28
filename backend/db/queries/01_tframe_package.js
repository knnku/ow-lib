const db = require('../connection');


//Get tframe data by tframe package id
const getTframePkgbyID =  (tframeData) => {
  const query = `SELECT * FROM tframe_package WHERE id = $1`;
  const data = [tframeData];


  return db.query(query, values).then((data) => {
    console.log("db-query: ", data.rows);
    return data.rows;
  })


};

module.exports = [getTframePkgbyID];