BEGIN;

-- Crear un nuevo usuario
CREATE USER app_user WITH PASSWORD 'abcd';

-- Otorgar permisos al nuevo usuario
GRANT CONNECT ON DATABASE fondoideas TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Para que los permisos se apliquen automáticamente a futuras tablas/secuencias
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO app_user;

COMMIT;
