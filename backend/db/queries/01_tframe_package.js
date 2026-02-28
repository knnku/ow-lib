const db = require('../connection')l;


//Get tframe data by tfframe package id
const getTframePkgbyID =  (tframeData) {
  const query = `SELECT * FROM tframe_package WHERE id = $1`;
  const data = [tframeData];


  return db.query(query, values).then((data) => {
    console.log("db-query: ", data.rows);
    return data.rows;
  })


}