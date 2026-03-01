-- Tframe package seed for testing
INSERT INTO tframe_package(name, frame_type, supplier, part_qty, photo, qr_code_photo, status, last_scanned_by)
VALUES
('10x3.3 Frame', 'Square Type - Vertical', 'Backdrop Source', 10, 'placeholder.jpg', 'placeholder.jpeg', 'new', 1);

INSERT INTO parts_list(part_uid, tf_package_id, description, qr_code_photo, last_scanned_by, status)
VALUES 
('tframe1_part1', 1, 'straight_35inch', 'placeholder.jpeg', 1, 'scanned'),
('tframe1_part2', 1, 'straight_20inch', 'placeholder.jpeg', 1, 'scanned'),
('tframe1_part3', 1, 'leg_holder', 'placeholder.jpeg', 1, 'scanned'),
('tframe1_part4', 1, 'foot_base', 'placeholder.jpeg', 1, 'scanned'),
('tframe1_part5', 1, 'corner_joint', 'placeholder.jpeg', 1, 'scanned');