import colors from 'ansi-colors';
import PluginError from 'plugin-error';

/**
 * Throw Error.
 *
 * @param {string} msg message
 */
export default function throwError (msg: string): void {
  throw new PluginError('Error', {
    message: colors.red(msg.replace(/\t/g, '    '))
  });
};
