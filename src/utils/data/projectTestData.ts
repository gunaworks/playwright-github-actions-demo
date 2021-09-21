import { projectDescription, projectName } from '../faker/fakerUtils';

export function createProjectRequest() {
  return {
    name: projectName,
    description: projectDescription,
  };
}
