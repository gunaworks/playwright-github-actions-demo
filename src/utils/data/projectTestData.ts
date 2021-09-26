const faker = require('faker');

export function createProjectRequest() {
  const projectName = 'Project ' + faker.name.firstName();
  const projectDescription = faker.company.catchPhrase();

  return {
    name: projectName,
    description: projectDescription,
  };
}
