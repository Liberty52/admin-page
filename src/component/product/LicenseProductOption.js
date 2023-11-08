import { Stack, Button } from '@mui/material';
import {
  HoverButton,
  HoverButtonWrapper,
  ProductOptionDetailAddButton,
  ProductOptionTitleWrapper,
  ProductLicenseOptionTitle
} from './styled/Product';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState, useRef } from 'react';
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
  const [image, setImage] = useState(imageFile);

  const onMouseOn = () => {
    setFocused(true);
  };
  const onMouseOut = () => {
    setFocused(false);
  };
 
  const [licenses, setLicenses] = useState(licenseOption.licenseOption);


 
  let reader = new FileReader();
  const ImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImage(e.target.files[0]);
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        imageFile.
        e.target.value = '';
      };
    }
  };



  return (
    <>
      <Stack sx={{ width: 250 }} spacing={2}>
        <ProductOptionTitleWrapper onMouseEnter={onMouseOn} onMouseLeave={onMouseOut}>
          <ProductLicenseOptionTitle>{licenseOption.optionName}</ProductLicenseOptionTitle>
          <HoverButtonWrapper focused={focused}>
            <HoverButton onClick={() => onOptionEditButtonClicked(licenseOption)}>
              <EditIcon />
            </HoverButton>    
          </HoverButtonWrapper>
        </ProductOptionTitleWrapper>
        <>
        <>
        </>
            
        </>
        {licenseOption.licenseOptionDetailList && licenseOption.licenseOptionDetailList.map((licenseOptionDetail,i) =>(
          <LicenseOptionDetail 
            key={i}
            licenseDetail = {licenseOptionDetail}
            actived={actived}
            onEditButtonClicked={onOptionDetailModifyButtonClicked}
        />
        ))}

        <ProductOptionDetailAddButton
          onClick={() => onOptionDetailAddButtonClicked(licenseOption.licenseOptionId)}
        >
          <ControlPointIcon />
        </ProductOptionDetailAddButton>
      </Stack>
    </>
  );
}
