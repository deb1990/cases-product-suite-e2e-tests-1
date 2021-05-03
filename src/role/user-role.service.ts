/**
 * User Roles Service.
 */
export default {
  roles: {
    admin: 'admin',
    case_user: 'case_user'
  },
  /**
   * @param {string} role role name
   * @returns {string} cookie file name
   */
  getCookieFileName (role: string): string {
    role = this.roles[role];
    return `${role}.json`;
  },

  /**
   * @param {string} role role name
   * @returns {string} cookie file name
   */
  getRoleName (role: string): string {
    return this.roles[role];
  },

  /**
   * @returns {string[]} list of all roles
   */
  getAllRoles (): string[] {
    return Object.values(this.roles);
  }

};
