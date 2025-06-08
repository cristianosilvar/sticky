import swaggerJSDoc from "swagger-jsdoc";

export const swaggerConfig = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sticky",
      version: "1.0.0",
      description: "Documentação da API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["**/controllers/**/*.ts", "**/routes/**/*.ts"],
});
