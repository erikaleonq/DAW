BEGIN;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(10),
    role VARCHAR(50) CHECK (role IN ('inversionista', 'emprendedor', 'admin')) NOT NULL
);

CREATE TABLE proyectos (
    id_proyecto SERIAL PRIMARY KEY,
    id_emprendedor INT NOT NULL,
    nombre_proyecto VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    url_logo  VARCHAR(255),
    fecha_publi TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    categorias TEXT[],
    redes TEXT[],
    FOREIGN KEY (id_emprendedor) REFERENCES users (id) ON DELETE CASCADE

);

CREATE TABLE proyectos_seguidos (
    id_seguimiento SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_proyecto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos (id_proyecto) ON DELETE CASCADE
);

COMMIT;