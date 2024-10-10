# Running

This project is a separate front-end and back-end running through [Deno](https://deno.com/).

First install Deno:
```sh
curl -fsSL https://deno.land/install.sh | sh
```

Create the environment files for the front-end and back-end. Copy the examples in `api/.env.example` and `app/.env.example` to `api/.env` and `app/.env` respectively, and fill in the values.

Run the following commands to start the front-end and back-end (done in different shell sessions)

Backend:
```sh
# Backend, from the root directory
cd api
deno run dev
```

Frontend:
```sh
# Frontend, from the root directory
cd app
deno run start
```

# Premise

This is just a demo project to try out some random tech and learn a few things. For this particular project, my initial goal was to set up a simple AI-based chat bot website, so I could put "openAI" on my resume.

To start I decided to use [Deno](https://deno.com/), which allowed me to use my exising JS/TS experience, but allowed me to work around with different features of the runtime, such as built-in typescript, direct URL module imports, and the lack of node_modules.

Later I learned some of these node_modules would still be required for NPM module imports in Deno 2.0. And because Deno allows importing easily importing the same modules but with different versions in URLs, there can be a mess in modules with different versions, and exports from one version might not be compatible from another version, so it's simplest to make sure every module uses the same version in a project by using a `deps.ts` file that re-exports a specific module version, later switched to an `import-map.json` and the `imports` field in `deno.json` to simplify. But then that's exactly the same as a `package.json`'s `dependencies`. Deno's First-class Typescript support is still very useful though.

So I knew I wanted to make a well-structured front-end and back-end, using different frameworks for each. Forcing myself to use Deno narrowed down my choice to use the [Fresh](https://fresh.deno.dev/) framework for the front-end, and [Oak](https://oakserver.github.io/oak/) for the back-end, both Deno-oriented frameworks.

Fresh is a server-side rendering framework, which has a similar routing method to Next.js's "pages router", but has better features to allow code colocation. It also uses [Preact](https://preactjs.com/) as it's main web framework, which unfortunately mHans I can use my existing React experience. But the main defining feature of Fresh is the support of "Islands", which are components that can be hydrated on the client-side

Preact also does have a couple of interesting features not preset in React, like `useSignals`. Signals can be passed around like state from `useState`, but only the value of the signals are reactive. If the signal is passed as a prop, the components with access to the signal do not re-render unless they actively have to read the value of the signal. This is pretty useful to keep state fully reactive and not have to worry about unnecessary re-renders.



Oak is the back-end API framework. This uses a middleware system similar to Express.js, which again is unfortunate cause I already worked with it before.

This time around, I decided to create the backend with as clean an architecture as I can make, without going too detailed in boilerplate. To me, this means orgnazing features by vertical slices, were each slice is using a clean architecture style layers, with a router, controllers, services, repositories, providers, models, etc.

I decided to impleent authentication (even though this isn't needed for an app like this), to familiarize myself with adding multiple authentication sources. With OAuth2, the flow for each authentication source is relatively the same, and I can assume each provider will use the same interface. This is why this app has an option to login, just to get a name from the user.
