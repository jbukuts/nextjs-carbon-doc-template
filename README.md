# Carbon Next.js Documentation Template

This is a site template built from Next.js and Carbon Design System that is intended to build a documentation-style site to static assets.

It is built using:

- Next.js
- Carbon i.e `@carbon/react`
  - Adheres to Carbon v11
- MDX
- Velite (as a content layer between site code and content)

## Getting Started

> This template requires a minumim of Node v18.17.0 be installed.

First install dependencies via:

```bash
npm ci
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

There are some built-in docs as well. When running the development server navigate to http://localhost:3000/docs to see them.

## Building for production

To create a production version of your app:

```bash
npm run build
```

This will generate the static assets at the site in the `out` folder. You can then preview the production build via:

```bash
npm run serve
```

Then you can navigate to http://localhost:3000 to see the site.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
