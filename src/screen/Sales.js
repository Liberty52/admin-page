import { MainContainer } from '../component/common/MainComponent';
import SideNav from '../component/common/side-nav/SideNav';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTotalProfit } from '../component/sales/OverviewTotalProfit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { getTotalSales, getSpecificSales } from '../axios/Sales';
import { Button } from '@mui/joy';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Stack } from '@mui/joy';
import SalesDialog from '../component/sales/SalesDialog';
import { retrieveProduct } from '../axios/Product';
import { TextField } from '@mui/material';
import '../component/common/Input.css';
import { retrieveProductOptionList } from '../axios/Product';
import OverviewSales from '../component/sales/OverviewSales';
import BarChart from '../component/sales/BarChart';
import { Bar } from 'react-chartjs-2';
import '../component/common/Select.css';

const Sales = () => {
  const { productId, setProductId } = useState('');

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [productName, setProductName] = useState(null);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalSales, setTotalSales] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultProductName, setDefaultProductName] = useState();
  const [defaultStartDate, setDefaultStartDate] = useState();
  const [defaultEndDate, setDefaultEndDate] = useState();
  const [optionDetailId, setOptionDetailId] = useState(null);
  const [defaultOptionDetailId, setDefaultOptionDetailId] = useState();
  const [showAll, setShowAll] = useState(false);
  const month = useState({});
  const [monthlySalesTest, setMonthlySalesTest] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedName, setSelectedName] = useState();
  const [monthSales, setMonthSales] = useState([]);

  const salesDataByMonth = {
    '01': { salesMoney: 0, salesQuantity: 0 },
    '02': { salesMoney: 0, salesQuantity: 0 },
    '03': { salesMoney: 0, salesQuantity: 0 },
    '04': { salesMoney: 0, salesQuantity: 0 },
    '05': { salesMoney: 0, salesQuantity: 0 },
    '06': { salesMoney: 0, salesQuantity: 0 },
    '07': { salesMoney: 0, salesQuantity: 0 },
    '08': { salesMoney: 0, salesQuantity: 0 },
    '09': { salesMoney: 0, salesQuantity: 0 },
    10: { salesMoney: 0, salesQuantity: 0 },
    11: { salesMoney: 0, salesQuantity: 0 },
    12: { salesMoney: 0, salesQuantity: 0 },
  };

  const monthlySales = monthSales || [];

  const defaultYearData = monthlySales;

  defaultYearData.map((monthSales) => {
    if (monthSales.length === 0) {
      salesDataByMonth[month] = {
        salesMoney: 0,
        salesQuantity: 0,
      };
    } else {
      const { month, salesMoney, salesQuantity } = monthSales;
      salesDataByMonth[month] = {
        salesMoney: salesMoney,
        salesQuantity: salesQuantity,
      };
    }
  });

  const getTotalSalesProfit = (data) => {
    monthSalesTotal(data);
  };

  const monthSalesTotal = (data) => {
    const monthlySales = [
      {
        year: '2023',
        month: '12',
        salesMoney: 8000,
        salesQuantity: 16,
      },
    ];

    if (monthlySales === null) {
      salesDataByMonth[month] = {
        salesMoney: 0,
        salesQuantity: 0,
      };
    } else {
      monthlySales.map((monthSales) => {
        if (monthSales.length === 0) {
          salesDataByMonth[month] = {
            salesMoney: 0,
            salesQuantity: 0,
          };
        } else {
          const { month, salesMoney, salesQuantity } = monthSales;

          salesDataByMonth[month] = {
            salesMoney: salesMoney,
            salesQuantity: salesQuantity,
          };
        }
      });
    }
  };

  useEffect(() => {
    getProduct();

    getTotal();
  }, [productId, showAll]);

  const getProduct = async () => {
    try {
      const response = await retrieveProduct();
      setProduct(response.data);
      setProducts(response.data);
      const selectedId = response.data.map((p) => p.id);
      setSelectedId(selectedId);
      const selectedName = product.map((p) => p.name);
      setSelectedName(selectedName);
    } catch (e) {
      console.error(e);
    }
  };

  const getTotal = () => {
    getTotalSales({
      defaultStartDate,
      defaultEndDate,
      defaultProductName,
      defaultOptionDetailId,
    }).then((res) => {
      const prevData = res.data;
      setTotalSales(prevData.totalSalesMoney);
      setMonthSales(prevData.monthlySales);

      getTotalSalesProfit(prevData.monthlySales);
      monthSalesTotal(prevData.monthlySales);
      setMonthlySalesTest(prevData.monthlySales);
    });
  };

  const dateData = () => {
    getSpecificSales({ startDate, endDate, productName, optionDetailId }).then((res) => {
      const prevData = res.data;

      setMonthSales(prevData.monthlySales);
      setMonthlySalesTest(prevData.monthlySales);
    });
  };

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setIsModalOpen(false);
  };
  const sortedMonthlySales = monthlySales.sort((a, b) => a.month.localeCompare(b.month));
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = (index + 1).toString().padStart(2, '0');
    const salesData = sortedMonthlySales.find((sales) => sales.month === month);
    return salesData ? salesData.salesQuantity : 0;
  });

  const monthlyDataSales = Array.from({ length: 12 }, (_, index) => {
    const month = (index + 1).toString().padStart(2, '0');
    const salesData = sortedMonthlySales.find((sales) => sales.month === month);
    return salesData ? salesData.salesMoney : 0;
  });

  const labels = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '월별 판매액',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        barThickness: 30,
        data: monthlyDataSales,
      },
    ],
  };
  const chartData2 = {
    labels: labels,
    datasets: [
      {
        label: '월별 판매량',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: monthlyData,
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },

    plugins: {
      title: {
        display: true,
        text: '총 상품 판매량',
        align: 'start',
        font: {
          size: 23,
        },
      },
    },
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

  const highFunction = (value) => {
    setOptionDetailId(value);
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
            <Grid xs={12} sm={6} lg={3} style={{ marginTop: '10px', marginRight: '30px' }}>
              <OverviewTotalProfit sx={{ height: '810px', width: '300px' }} value={totalSales} />
            </Grid>
            <Grid xs={12} lg={8}>
              <div style={{ width: '800px' }}>
                <Stack direction={'row'} style={{ marginTop: '10px', marginRight: '20px' }}>
                  <TextField
                    label='상품 이름'
                    value={productName}
                    onChange={textProductName}
                    style={{ width: '600px' }}
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
                  <div className='datePicker'>
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
                  </div>

                  <Button
                    onClick={dateData}
                    color={'primary'}
                    style={{
                      height: '50px',
                      marginLeft: '24px',
                      marginTop: '10px',
                      width: '100px',
                    }}
                  >
                    설정하기
                  </Button>
                </Stack>
              </div>

              <div style={{ paddingLeft: '12px', marginBottom: '50px' }}>
                <Bar data={chartData2} options={chartOptions} />

                <Bar data={chartData} options={chartOptions} />
              </div>
            </Grid>
            <Grid xs={12} md={6} lg={4}></Grid>

            <SalesDialog
              open={open}
              onClose={closeDialog}
              productId={selectedId}
              name={selectedName}
              products={product}
              propFunction={highFunction}
            ></SalesDialog>

            <Grid xs={12} md={6} lg={4}></Grid>
          </Grid>
        </Container>
      </Box>
    </MainContainer>
  );
};

export default Sales;
