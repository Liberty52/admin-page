import { Stack, Button } from '@mui/material';
import LicenseProductOption from './LicenseProductOption';
// icon
// react
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// constants
import { ModalMode } from '../../constants/mode';
// axios
import { getDetatilLicense, getLicenseList, licenseOptionList, retrieveLiceneseOptionList, getOptionLicense} from '../../axios/License';
import LicenseOptionModal from './LicenseOptionModal';
import LicenseOptionDetailModal from './LicenseOptionDetailModal';


export default function LicenseOptionPanel() {
  const { productId } = useParams();

  const [showAll, setShowAll] = useState(false);
  const [changed, setChanged] = useState(false);
  const [licenseOptionDetailModalOpen, setLicenseOptionDetailModalOpen] = useState(false);
  const [optionDetailMode, setOptionDetailMode] = useState(ModalMode.ADD);
  const [licenseOptions, setLicenseOptions] = useState([]);
  const [licenseOptionId, setLicenseOptionId] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [optionDetailEditProps, setOptionDetailEditProps] = useState({
    licenseOptionDetailId: '',
    artName:'',
    artistName:'',
    stock:0,
    onSale: false,
    price: 0,
    artUrl:'',
    startDate:'',
    endDate:'',
  });

  const [licenseOptionProps, setLicenseOptionProps] = useState({
    id:'',
    name: '',
    require: false,
    onSale: false,
  })
  const [licenseOptionModalOpen, setLicenseOptionModalOpen] = useState(false);
  const [optionMode, setOptionMode] = useState(ModalMode.ADD);

  const getLicenseOptions = async() => {

    try{
      const response = await retrieveLiceneseOptionList(productId, !onSale);
      setLicenseOptions(response.data);
      console.log(response.data);
    
    }catch (e){
      console.error(e);

    }
  }

  const checkLicenseOption = () => {

  }

  const clearOptionEditProps = () => {
    setLicenseOptionProps({
      id: '',
      image: '',
      optionName: '',
      require: false,
      onSale: false,

    });
  };
  const clearOptionDetailEditProps = () => {
    setOptionDetailEditProps({
      licenseOptionDetailId: '',
      artName:'',
      artistName:'',
      stock:0,
      onSale: false,
      price: 0,
      startDate:'',
      endDate:'',
    });
  };
  const onOptionAddButtonClicked = () => {
    
    setLicenseOptionModalOpen(true);
    setOptionMode(ModalMode.ADD);
    setChanged((prev) => !prev);

  };
  const onOptionModifyButtonClicked = (licenseOption) => {
    setLicenseOptionModalOpen(true);
    setOptionMode(ModalMode.EDIT);
    console.log("id??"+licenseOption.licenseOptionId);
    setLicenseOptionProps({
      id: licenseOption.licenseOptionId,
      // name: licenseOption.name,
      // require: licenseOption.require,
      // onSale: licenseOption.onSale,
    });
  };
  const onOptionDetailModifyButtonClicked = (licenseDetail) => {
    setLicenseOptionDetailModalOpen(true);
    setOptionDetailMode(ModalMode.EDIT);
    setOptionDetailEditProps(licenseDetail);
  };
  const onOptionDetailAddButtonClicked = (id) => {
    setLicenseOptionDetailModalOpen(true);
    setOptionDetailMode(ModalMode.ADD);
    setLicenseOptionId(id);
    setChanged((prev) => !prev);
  };

  const actived = () => {
    setChanged((prev) => !prev);
  };


  useEffect(() => {

    getLicenseOptions();
    setImageUrl(imageUrl);

  }, [changed, showAll]);

  return (
    <>
      <Stack marginBottom={3} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
 
        <Button sx={{ fontWeight: 'bold' }} variant='outlined' onClick={onOptionAddButtonClicked}>
          라이선스 옵션 추가
        </Button>

      </Stack>
      
      {/*라이선스 옵션 공간*/}
      <Stack direction={'row'} flexWrap={'wrap'} useFlexGap spacing={2}>
     
        <>
        
        </>

        <LicenseProductOption 
          licenseOption = {licenseOptions}
          onOptionDetailAddButtonClicked={onOptionDetailAddButtonClicked}
          onOptionDetailModifyButtonClicked={onOptionDetailModifyButtonClicked}
          onOptionEditButtonClicked={onOptionModifyButtonClicked}
          imageFile={imageUrl}
          editProps={optionDetailEditProps}
          >
        </LicenseProductOption>

      </Stack>

      <LicenseOptionDetailModal
        open={licenseOptionDetailModalOpen}
        setOpen={setLicenseOptionDetailModalOpen}
        mode={optionDetailMode}
        licenseOptionId={licenseOptionId}
        setLicenseOptionId={setLicenseOptionId}
        editProps={optionDetailEditProps}
        clearEditProps={clearOptionDetailEditProps}
        actived={actived}
        imageFile={setImageUrl}
      />
      <LicenseOptionModal
        open={licenseOptionModalOpen}
        setOpen={setLicenseOptionModalOpen}
        mode={optionMode}
        productId={productId}
        editProps={licenseOptionProps}
        clearEditProps={clearOptionEditProps}
        actived={actived}
      />
    </>
  );
}
