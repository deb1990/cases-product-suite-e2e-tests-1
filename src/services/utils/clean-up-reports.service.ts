import { execSync } from 'child_process';

/**
 * Cleans up test-reports folder.
 */
export default function cleanUpReports (): void {
  execSync('rm -rf test-reports', { encoding: 'utf8' });
};
