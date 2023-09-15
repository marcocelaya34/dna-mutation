# DNA Mutation Detector

This Node.js project is a genetic mutation detector based on DNA sequences. It uses algorithms to analyze DNA sequences and determine if you have genetic differences.

## Characteristics

- Detection of genetic mutations in DNA sequences.
- Consultation of DNA statistics with and without mutation, including the ratio.
- Using a NoSQL database in MongoDB Atlas to store data.
- The API is hosted on Google App Engine.
- Swagger-based user interface for easy testing and interaction.
- Test coverage to ensure detector accuracy and reliability.


## Use

If you would like to try the DNA Mutation Detector, you can access the Swagger user interface at the following URL:

[Swagger API Documentation](https://dna-mutation-399019.uc.r.appspot.com/api-docs)

You can also check the project's test coverage at the following URL:

[Coverage Report](https://dna-mutation-399019.uc.r.appspot.com/coverage/lcov-report/index.html)

## URL

The Base URL of this project is this:

[https://dna-mutation-399019.uc.r.appspot.com/](https://dna-mutation-399019.uc.r.appspot.com/)


## Endpoints API

The project includes the following API endpoints:

- **POST → /mutation/**
  
  This endpoint allows detecting genetic mutations in a DNA sequence.

  Without Mutation
   ```cURL
   curl -X 'POST' \
      'https://dna-mutation-399019.uc.r.appspot.com/mutation/' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "dna": [
        "ATGCAA",
        "CAGTGC",
        "TTATGT",
        "AGATGG",
        "CGCCTA",
        "TCACTG"
      ]
    }'
   ```
  With Mutation
  ```cURL
   curl -X 'POST' \
      'https://dna-mutation-399019.uc.r.appspot.com/mutation/' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
      ]
    }'
   ```



- **GET → /stats**

   This endpoint provides statistics on the analyzed DNA sequences.

   ```cURL
   curl --location 'https://dna-mutation-399019.uc.r.appspot.com/stats'
   ```

## Installation and Deployment

To run this project in your local environment, follow these steps:

Clone this repository to your machine:

```bash
git clone https://github.com/marcocelaya34/dna-mutation
```

Navigate to the project directory:

```bash
cd dna-mutation
```

Install the project dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

The application will be available at http://localhost:8080.


# Testing and Coverage
To run the tests locally, use the following command:

```bash
npm test
```

To review test coverage, run the following command:

```bash
npm run coverage
```

## Developer

This project was developed by Marco Antonio Celaya Ordaz as a technical leveling test for Teamknowlogy.