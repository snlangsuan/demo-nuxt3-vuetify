# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Make sure to add variable to `.env`

```bash
NUXT_PUBLIC_API_BASE_URL=<base_api_url>
NUXT_ACCESS_TOKEN_PRIVATE_KEY=<rsa_2048_private_key>
NUXT_ACCESS_TOKEN_PUBLIC_KEY=<rsa_2048_public_key>
NUXT_ACCESS_TOKEN_EXPIRY=<access_token_expire_in_second>
NUXT_REFRESH_TOKEN_PRIVATE_KEY=<rsa_2048_private_key>
NUXT_REFRESH_TOKEN_PUBLIC_KEY=<rsa_2048_public_key>
NUXT_REFRESH_TOKEN_EXPIRY=<refresh_token_expire_in_second>
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
