-- Tframe package seeds
INSERT INTO tframe_package(tf_package_id, name, frame_type, supplier, part_qty, photo, status)
VALUES
('ow-tf-sqv-0000', '10x3.3 Frame', 'Square Type - Vertical', 'Backdrop Source', 10, 'placeholder.jpg', 'open'),
('ow-tf-sqv-0001', '10x3.3 Frame', 'Square Type - Horizontal', 'Backdrop Source', 10, 'placeholder.jpg', 'open');

-- tframe parts list seeds
INSERT INTO parts_list(part_id, tf_package_id, description, status)
VALUES 
('ow-tf-part-sqv-1', 'ow-tf-sqv-0000' ,'straight_35inch', 'unscanned'),
('ow-tf-part-sqv-2', 'ow-tf-sqv-0000' , 'straight_20inch', 'unscanned'),
('ow-tf-part-sqv-3', 'ow-tf-sqv-0000' , 'leg_holder', 'unscanned'),
('ow-tf-part-sqv-4', 'ow-tf-sqv-0000' , 'foot_base', 'unscanned'),
('ow-tf-part-sqv-5', 'ow-tf-sqv-0000' , 'corner_joint', 'unscanned'),
('ow-tf-part-sqv-6', 'ow-tf-sqv-0000' , 'middle_holder', 'unscanned'),
('ow-tf-part-sqv-7', 'ow-tf-sqv-0000' , 'screw', 'unscanned'),
('ow-tf-part-sqv-8', 'ow-tf-sqv-0000' , 'top_straight', 'unscanned'),
('ow-tf-part-sqv-9', 'ow-tf-sqv-0001' , 'top_straight', 'unscanned');

INSERT INTO rfid_tags(tag_id, epc_id, status, entity_id, entity_type)
VALUES
('E2806894000040335245D1E9', 'active','ow-tf-sqv-0000','frame'), -- card 1
('E28068940000503414A76DA8', 'active','ow-tf-part-sqv-1','part'), -- tag 1
('E28068940000403414A769A8', 'active','ow-tf-part-sqv-2','part'), -- tag 2
('E28068940000403414A765A8', 'active','ow-tf-part-sqv-3','part'), -- tag 3
('E28068940000503414A761A8', 'active','ow-tf-part-sqv-4','part'), -- tag 4
('E28068940000503414A75DA8', 'active','ow-tf-part-sqv-5','part'), -- tag 5
('E28068940000403414A759A8', 'active','ow-tf-part-sqv-6','part'), -- tag 6
('E28068940000403414A755A8', 'active','ow-tf-part-sqv-7','part'), -- tag 7
('E28068940000503414A751A8', 'active','ow-tf-part-sqv-8','part'), -- tag 8
('E28068940000403414A74DA8', 'active','ow-tf-part-sqv-9','part'), -- tag 9
('E28068940000503414A749A8', 'active','ow-tf-part-sqv-11','part'), -- tag 10











