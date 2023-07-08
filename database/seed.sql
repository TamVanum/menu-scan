-- DROP TABLE estadomenu;
CREATE TABLE IF NOT EXISTS estadomenu(
    estado_menu_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

INSERT INTO
    estadomenu (nombre)
VALUES
    ('Habilitado'),
    ('Deshabilitado');

-- DROP TABLE menu;
CREATE TABLE IF NOT EXISTS menu(
    id_menu int PRIMARY KEY AUTO_INCREMENT,
    correo_menu varchar(20) NOT NULL,
    pass_menu varchar(120) NOT NULL,
    nombre_menu varchar(30) NOT NULL,
    logo_menu varchar(300),
    banner_menu varchar(300),
    estado_menu_id_fk int DEFAULT(1),
    FOREIGN KEY (estado_menu_id_fk) REFERENCES estadomenu(estado_menu_id)
);

INSERT INTO
    menu (
        correo_menu,
        pass_menu,
        nombre_menu,
        logo_menu,
        banner_menu
    )
VALUES
    (
        't@gmail.com',
        '123',
        'Cazuelin Bombin',
        '',
        'norte.jpg'
    ),
    (
        't2@gmail.com',
        '123',
        'Sandgucherin Bombin',
        '',
        'bannergenerico.jpg'
    );

-- DROP TABLE estadocategoria;
CREATE TABLE IF NOT EXISTS estadocategoria(
    estado_categoria_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

INSERT INTO
    estadocategoria (nombre)
VALUES
    ('Habilitado'),
    ('Deshabilitado');

-- DROP TABLE estadoalimento;
CREATE TABLE IF NOT EXISTS estadoalimento(
    estado_alimento_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

INSERT INTO
    estadoalimento (nombre)
VALUES
    ('Habilitado'),
    ('Deshabilitado');

-- DROP TABLE categoria;
CREATE TABLE IF NOT EXISTS categoria(
    categoria_id int AUTO_INCREMENT PRIMARY KEY,
    menu_id_fk int NOT NULL,
    nombre_categoria varchar(50) NOT NULL,
    foto_categoria varchar(120),
    estado_categoria_id_fk int,
    FOREIGN KEY (menu_id_fk) REFERENCES menu(id_menu),
    FOREIGN KEY (estado_categoria_id_fk) REFERENCES estadocategoria(estado_categoria_id)
);

INSERT INTO
    categoria (
        menu_id_fk,
        nombre_categoria,
        foto_categoria,
        estado_categoria_id_fk
    )
VALUES
    (1, 'Fondo', '', 1),
    (2, 'Postre', '', 1);

-- DROP TABLE alimento;
CREATE TABLE IF NOT EXISTS alimento(
    alimento_id int AUTO_INCREMENT PRIMARY KEY,
    categoria_id_fk int NOT NULL,
    nombre_alimento varchar(50) NOT NULL,
    foto_alimento varchar(120),
    precio int NOT NULL,
    descripcion varchar(100),
    estado_alimento_id_fk int,
    FOREIGN KEY (categoria_id_fk) REFERENCES categoria(categoria_id),
    FOREIGN KEY (estado_alimento_id_fk) REFERENCES estadoalimento(estado_alimento_id)
);

INSERT INTO
    alimento (
        categoria_id_fk,
        nombre_alimento,
        foto_alimento,
        precio,
        descripcion,
        estado_alimento_id_fk
    )
VALUES
    (
        '1',
        'Casuela',
        '',
        '4000',
        'Lorem Ipsum XD',
        1
    ),
    (
        '1',
        'Pollo',
        '',
        '6000',
        'Lorem Ipsum XD2',
        1
    ),
    (
        '1',
        'Arroz',
        '',
        '7000',
        'Lorem Ipsum XD3',
        1
    ),
    (
        '2',
        'Walame',
        '',
        '20000',
        'Lorem Ipsum XD4',
        1
    );