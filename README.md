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

New stuff I tried out:
- Deno
- Oak
- Multi-issuer OAuth2 authentication (Google, Github, Facebook)
- Redis for caching
- AI chatbot (OpenAI, Github Copilot)
- Fresh
- Preact (pretty much just like React, but with "Signals")

This project isn't meant to be best way to architect a project, but to practice certain tools and techniques.
