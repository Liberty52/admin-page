import {Button, Grid, Input, Modal, ModalClose, Sheet, Stack} from "@mui/joy";
import Checkbox from '@mui/joy/Checkbox';

import {ModalMode} from "../../constants/mode";
import {useEffect, useState} from "react";
import {ProductOptionModalTitle} from "./styled/Product";
import {Toast} from "../../utils/Toast";
import {addProductOption, updateProductOption} from "../../axios/Product";

import { LicenseModalMode } from "../../constants/mode";
import { useParams } from "react-router-dom";
import LicenseOption from "./LicenseOption";

export default function LicenseOptionPanel(){


    const {licenseId} = useParams();
    const [changed, setChanged] = useState(false);
    const [licenseDetailModeOpen, setLicenseDetailModeOpen] = useState(false);
    const [licenseDetailMode, setLicenseDetailMode] = useState(LicenseModalMode.MODIFY);
    const [options, setOptions] = useState([]);
    const [optionId, setOptionId] = useState("");
    const [optionDetailEditProps, setOptionDetailEditProps] = useState({
        optionDetailId: "",
        optionDetailName: "",
        price: 0,
        stock: 0,
        onSale: false,
      });
    //   const getOptions = async () => {
    //     try {
    //       const response = await retrieve(productId, !showAll);
    //       setOptions(response.data);
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   };
      const [optionProps, setOptionProps] = useState({
        id: "",
        optionName: "",
        require: false,
        onSale: false,
      });
      const actived = () => {
        setChanged((prev) => !prev);
      };
    const LicenseOptionModifyClicked = (option) => {
        setLicenseDetailModeOpen(true);
        setLicenseDetailMode(ModalMode.EDIT);
        setOptionProps({
        id: option.optionId,
        optionName: option.optionName,
        require: option.require,
        onSale: option.onSale,
    });

    };

    useEffect(() => {})

    return (
        <>
        
       <Stack direction={"row"} flexWrap={"wrap"} useFlexGap spacing={2}>
        {options.map((o) => (
          <LicenseOption
            option={o}
            onOptionDetailEditButtonClicked={LicenseOptionModifyClicked}
            // onOptionEditButtonClicked={onOptionModifyButtonClicked}
            actived={actived}
          />
        ))}
      </Stack>
        
        </>
    );

}