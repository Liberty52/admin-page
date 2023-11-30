import React, { useState } from 'react';
import SideNav from '../../component/common/side-nav/SideNav.js';
import {
  ImageEditorSettingPageContentMain,
  ImageEditorSettingPageTabPanel,
  ImageEditorSettingPageTitle,
} from './page.styled.tsx';
import TabList from './components/TabList/TabList.tsx';
import {
  ImageEditorSettingType,
  ImageEditorSettingTypes,
  matchImageEditorSetting,
} from '../../types/ImageEditorSetting/enum.ts';
import PreviewEffectList from './components/PreviewEffectList/PreviewEffectList.tsx';
import { MainContainer } from '../../component/common/MainComponent.js';

const tabContentOf = (type: ImageEditorSettingType) =>
  matchImageEditorSetting(type, {
    previewEffect: () => <PreviewEffectList />,
    foo: () => <div>빈 탭</div>,
  });

const ImageEditorSetting = () => {
  const [selectedTab, updateSelectedTab] = useState<ImageEditorSettingType>(
    ImageEditorSettingTypes[0],
  );

  return (
    <MainContainer>
      <SideNav />
      <ImageEditorSettingPageContentMain>
        <ImageEditorSettingPageTitle>이미지 편집기 설정</ImageEditorSettingPageTitle>
        <TabList tabs={ImageEditorSettingTypes} onSelected={(tab) => updateSelectedTab(tab)} />
        <ImageEditorSettingPageTabPanel>{tabContentOf(selectedTab)}</ImageEditorSettingPageTabPanel>
      </ImageEditorSettingPageContentMain>
    </MainContainer>
  );
};

export default ImageEditorSetting;
