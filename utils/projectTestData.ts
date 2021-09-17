const faker = require('faker');

export function createProjectRequest() {
    return {
        name: "Project " + faker.name.lastName(),
        description: "iOS + Android strings of TheApp. https://theapp.com"
    }
}