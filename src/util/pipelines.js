import { getRepositoryInfo } from "./repository";

const repositoryInfo = getRepositoryInfo();

if (!repositoryInfo) return;

export function getCurrentPipeline

