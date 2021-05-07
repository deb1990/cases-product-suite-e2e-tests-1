/**
 * Response from CiviCRM api
 */
export default interface CiviApiParam {
  id?: string
  value?: string
  sequential?: string | number
  case_type_category?: number
  title?: string
  option_group_id?: string
  name?: string
  definition?: any
}
