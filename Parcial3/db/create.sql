BEGIN;

CREATE TABLE IF NOT EXISTS specialty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Crear la tabla de doctores
CREATE TABLE IF NOT EXISTS doctor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    specialty_id INT REFERENCES specialty(id)
);

-- Crear la tabla de pacientes
CREATE TABLE IF NOT EXISTS patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Crear la tabla de citas médicas
CREATE TABLE IF NOT EXISTS medicalappointment (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    patient_id INT REFERENCES patient(id),
    doctor_id INT REFERENCES doctor(id),
    UNIQUE (doctor_id, date, hour),
    UNIQUE (patient_id, date, hour)
);

COMMIT;