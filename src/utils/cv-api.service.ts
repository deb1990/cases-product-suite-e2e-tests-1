import { execSync } from 'child_process';
import Configs from './configs';
import CiviApiResponse from './../interfaces/civi-response.interface';

const LOGGED_IN_USER_NAME = 'admin';

export default cvApi;
/**
 * Executes a single call to the `cv api` service and returns the response
 * in JSON format.
 *
 * @param {string} entityName the name of the entity to run the query on.
 * @param {string} action the entity action.
 * @param {object} queryData the data to pass to the entity action.
 * @returns {CiviApiResponse} the result from the entity action call.
 */
function cvApi (entityName: string, action: string, queryData: object): CiviApiResponse {
  const queryResponse = cvApiBatch([[entityName, action, queryData]]);

  return queryResponse[0];
}

/**
 * Executes multi calls to the `cv api` service and returns the response from
 * those calls in JSON format.
 *
 * @param {Array<[string, string, object]>} queriesData a list of queries to pass to the `cv api:batch` service.
 * @returns {any[]} response from the cv api.
 */
function cvApiBatch (queriesData: Array<[string, string, object]>): any[] {
  const config = Configs.getSiteConfig();
  const cmd = `echo '${JSON.stringify(queriesData)}' | cv api:batch -U ${LOGGED_IN_USER_NAME}`;
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
