//@flow
import chalk from 'chalk';

export const getRepositoryInfo = () => {
  const repoOwner = process.env.BITBUCKET_REPO_OWNER;
  const repoSlug = process.env.BITBUCKET_REPO_SLUG;
  const commit = process.env.BITBUCKET_COMMIT;
  const branchName = process.env.BITBUCKET_BRANCH;
  const buildNumber = process.env.BITBUCKET_BUILD_NUMBER;


  const bbUsername = process.env.BITBUCKET_USER;
  const bbPassword = process.env.BITBUCKET_PASSWORD;

  const missing = [];
  if (!repoOwner) missing.push('BITBUCKET_REPO_OWNER');
  if (!repoSlug) missing.push('BITBUCKET_REPO_SLUG');
  if (!bbUsername) missing.push('BITBUCKET_USER');
  if (!bbPassword) missing.push('BITBUCKET_PASSWORD');
  if (!commit) missing.push('BITBUCKET_COMMIT');
  // no error for branchName not being defined, this only exists when a branch build happens

  if (missing.length > 0) {
    console.warn(chalk.red('Error: '), 'Unable to find all required environment variables:');
    console.warn(missing.map(varName => `  - ${varName}`).join('\n'));

    throw new Error('Unable to find all required environment variables');
  }
  const apiEndpoint = `https://api.bitbucket.org/internal/repositories/${repoOwner}/${repoSlug}`;

  return {
    repoOwner,
    repoSlug,
    commit,
    branchName,
    buildNumber,
    bbUsername,
    bbPassword,
    apiEndpoint
  }
}
