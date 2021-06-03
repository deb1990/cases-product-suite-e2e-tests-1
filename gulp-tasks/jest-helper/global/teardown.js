// Jest has issues with Global Setup/TearDown Files written in TS
// https://github.com/facebook/jest/issues/5164

const execSync = require('child_process').execSync;
const fs = require('fs');

module.exports = async function () {
  var config = JSON.parse(fs.readFileSync('site-config.json'));

  execSync('drush en session_limit -y', { encoding: 'utf8', cwd: config.root });
};
