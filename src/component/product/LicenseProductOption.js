import { Stack, Button } from '@mui/material';
import {
  HoverButton,
  HoverButtonWrapper,
  ProductOptionDetailAddButton,
  ProductOptionTitleWrapper,
  ProductLicenseOptionTitle,
} from './styled/Product';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import LicenseOptionDetail from './LicenseOptionDetail';

export default function LicenseProductOption({
  licenseOption,
  onOptionDetailAddButtonClicked,
  onOptionDetailModifyButtonClicked,
  onOptionEditButtonClicked,
  actived,
  editProps,
  imageFile,
}) {
  const [focused, setFocused] = useState();
  const onMouseOn = () => {
    setFocused(true);
  };
  const onMouseOut = () => {
    setFocused(false);
  };

  return (
    <>
      <Stack sx={{ width: 250 }} spacing={2}>
        <ProductOptionTitleWrapper onMouseEnter={onMouseOn} onMouseLeave={onMouseOut}>
          <ProductLicenseOptionTitle onSale={licenseOption.onSale}>
            {licenseOption.optionName}
          </ProductLicenseOptionTitle>
          <HoverButtonWrapper focused={focused} name={licenseOption.optionName}>
            <HoverButton onClick={() => onOptionEditButtonClicked(licenseOption)}>
              <EditIcon />
            </HoverButton>
          </HoverButtonWrapper>
        </ProductOptionTitleWrapper>
        <>
          {licenseOption.licenseOptionDetailList &&
            licenseOption.licenseOptionDetailList.map((licenseOptionDetail, i) => (
              <LicenseOptionDetail
                key={i}
                licenseDetail={licenseOptionDetail}
                actived={actived}
                onEditButtonClicked={onOptionDetailModifyButtonClicked}
              />
            ))}
          <>
            {licenseOption.optionName != null ? (
              <ProductOptionDetailAddButton
                onClick={() => onOptionDetailAddButtonClicked(licenseOption.licenseOptionId)}
              >
                <ControlPointIcon />
              </ProductOptionDetailAddButton>
            ) : (
              <></>
            )}
          </>
        </>
      </Stack>
    </>
  );
}
