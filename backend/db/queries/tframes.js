const db = require('../connection');

//Get tension frame package by RFID EPC ID
const getFramePkgByEPC = (epcId) => {
  const query = `SELECT 
                  tfp.*, rt.epc_id
                FROM tframe_package tfp
                JOIN rfid_tags rt
                  ON tfp.tf_package_id = rt.entity_id
                WHERE rt.epc_id = $1
                AND entity_type = 'frame'`;
  const data = [epcId];


  return db.query(query, data).then((data) => {
    console.log("db-query: ", data.rows);
    return data.rows;
  })

};

//Get all Frames
const getAllFrames = () => {
  const query = `SELECT * FROM tframe_package ORDER BY tf_package_id DESC`;
  
  return db.query(query).then((data) => {
    console.log("db-query: ", data.rows)
    return data.rows; // Return frame list
  })
}

module.exports = {
  getFramePkgByEPC,
  getAllFrames
};