import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { chromium, ChromiumBrowser, ChromiumBrowserContext, Cookie, Page } from 'playwright';
import ConfigFile from './../../src/interfaces/config-file.interface';
import Configs from '././configs';

export default class BrowserService {
  private browser: ChromiumBrowser;
  private context: ChromiumBrowserContext;

  async setup (): Promise<void> {
    await this.launchChrome();
  }

  async newPage (): Promise<Page> {
    this.context = await this.browser.newContext();

    return await this.context.newPage();
  }

  async close (): Promise<void> {
    return await this.browser.close();
  }

  async writeCookies (): Promise<void> {
    const LOGGED_IN_USER_NAME = 'admin';

    const cookieFilePath = path.join(Configs.cookieDir, 'admin.json');
    const config: ConfigFile = Configs.getSiteConfig();
    const command = `drush ${config.drush_alias} uli --name=${LOGGED_IN_USER_NAME} --uri=${config.url} --browser=0`;
    const loginUrl = execSync(command, { encoding: 'utf8', cwd: config.root });

    await this.launchChrome();
    const page = await this.newPage();
    await page.goto(loginUrl);

    const cookies = await this.context.cookies();
    await this.close();

    !fs.existsSync(Configs.cookieDir) && fs.mkdirSync(Configs.cookieDir);
    fs.existsSync(cookieFilePath) && fs.unlinkSync(cookieFilePath);

    fs.writeFileSync(cookieFilePath, JSON.stringify(cookies));
  }

  async loadCookies (): Promise<void> {
    let cookies: Cookie[] = [];
    const cookiePath = Configs.getCookiePath();

    // READ COOKIES FROM FILE IF EXISTS
    if (fs.existsSync(cookiePath)) {
      cookies = JSON.parse(fs.readFileSync(cookiePath).toString());
    }

    await this.setCookies(this.context, cookies);
  }

  private async launchChrome (): Promise<ChromiumBrowser> {
    this.browser = await chromium.launch();

    return this.browser;
  }

  private async setCookies (
    context: ChromiumBrowserContext,
    cookies: Cookie[]): Promise<any> {
    return await context.addCookies(cookies);
  }
}
