# 📚 Personal Library

## 🔹 Descripción

Personal Library es una aplicación para gestionar y organizar tus libros de lectura. Puedes añadir libros, actualizarlos, moverlos entre estados y eliminarlos. Además, cuenta con un buscador en tiempo real y una paginación optimizada para separar los libros por estado.

## 🔹 Requisitos

* Ruby 3.2+
* Rails 7+
* Node.js 18+
* PostgreSQL

## 🔹 Instalación

### ➡️ Backend

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/martinmt-mx/personal-library.git
   cd personal-library/backend
   ```

2. Instalar las dependencias:

   ```bash
   bundle install
   ```

3. Crear y migrar la base de datos:

   ```bash
   rails db:create
   rails db:migrate
   ```

4. Levantar el servidor:

   ```bash
   rails s
   ```

   La API estará disponible en: `http://localhost:3000`

### ➡️ Frontend

1. Navegar a la carpeta del frontend:

   ```bash
   cd ../frontend
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en: `http://localhost:5173`

## 🔹 Uso

### ➡️ Añadir un libro

* Completar el formulario de la sección superior y presionar "Add Book".

### ➡️ Editar un libro

* Hacer clic en el título del libro en cualquiera de las columnas para abrir el modal.
* Editar la información y presionar "💾 Save Changes".

### ➡️ Eliminar un libro

* Hacer clic en el icono ❌ en el dropdown de búsqueda o en la lista principal.

### ➡️ Búsqueda de libros

* Escribir el título o autor en la barra de búsqueda para encontrarlo rápidamente.

### ➡️ Paginación

* En cada columna puedes presionar "Cargar más" para traer más libros del servidor.

## 🔹 Estructura del proyecto

```
project-root
│
├── backend
│   ├── app
│   ├── config
│   ├── db
│   ├── graphql
│   └── ...
│
└── frontend
    ├── src
    │   ├── components
    │   ├── store
    │   ├── pages
    │   └── ...
    └── public
```

## 🔹 Ramas del proyecto

* `feature/book-details-modal`: Visualización del modal al hacer clic.
* `feature/book-form`: Formulario básico para añadir un libro.
* `feature/book-form-rating`: Formulario para añadir un libro con rating.
* `feature/book-modal-edit`: Edición directa en el modal.
* `feature/book-model`: Creación del modelo `Book` en el backend.
* `feature/book-status-columns`: Columnas separadas por estado.
* `feature/delete-book`: Eliminación de libros.
* `feature/documentation`: Documentación del proyecto.
* `feature/frontend-vite`: Configuración inicial del frontend.
* `feature/notifications-and-spinner`: Notificaciones y spinner de carga.
* `feature/pagination`: Paginación en el backend.
* `feature/redux-integration`: Integración de Redux.
* `feature/refresh-book-list`: Actualización en tiempo real de la lista.
* `feature/search-books`: Implementación del buscador en tiempo real.

## 🔹 Contribuciones

1. Crear una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
2. Realizar los cambios y hacer commit:

   ```bash
   git add .
   git commit -m "Nueva funcionalidad implementada"
   ```
3. Subir la rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```
4. Crear un Pull Request en GitHub.

## 🔹 Licencia

MIT License
