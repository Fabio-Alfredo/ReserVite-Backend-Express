# 📱 Reservite API

Reservite API es una solución diseñada para facilitar la gestión eficiente de **reservas de asientos en eventos**. Permite a los usuarios:

🎟️ Seleccionar sus asientos  
💳 Realizar pagos seguros mediante **Stripe**  
📩 Recibir confirmaciones automatizadas por correo electrónico

Todo esto optimizando la experiencia tanto para los asistentes como para los organizadores.

Además, la API ofrece funcionalidades como:

- 🛠️ Administración de eventos
- 🪑 Control de disponibilidad de asientos
- 🔄 Actualización en tiempo real de reservas
- ❌ Cancelación de reservas y gestión de reembolsos

🛡️ Para garantizar la seguridad y el control de acceso, Reservite API incorpora **autenticación con JWT** y protección de rutas basada en **roles de usuario**, lo que permite definir distintos niveles de permisos para administradores, organizadores y asistentes.

---

## 📦 Librerías Utilizadas

Este proyecto utiliza las siguientes librerías y herramientas para su funcionamiento:

- **Express** `^4.21.2` – Framework web para Node.js
- **Sequelize** `^6.37.5` – ORM para bases de datos SQL
- **Sequelize-cli** `^6.6.2` – CLI para gestionar modelos y migraciones
- **jsonwebtoken (JWT)** `^9.0.2` – Autenticación y autorización con tokens
- **bcryptjs** `^3.0.2` – Encriptación de contraseñas
- **stripe** `^17.7.0` – Integración con la plataforma de pagos Stripe
- **dotenv** `^16.4.7` – Manejo de variables de entorno
- **cors** `^2.8.5` – Permitir solicitudes entre dominios
- **express-validator** `^7.2.1` – Validación de datos
- **http-errors** `^2.0.0` – Manejo de errores HTTP
- **mysql2** `^3.12.0` – Cliente MySQL para Node.js
- **nodemailer** `^6.10.0` – Envío de correos electrónicos
- **pdfkit** `^0.16.0` – Generación de archivos PDF
- **qrcode** `^1.5.4` – Generación de códigos QR
- **firebase-admin** `^13.2.0` - Integracion con la plataforma de firebase par subir imagenes.
- **express-fileupload** `^1.5.1` - Permite la carga de archivos a traves de formularios.

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente:

### 🟢 Node.js

Necesitarás tener **Node.js** instalado. Puedes descargarlo desde:  
🔗 [https://nodejs.org/es](https://nodejs.org/es)

### 🗃️ MySQL

Este proyecto requiere una base de datos **MySQL** para almacenar la información. Puedes configurarla de dos formas:

- **🚀 Opción 1: Instalar MySQL directamente**

      Puedes instalar MySQL en tu sistema operativo descargándolo desde la página oficial:

      🔗 [Descargar MySQL](https://dev.mysql.com/downloads/installer/)

      Una vez instalado crea una base de datos.

      ```bash
      mysql -u root -p
      CREATE DATABASE eventseat_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
      -- Opcional: crear un usuario y darle permisos
      CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
      GRANT ALL PRIVILEGES ON eventseat_db.* TO 'admin'@'localhost';
      FLUSH PRIVILEGES;
      ```
      2. Configura tu archivo `.env` con los datos de tu db

- **🐳 Opción 2: Dockerizar MySQL**

      Puedes instalar Docker en tu sistema operativo descargándolo desde la página oficial:

      🔗 [Descargar Docker](https://www.docker.com/products/docker-desktop/)

      Una vez instalado crea un contenedor con una imagen de MySQL

      ```bash
          docker run --name eventseat-mysql \
      -e MYSQL_ROOT_PASSWORD=admin123 \
      -e MYSQL_DATABASE=eventseat_db \
      -e MYSQL_USER=admin \
      -e MYSQL_PASSWORD=admin123 \
      -p 3306:3306 \
      -d mysql:8.0
      ```

### 💳 Stripe

planeas usar la integracion de pagos con [Stripe](https://stripe.com/es-us), necesitaras una cuenta de Stripe y una clave secreta para procesar los pagos.

### 📩 Gmail

Para el envio de comprobantes necesitaras contar con una cuente de [Gmail](https://mail.google.com/) valida.

### 🔥 FireBase

Para el manejo de imagenes necesitaras contar con una cuenta de [FireBase](https://console.firebase.google.com) valida.

---
