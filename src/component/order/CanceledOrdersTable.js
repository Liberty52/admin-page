import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
} from '@mui/material';
import { PageContainer, Page } from './index';
import { getCanceledOrders } from '../../axios/Orders';
import { useNavigate } from 'react-router-dom';

export default function CanceledOrdersTable({
  page,
  setPage,
  cancelType,
  checkedOrderId,
  setCheckedOrderId,
}) {
  const [rows, setRows] = useState([]);
  const rowsPerPage = 6; // 한 페이지 당 데이터
  const [hasPage, setHasPage] = useState({ hasPrev: false, hasNext: false });
  const [orderIds, setOrderIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCanceledOrders(rowsPerPage, page - 1, cancelType)
      .then((res) => {
        setOrderIds([]);
        setRows([]);
        setCheckedOrderId([]);
        const startPage = res.data.startPage;
        const lastPage = res.data.lastPage;
        setHasPage({
          hasPrev: page !== startPage && startPage !== 0,
          hasNext: page !== lastPage && lastPage !== 0,
        });
        res.data.orders.map((d) => {
          const row = createData(
            d.orderId,
            d.orderNumber,
            d.orderDate,
            d.productName,
            d.orderStatus,
            d.customerName,
            d.reqAt,
            d.canceledAt,
            d.approvedAdminName,
          );
          setRows((rows) => [...rows, row]);
          setOrderIds((orderIds) => [...orderIds, d.orderId]);
        });
      })
      .catch((err) => alert(err.response.data.error_message));
  }, [page, cancelType]);

  function createData(
    orderId,
    orderNumber,
    orderDate,
    productName,
    orderStatus,
    customerName,
    reqAt,
    canceledAt,
    approvedAdminName,
  ) {
    return {
      orderId,
      orderNumber,
      orderDate,
      productName,
      orderStatus,
      customerName,
      reqAt,
      canceledAt,
      approvedAdminName,
    };
  }

  const columns = [
    { id: 'orderNumber', label: '주문번호' },
    { id: 'orderDate', label: '주문일시' },
    { id: 'productName', label: '상품명' },
    {
      id: 'orderStatus',
      label: '주문상태',
    },
    {
      id: 'customerName',
      label: '구매자명',
    },
    {
      id: 'reqAt',
      label: '요청일시',
    },
    {
      id: 'canceledAt',
      label: '취소일시',
    },
    {
      id: 'approvedAdminName',
      label: '담당자명',
    },
  ];

  const selectAllOrders = () => {
    if (orderIds.length === checkedOrderId.length) setCheckedOrderId([]);
    else setCheckedOrderId(orderIds);
  };

  const selectOrder = (e, orderId) => {
    e.stopPropagation();
    if (checkedOrderId.includes(orderId))
      setCheckedOrderId(checkedOrderId.filter((o) => o != orderId));
    else setCheckedOrderId([...checkedOrderId, orderId]);
  };

  const isSelected = (orderId) => {
    if (checkedOrderId.includes(orderId)) return true;
    return false;
  };

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };

  const Pages = () => {
    return (
      <PageContainer>
        <IconButton
          sx={{ visibility: !hasPage.hasPrev && 'hidden' }}
          onClick={(e) => {
            handleChangePage(e, page - 1);
          }}
        >
          ←
        </IconButton>
        <Page>{page}</Page>
        <IconButton
          sx={{ visibility: !hasPage.hasNext && 'hidden' }}
          onClick={(e) => {
            handleChangePage(e, page + 1);
          }}
        >
          →
        </IconButton>
      </PageContainer>
    );
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table aria-label='customer table'>
          <TableHead>
            <TableRow>
              <TableCell>
                {rows.length !== 0 && (
                  <Checkbox
                    checked={orderIds.length === checkedOrderId.length}
                    onChange={() => {
                      selectAllOrders();
                    }}
                    inputProps={{
                      'aria-label': 'select all orders',
                    }}
                  />
                )}
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow sx={{ display: 'block', padding: '16px' }}>데이터가 없습니다</TableRow>
            ) : (
              rows.map((row) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.orderId}
                    onClick={(e) => {
                      navigate(`/order/canceled/${row.orderId}`);
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected(row.orderId)}
                        onClick={(e) => selectOrder(e, row.orderId)}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='center'>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pages />
    </Paper>
  );
}
