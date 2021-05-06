import cvApiBatch from '../utils/cv-api.service';
import CiviApiResponseValue from '../interfaces/civi-response-value.interface';
import CiviApiParam from '../interfaces/civi-api-param.interface';
import CiviApiQuery from '../interfaces/civi-api-query.interface';

/**
 * Base Entity Service
 */
export default abstract class BaseEntityService {
  entityName: string;
  entityIds: string[];

  /**
   * @param {string} entityName name of the entity
   */
  constructor (entityName: string) {
    this.entityName = entityName;
  }

  /**
   * Create Entity.
   *
   * @param {CiviApiQuery} params parameters
   * @returns {object[]} created entities
   */
  create (params: CiviApiParam[]): object[] {
    this.entityIds = [];

    const apiCalls = params.map((param: CiviApiParam): CiviApiQuery => {
      return [this.entityName, 'create', param];
    });

    const apiReturnValue = cvApiBatch(apiCalls).map((caseType) => {
      return caseType.values[0];
    });

    this.entityIds = apiReturnValue.map((caseType) => {
      return caseType.id;
    });

    return apiReturnValue;
  }

  /**
   * Get Option Values.
   *
   * @param {CiviApiParam[]} params parameters
   * @param {boolean} useCache return values from cache if present
   * @returns {CiviApiResponseValue[]} option values
   */
  get (params: CiviApiParam, useCache: boolean): CiviApiResponseValue[] {
    return cvApiBatch([[this.entityName, 'get', params]], useCache)[0].values;
  }

  /**
   * Cleanup Entities created by this instance of the class.
   */
  cleanUp (): void {
    const apiCalls = this.entityIds.map((entityId): [string, string, object] => {
      return [this.entityName, 'delete', { id: entityId }];
    });

    cvApiBatch(apiCalls);

    this.entityIds = [];
  }
}
