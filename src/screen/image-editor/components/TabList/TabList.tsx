import React, { useState } from 'react';
import {
  ImageEditorSettingType,
  matchImageEditorSetting,
} from '../../../../types/ImageEditorSetting/enum.ts';
import { Tab, Tabs } from '@mui/material';

const nameOf = (tab: ImageEditorSettingType) =>
  matchImageEditorSetting(tab, { previewEffect: () => '미리보기 효과 이미지', foo: () => '' });

interface TabListProps {
  tabs: readonly ImageEditorSettingType[];
  onSelected: (tab: ImageEditorSettingType) => void;
}

const TabList = (props: TabListProps) => {
  const [tabValue, updateTabValue] = useState(0);
  return (
    <Tabs
      value={tabValue}
      onChange={(_e, v) => {
        updateTabValue(v);
        props.onSelected(props.tabs[v]);
      }}
    >
      {props.tabs.map((tab, index) => (
        <Tab key={tab} label={nameOf(tab)} id={tab} value={index} />
      ))}
    </Tabs>
  );
};

export default TabList;
