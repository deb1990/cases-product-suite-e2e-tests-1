import { execSync } from 'child_process';
import Configs from './configs.service';
import ConfigFile from '../../interfaces/config-file.interface';

/**
 * Role Interface
 */
interface Role {
  name: string
  user: string
  password: string
  email: string
  roles: string[]
};

/**
 * Role Permission Map Interface
 */
interface RolePermissionMap {
  roleName: string
  permissions: string[]
};

/**
 * User Roles Service.
 */
export default {
  /**
   * @param roleName role name
   * @returns cookie file name
   */
  getCookieFileName (roleName: string): string {
    const user: string = this.getAllRoles().find((role: Role) => {
      return role.name === roleName;
    }).user;

    return `${user}.json`;
  },

  /**
   * @param roleName role name
   * @returns cookie file name
   */
  getRoleName (roleName: string): string {
    return this.getAllRoles().find((role: Role) => {
      return role.name === roleName;
    }).name;
  },

  /**
   * @returns list of all roles
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
    }, {
      name: 'award_manager',
      user: 'award_manager',
      email: 'award_manager@awardmanager.com',
      password: 'award_manager',
      roles: ['CiviCRM User', 'Award Manager']
    }, {
      name: 'prospect_user',
      user: 'prospect_user',
      email: 'prospect_user@prospectuser.com',
      password: 'award_manager',
      roles: ['CiviCRM User', 'CiviProspect User']
    }];
  },

  /**
   * @returns list of all permissions for the role
   */
  getRolesPermissionMap (): RolePermissionMap[] {
    return [{
      roleName: 'CiviCRM User',
      permissions: [
        'access administration menu',
        'access CiviContribute',
        'access CiviCRM',
        'access CiviEvent',
        'access CiviMail',
        'access CiviMember',
        'access CiviReport',
        'access contact reference fields',
        'access content',
        'access export action',
        'access uploaded files',
        'add contacts',
        'administer CiviDiscount',
        'delete contacts',
        'edit all contacts',
        'edit contributions',
        'edit inbound email basic information',
        'edit inbound email basic information and content',
        'edit memberships',
        'edit my contact',
        'make online contributions',
        'profile create',
        'profile edit',
        'profile view',
        'register for events',
        'send SMS',
        'view all activities',
        'view all contacts',
        'view event info',
        'view event participants',
        'view my contact',
        'view public CiviMail content',
        'view the administration theme'
      ]
    }, {
      roleName: 'CiviCase User',
      permissions: [
        'access all cases and activities',
        'access my cases and activities',
        'add cases',
        'basic case information',
        'make online contributions',
        'view public CiviMail content',
        'view the administration theme'
      ]
    }, {
      roleName: 'Award Manager',
      permissions: [
        'access all awards and activities',
        'access my awards and activities',
        'access payment custom field set',
        'access review custom field set',
        'add awards',
        'basic awards information',
        'create/edit awards',
        'delete in CiviAwards'
      ]
    }, {
      roleName: 'CiviProspect User',
      permissions: [
        'access all prospecting and activities',
        'access CiviPledge',
        'access my prospecting and activities',
        'add prospecting',
        'basic prospecting information',
        'edit pledges',
        'make online contributions',
        'view public CiviMail content',
        'view the administration theme'
      ]
    }];
  },

  /**
   * Create drupal users and assign roles.
   */
  createUsersWithRoles (): void {
    const config: ConfigFile = Configs.getSiteConfig();
    const execSyncOptions: { encoding: BufferEncoding, cwd: string } = {
      encoding: 'utf8',
      cwd: config.root
    };

    this.getRolesPermissionMap().forEach((roleMap: RolePermissionMap) => {
      try {
        execSync(`drush role-create "${roleMap.roleName}"`, execSyncOptions);
      } catch (e) { }
      try {
        execSync(`drush role-add-perm "${roleMap.roleName}" "${roleMap.permissions.join(',')}"`, execSyncOptions);
      } catch (e) { }
    });

    this.getAllRoles().forEach((role: Role) => {
      let isUserPresent = true;
      try {
        execSync(`drush user-information ${role.user}`, execSyncOptions);
      } catch (error) {
        isUserPresent = false;
      }

      if (!isUserPresent) {
        execSync(`drush user-create ${role.user} --password="${role.password}" --mail="${role.email}"`, execSyncOptions);
        console.log(`"${role.user}" user created.`);
        role.roles.forEach((roleNameToAssign: string) => {
          execSync(`drush user-add-role "${roleNameToAssign}" ${role.user}`, execSyncOptions);
        });
      }
    });
  }
};
