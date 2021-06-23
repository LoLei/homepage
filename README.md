# Homepage

This is the personal homepage of Lorenz Leitner (me).

## Features

Uses the GitHub and GitLab API to pull in content from other repositories
(live), i.e. no redeployment of the website is needed. This is used mainly for
posts in the blog section, and for items/repo statistics in the portfolio.  
This content is cached in memory and only re-retrieved once a certain period of
time is reached and a new request is made to the respective site-section, as to
not overtax the APIs.

## Environment Variables

The following environment variables must be defined:

```
EMAIL_ADDRESS
GITHUB_PAT
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

#### Build

```sh
podman build . -t ghcr.io/lolei/homepage
```

#### Pull

```sh
podman pull ghcr.io/lolei/homepage:<tag>
```

View all available image versions [here](https://github.com/LoLei/homepage/pkgs/container/homepage).

#### Run

```sh
# Run
export $(xargs <.env.local)
podman run \
  -e EMAIL_ADDRESS=$EMAIL_ADDRESS \
  -e GITHUB_PAT=$GITHUB_PAT \
  -p 3000:3000 \
  ghcr.io/lolei/homepage

# Or
podman run \
  --env-file ./.env.local \
  -p 3000:3000 \
  ghcr.io/lolei/homepage
```

(Docker et al. can also be used.)

## CI

Multiple checks are run automatically on each push to master and on pull requests from non-fork
sources. A manual workflow can be triggered to build and publish the container image from the latest
commit on master automatically to the Github Container Registry. In the future, an additional
workflow may be added that uses this image to deploy it automatically to the Kubernetes cluster.
