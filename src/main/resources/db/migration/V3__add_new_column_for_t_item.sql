ALTER TABLE item
    ADD COLUMN visible TINYINT(1) AFTER en_lang_type_of_accessory;

UPDATE item
SET visible = 1;

-- ALTER TABLE item
--     ADD COLUMN factory_name VARCHAR(255) AFTER visible;
--
-- UPDATE item
-- SET factory_name = 'По умолчанию';
--
-- ALTER TABLE item
--     ADD COLUMN en_lang_factory_name VARCHAR(255) AFTER visible;
--
-- UPDATE item
-- SET en_lang_factory_name = 'Default';