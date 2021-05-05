import { execSync } from 'child_process';
import Configs from '../utils/configs';
import ConfigFile from '../interfaces/config-file.interface';

/**
 * User Roles Service.
 */
interface Role {
  name: string
  user: string
  password: string
  email: string
  roles: string[]
};

export default {
  /**
   * @param {string} roleName role name
   * @returns {string} cookie file name
   */
  getCookieFileName (roleName: string): string {
    const user: string = this.getAllRoles().find((role: Role) => {
      return role.name === roleName;
    }).user;

    return `${user}.json`;
  },

  /**
   * @param {string} roleName role name
   * @returns {string} cookie file name
   */
  getRoleName (roleName: string): string {
    return this.getAllRoles().find((role: Role) => {
      return role.name === roleName;
    }).name;
  },

  /**
   * @returns {string[]} list of all roles
   */
  getAllRoles (): Role[] {
    return [{
      name: 'admin',
      user: 'superadmin',
      email: 'superadmin@superadmin.com',
      password: 'superadmin',
      roles: ['administrator']
    }, {
      name: 'case_user',
      user: 'case_user',
      email: 'case_user@caseuser.com',
      password: 'case_user',
      roles: ['CiviCRM User', 'CiviCase User']
    }];
  },

  /**
   * Create drupal users and assign roles.
   */
  createUsersWithRoles (): void {
    const config: ConfigFile = Configs.getSiteConfig();

    this.getAllRoles().forEach((role: Role) => {
      execSync(`drush user-create ${role.user} --password="${role.password}" --mail="${role.email}"`, { encoding: 'utf8', cwd: config.root });
      role.roles.forEach((roleNameToAssign: string) => {
        execSync(`drush user-add-role "${roleNameToAssign}" ${role.user}`, { encoding: 'utf8', cwd: config.root });
      });
    });
  }
};
