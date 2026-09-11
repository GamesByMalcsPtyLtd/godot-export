export interface ExportPresets {
  preset: { [key: string]: ExportPreset };
}

interface ExportPresetBase {
  name: string;
  export_path: string;
  custom_features: string;
}

interface NonMacExportPreset extends ExportPresetBase {
  platform: 'Windows Desktop' | 'Linux/X11' | 'Web' | 'Android' | 'iOS' | 'UWP';
}

interface MacOsExportPreset extends ExportPresetBase {
  platform: 'macOS';
  options: MacOsExportPresetOptions;
}

interface MacOsExportPresetOptions {
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

export type FeatureFlag = {
  flagName: string;
  defineConstant: string;
};
