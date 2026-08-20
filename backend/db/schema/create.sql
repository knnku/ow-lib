DROP TABLE IF EXISTS tframe_package CASCADE;
DROP TABLE IF EXISTS parts_list CASCADE;
DROP TABLE IF EXISTS rfid_tags CASCADE;


-- CREATE SEQUENCE IF NOT EXISTS tf_package_id START 1;
-- CREATE SEQUENCE IF NOT EXISTS tf_part_id START 1; 


CREATE TABLE tframe_package (
  tf_package_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  frame_type VARCHAR(255),
  supplier VARCHAR(255),
  part_qty INTEGER,
  photo text,
  status VARCHAR(255)
);

CREATE TABLE parts_list (
  part_id VARCHAR(255) PRIMARY KEY,
  tf_package_id VARCHAR(255) references tframe_package(tf_package_id) ON DELETE CASCADE,
  description text default 'basic part',
  status VARCHAR(255)
);

CREATE table rfid_tags (
  tag_id SERIAL PRIMARY KEY,
  epc_id VARCHAR,
  status VARCHAR default 'active',
  entity_id VARCHAR,
  entity_type VARCHAR
);
