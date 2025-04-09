# Platzi Exchange

Platzi Exchange es una aplicación web desarrollada con Vue.js que permite consultar las cotizaciones de las criptomonedas más importantes utilizando la API REST de CoinCap.

## Características

- Visualización de las principales criptomonedas con su precio, capitalización de mercado y variación en las últimas 24 horas.
- Detalles de cada criptomoneda, incluyendo su historial de precios y mercados disponibles.
- Conversor de monedas entre USD y la criptomoneda seleccionada.
- Gráficos interactivos para visualizar el historial de precios.
- Diseño responsivo utilizando TailwindCSS.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/platzi-exchange.git
   cd platzi-exchange
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Scripts disponibles

### Compilar y recargar en caliente para desarrollo

```bash
npm run serve
```

### Compilar y minificar para producción

```bash
npm run build
```

### Lint y corrección de errores en los archivos

```bash
npm run lint
```

## Configuración adicional

Este proyecto utiliza TailwindCSS para el diseño y está configurado con ESLint y Prettier para mantener un código limpio y consistente. Puedes personalizar estas configuraciones en los archivos `.eslintrc.js` y `.prettierrc.js`.

## Estructura del proyecto

```plaintext
src/
├── assets/         # Recursos estáticos como imágenes y estilos
├── components/     # Componentes reutilizables de Vue
├── views/          # Vistas principales de la aplicación
├── api.js          # Funciones para interactuar con la API de CoinCap
├── filters.js      # Filtros personalizados para formatear datos
├── main.js         # Punto de entrada principal de la aplicación
├── router.js       # Configuración de las rutas de Vue Router
```

## Créditos

Este proyecto fue desarrollado como parte del curso de Vue.js Básico de Platzi.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.