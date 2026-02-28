CREATE TABLE tframe_package (
  tf_package_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  frame_type VARCHAR(255),
  supplier VARCHAR(255),
  part_qty INTEGER,
  photo text,
  qr_code_photo text,
  status VARCHAR(255),
  last_scanned_by INTEGER
);
