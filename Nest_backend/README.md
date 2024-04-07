# Project Structure

This document outlines the folder structure for our NestJS applications.

- `src`: This directory contains all the source code for the application.
  - `app.module.ts`: The root module of the application.
  - `auth`: Contains all authentication-related logic, controllers, services, decorators, DTOs (Data Transfer Objects), and guards.
  - `config`: Configuration settings, including database and other services like Firebase.
  - `interface`: TypeScript interfaces used throughout the application.
  - `main.ts`: Entry file of the application which uses NestFactory to create a Nest application instance.
  - `middleware`: Custom middleware, including strategies for JWT authentication.
  - `modules`: Application features are modularized here, such as the user module.
  - `shared`: Shared components like filters, interceptors, and pipes.
  - `typings`: Custom TypeScript type definitions.
  - `utils`: Utility classes and functions.
- `tsconfig.build.json` & `tsconfig.json`: TypeScript compiler configuration files.
- `nest-cli.json`: Configuration file for the Nest CLI.
- `package.json` & `package-lock.json`: NPM configuration files listing the project dependencies and locking their versions.
- `README.md`: The markdown file providing an overview of the project, setup instructions, and other essential information.

.
├── src
│ ├── app.module.ts
│ ├── auth
│ │ ├── auth.controller.ts
│ │ ├── auth.module.ts
│ │ ├── auth.service.ts
│ │ ├── decorators
│ │ │ └── setmetadata.decorator.ts
│ │ ├── dtos
│ │ │ └── auth.dto.ts
│ │ └── guards
│ │ └── jwt-auth.guard.ts
│ ├── config
│ │ └── database
│ │ │ ├── database.module.ts
│ │ │ └── database.service.ts
│ │ └── firebase
│ ├── interface
│ │ └── index.interface.ts
│ ├── main.ts
│ ├── middleware
│ │ ├── index.middleware.ts
│ │ └── jwt.strategy.ts
│ ├── modules
│ │ └── user
│ │ ├── dto
│ │ │ ├── create.dto.ts
│ │ │ ├── index.dto.ts
│ │ │ ├── multiple.search.dto.ts
│ │ │ ├── response.dto.ts
│ │ │ └── update.dto.ts
│ │ ├── schema
│ │ │ └── user.schema.ts
│ │ ├── user.controller.ts
│ │ ├── user.module.ts
│ │ └── user.service.ts
│ ├── shared
│ │ ├── filters
│ │ │ └── index.filter.ts
│ │ ├── interceptors
│ │ │ └── index.interceptor.ts
│ │ └── pipes
│ │ └── index.pipe.ts
│ ├── typings
│ │ └── index.types.ts
│ └── utils
│ ├── Http500.ts
│ ├── index.utils.ts
│ ├── no-generator-utils.ts
│ └── sendgrid.utils.ts
├── tsconfig.build.json
├── tsconfig.json
├── nest-cli.json
├── package.json
├── package-lock.json
└── README.md
