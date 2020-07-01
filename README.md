# Serverless Functions on Azure

Written in [TypeScript](https://www.typescriptlang.org/) (powered by [webpack](https://webpack.js.org/)), deployed to [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) with the [serverless framework](https://www.serverless.com/) and its [Azure plugin](https://github.com/serverless/serverless-azure-functions).

## Overview

* `serverless.yml` -> serverless framework config
* `src` -> source code

**Build & Deploy**

```shell
yarn install
yarn build      # compile typescript
yarn run deploy # deploy to azure
yarn run clean  # delete all cloud resources
```

Interactions with Azure require the following environment variables (see [serverless docs](https://www.serverless.com/framework/docs/providers/azure/guide/credentials/)):

```shell
AZURE_SUBSCRIPTION_ID='XYZ'
AZURE_TENANT_ID='XYZ'
AZURE_CLIENT_ID='XYZ'
AZURE_CLIENT_SECRET='XYZ'
```
