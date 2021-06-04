import { Global } from '@jest/types';
import { Page } from 'playwright';
import BrowserService from '../services/utils/browser.service';

/**
 * Custom Jest Global Variable.
 */
export default interface JestGlobal extends Global.Global {
  browser: BrowserService
  page: Page
  hasTestFailures: boolean
}
