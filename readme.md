# To-do Board Solution
# Ikram Ud Daula

## API Engine

```
cd api-engine && pnpm install
pnpm migrate
```
- Make sure you have installed PostgreSQL in your machine at `5432` port
- Before starting API Engine, you need to create an env file at `config/` location named `dev.env` for development server, `test.env` for test. sample file are given in desired location.
- I used [pnpm](https://pnpm.io/) instead of `npm`


Sample 
- `config/dev.env`
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

Actually, project is not completed yet. But you may check out this for exploring my coding style.

Thank you :)