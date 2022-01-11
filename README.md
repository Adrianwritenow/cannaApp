# Cannapages web

This is a [Next.js](https://nextjs.org/) project.

## Getting Started

First, run the development server:

```bash

cp -a .env.example .env

make up

make yarn (as needed)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables should be set per environment for the application
to run properly.

| Variable               | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| API_URL                | The environment-specific API url.                                                      |
| NEXTAUTH_SECRET        | Random string to hash next-auth tokens. Use `openssl rand -base64 32` to generate one. |
| CLIENT_ID              | CannaPages OAuth client id.                                                            |
| CLIENT_SECRET          | CannaPages OAuth client secret.                                                        |
| FACEBOOK_CLIENT_ID     | Facebook application id.                                                               |
| FACEBOOK_CLIENT_SECRET | Facebook application secret.                                                           |
| GOOGLE_CLIENT_ID       | Google client id.                                                                      |
| GOOGLE_CLIENT_SECRET   | Google client secret.                                                                  |
| SEARCH_URL   | Elastic Search URL                                                                  |
| IPSTACK_API_URL   | IPStack Reverse IP Lookup Service URL                                                                   |
| IPSTACK_ACCESS_KEY   | IPStack Reverse IP Lookup Service Access Key                                                                  |