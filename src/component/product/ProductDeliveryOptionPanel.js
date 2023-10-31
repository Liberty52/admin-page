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

export default function ProductDeliveryOptionPanel() {
    const { productId } = useParams();
    const [deliveryPrice, setDeliveryPrice] = useState(null);
    const [selectedCourier, setSelectedCourier] = useState(null);
    const [initialDeliveryPrice, setInitialDeliveryPrice] = useState(null);
    const [initialSelectedCourier, setInitialSelectedCourier] = useState(null);

    const handleDeliveryPriceChange = (event) => {
        const inputPrice = event.target.value;
        if (/^\d*$/.test(inputPrice)) {
            setDeliveryPrice(inputPrice);
        }
    };

    const handleCourierChange = (event) => {
        setSelectedCourier(event.target.value);
    };

    const handlePostDeliveryOptions = () => {
        if (deliveryPrice === null || selectedCourier === null) {
            alert(VALUE_REQUIRED_MESSAGE);
            return;
        }

        const data = { selectedCourier, deliveryPrice };

        if (initialSelectedCourier === null && initialDeliveryPrice === null) {
            addDeliveryOption(productId, data)
                .then(() => {
                    alert(SUCCESS_MESSAGE_ADD);
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                    alert(ERROR_MESSAGE);
                });
        } else {
            updateDeliveryOption(productId, data)
                .then(() => {
                    alert(SUCCESS_MESSAGE_UPDATE);
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                    alert(ERROR_MESSAGE);
                });
        }
    };

    useEffect(() => {
        getDeliveryOption(productId)
            .then((data) => {
                if (data) {
                    setInitialSelectedCourier(data.courierName || null);
                    setInitialDeliveryPrice(data.fee || null);
                    setSelectedCourier(data.courierName || null);
                    setDeliveryPrice(data.fee || null);
                }
            })
            .catch((error) => {
                console.error('Error fetching delivery options:', error);
                alert(ERROR_MESSAGE);
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
                >
                    옵션 저장
                </Button>
            </Stack>
        </>
    );
}
