import { projectName } from "../utils/faker/fakerUtils";

export function createProjectRequest() {
  return {
    name: projectName,
    description: "iOS + Android strings of TheApp. https://theapp.com",
  };
}
