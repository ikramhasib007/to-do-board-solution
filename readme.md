# To-do Board Solution
# Ikram Ud Daula

## API Engine
- Make sure you have installed PostgreSQL in your machine at `5432` port
- Before starting API Engine, you need to create an env file at `config/` location named `dev.env` for development server, `test.env` for test. sample file are given in desired location.
- I used [pnpm](https://pnpm.io/) instead of `npm`

```
cd api-engine && pnpm install
pnpm migrate
```

Sample 
- `config/dev.env` or `config/prod.env` for production
```
HTTP_PORT=5001
DATABASE_URL="postgresql://postgres:1234@localhost:5432/todo?schema=public"
JWT_SECRET=moPhVS3jytJKDQGLAFNvEuNZtTFErMiw
CORS=http://localhost:5000
```

- `config/test.env`
```
HTTP_PORT=5001
DATABASE_URL="postgresql://postgres:1234@localhost:5432/todo?schema=test"
JWT_SECRET=c7M4Ib6A1JHcLJvzB3s251vlSMYQ3L5W
CORS=http://localhost:5000
```

API development server start:
```
pnpm dev
```
- I have write 60 tests cases for API server
- API server are developed using `Node.js` and `GraphQL`
- [yoga-server](https://the-guild.dev/graphql/yoga-server/docs)
- [prisma](https://www.prisma.io/docs/getting-started) as ORM

Tests API server
```
pnpm migrate:test
pnpm test
pnpm test:e2e
```

Then go the url at `http://localhost:5001/graphql`

## Client

- Client site development by `Next.js` with [Apollo Client](https://www.apollographql.com/docs/react)

- Before serving the Client site make sure you have created `.env.development.local` for development and `.env.production.local` for production release.

- Sample `.env.development.local`
```
DOMAIN=localhost
PROTOCOL=http
PORT=5000
API_PORT=5001

BASE_URL=http://localhost:5000
API_URL=http://localhost:5001/graphql

# seconds
SESSION_EXPIRESIN=7200
SESSION_TOKEN_SECRET=fSpP96kS33us4RgqE6CbKryVu8x8tQXkKE
```

- Sample `.env.production.local`
```
DOMAIN=localhost
PROTOCOL=http
PORT=5000
API_PORT=5001

BASE_URL=http://localhost:5000
API_URL=http://localhost:5001/graphql

# seconds
SESSION_EXPIRESIN=7200
SESSION_TOKEN_SECRET=fSpP96kS33ub4RgqE6CbKryVu8x8tQXkKE
```

- Start the development server for Client
```
cd client && pnpm install
pnpm dev
```

- Production build
```
pnpm build
```

- Production server start
```
pnpm start
```

Then go the url at `http://localhost:5000`

## Shorthand
Shorthand commands for once: navigate to the root directory in your terminal and then copy paste below command, then press enter.
- Development environment
```
cd api-engine && pnpm install && pnpm migrate && cd ../client && pnpm install && cd .. && pnpm install && pnpm dev
```
- Production build
```
cd api-engine && pnpm install && pnpm migrate && cd ../client && pnpm install && cd .. && pnpm install && pnpm build && pnpm start
```

The task completion checklist is given below:
![checklist](<Screenshot 2024-06-04 at 4.46.56 AM.png>)


Thank you so much for the project. I'm looking forward to hear from you.