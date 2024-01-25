ALTER TABLE item
    ADD COLUMN factory_name VARCHAR(255) AFTER visible;

UPDATE item
SET factory_name = 'По умолчанию';

