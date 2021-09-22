import { expect } from '@playwright/test';
import axios from './axios/config';
import { createProjectRequest } from './data/projectTestData';
import { createKeyRequest } from './data/keyTestData';
import { PROJECT_API, KEY_API } from './constants';
import { logger } from './logger';

export const deleteProjects = async () => {
  try {
    const projects = await getProjects();
    for (let i = 0; i < projects.length; i++) {
      const projectId = projects[i].project_id;
      await axios
        .delete(`${PROJECT_API}/${projectId}`)
        .then(function (response) {
          expect(response.status).toBe(200);
          expect(response.data.project_deleted).toBe(true);
        });
      logger.info('Projects deleted');
    }
  } catch (e) {
    logger.error('Error while deleting the projects', e);
    throw e;
  }
};

export const createProject = async () => {
  try {
    const body = createProjectRequest();
    await axios.post(`${PROJECT_API}`, body).then(function (response) {
      expect(response.status).toBe(200);
      expect(response.data.project_id).not.toBeNull();
    });
    logger.info('Project created');
  } catch (e) {
    logger.error('Error while creating the project', e);
    throw e;
  }
};

export const createKey = async (keyType: string) => {
  try {
    const projects = await getProjects();
    const projectId = projects[0].project_id;
    await axios
      .post(
        `${PROJECT_API}/${projectId}:master/${KEY_API}`,
        createKeyRequest(keyType)
      )
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.keys[0].key_id).not.toBeNull();
      });
    logger.info('Key created');
  } catch (e) {
    logger.error('Error while creating the key', e);
    throw e;
  }
};

const getProjects = async () => {
  try {
    const response = await axios
      .get(`${PROJECT_API}`)
      .then(function (response) {
        const projects = response.data.projects;
        expect(projects.project_id).not.toBeNull();
        expect(response.status).toBe(200);
        expect(response.data.projects).not.toBeNull();
        return response;
      });

    return response.data.projects;
  } catch (e) {
    logger.error('Error while getting the projects', e);
    throw e;
  }
};
