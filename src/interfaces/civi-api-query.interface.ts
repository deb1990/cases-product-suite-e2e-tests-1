import CiviApiParam from './civi-api-param.interface';

/**
 * Response from CiviCRM api
 */
export default interface CiviApiQuery {
  0: string
  1: string
  2: CiviApiParam
}
