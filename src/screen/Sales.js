import { useState } from 'react';
import { MainContainer } from '../component/common/MainComponent';
import SideNav from '../component/common/side-nav/SideNav';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTotalProfit } from '../component/sales/OverviewTotalProfit';
import { OverviewSales } from '../component/sales/OverviewSales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { getTotalSales, getSpecificSales } from '../axios/Sales';
import { Button } from '@mui/joy';
import dayjs from 'dayjs';
import { Stack } from '@mui/joy';
import SalesDialog from '../component/sales/SalesDialog';
import { retrieveProduct } from '../axios/Product';
import { TextField } from '@mui/material';
import '../component/common/Input.css';

const Sales = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [productName, setProductName] = useState(null);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalSales, setTotalSales] = useState();
  const [sales, setSales] = useState();
  const [salesMoney, setSalesMoney] = useState();
  const [salesQuantity, setSalesQuantity] = useState();
  const [defaultProductName, setDefaultProductName] = useState();
  const [defaultStartDate, setDefaultStartDate] = useState();
  const [defaultEndDate, setDefaultEndDate] = useState();
  useEffect(() => {
    getProduct();
    getTotal();
  }, []);

  const getProduct = async () => {
    try {
      const response = await retrieveProduct();
      setProduct(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getTotal = () => {
    getTotalSales({ defaultProductName, defaultStartDate, defaultEndDate }).then((res) => {
      const prevData = res.data;
      setTotalSales(prevData.salesMoney);
    });
  };
  const dateData = () => {
    getSpecificSales({ productName, startDate, endDate }).then((res) => {
      const prevData = res.data;
      setSales(prevData);
      setSalesMoney(prevData.salesMoney);
      setSalesQuantity(prevData.salesQuantity);
    });
  };
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };
  const textProductName = (e) => {
    setProductName(e.target.value);
  };
  const startDateOption = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setStartDate(formattedDate);
  };

  const endDateOption = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setEndDate(formattedDate);
  };

  return (
    <MainContainer>
      <SideNav />
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
          px: 3,
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={0}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: '100%' }} value={totalSales} />
            </Grid>

            <Grid xs={12} lg={8}>
              <Stack direction={'row'} style={{ marginTop: '10px' }}>
                <TextField
                  label='상품 이름'
                  value={productName}
                  onChange={textProductName}
                  style={{ width: '553px' }}
                ></TextField>
                <Button
                  onClick={openDialog}
                  color={'primary'}
                  style={{
                    height: '50px',
                    marginLeft: '3%',
                    width: '100px',
                  }}
                >
                  검색하기
                </Button>
              </Stack>

              <Stack direction={'row'}>
                <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
                  <DemoContainer components={['DatePicker']}>
                    <>
                      <DatePicker
                        name='startDate'
                        label='Start'
                        format='YYYY-MM-DD'
                        onChange={(newValue) => {
                          startDateOption(newValue);
                        }}
                      ></DatePicker>
                      <DatePicker
                        name='endDate'
                        label='End'
                        format='YYYY-MM-DD'
                        onChange={(newValue) => {
                          endDateOption(newValue);
                        }}
                      />
                    </>
                  </DemoContainer>
                </LocalizationProvider>
                <Button
                  onClick={dateData}
                  color={'primary'}
                  style={{ height: '50px', marginLeft: '20px', marginTop: '10px', width: '100px' }}
                >
                  설정하기
                </Button>
              </Stack>
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: '100%' }}
                salesMoney={salesMoney}
                salesQuantity={salesQuantity}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}></Grid>
            <Grid xs={12} md={6} lg={4}></Grid>
          </Grid>
          <SalesDialog open={open} onClose={closeDialog} product={product.name} />
        </Container>
      </Box>
    </MainContainer>
  );
};

export default Sales;
