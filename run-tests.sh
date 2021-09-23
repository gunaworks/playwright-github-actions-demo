#!/bin/sh
set -x

export X_API_TOKEN="1575f461e91cef9e7ee6bf31ea6ee22098b2d9bf"
export EMAIL="franco@fra.org"
export PASSWORD="Abcd1234"
export ENVIRONMENT="STAGE"
export HEADLESS="true"

chmod -R 777 /ms-playwright
yarn test --project=$BROWSER