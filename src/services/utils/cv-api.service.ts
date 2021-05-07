import { execSync } from 'child_process';
import Configs from './configs.service';
import CiviApiResponse from '../interfaces/civi-response.interface';
import UserRole from '../role/user-role.service';
import CiviApiQuery from '../interfaces/civi-api-query.interface';
import CacheService from './cache.service';

export default cvApiBatch;

/**
 * Executes multi calls to the `cv api` service and returns the response from
 * those calls in JSON format.
 *
 * @param {CiviApiQuery[]} queriesData a list of queries to pass to the `cv api:batch` service.
 * @param {boolean} useCache return values from cache if present
 * @returns {CiviApiResponse[]} response from the cv api.
 */
function cvApiBatch (queriesData: CiviApiQuery[], useCache?: boolean): CiviApiResponse[] {
  if (useCache === true) {
    const valueFromCache = CacheService.get(queriesData);

    if (valueFromCache !== undefined) {
      return valueFromCache;
    }
  }

  const config = Configs.getSiteConfig();
  const cmd = `echo '${JSON.stringify(queriesData)}' | cv api:batch -U ${UserRole.getRoleName('admin')}`;
  const responses = JSON.parse(execSync(jsonEscape(cmd), { cwd: config.root }).toString());
  checkAndThrowApiResponseErrors(responses);

  CacheService.set(queriesData, responses);

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
function checkAndThrowApiResponseErrors (responses: CiviApiResponse[]): void {
  responses.forEach((response: CiviApiResponse) => {
    if (response.is_error === '1') {
      throw new Error(response.error_message);
    }
  });
}
