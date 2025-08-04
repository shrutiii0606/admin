import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lalades Admin API',
      version: '1.0.0',
      description: 'API documentation for the Lalades Admin Panel',
    },
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts', './src/models/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
