CREATE TABLE parts_list (
  part_uid VARCHAR(255) PRIMARY KEY,
  tf_package_id references tframe_package(tf_package_id) ON DELETE CASCADE,
  description text default 'basic part',
  qr_code_photo text,
  last_scanned_by INTEGER,
  status VARCHAR(255)
)
