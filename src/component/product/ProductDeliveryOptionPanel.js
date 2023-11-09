import {Stack, Button, TextField, MenuItem, FormControl, InputLabel, Select} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDeliveryOption, addDeliveryOption, updateDeliveryOption } from '../../axios/Product';
import { getDeliveryCompanies } from "../../axios/Orders";
import {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE_ADD,
    SUCCESS_MESSAGE_UPDATE,
    VALUE_REQUIRED_MESSAGE
} from "../../constants/message";
import Swal from "sweetalert2";

export default function ProductDeliveryOptionPanel() {
    const { productId } = useParams();
    const [initialData, setInitialData] = useState((null));
    const [deliveryPrice, setDeliveryPrice] = useState(null);

    const [international, setInternational] = useState(null);
    const [domesticDeliveryData, setDomesticDeliveryData] = useState([]);
    const [internationalDeliveryData, setInternationalDeliveryData] = useState([]);
    const [deliveryCompanies, setDeliveryCompanies] = useState([]);
    const [deliveryInfo, setDeliveryInfo] = useState(null);

    useEffect(() => {
        getDeliveryOption(productId)
            .then((data) => {
                if (data) {
                    setInitialData(data.data);
                    setDeliveryPrice(data.data.fee || null);

                    return Promise.all([
                        getDeliveryCompanies(false),
                        getDeliveryCompanies(true)
                    ]);
                }
            })
            .then(([domesticRes, internationalRes]) => {
                const newDomesticDeliveryData = domesticRes?.data.documents;
                const newInternationalDeliveryData = internationalRes?.data.documents;
                setDomesticDeliveryData(newDomesticDeliveryData);
                setInternationalDeliveryData(newInternationalDeliveryData);
            })
            .catch((error) => {
                console.error('Error fetching delivery options:', error);
                Swal.fire({
                    title: ERROR_MESSAGE + "("+error+")",
                    icon: 'error',
                });
            });
    }, [productId]);

    useEffect(() => {
        if (initialData) {
            const domesticMatchingData =
                domesticDeliveryData.find(data => data.courierName === initialData.courierName);
            const internationalMatchingData =
                internationalDeliveryData.find(data => data.courierName === initialData.courierName);

            if (domesticMatchingData) {
                setInternational(false);
                setDeliveryCompanies(domesticDeliveryData);
                setDeliveryInfo(domesticMatchingData);
            } else if (internationalMatchingData) {
                setInternational(true);
                setDeliveryCompanies(internationalDeliveryData);
                setDeliveryInfo(internationalMatchingData);
            }
        }
    }, [initialData, domesticDeliveryData, internationalDeliveryData]);

    const handleChangeInternational = (e) => {
        if (e.target.value == false) {
            setInternational(false);
            setDeliveryCompanies(domesticDeliveryData);
        } else if (e.target.value == true) {
            setInternational(true);
            setDeliveryCompanies(internationalDeliveryData);
        }
    };

    const handleChangeDeliveryInfo = (e) => {
        if (e.target.name === undefined) {
            const prevData = e.target.value;
            setDeliveryInfo(prevData);
        } else {
            setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
        }
    };

    const handleDeliveryPriceChange = (event) => {
        const inputPrice = event.target.value;
        if (/^\d*$/.test(inputPrice)) {
            const parsedPrice = parseFloat(inputPrice);
            setDeliveryPrice(parsedPrice);
        }
    };

    const handlePostDeliveryOptions = () => {
        if (deliveryPrice === null) {
            alert(VALUE_REQUIRED_MESSAGE);
            return;
        }
        const data = { courierName: deliveryInfo.courierName, fee: deliveryPrice };
        if (initialData !== null) {
            updateDeliveryOption(productId, data)
                .then(() => {
                    Swal.fire({
                        title: SUCCESS_MESSAGE_UPDATE,
                        icon: 'success',
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: ERROR_MESSAGE + "("+error+")",
                        icon: 'error',
                    });
                });
        } else {
            addDeliveryOption(productId, data)
                .then(() => {
                    Swal.fire({
                        title: SUCCESS_MESSAGE_ADD,
                        icon: 'success',
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: ERROR_MESSAGE + "("+error+")",
                        icon: 'error',
                    });
                });
        }
    };

    return (
        <>
            <Stack direction={'row'} alignItems={'center'}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='international-label' shrink={international !== null}>국내/외</InputLabel>
                    <Select
                        id='international-label'
                        labelId='international-label'
                        label='국내/외'
                        value={international}
                        onChange={handleChangeInternational}
                    >
                        <MenuItem value={false}>국내</MenuItem>
                        <MenuItem value={true}>국제</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='delivery-company-label' shrink={deliveryInfo !== null}>택배사</InputLabel>
                    <Select
                        id='delivery-company-label'
                        labelId='delivery-company-label'
                        label='택배사'
                        value={deliveryInfo}
                        onChange={handleChangeDeliveryInfo}
                    >
                        {deliveryCompanies?.map((deliveryCompany) => {
                            return (
                                <MenuItem key={deliveryCompany.courierCode} value={deliveryCompany}>
                                    {deliveryCompany?.courierName}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <TextField
                    label="가격"
                    value={deliveryPrice !== null ? deliveryPrice : ''}
                    onChange={handleDeliveryPriceChange}
                    sx={{ width: '30ch', marginRight: '10px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePostDeliveryOptions}
                >옵션 저장</Button>
            </Stack>
        </>
    );
}
