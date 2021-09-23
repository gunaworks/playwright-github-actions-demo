#!/bin/sh
set -x

export X_API_TOKEN="d4ac3998533081bdecdd071b1ff0d0997a9cfcdd"
export EMAIL="autotest@lokalise.com"
export PASSWORD="Abcd1234"
export ENVIRONMENT="STAGE"
export HEADLESS="true"

chmod -R 777 /ms-playwright
yarn test --project=$BROWSER