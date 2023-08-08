<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h2 align="center">Bookstore API</h2>
<br/>
<br/>

## Installation

```bash
$ yarn
```

## Running the app

```bash
$ yarn start

# watch mode with dev mode
$ yarn start:dev
```

### Running with Docker

```bash
# build image
$ docker build -t=guilhermetafelli/bookstore-api .

# run image
$ docker run guilhermetafelli/bookstore-api
```

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/23507079-8cadb426-edf2-450c-bc6b-8a3a401baca5?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D23507079-8cadb426-edf2-450c-bc6b-8a3a401baca5%26entityType%3Dcollection%26workspaceId%3D00eda52a-89ea-43dd-aaf4-bb8002650649#?env%5BLocal%5D=W3sia2V5IjoiYWNjZXNzX3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lJMk5HUXhNakJqT0RaaFpqRTROVEF3T1RNMllUWmtNelFpTENKbGJXRnBiQ0k2SW1wdmFHNTBZV1psYkd4cFFHZHRZV2xzTG1OdmJTSXNJbWxoZENJNk1UWTUuLi4iLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5IjoiaWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiJudWxsIiwic2Vzc2lvbkluZGV4IjoxfSx7ImtleSI6ImJvb2tJZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IjY0ZDE5MTg1YTZmOTBhNDg0M2FhN2I3MyIsInNlc3Npb25JbmRleCI6Mn1d)

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Generate Database Types

```bash
# mongo
$ yarn generate:mongo
```

## Seed Database

```bash
# mongo
$ yarn seed:mongo
```

## Access Database

```bash
# mongo
$ yarn studio:mongo
```
