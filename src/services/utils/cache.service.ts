import CiviApiQuery from '../../interfaces/civi-api-query.interface';
import CiviApiResponse from '../../interfaces/civi-response.interface';

export default {
  cache: [],

  /**
   * @param query the query for which data should be saved
   * @returns value from cache
   */
  get (query: CiviApiQuery[]): CiviApiResponse[] {
    return this.cache[JSON.stringify(query)];
  },
  /**
   * @param query the query for which data should be saved
   * @param value value to save in cache
   */
  set (query: CiviApiQuery[], value: CiviApiResponse[]): void {
    this.cache[JSON.stringify(query)] = value;
  }
};
