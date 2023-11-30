export const ImageEditorSettingTypes = ['PreviewEffect', 'foo'] as const;

export type ImageEditorSettingType = (typeof ImageEditorSettingTypes)[number];

export function matchImageEditorSetting<R>(
  value: ImageEditorSettingType,
  map: {
    previewEffect: (value: ImageEditorSettingType) => R;
    foo: (value: ImageEditorSettingType) => R;
  },
) {
  switch (value) {
    case 'PreviewEffect':
      return map.previewEffect(value);
    case 'foo':
      return map.foo(value);
  }
}
