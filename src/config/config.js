import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    port: process.env.PORT,
    sendgridAPIKey: process.env.SENGRID_API_KEY,
    senderEmail: process.env.SENDER_EMAIL,
    hashPassNum:process.env.HASH_PASSWORD_SALT,
    type: "service_account",
    project_id: "t-computer-351217",
    private_key_id: "801a463c770d3260f103b001849cf39acc0f9798",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3sqJXEcuvkk3+\nRartczeljvYks+8IZLiVU3W0zQmcl8FuabBIJzCidHZUzEF0+lH8ebrHHjwltP8s\njWNTYU6eDf1L2/djcwI3op1FIUUjUGbA+xHFeOIjvbV4bunnKUvTQEf35SNchRvF\nplOhtEEVo2uyzgDLaUfVOAl48ijWc7VKzCPXFiAmBIFr7H2NHfEFJiYNIdfU9soU\nMBmMRK/3dF8GhFlkCpxM7afvycWrTZtj1/Kc6IXiVnnoHAt4xx98YY+CBva+TkmC\nkW2rzJHsstAdrwAjhxFXquSbcRGaYGkQ2JncC6TCss5QCOIGa55ijw9xqf06S27A\nYjIgVKr9AgMBAAECggEABcFc6oTXtvX+AV5WA+xNGeyxoIyOPvSTTFAAZMkOj1Xs\npqFwEPdzw7s8+kL2Az/ufqfWGfP3QKhiXRdG8K9Tr71sQ+RHfkAPTNMiKBU23dIT\nwUfi31pLHefAZKtEIwAKH9T1P3qLeGDnpSWLaQpFOcDUS7AkzTqzGFnFNJr3SMfr\nF1xJo5509vtC2OxsMbIRdb3mlVGK1SGnyI8aFr46Y5DM9B4XtNAroi+QO2lSmZqV\nzzDdiEWU3J0RL4aVHzWvKWrMGrri/NeCkdtdXYr+zGiv7Gvj6L22W25X+fIKSzOO\nnU30DI/sK4sXzuYxI3tvH6G/iyLMEZUs4tyzx0nOEQKBgQDZzFJV5fV0w/xFMNL+\nd/jtHXDfj/4PTsh5kuqwX92IO1yh5lOmTmY9F7Fu62g3Av8nimn/IBMwYSwVnUQA\ng557AE8U5p9czDEthSUU2A/6c32Ry7QoO57Vy1qlESX0uebRaPi0xDru81YOiZ3y\nbNe1ctpKNX/L6bsUBhIQHYfDNQKBgQDX6x9NHKpaSbq1Ee9UDd490QWQfrHvHXQV\nAdPpPIWI+93S4TKN5H9GSlfvr16GsyFa54Vsy0dSg05y1KQrzHNqQpndBiEubtQo\nv6D7pG0xJnYfGZYpoMN6WuqMR80Iv62xbm1icRNIq/VimssIU5/tl1A71IDEnGyw\nJuvABAY5qQKBgQCViNcu6sfv92+JAdCbrjtWcVRB6lcAo5K5Bcnkdq1fD4K2FbFx\nCXrgjxffk/jlbEVLHJlR9O+307+0x1kdEUEKKlghfYYE7J0HJ9chzIaL6idYpod2\n6BhRqWD+3Bs3Pzveoze+xMvBq4h2Sr4K5/fiOIzvTnQDyOINCW31apD/0QKBgQCC\n/ypZbWfJKWw2SPBLrbJFDNh0ZvlrGhKAYECCA+78Qdq+A1TZk2TIb3hUebA+xtUY\nwthHPjlCTVm9/1avH/Zx5IBXAU4GTsU3B7QSmBqLNEt76Nka3mdah2g/vZwej7RA\nrr98dx/8+h8BOOqvXZTs392UvwN0xXaHlMV5FLf2KQKBgAoEhhAw6J+T/GZoSziD\nNiFOuP31+Dd9OOfkA7UCkZfDwYSTOhXp+EVYSI6iYcoTJE6NUgOA/pY3XPeQonUa\nmmya6uJy1ArSCtyDQMTp9SNglP8S/C/Dh9y1/CB3RgTT4o8Z4kOZyaaaj5mwnnk5\nZTOhaAdvskcNPS44J9y1fBdv\n-----END PRIVATE KEY-----\n",
    client_email: "speechtotext@t-computer-351217.iam.gserviceaccount.com",
    client_id: "107613649046912105717",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/speechtotext%40t-computer-351217.iam.gserviceaccount.com"
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.TEST_URL,
    dialect: 'postgres',
    port: process.env.PORT,
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.PROD_URL,
    dialect: 'postgres',
    port: process.env.PORT,
   
  }
};
