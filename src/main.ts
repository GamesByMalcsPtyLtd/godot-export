import * as core from '@actions/core';
import { exportBuilds } from './godot.js';
import {
  ARCHIVE_OUTPUT,
  GODOT_ARCHIVE_PATH,
  GODOT_BUILD_PATH,
  RELATIVE_EXPORT_PATH,
  USE_PRESET_EXPORT_PATH,
} from './constants.js';
import { zipBuildResults, moveBuildsToExportDirectory } from './file.js';

async function main(): Promise<number> {
  const buildResults = await exportBuilds();
  if (!buildResults.length) {
    core.setFailed('No valid export presets found, exiting.');
    return 1;
  }

  if (ARCHIVE_OUTPUT) {
    await zipBuildResults(buildResults);
  }

  if (RELATIVE_EXPORT_PATH || USE_PRESET_EXPORT_PATH) {
    await moveBuildsToExportDirectory(buildResults, ARCHIVE_OUTPUT);
  }

  core.setOutput('build_directory', GODOT_BUILD_PATH);
  core.setOutput('noslash_build_directory', GODOT_BUILD_PATH.substring(1));
  core.setOutput('archive_directory', GODOT_ARCHIVE_PATH);
  return 0;
}

main().catch(err => {
  core.setFailed(err.message);
  process.exit(1);
});
