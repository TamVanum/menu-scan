CREATE TABLE IF NOT EXISTS estadomenu(
    estado_menu_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

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

CREATE TABLE IF NOT EXISTS estadoalimento(
    estado_alimento_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);
    
CREATE TABLE IF NOT EXISTS estadocategoria(
    estado_categoria_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

CREATE TABLE IF NOT EXISTS Categoria(
    categoria_id int AUTO_INCREMENT PRIMARY KEY,
    menu_id_fk int NOT NULL,
    nombre_categoria varchar(50) NOT NULL,
    foto_categoria varchar(120),
    estado_categoria_id_fk int,
    FOREIGN KEY (menu_id_fk) REFERENCES menu(id_menu),
    FOREIGN KEY (estado_categoria_id_fk) REFERENCES estadocategoria(estado_categoria_id)
);

CREATE TABLE IF NOT EXISTS Alimento(
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