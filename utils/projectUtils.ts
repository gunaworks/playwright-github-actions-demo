import { expect } from '@playwright/test';
import axios from './axios/config';
import { createProjectRequest } from './data/projectTestData';
import { createKeyRequest } from './data/keyTestData';

export const deleteProjects = async () => {
  const projectId = await getProjects();
  await axios.delete(`projects/${projectId}`).then(function (response) {
    expect(response.status).toBe(200);
    expect(response.data.project_deleted).toBe(true);
  });
};

export const createProject = async () => {
  const body = createProjectRequest();
  await axios.post('projects', body).then(function (response) {
    expect(response.status).toBe(200);
    expect(response.data.project_id).not.toBeNull();
  });
};

export const createKey = async (keyType: string) => {
  const projectId = await getProjects();
  await axios
    .post(`projects/${projectId}:master/keys`, createKeyRequest(keyType))
    .then(function (response) {
      expect(response.status).toBe(200);
      expect(response.data.keys[0].key_id).not.toBeNull();
    });
};

const getProjects = async () => {
  const response = await axios.get(`${API.PROJECT}`).then(function (response) {
    let projects = response.data.projects;
    expect(projects.project_id).not.toBeNull()
    expect(response.status).toBe(200);
    expect(response.data.projects).not.toBeNull();
    return response;
  });

  return response.data.projects;
};
