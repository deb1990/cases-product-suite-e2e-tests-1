# Cases Product End to End test Suite.

This covers the end to end testing for
* [CiviCase](https://github.com/compucorp/uk.co.compucorp.civicase)
* [CiviAwards](https://github.com/compucorp/uk.co.compucorp.civiawards)
* [CiviProspect](https://github.com/compucorp/uk.co.compucorp.civicrm.prospect)
* [Shoreditch](https://github.com/civicrm/org.civicrm.shoreditch)

## Installation
### From CLI
To run the tests in your local environment, run
1. Clone the repository.
2. Run `npm i` to install the dependencies.
3. Run `npx gulp test` to run the e2e suite.
Note: When doing Step 3 for the first time, a `site-config.json` file will be created, which needs to be populated with approprite values.

### Using Github Actions
1. Go to [Action Tab](https://github.com/compucorp/cases-product-suite-e2e-tests/actions) on Github.
2. Select "End to End Tests" Action.
3. Click "Run Workflow" and enter branch names of the differernt repositories and Submit.
4. Wait for the workflow run to finish, and the report of the run can be downloaded from the workflow run page.

## Technologies Used
1. [Typescript](https://www.typescriptlang.org/) as the scripting language.
2. [Gulp](https://gulpjs.com/) as the task runner.
3. [Jest](https://jestjs.io/) as the Assertion tool.
4. [Playwright](https://playwright.dev/) as the Browser Automation tool.

## Architecture
### Folder Structure
```
├── src
│   ├── pages
│   │   ├──  base // contains the base page classes
│   │   ├──  awards // contains the page object model classes for awards
│   │   ├──  cases // contains the page object model classes for cases
│   │   ├──  prospects // contains the page object model classes for prospect
│   ├── interfaces // contains interfaces and types for Typescript
│   ├── services
│   │   ├──  entities // services related to each entity of database like Case/Activity etc
│   │   ├──  utils // utility service
├── tests
│   ├── awards // test cases for awards, more nested folders can be created if needed
│   ├── cases // test cases for cases, more nested folders can be created if needed
│   └── prospects // test cases for prospects, more nested folders can be created if needed
```
### Base Classes
The following base classes are created
1. `src/pages/base/base.page.ts`
    This is a base class working as a Page Object Model for all Playwright Pages.
2. `src/pages/base/manage-casetypecategory-list.page.ts`
    This a base class for all the Manage Case Type Category List pages like `Manage Cases`, `Manage Applications` etc.
3. `src/services/entities/base-entity.service.ts`
    This is a base class for CiviCRM entities, to perform CRUD operations with the Backend Database.
    This class can be extended to use for any entity of choice
    ```ts
    import BaseEntityService from './base-entity.service';

    /**
     * Case Entity Service
     */
    export default class CaseTypeService extends BaseEntityService {
      /**
       * Constructor.
       */
      constructor () {
        super('CaseType');
      }
    }
   ```
### Testing for Specific User
UserRoleService(`src/services/utils/user-role.service.ts`), setup all the roles, permissions and drupal users needed for Cases Product Suite Testing.
To add more roles/permissions/drupal users, edit `getAllRoles` or `getRolesPermissionMap` functions inside `UserRoleService`.

Also before the test starts, cookies are generated for all users, and to login using a specific user, the following can be done
```ts
describe('as admin user', function () {
  beforeEach(async () => {
    await browser.loginUsingCookiesAs('admin'); //mention the drupal user name
    ...
  });

  it('...', async () => {
    ...
  });
});
```

### Set/Reset Data
The data needed for E2E tests, needs to be generated by the test suite itself. Also after the test is done, is teardown stage, the data needs to be cleaned up, so that one test does not affect another test.
Entity related services can be used for this, for example
```ts
describe('...', function () {
  const CaseType = new CaseTypeService();

  beforeEach(async () => {
    ...
    CaseType.create([
      {
        name: 'e2e_case_type',
        ...
      }
    ]);
  });

  afterEach(async () => {
    ...
    // calling cleanup using the `CaseType` instance,
    // will cleanup all the data created by the same instance
    CaseType.cleanUp();
  });

  it('...', async () => { ... });
});
```

### Test Report
After all the tests are executed, test report is generated inside `test-report` folder using `jest-html-reporter`.
Also for every failed test case, a screenshot of the browser is saved under the same `test-report` folder, which will be helpful to debugg the error.
To generate this screenshot, a custom environment for Jest has been created at `gulp-tasks/jest-helper/environments/e2e-test-environment.js`.
Which exposes a variable called `hasTestFailures` to denote failed tests, and inside every test, it can be accessed like the following
```ts
afterEach(async () => {
  if (global.hasTestFailures) {
      // do something
  };
});
```
Currently `Browser.takeScreenshotWhenFailedAndClose()` function takes care of taking the screenshot and closing the browser. But more logic can be added as per need.

## Linters
This repository uses `eslint-config-standard-with-typescript` and `eslint-plugin-jsdoc` to lint the Typescript files.
Other than the default rules, the following rules are added separately
```
{
  '@typescript-eslint/semi': ['error', 'always'], // because semistandard is not present for TS
  'jsdoc/require-jsdoc': [1, {
    contexts: [
      'ClassDeclaration', 'FunctionExpression', 'FunctionDeclaration',
      'ArrowFunctionExpression', 'MethodDefinition', 'ClassExpression',
      'FunctionExpression', 'TSInterfaceDeclaration', 'TSMethodSignature'
    ]
  }]
}
```
