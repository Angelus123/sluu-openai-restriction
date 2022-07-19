import welcome from './welcome.js';

const paths = { ...welcome};

const config = {
  swagger: '2.0',
  info: {
    title: 'Codex API ',
    description: 'This Codex API a project',
    version: '1.0.0',
    contact: {
      name: 'Sluu',
      email: 'slu@gmail.com',
      url: 'localhost:3000/api/v1/api-docs',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },

  schemes: ['HTTP', 'HTTPS'],

  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    ApiKeyAuth: {
      type: 'apiKey',
      name: 'refreshToken',
      in: 'header',
    },
  },

  servers: [
    {
      url: 'http://localhost:3000',
      name: 'DEV',
    },
  ],

  paths,
};

export default config;
