import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button,
    Stack,
    TextField
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moreDefault from "../../../image/icon/more_default.png";
import moreHover from "../../../image/icon/more_hover.png";

import "./VBankPaymentInfoTable.css"
import {useState} from "react";
import VBankMoreMenu from "./VBankMoreMenu";
import Input from "../../Input";

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

    const [editMode, setEditMode] = useState({
        vBankId: "",
        originVBank: "",
        isEdit: false
    });
    const [isEditChanged, setIsEditChanged] = useState(false);
    const [editValue, setEditValue] = useState(null);

    const handleEditMode = (vBankId) => {
        setEditMode({
            vBankId: vBankId,
            originVBank: rows.find(r => r.vBankId === vBankId).vBank,
            isEdit: true
        });
    }
    const handleEditChanged = (event) => {
        setIsEditChanged(editMode.originVBank !== event.target.value);
        setEditValue(event.target.value);
    }

    const handleCancelEditMode = () => {
        setEditMode({vBankId: "", originVBank: "", isEdit: false});
        setIsEditChanged(false);
        setEditValue(null);
    }

    const columns = [
        {id: "vBank", label: "가상계좌"},
    ];

    const rows = [
        {
            vBankId: "1",
            vBank: "하나은행 1234123412341234 리버티"
        },
        {
            vBankId: "2",
            vBank: "국민은행 4321432143214321 리버티"
        }
    ]

    return (
        <Paper sx={{width: "100%", overflow: "hidden"}}>
            <TableContainer>
                <Table aria-label="customer table">
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow sx={{display: "block", padding: "16px"}}>
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
                                                <TableCell
                                                    key={column.id}
                                                    sx={{
                                                        paddingLeft: "100px",
                                                        paddingRight: "30px",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        verticalAlign: "middle"
                                                    }}
                                                >
                                                    {
                                                        editMode.isEdit && row.vBankId === editMode.vBankId ?
                                                            <TextField
                                                                id="inputEdit"
                                                                defaultValue={value}
                                                                onChange={handleEditChanged}
                                                            /> :
                                                            value
                                                    }
                                                    {
                                                        editMode.isEdit && row.vBankId === editMode.vBankId ?
                                                            <Stack direction="row" spacing={2}>
                                                                <Button
                                                                    disabled={!isEditChanged}
                                                                >수정</Button>
                                                                <Button
                                                                    onClick={handleCancelEditMode}
                                                                >취소</Button>
                                                            </Stack> :
                                                            <VBankMoreMenu
                                                                vBankId={row.vBankId}
                                                                handelEditMode={handleEditMode}
                                                            />
                                                    }

                                                    {/*<div id="btn-more-container">*/}
                                                    {/*<img src={moreHover} width={'19px'}/>*/}
                                                    {/*<img src={moreDefault} width={'19px'}/>*/}
                                                    {/*</div>*/}
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
