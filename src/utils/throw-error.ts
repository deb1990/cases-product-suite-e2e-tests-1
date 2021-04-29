import * as colors from 'ansi-colors';
import * as PluginError from 'plugin-error';

export default function throwError (msg: string): void {
  throw new PluginError('Error', {
    message: colors.red(msg.replace(/\t/g, '    '))
  });
};
