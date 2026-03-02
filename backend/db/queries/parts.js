const db = require("../connection");

// Query for scanning a part and updating to scanned
const partScan = async (partUid) => {
  const query = `UPDATE parts_list SET status = 'scanned' WHERE part_uid = $1 RETURNING *`;
  const data = [partUid];

  try {
    const result = await db.query(query, data);
    return result.rows;
  } catch (err) {
    console.error("Error in parts scan helper:", err);
    throw err;
  }
};

module.exports = { partScan };