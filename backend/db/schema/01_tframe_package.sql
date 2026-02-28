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

CREATE TABLE parts_list (
  part_uid VARCHAR(255) PRIMARY KEY,
  tf_package_id references tframe_package(tf_package_id) ON DELETE CASCADE,
  description text default 'basic part',
  qr_code_photo text,
  last_scanned_by INTEGER,
  status VARCHAR(255)
)

CREATE table tag_id {
  tag_id SERIAL PRIMARY KEY,
  event_id INTEGER,
  time_date timestamp,
  last_scanned_by INTEGER
}