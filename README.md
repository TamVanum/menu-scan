# Menu Scan

menus para locales que se abre con qr 

# Instalación

Para crear una base de datos
```bash
docker run --detach --name menu-scan-db --env MARIADB_USER=master --env MARIADB_PASSWORD=master --env MARIADB_ROOT_PASSWORD=master --env MARIADB_DATABASE=qr_menu -p 3306:3306 mariadb:latest
```

Para levantar la base de datos
```bash
docker start menu-scan-db
```

Para instalar las dependencias
```bash
npm i
```

Crea un archivo `.env` en la raiz para guardar las credenciales secretas
```bash
touch .env
echo 'export DB_HOST="localhost"' >> .env
echo 'export DB_USER="root"' >> .env
echo 'export DB_PASSWORD=""' >> .env
echo 'export DB_NAME="qr_menu"' >> .env
```

# Uso

Iniciar servidor de desarrollo
```bash
npm run dev
```

Iniciar los test
```bash
npm test
```
