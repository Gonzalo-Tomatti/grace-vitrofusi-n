Grace Vitrofusión.

https://grace-vitrofusion.netlify.app/

Esta página simula un e-commerce dedicado a la venta de artículos de vitrofusión (objetos decorativos hechos con vidrio).

Cuenta con 12 categorías mostradas en el menú principal. Al entrar a cada una se pueden recorrer todas las fotos pertenecientes a la categoría elegida.
Al hacer click en una foto, se abre con el tamaño original y tiene opciones para pasar a la imagen siguiente o anterior.

En el navbar hay una sección para leer sobre la artista que realizó todo el trabajo en las fotos.

Para realizar una consulta se puede ir a la sección de contacto y usar el form que allí se encuentra.

Para realizar una compra se debe registrar o iniciar sesión si ya se tiene una cuenta. Una vez logeado se pueden agregar artículos al carrito. Si se abre el carrito se muestran los artículos añadidos y la opción de realizar compra.

Cuando se clickea en realizar compra se piden datos como el número de tarjeta y dirección del usuario. Una vez completados se muestran todos los detalles y se habilita la opción de comprar.

Al comprar se muestra el historial de compras del usuario, al que también se puede acceder desde el navbar.

Por último se encuentra la opción de cerrar sesión una vez logeado.

Los elementos del carrito y el usuario que se encuentra logeado se guardan en local storage.
Todos los usuarios y sus compras se almacenan en una base de datos de MongoDB a la que se le hacen requests con axios para guardar y traer datos.

La página utiliza Html5, Css3, Bootstrap y Javascript con la librería React.js para el frontend. Para el funcionamiento del form en la sección de Contacto se implementó EmailJs.
Para el backend utiliza NodeJs con el framework Express y MongoDB para la base de datos.
Para correrla después de clonar el repositorio (si se tiene npm instalado) utilizar el comando 'npm install', lo que instalará las dependencias necesarias, y luego 'npm start' para ejecutarla.
