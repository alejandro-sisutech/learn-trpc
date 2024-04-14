# tRPC

tRPC allows you to easily build and consume fully typesafe APIs without schemas or code generation. (Without API contracts)

### Definitions:

RPC: Remote Procedure Call → Call functions instead of endpoints.

tRPC: Typescript Remote Procedure Call. Implementation of RPC in typescript.

### tRPC :

If you want to document an API, you will need to generate a schema (for example OpenAPI schemas).

**What TRPC does is:** You write functions on your backend and the types are inferred by typescript on the client. It removes the need to have an API schema. Because typescript does that.

**When to use it:** With private APIs, that are not going to be shared.

**When not to use it:** Not using typescript or building a public API.

If you want to use it with a public API you can generate the OpenApi Schema from the tRPC code (https://www.npmjs.com/package/trpc-openapi)

### Interesting pages:

- Some useful concepts: https://trpc.io/docs/concepts
- Routers: https://trpc.io/docs/server/routers
- Procedures: https://trpc.io/docs/server/procedures
- Context: https://trpc.io/docs/server/context
- Middleware: https://trpc.io/docs/server/middlewares
