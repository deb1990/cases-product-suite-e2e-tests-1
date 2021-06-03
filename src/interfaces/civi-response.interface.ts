import CiviApiResponseValue from './civi-response-value.interface';

/**
 * Response from CiviCRM api
 */
export default interface CiviApiResponse {
  is_error: string
  error_message: string
  version: string
  count: string
  values: CiviApiResponseValue[]
}
