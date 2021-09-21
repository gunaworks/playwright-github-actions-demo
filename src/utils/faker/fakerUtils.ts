const faker = require('faker');

export const projectName = 'Project ' + faker.name.firstName();
export const projectDescription = faker.company.catchPhrase();
export const keyName = faker.name.lastName();
export const translation = faker.name.firstName();
