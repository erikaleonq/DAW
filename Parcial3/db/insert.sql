BEGIN;

INSERT INTO specialty (id, name) VALUES
    (1, 'Medicina General'),
    (2, 'Cardiología'),
    (3, 'Urología'),
    (4, 'Fisiología'),
    (5, 'Pediatría')
    ON CONFLICT (id) DO NOTHING;

INSERT INTO doctor (name, age, email, password, specialty_id) VALUES
    ('Juan Perez', 45, 'juan.perez@gmail.com', '1234', 1),
    ('Maria Lopez', 50, 'maria.lopez@gmail.com', '56299', 2),
    ('Carlos Garcia', 40, 'carlos.garcia@gmail.com', '54564', 3),
    ('Ana Rodriguez', 35, 'ana.rodriguez@gmail.com', '54878', 4),
    ('Luis Martinez', 38, 'luis.martinez@gmail.com', '6546', 5)
    ON CONFLICT (email) DO NOTHING;

INSERT INTO patient (name, age, email, password) VALUES
    ('Paciente Uno', 30, 'paciente1@gmail.com', '6454'),
    ('Paciente Dos', 25, 'paciente2@gmail.com', '32132'),
    ('Paciente Tres', 32, 'paciente3@gmail.com', '897'),
    ('Paciente Cuatro', 28, 'paciente4@gmail.com', '654'),
    ('Paciente Cinco', 40, 'paciente5@gmail.com', '65456'),
    ('Paciente Seis', 45, 'paciente6@gmail.com', '321'),
    ('Paciente Siete', 50, 'paciente7@gmail.com', '9819'),
    ('Paciente Ocho', 60, 'paciente8@gmail.com', '9859'),
    ('Paciente Nueve', 35, 'paciente9@gmail.com', '855'),
    ('Paciente Diez', 29, 'paciente10@gmail.com', '654')
    ON CONFLICT (email) DO NOTHING;

COMMIT;