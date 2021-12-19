import { Options } from "express-jsdoc-swagger";

export const SwaggerOptions: Options = {
  info: {
    version: '1.0.0',
    title: 'Donnie\'s Api',
    license: {
      name: 'MIT',
    },
  },

  security: {
    "BearerAuth": {
      "type": "http",
      "scheme": "bearer"
    }
  },

  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: '../../**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
};