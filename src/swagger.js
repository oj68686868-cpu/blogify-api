const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User CRUD API",
            version: "1.0.0",
            description: "Production Ready CRUD API with Swagger Documentation",
        },
        servers: [
            {
                url: "http://localhost:8010",
                description: "Local Server",
            },
        ],

    },
    apis: ["./src/routes/*.js"]


};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
