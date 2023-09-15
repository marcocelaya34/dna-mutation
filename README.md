# Detector de Mutaciones de ADN

Este proyecto en Node.js es un detector de mutaciones genéticas basado en secuencias de ADN. Utiliza algoritmos para analizar secuencias de ADN y determinar si tiene diferencias genéticas.

## Características

- Detección de mutaciones genéticas en secuencias de ADN.
- Uso de una base de datos NoSQL en MongoDB Atlas para almacenar datos.
- La API está hosteada en Google App Engine.
- Interfaz de usuario basada en Swagger para facilitar las pruebas y la interacción.
- Cobertura de pruebas para garantizar la precisión y fiabilidad del detector.
- Consulta de estadísticas de ADN con y sin mutación, incluyendo el ratio.


## Uso

Si deseas probar el detector de mutaciones de ADN, puedes acceder a la interfaz de usuario de Swagger en el siguiente URL:

[Swagger API Documentation](http://dna-mutation-399019.uc.r.appspot.com/api-docs)

También puedes verificar la cobertura de pruebas del proyecto en el siguiente URL:

[Coverage Report](http://dna-mutation-399019.uc.r.appspot.com/coverage/lcov-report/index.html)

## URL

La URL Base de este proyecto es esta:

[http://dna-mutation-399019.uc.r.appspot.com/](http://dna-mutation-399019.uc.r.appspot.com/)


## Endpoints API

El proyecto incluye los siguientes endpoints API:

- **POST → /mutation/**

  ```json
  {
    "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
  }
  ```

  Este endpoint permite detectar mutaciones genéticas en una secuencia de ADN.

- **GET → /stats**

  Este endpoint proporciona estadísticas sobre las secuencias de ADN analizadas.

## Instalación y Despliegue

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

Clona este repositorio en tu máquina:

```bash
git clone https://github.com/marcocelaya34/dna-mutation
```

Navega al directorio del proyecto:

```bash
cd dna-mutation
```

Instala las dependencias del proyecto:

```bash
npm install
```

Inicia la aplicación:

```bash
npm start
```

La aplicación estará disponible en http://localhost:8080.


# Pruebas y Cobertura
Para ejecutar las pruebas en local, usa el siguiente comando:

```bash
npm test
```

Para revisar la cobertura de pruebas, corre el siguiente comando:

```bash
npm run coverage
```

## Desarrollador

Este proyecto fue desarrollado por Marco Antonio Celaya Ordaz como prueba técnica de nivelación para Teamknowlogy.
