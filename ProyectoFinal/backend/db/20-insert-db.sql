BEGIN;

INSERT INTO users (full_name, email, password, telefono, role)
VALUES 
('Carlos Martínez', 'carlos.martinez@example.com', 'password123', '5551234567', 'emprendedor'),
('Ana López', 'ana.lopez@example.com', 'securepassword', '5557654321', 'inversionista'),
('Jorge González', 'jorge.gonzalez@example.com', 'mypassword', '5559876543', 'emprendedor'),
('admin', 'admin@example.com', 'admin', '5559876543', 'admin'),
('María Pérez', 'maria.perez@example.com', 'anotherpassword', '5553216789', 'inversionista');

-- Insertar proyectos
INSERT INTO proyectos (id_emprendedor, nombre_proyecto, descripcion, url_logo, categorias, redes)
VALUES
(1, 'EcoEmprende', 'Plataforma para fomentar el reciclaje y la conciencia ecológica.', 'https://i.pinimg.com/1200x/d8/56/55/d856557fcac0cfd98c5c2ad6ac15078c.jpg', 
ARRAY['ecología', 'reciclaje'], ARRAY['https://facebook.com/ecoemprende', 'https://twitter.com/ecoemprende']),
(3, 'Tech4All', 'Startup para brindar tecnología asequible en comunidades rurales.', 'https://images.scalebranding.com/green-eco-tech-logo-ffa5c99c-d795-4b63-85ca-9dba49e48c6e.jpg', 
ARRAY['tecnología', 'social'], ARRAY['https://linkedin.com/company/tech4all']),
(1, 'GreenMarket', 'Marketplace de productos orgánicos y ecológicos.', 'https://greenmarket.fi/cdn/shop/files/Round_taustalla_2240x.png?v=1703887532', 
ARRAY['orgánico', 'comercio'], ARRAY['https://instagram.com/greenmarket']),
(2, 'AgroSmart', 'Aplicación para optimizar cultivos mediante datos e inteligencia artificial.', 'https://www.creativefabrica.com/wp-content/uploads/2018/12/Tractor-Logo-by-meisuseno.jpg', 
ARRAY['agricultura', 'tecnología'], ARRAY['https://facebook.com/agrosmart', 'https://twitter.com/agrosmart']),
(4, 'EduConnect', 'Plataforma educativa para conectar estudiantes con tutores expertos.', 'https://static.vecteezy.com/system/resources/previews/022/868/988/non_2x/open-book-logo-education-flat-design-vector.jpg', 
ARRAY['educación', 'tecnología'], ARRAY['https://linkedin.com/company/educonnect', 'https://instagram.com/educonnect']),
(2, 'SolarPower+', 'Iniciativa para instalar paneles solares en comunidades vulnerables.', 'https://media.istockphoto.com/id/1158571608/vector/solar-panel-logo-vector.jpg?s=612x612&w=0&k=20&c=0LwgOEX9CathKI8GDyFnmQOvTo5DisNvdeV1JjyVCTA=',
ARRAY['energía', 'sostenibilidad'], ARRAY['https://facebook.com/solarpowerplus']),
(5, 'BioHealth', 'Startup de productos de cuidado personal hechos con ingredientes naturales.', 'https://static.vecteezy.com/system/resources/previews/007/126/663/non_2x/nature-leaves-logo-vector.jpg', 
ARRAY['salud', 'orgánico'], ARRAY['https://instagram.com/biohealth']),
(3, 'RuralNet', 'Red de internet de bajo costo para zonas rurales.', 'https://static.vecteezy.com/system/resources/thumbnails/003/529/435/small_2x/internet-logo-icon-illustration-vector.jpg', 
ARRAY['tecnología', 'comunicación'], ARRAY['https://twitter.com/ruralnet']),
(3, 'ArtisansHub', 'Marketplace para productos artesanales y locales.', 'https://static.vecteezy.com/system/resources/previews/020/649/802/non_2x/sewing-needle-icon-needle-thread-illustration-sign-sewing-symbol-seamstress-logo-vector.jpg', 
ARRAY['artesanía', 'comercio'], ARRAY['https://facebook.com/artisanshub', 'https://instagram.com/artisanshub']),
(5, 'GreenTransport', 'Sistema de transporte urbano basado en vehículos eléctricos compartidos.', 'https://i.pinimg.com/736x/52/ad/a1/52ada1e417cae1a67dc82d5ab0f30771.jpg', 
ARRAY['movilidad', 'ecología'], ARRAY['https://linkedin.com/company/greentransport', 'https://twitter.com/greentransport']);

-- Insertar proyectos seguidos
INSERT INTO proyectos_seguidos (id_usuario, id_proyecto)
VALUES
(2, 1), -- Ana López sigue el proyecto EcoEmprende
(4, 1), -- María Pérez sigue el proyecto EcoEmprende
(2, 2), -- Ana López sigue el proyecto Tech4All
(4, 3); -- María Pérez sigue el proyecto GreenMarket

COMMIT;