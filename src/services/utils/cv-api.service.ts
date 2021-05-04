import { execSync } from 'child_process';
import Configs from './configs';
import CiviApiResponse from '../interfaces/civi-response.interface';
import UserRole from '../role/user-role.service';

export default cvApiBatch;

/**
 * Executes multi calls to the `cv api` service and returns the response from
 * those calls in JSON format.
 *
 * @param {Array<[string, string, object]>} queriesData a list of queries to pass to the `cv api:batch` service.
 * @returns {any[]} response from the cv api.
 */
function cvApiBatch (queriesData: Array<[string, string, object]>): CiviApiResponse[] {
  const config = Configs.getSiteConfig();
  const cmd = `echo '${JSON.stringify(queriesData)}' | cv api:batch -U ${UserRole.getRoleName('admin')}`;
  const responses = JSON.parse(execSync(jsonEscape(cmd), { cwd: config.root }).toString());
  checkAndThrowApiResponseErrors(responses);

  return responses;
}

/**
 * @param {string} str string
 * @returns {string} escaped string
 */
function jsonEscape (str: string): string {
  return str.split('\\n').join('\\\\n');
}

/**
 * Throws an error if it finds any inside one of the `cv api` responses.
 *
 * @param {Array} responses the list of responses as returned by `cv api:batch`.
 */
function checkAndThrowApiResponseErrors (responses: any[]): void {
  responses.forEach((response: CiviApiResponse) => {
    if (response.is_error === '1') {
      throw new Error(response.error_message);
    }
  });
}
