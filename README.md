# 🎀 Sweet Store 🎀

## Descripción
Sweet Store es una tienda online de productos dulces que utiliza una API pública para mostrar productos dinámicamente. Incluye funcionalidades como filtrado por precio o categoría, carrito de compras con almacenamiento en localStorage, y una interfaz interactiva con eventos y botones para mejorar la experiencia del usuario.

## Estructura del proyecto

PROJECT_JS-1
│
├── CSS
│   └── style.css             
│
├── HTML
│   ├── category.html         
│   ├── collection.html       
│   ├── filtered-products.html
│   ├── index.html            
│   └── jewelery.html         
│
├── ICONS                    
├── IMG                     
│
├── JS
│   ├── app.js               
│   └── filtered-products.js 
│
└── README.md                


## Funcionalidades principales

- **Carga dinámica de productos** mediante la API [FakeStoreAPI](https://fakestoreapi.com/).
- **Filtrado** de productos por precio (mayor o menor).
- **Carrito de compras** con:
  - Añadir productos
  - Eliminar productos
  - Vaciar carrito
  - Cantidad de productos mostrada en un badge
  - Guardado y persistencia usando `localStorage`
- **Eventos** en botones para interacción del usuario (alertas, navegación, abrir/cerrar carrito).
- **Interfaz responsive** y amigable para el usuario.

## Cómo usar

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en un navegador web.
3. Navega por las diferentes páginas y usa los filtros para ver productos.
4. Agrega productos al carrito y revisa la persistencia del mismo incluso recargando la página.

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript 
- API REST externa (FakeStoreAPI)
- `localStorage` para almacenamiento local

## Autor

[Dayana](https://github.com/Dayana196)

---

¡Gracias por visitar Sweet Store! 🎉


