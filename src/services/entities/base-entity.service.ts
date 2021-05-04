import cvApiBatch from '../utils/cv-api.service';

/**
 * Base Entity Service
 */
export default class BaseEntityService {
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
   * @param {any} params parameters
   * @returns {object[]} created entities
   */
  create (params: any[]): object[] {
    this.entityIds = [];

    const apiCalls = params.map((param): [string, string, object] => {
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
