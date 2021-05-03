/**
 * Configuration File interface to run the tests
 */
export default interface ConfigFile {
  readonly drush_alias: string
  readonly root: string
  readonly url: string
}
