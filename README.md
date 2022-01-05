# Test Automation task

In this project, the automation framework is created using Playwright and Typescript. The tests can be executed locally and also in docker containers.

_The task is to automate the following scenarios_ -

1. Create first project for the user
2. Create nth project for the user
3. Create a key for the project
4. Add translation for a plain key in the project
5. Add translation for a plural key in the project

### Built with

- [Playwright] - library used to write e2e automation scripts which has it's own testing framework
- [Typescript] - programming language used to write the test scripts
- [Axios] - HTTP client used to make API calls
- [Docker] - open source containerization platform to run tests in containers
- [Github Actions] - CI/CD tool to run the test scripts which provides quicker feedback
- [Log4js] - logging library used for log every action
- [Faker] - to generate fake form data
- [Allure] - to generate reports for the tests
- [Prettier] - a code formatter to make the code look neat and clean
- [eslint] - static code analyzer to identify problematic code

<!-- ### Structure of the framework

<img width="437" alt="Screenshot 2021-09-23 at 7 43 31 PM" src="https://user-images.githubusercontent.com/25933070/134523462-41eb7cf2-4848-4b3f-92f1-c03c89da82fd.png"> -->

### How to run the tests?

`Pre-requisites` -
Set the following environment variables for the test to execute

```sh
export X_API_TOKEN=<api-token>
export EMAIL=<email>
export PASSWORD=<password>
export ENVIRONMENT=<environment> [STAGE, QA, DEV]
export HEADLESS=<true or false>
```

Remember to change the `export` above to `SET` if you're running a Windows machine.

##### The tests can be executed in both local machines and docker containers.

###### To execute tests in local machine -

```sh
# Get into the directory
$ cd automation
```

Install `YARN` using `npm install --global yarn`. To run tests in HEADFUL mode, please set `export HEADLESS=false`.

```sh
# Execute tests in CHROME browser
$ yarn test-chrome
# The above command executes - npx playwright test --project=Chrome
```

```sh
# Execute tests in FIREFOX browser
$ yarn test-firefox
# The above command executes - npx playwright test --project=Firefox
```

```sh
# Execute tests in both `CHROME` and `FIREFOX` browsers sequentially
$ yarn test
# The above command executes - npx playwright test
# The tests are executed sequentially and not parallely as we are using one single user for the entire test lifetime
```

###### To execute tests in docker container -

Follow the steps in https://docs.docker.com/get-docker/ to install `Docker` in your machine.

The `Dockerfile` contains a shell script file which has the environment variables exported by default.

Add the following environment variables in `run-tests.sh` file

```shell
export X_API_TOKEN=<api-token>
export EMAIL=<email>
export PASSWORD=<password>
export ENVIRONMENT=<environment> [STAGE, QA, DEV]
export HEADLESS=<true> [XVFB support is not added]
```

Execute the below commands -

```sh
# Build the docker container
$ docker build . -t e2e

# Run the docker container with the specific browser
# To execute tests in Chrome browser
$ docker run -e BROWSER=Chrome e2e

# To execute tests in Firefox browser
$ docker run -e BROWSER=Firefox e2e
```

#### `Dockerfile` -

<img width="487" alt="Screenshot 2021-09-23 at 8 05 26 PM" src="https://user-images.githubusercontent.com/25933070/134527431-94d83c45-a681-4a9c-b6c5-05b152a8bac8.png">

#### `run-tests.sh` -

<img width="685" alt="Screenshot 2021-09-23 at 8 08 08 PM" src="https://user-images.githubusercontent.com/25933070/134527933-66a278cf-6d65-4b34-81c3-5e34041b6063.png">

### Reporting

`Allure framework` is used to generate reports for the test execution results. To generate an Allure report post test execution, execute the following command -

```sh
$ yarn report
# The above command executes - allure generate --clean && allure serve
```

<img width="1765" alt="Screenshot 2021-09-23 at 2 09 14 PM" src="https://user-images.githubusercontent.com/25933070/134477794-4a2ba563-d85b-4f7c-863b-f3dfb88b4aef.png">

### Logging

`log4js` is used as the logging library for the framework. Logs are generated under the `logs` directory of the project named as `debug.log`

The logger type is FileAppender, this covers the entire lifecycle of test execution and logs the details into the destination file as shown below -
<img width="1067" alt="Screenshot 2021-09-23 at 5 47 36 PM" src="https://user-images.githubusercontent.com/25933070/134505245-d430c7a4-1a1b-4c00-a949-109870c57190.png">

### CI/CD

`GitHub Actions` is the CI/CD tool to execute the tests in docker containers. The pipeline will be triggered for every push made to the repo and also manually by the user. The tests are executed in docker containers on `CHROME` browser.

<img width="1313" alt="Screenshot 2021-09-24 at 10 20 36 AM" src="https://user-images.githubusercontent.com/25933070/134620013-a942f270-f1be-412b-8848-8c2b8b85b353.png">

<img width="1230" alt="Screenshot 2021-09-24 at 10 21 49 AM" src="https://user-images.githubusercontent.com/25933070/134620071-4a1197b5-eda1-4d1d-801a-24af1efc6f75.png">

The tests can be triggered on demand using `Trigger E2E tests on demand` workflow. We can select the browser of our choice as shown in the screenshot below.

<img width="345" alt="Screenshot 2021-09-24 at 10 24 05 AM" src="https://user-images.githubusercontent.com/25933070/134620297-ee1665d8-54b3-4404-9b99-3b5cf1a6f675.png">

### Screenshots and videos

Screenshots and videos are captured when there is a test failure. The screenshots are attached to the generated `Allure` report.

### Checklist

- [x] Logging
- [x] Screenshots for failed tests
- [x] Generating human-readable report
- [x] Generating random values for insignificant data
- [x] Encapsulation layers like test data, logic and actions on pages
- [x] Ability to run tests in different browsers
- [x] Ability to run tests in different environments
- [x] Stability of the tests

### Nice to have

- Execution of tests in Cloud platforms like Browserstack can provide feedback across multiple platforms
- Map the test cases with test management tool like Zephyr using ZAPI
