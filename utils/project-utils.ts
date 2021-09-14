import { expect } from "@playwright/test";
import axios from "../axios";

export const deleteProjects = async () => {
  let projectId = await getProjects();
  await axios.delete(`projects/${projectId}`).then(function (response) {
    expect(response.status).toBe(200);
    expect(response.data.project_deleted).toBe(true);
  });
};

const getProjects = async () => {
  let response = await axios.get(`projects`).then(function (response) {
    expect(response.status).toBe(200);
    expect(response.data.projects[0].project_id).not.toBeNull();
    return response;
  });
  return response.data.projects[0].project_id;
};
