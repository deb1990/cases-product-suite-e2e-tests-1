import * as colors from 'ansi-colors';
import * as PluginError from 'plugin-error';

export class ErrorService {
  throwError (msg: string): void {
    throw new PluginError('Error', {
      message: colors.red(msg.replace(/\t/g, '    '))
    });
  }
}
