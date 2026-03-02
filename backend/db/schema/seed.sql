-- Tframe package seeds
INSERT INTO tframe_package(tf_package_id, name, frame_type, supplier, part_qty, photo, qr_code_photo, status, last_scanned_by)
VALUES
('ow-tf-sqv-0000', '10x3.3 Frame', 'Square Type - Vertical', 'Backdrop Source', 10, 'placeholder.jpg', 'placeholder.jpeg', 'new', 1);

-- tframe parts list seeds
INSERT INTO parts_list(part_uid, tf_package_id, description, qr_code_photo, last_scanned_by, status)
VALUES 
('ow-tf-part-sqv-1', 'ow-tf-sqv-0000' ,'straight_35inch', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-2', 'ow-tf-sqv-0000' , 'straight_20inch', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-3', 'ow-tf-sqv-0000' , 'leg_holder', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-4', 'ow-tf-sqv-0000' , 'foot_base', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-5', 'ow-tf-sqv-0000' , 'corner_joint', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-6', 'ow-tf-sqv-0000' , 'middle_holder', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-7', 'ow-tf-sqv-0000' , 'screw', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-8', 'ow-tf-sqv-0000' , 'top_straight', 'placeholder.jpeg', 1, 'scanned'),
('ow-tf-part-sqv-10', 'ow-tf-sqv-0000' , 'top_straight', 'placeholder.jpeg', 1, 'scanned');