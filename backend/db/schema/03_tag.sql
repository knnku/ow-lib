CREATE table tag_id {
  tag_id SERIAL PRIMARY KEY,
  event_id INTEGER,
  time_date timestamp,
  last_scanned_by INTEGER
}