import { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moreDefault from "../../../image/icon/more_default.png";
import moreHover from "../../../image/icon/more_hover.png";

export default function VBankPaymentInfoTable() {
    // const [rows, setRows] = useState([]);

    // useEffect(() => {
    //     getCanceledOrders(rowsPerPage, page - 1, cancelType)
    //         .then((res) => {
    //             setOrderIds([]);
    //             setRows([]);
    //             setCheckedOrderId([]);
    //             const startPage = res.data.startPage;
    //             const lastPage = res.data.lastPage;
    //             setHasPage({
    //                 hasPrev: page !== startPage && startPage !== 0,
    //                 hasNext: page !== lastPage && lastPage !== 0,
    //             });
    //             res.data.orders.map((d) => {
    //                 const row = createData(
    //                     d.orderId,
    //                     d.orderNumber,
    //                     d.orderDate,
    //                     d.productName,
    //                     d.orderStatus,
    //                     d.customerName,
    //                     d.reqAt,
    //                     d.canceledAt,
    //                     d.approvedAdminName
    //                 );
    //                 setRows((rows) => [...rows, row]);
    //                 setOrderIds((orderIds) => [...orderIds, d.orderId]);
    //             });
    //         })
    //         .catch((err) => alert(err.response.data.error_message));
    // }, [page, cancelType]);

    const columns = [
        { id: "vBank", label: "가상계좌" },
    ];

    const rows = [
        {
            vBankId: "1",
            vBank: "하나은행 ~~~~~~~~~"
        },
        {
            vBankId: "2",
            vBank: "국민은행 ~~~~~~~~~"
        }
    ]

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
                <Table aria-label="customer table">
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow sx={{ display: "block", padding: "16px" }}>
                                데이터가 없습니다
                            </TableRow>
                        ) : (
                            rows.map((row) => {
                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={row.vBankId}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id}>
                                                    {value}
                                                    <img src={moreDefault} width={'18px'} height={'18px'}/>
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
        </Paper>
    );
}
