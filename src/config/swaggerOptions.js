require('dotenv').config();
export default {
  swaggerDefinition: {
    info: {
      description: 'This is a backend server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    security: [
      {
        language: [],
        JWT: [],
      },
    ],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        description: '',
      },
      language: {
        type: 'apiKey',
        in: 'header',
        name: 'Language',
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ['../../api/controllers/**.js'], //Path to the API handle folder
};