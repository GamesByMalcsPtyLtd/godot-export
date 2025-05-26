import { exec } from '@actions/exec';
import * as core from '@actions/core';
import { NOTARY_API_KEY_PATH, GODOT_PROJECT_PATH } from './constants';
import * as path from 'path';

const GODOT_MACOS_NOTARIZATION_API_UUID = 'GODOT_MACOS_NOTARIZATION_API_UUID';
const GODOT_MACOS_NOTARIZATION_API_KEY = 'GODOT_MACOS_NOTARIZATION_API_KEY';
const GODOT_MACOS_NOTARIZATION_API_KEY_ID = 'GODOT_MACOS_NOTARIZATION_API_KEY_ID';

/**
 * Attempts to automatically convert the app store connect API key based on Environment variables + inputs
 */
export async function autoConvertAppStoreConnectAPIKey(rcodesignpath: string): Promise<string> {
  if (!NOTARY_API_KEY_PATH) return '';
  core.startGroup('Converting App Store Connect API Key to json');
  let issuerId: string;
  let keyId: string;
  let outputPath: string;
  if (process.env[GODOT_MACOS_NOTARIZATION_API_UUID] === undefined) {
    throw new Error(
      `${GODOT_MACOS_NOTARIZATION_API_UUID} environment variable not set. Please set this to the issuer id of your api key.`,
    );
  } else {
    issuerId = process.env[GODOT_MACOS_NOTARIZATION_API_UUID];
  }
  if (process.env[GODOT_MACOS_NOTARIZATION_API_KEY] === undefined) {
    throw new Error(
      `${GODOT_MACOS_NOTARIZATION_API_KEY} environment variable not set. Please set this to the relative path of the output .json API key to your godot project.`,
    );
  } else {
    outputPath = path.resolve(GODOT_PROJECT_PATH, process.env[GODOT_MACOS_NOTARIZATION_API_KEY]);
  }
  if (process.env[GODOT_MACOS_NOTARIZATION_API_KEY_ID] === undefined) {
    throw new Error(
      `${GODOT_MACOS_NOTARIZATION_API_KEY_ID} environment variable not set. Please set this to the id of your api key.`,
    );
  } else {
    keyId = process.env[GODOT_MACOS_NOTARIZATION_API_KEY_ID];
  }
  await exec(rcodesignpath, [
    'encode-app-store-connect-api-key',
    '-o',
    outputPath,
    issuerId,
    keyId,
    NOTARY_API_KEY_PATH,
  ]);

  core.endGroup();
  return outputPath;
}

export async function waitForNotarizationThenStaple(
  rcodesignpath: string,
  apiKeyFile: string,
  submissionId: string,
  appPath: string,
): Promise<void> {
  await waitForNotarizationToFinish(rcodesignpath, apiKeyFile, submissionId);
  await stapleNotarizationTicket(rcodesignpath, appPath);
}

export async function waitForNotarizationToFinish(
  rcodesignpath: string,
  apiKeyFile: string,
  submissionId: string,
): Promise<void> {
  core.info(`Waiting for notarization to finish for ${submissionId}`);
  await exec(rcodesignpath, ['notary-wait', '--api-key-file', apiKeyFile, submissionId]);
}

export async function stapleNotarizationTicket(rcodesignpath: string, appPath: string): Promise<void> {
  core.info(`Stapling application at ${appPath}`);
  await exec(rcodesignpath, ['staple', appPath]);
}
