import * as mysql from 'mysql';

/**
 * Database Service class.
 */
export default {
  host: 'local.site', //
  user: 'root',
  password: 'root',
  databaseName: 'civicrm', //
  /**
   * Connect to MySql Database.
   */
  async startDBConnection () {
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.databaseName
    });

    this.connection.connect();
  },
  /**
   * End connection to MySql Database.
   */
  async endDBConnection () {
    await this.connection.destroy();
  },

  /**
   * Start a Transaction in Database.
   *
   * @returns {Promise<any>} promise
   */
  async startTransaction (): Promise<any> {
    this.startDBConnection();

    return this.connection.query('START TRANSACTION');
  },

  /**
   * Start a Transaction in Database.
   *
   * @returns {Promise<any>} promise
   */
  async rollbackTransaction (): Promise<any> {
    await this.connection.query('ROLLBACK');

    this.endDBConnection();
  }
};
