BEGIN;

INSERT INTO users (full_name, email, password, telefono, role)
VALUES 
('Carlos Martínez', 'carlos.martinez@example.com', 'password123', '5551234567', 'emprendedor'),
('Ana López', 'ana.lopez@example.com', 'securepassword', '5557654321', 'inversionista'),
('Jorge González', 'jorge.gonzalez@example.com', 'mypassword', '5559876543', 'emprendedor'),
('María Pérez', 'maria.perez@example.com', 'anotherpassword', '5553216789', 'inversionista');

-- Insertar proyectos
INSERT INTO proyectos (id_emprendedor, nombre_proyecto, descripcion, url_logo, categorias, redes)
VALUES
(1, 'EcoEmprende', 'Plataforma para fomentar el reciclaje y la conciencia ecológica.', 'https://example.com/logo1.png', ARRAY['ecología', 'reciclaje'], ARRAY['https://facebook.com/ecoemprende', 'https://twitter.com/ecoemprende']),
(3, 'Tech4All', 'Startup para brindar tecnología asequible en comunidades rurales.', 'https://example.com/logo2.png', ARRAY['tecnología', 'social'], ARRAY['https://linkedin.com/company/tech4all']),
(1, 'GreenMarket', 'Marketplace de productos orgánicos y ecológicos.', 'https://example.com/logo3.png', ARRAY['orgánico', 'comercio'], ARRAY['https://instagram.com/greenmarket']);

-- Insertar proyectos seguidos
INSERT INTO proyectos_seguidos (id_usuario, id_proyecto)
VALUES
(2, 1), -- Ana López sigue el proyecto EcoEmprende
(4, 1), -- María Pérez sigue el proyecto EcoEmprende
(2, 2), -- Ana López sigue el proyecto Tech4All
(4, 3); -- María Pérez sigue el proyecto GreenMarket

COMMIT;