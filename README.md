# Menu Scan

menus para locales que se abre con qr 

# Instalación

Para crear una base de datos
```bash
docker run --detach --name menu-scan-db --env MARIADB_USER=master --env MARIADB_PASSWORD=master --env MARIADB_ROOT_PASSWORD=master -p 3306:3306 mariadb:latest
```

Para levantar la base de datos
```bash
docker start menu-scan-db
```

Para instalar las dependencias
```bash
npm i
```
