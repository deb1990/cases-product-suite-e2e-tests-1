import CiviApiQuery from '../../interfaces/civi-api-query.interface';
import CiviApiResponse from '../../interfaces/civi-response.interface';

export default {
  cache: [],

  /**
   * @param {CiviApiQuery[]} query the query for which data should be saved
   * @returns {CiviApiResponse[]} value from cache
   */
  get (query: CiviApiQuery[]): CiviApiResponse[] {
    return this.cache[JSON.stringify(query)];
  },
  /**
   * @param {CiviApiQuery[]} query the query for which data should be saved
   * @param {CiviApiResponse[]} value value to save in cache
   */
  set (query: CiviApiQuery[], value: CiviApiResponse[]): void {
    this.cache[JSON.stringify(query)] = value;
  }
};
