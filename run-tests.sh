#!/bin/sh
set -x

export X_API_TOKEN="1575f461e91cef9e7ee6bf31ea6ee22098b2d9bf"
export EMAIL="franco@fra.org"
export PASSWORD="Abcd1234"
export BASE_URL="https://stage.lokalise.com/"
export HEADLESS="true"

yarn test --project=$BROWSER
chmod -R 777 /ms-playwright