const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0"
});

const doc = {
  info: {
    title: "Flipkart Grid NFT (Backend API)",
    description: "Flipkart Grid NFT Backend"
  },
  servers: [
    {
      url: `http://localhost:5000`,
      description: "Development API"
    }
  ],
  schemes: ["https"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  },
  security: [{ bearerAuth: [] }]
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

module.exports = () => swaggerAutogen(outputFile, endpointsFiles, doc);
