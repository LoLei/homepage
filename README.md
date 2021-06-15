# Homepage

This is the personal homepage of Lorenz Leitner (me).

## Features
Uses the GitHub and GitLab API to pull in content from other repositories (live),
i.e. no redeployment of the website is needed.  
This is used mainly for posts in the blog section, and for items in the portfolio.

## Environment Variables

The following environment variables must be defined:
```
EMAIL_ADDRESS
GITHUB_TOKEN
```

They are defined in `.env.local` for next.js/local development.

## Development

### Local
```sh
yarn install
yarn dev

# Or
yarn install
yarn build
yarn start
```

### Container
```sh
# Build
podman build . -t lolei/homepage

# Run
export $(xargs <.env.local)
podman run \
  -e EMAIL_ADDRESS=$EMAIL_ADDRESS \
  -e GITHUB_TOKEN=$GITHUB_TOKEN \
  -p 3000:3000 \
  lolei/homepage

# Or
podman run \
  --env-file ./.env.local \
  -p 3000:3000 \
  lolei/homepage
```

