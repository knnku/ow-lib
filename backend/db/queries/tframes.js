const db = require('../connection');

//Get tension frame package by RFID EPC ID
const getFramePkgByEPC = (epcId) => {
  const query = `
                  SELECT 
                    pl.*,
                    part_tags.epc_id AS part_epc
                  FROM parts_list pl
                  LEFT JOIN rfid_tags pt 
                    ON pl.tf_package_id = pt.entity_id
                    AND UPPER(pt.entity_type) = 'FRAME'
                  LEFT JOIN rfid_tags part_tags 
                    ON pl.part_id = part_tags.entity_id 
                    AND UPPER(part_tags.entity_type) = 'PART'
                  WHERE UPPER(TRIM(pl.tf_package_id)) = UPPER(TRIM($1))
                    OR UPPER(TRIM(pt.epc_id)) = UPPER(TRIM($1));
                `;
  const data = [epcId];


  return db.query(query, data).then((data) => {
    console.log("frame package db-query: ", data.rows);
    return data.rows;
  })

};

//Get all Frames
const getAllFrames = () => {
  const query = `SELECT * FROM tframe_package ORDER BY tf_package_id DESC`;
  
  return db.query(query).then((data) => {
    console.log("get all frames db-query: ", data.rows)
    return data.rows; // Return frame list
  })
}

module.exports = {
  getFramePkgByEPC,
  getAllFrames
};