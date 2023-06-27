CREATE TABLE estadoalimento(
    estado_alimento_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);
    
CREATE TABLE estadocategoria(
    estado_categoria_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

CREATE TABLE estadomenu(
    estado_menu_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

CREATE TABLE Categoria(
    categoria_id int AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria varchar(50) NOT NULL,
    foto_categoria varchar(120),
    estado_categoria_id_fk int,
    menu_id_fk int not null,
    FOREIGN KEY (estado_categoria_id_fk) REFERENCES estadocategoria(estado_categoria_id)
    );

CREATE TABLE menu(
	id_menu int PRIMARY KEY AUTO_INCREMENT,
    correo_menu varchar(20) NOT NULL,
    pass_menu varchar(120) NOT NULL,
    nombre_menu varchar(30) NOT NULL,
    logo_menu varchar(300),
    banner_menu varchar(300),
    estado_menu_id_fk int,
    FOREIGN KEY (estado_menu_id_fk) REFERENCES estadomenu(estado_menu_id)
);

CREATE TABLE Alimento(
    alimento_id int AUTO_INCREMENT PRIMARY KEY,
    menu_id_fk int NOT NULL,
    categoria_id_fk int NOT NULL,
    nombre_alimento varchar(50) NOT NULL,
    foto_alimento varchar(120),
    precio int NOT NULL,
    descripcion varchar(100),
    estado_alimento_id_fk int,
    FOREIGN KEY (menu_id_fk) REFERENCES menu(id_menu),
    FOREIGN KEY (categoria_id_fk) REFERENCES categoria(categoria_id),
    FOREIGN KEY (estado_alimento_id_fk) REFERENCES estadoalimento(estado_alimento_id)
    );


INSERT INTO estadocategoria VALUES (NULL, 'Habilitado');
INSERT INTO estadocategoria VALUES (NULL, 'Deshabilitado');
    
INSERT INTO estadoalimento VALUES (NULL, 'Habilitado');
INSERT INTO estadoalimento VALUES (NULL, 'Deshabilitado');

INSERT INTO estadomenu VALUES (NULL, 'Habilitado');
INSERT INTO estadomenu VALUES (NULL, 'Deshabilitado');
    
INSERT INTO categoria VALUES (NULL, 'Fondo', '', 1);
INSERT INTO categoria VALUES (NULL, 'Postre', '', 1);

INSERT INTO menu VALUES (NULL, 't@gmail.com','123' , 'Cazuelin Bombin', '', 'norte.jpg', 1);
INSERT INTO menu VALUES (NULL, 't2@gmail.com','123' , 'Sandgucherin Bombin', '', 'bannergenerico.jpg', 1);

INSERT INTO alimento VALUES (NULL, '1','1' , 'Casuela', '', '4000', 'Lorem Ipsum XD', 1);
INSERT INTO alimento VALUES (NULL, '1','1', 'Pollo', '', '6000', 'Lorem Ipsum XD2', 1);
INSERT INTO alimento VALUES (NULL, '1','1', 'Arroz', '', '7000', 'Lorem Ipsum XD3', 1);
INSERT INTO alimento VALUES (NULL, '1','2', 'Walame', '', '20000', 'Lorem Ipsum XD4', 1);



--------------------------



CREATE TABLE estadoalimento(
    estado_alimento_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);
    
CREATE TABLE estadocategoria(
    estado_categoria_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);

CREATE TABLE estadomenu(
    estado_menu_id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);



CREATE TABLE menu(
	id_menu int PRIMARY KEY AUTO_INCREMENT,
    correo_menu varchar(20) NOT NULL,
    pass_menu varchar(120) NOT NULL,
    nombre_menu varchar(30) NOT NULL,
    logo_menu varchar(300),
    banner_menu varchar(300),
    estado_menu_id_fk int,
    FOREIGN KEY (estado_menu_id_fk) REFERENCES estadomenu(estado_menu_id)
);

CREATE TABLE Categoria(
   	categoria_id int AUTO_INCREMENT PRIMARY KEY,
    menu_id_fk int NOT NULL,
    nombre_categoria varchar(50) NOT NULL,
    foto_categoria varchar(120),
    estado_categoria_id_fk int,
    FOREIGN KEY (menu_id_fk) REFERENCES menu(id_menu),
    FOREIGN KEY (estado_categoria_id_fk) REFERENCES estadocategoria(estado_categoria_id)
    );

CREATE TABLE Alimento(
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