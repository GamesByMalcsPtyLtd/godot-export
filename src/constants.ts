import * as core from '@actions/core';
import path from 'path';
import * as os from 'os';

const ARCHIVE_OUTPUT = core.getBooleanInput('archive_output');
const ARCHIVE_PREFIX = core.getInput('archive_prefix');
const ARCHIVE_POSTFIX = core.getInput('archive_postfix');
const CACHE_ACTIVE = core.getBooleanInput('cache');
// const GENERATE_RELEASE_NOTES = core.getBooleanInput('generate_release_notes');
const GODOT_DOWNLOAD_URL = core.getInput('godot_executable_download_url');
const GODOT_TEMPLATES_DOWNLOAD_URL = core.getInput('godot_export_templates_download_url');
const RELATIVE_EXPORT_PATH = core.getInput('relative_export_path');
const RELATIVE_PROJECT_PATH = core.getInput('relative_project_path');
const WINE_PATH = core.getInput('wine_path');
const USE_PRESET_EXPORT_PATH = core.getBooleanInput('use_preset_export_path');
const EXPORT_DEBUG = core.getBooleanInput('export_debug');
const GODOT_VERBOSE = core.getBooleanInput('verbose');
const ARCHIVE_ROOT_FOLDER = core.getBooleanInput('archive_root_folder');
const USE_GODOT_3 = core.getBooleanInput('use_godot_3');
const EXPORT_PACK_ONLY = core.getBooleanInput('export_as_pack');
const DOWNLOAD_RCODESIGN = core.getBooleanInput('download_rcodesign');
const RCODESIGN_VERSION = core.getInput('rcodesign_version');
const NOTARY_API_KEY_PATH = core.getInput('notary_api_key_path');
const SM_KEYPAIR_ALIAS = core.getInput('sm_keypair_alias');
const CS_PROJ_NAME = core.getInput('csproj_name');

function getCommaSeparatedInput(name: string): string[] | null {
  const inputString = core.getInput(name).trim();
  let input: string[] | null = null;
  if (inputString !== '') {
    input = inputString.split(',').map(s => s.trim());
    if (input.length === 0) input = null;
  }
  return input;
}

// Parse export targets
let exportPresets: string[] | null = null;
try {
  exportPresets = getCommaSeparatedInput('presets_to_export');
} catch (e) {
  core.warning('Malformed presets_to_export input. Exporting all presets by default.');
}
const PRESETS_TO_EXPORT = exportPresets;

// Parse license file paths
let licenseFilePaths: string[] | null = null;
try {
  licenseFilePaths = getCommaSeparatedInput('license_file_paths');
} catch (e) {
  core.warning('Malformed license_file_paths input. No license files will be added to the export result.');
}
const LICENSE_FILE_PATHS = licenseFilePaths;

const GODOT_WORKING_PATH = path.resolve(path.join(os.homedir(), '/.local/share/godot'));
const GODOT_EXPORT_TEMPLATES_PATH = path.resolve(
  path.join(
    os.homedir(),
    process.platform === 'darwin'
      ? 'Library/Application Support/Godot/export_templates'
      : '/.local/share/godot/export_templates',
  ),
);
const GODOT_CONFIG_PATH = path.resolve(path.join(os.homedir(), '/.config/godot'));
const GODOT_BUILD_PATH = path.join(GODOT_WORKING_PATH, 'builds');
const GODOT_ARCHIVE_PATH = path.join(GODOT_WORKING_PATH, 'archives');
const GODOT_PROJECT_PATH = path.resolve(path.join(RELATIVE_PROJECT_PATH));
const GODOT_PROJECT_FILE_PATH = path.join(GODOT_PROJECT_PATH, 'project.godot');

export {
  ARCHIVE_OUTPUT,
  ARCHIVE_PREFIX,
  ARCHIVE_POSTFIX,
  ARCHIVE_ROOT_FOLDER,
  CACHE_ACTIVE,
  EXPORT_DEBUG,
  EXPORT_PACK_ONLY,
  PRESETS_TO_EXPORT,
  // GENERATE_RELEASE_NOTES,
  GODOT_ARCHIVE_PATH,
  GODOT_BUILD_PATH,
  GODOT_CONFIG_PATH,
  GODOT_DOWNLOAD_URL,
  GODOT_EXPORT_TEMPLATES_PATH,
  GODOT_PROJECT_FILE_PATH,
  GODOT_PROJECT_PATH,
  GODOT_TEMPLATES_DOWNLOAD_URL,
  GODOT_VERBOSE,
  GODOT_WORKING_PATH,
  RELATIVE_EXPORT_PATH,
  RELATIVE_PROJECT_PATH,
  USE_GODOT_3,
  USE_PRESET_EXPORT_PATH,
  WINE_PATH,
  DOWNLOAD_RCODESIGN,
  RCODESIGN_VERSION,
  NOTARY_API_KEY_PATH,
  LICENSE_FILE_PATHS,
  SM_KEYPAIR_ALIAS,
  CS_PROJ_NAME,
};
