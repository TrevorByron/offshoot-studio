# Vercel deployment

Set **Root Directory** to `offshoot-studio` in your Vercel project:

**Project → Settings → General → Root Directory** → `offshoot-studio`

Vercel will then run `npm install` and `npm run build` from the app directory where `@vercel/analytics` and other dependencies are defined.
