import { Stack, Button, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDeliveryOption, addDeliveryOption, updateDeliveryOption } from '../../axios/Product';
import {
    COURIER_OPTIONS,
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
    const [selectedCourier, setSelectedCourier] = useState(null);

    const handleDeliveryPriceChange = (event) => {
        const inputPrice = event.target.value;
        if (/^\d*$/.test(inputPrice)) {
            const parsedPrice = parseFloat(inputPrice);
            setDeliveryPrice(parsedPrice);
        }
    };
    const handleCourierChange = (event) => {
        setSelectedCourier(event.target.value);
        console.log(selectedCourier)
    };
    const handlePostDeliveryOptions = () => {
        if (deliveryPrice === null || selectedCourier === null) {
            alert(VALUE_REQUIRED_MESSAGE);
            return;
        }
        const data = { "courierName": selectedCourier, "fee": deliveryPrice };
        console.log(data)
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

    useEffect(() => {
        getDeliveryOption(productId)
            .then((data) => {
                if (data) {
                    setInitialData(data.data);
                    setSelectedCourier(data.data.courierName || null);
                    setDeliveryPrice(data.data.fee || null);
                    console.log(data.data, initialData, selectedCourier, deliveryPrice)
                }
            })
            .catch((error) => {
                console.error('Error fetching delivery options:', error);
                Swal.fire({
                    title: ERROR_MESSAGE + "("+error+")",
                    icon: 'error',
                });
            });
    }, [productId]);

    return (
        <>
            <Stack direction={'row'} alignItems={'center'}>
                <TextField
                    label="가격"
                    value={deliveryPrice !== null ? deliveryPrice : ''}
                    onChange={handleDeliveryPriceChange}
                    sx={{ width: '30ch', marginRight: '10px' }}
                />
                <TextField
                    select
                    label="택배사 선택"
                    value={selectedCourier !== null ? selectedCourier : ''}
                    onChange={handleCourierChange}
                    sx={{ width: '30ch', marginRight: '10px' }}
                >
                    {COURIER_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePostDeliveryOptions}
                >옵션 저장</Button>
            </Stack>
        </>
    );
}
