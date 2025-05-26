export interface ExportPresets {
  preset: { [key: string]: ExportPreset };
}

interface ExportPresetBase {
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export_path: string;
}

interface NonMacExportPreset extends ExportPresetBase {
  platform: 'Windows Desktop' | 'Linux/X11' | 'Web' | 'Android' | 'iOS' | 'UWP';
}

interface MacOsExportPreset extends ExportPresetBase {
  platform: 'macOS';
  options: MacOsExportPresetOptions;
}

interface MacOsExportPresetOptions {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'notarization/notarization': string;
}

export type ExportPreset = NonMacExportPreset | MacOsExportPreset;

export type BuildResult = {
  directory: string;
  sanitizedName: string;
  executablePath: string;
  directoryEntryCount: number;
  preset: ExportPreset;
  archivePath?: string;
};
