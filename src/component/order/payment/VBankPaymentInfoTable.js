import {
    Paper,
    Table, TableBody, TableCell, TableContainer, TableRow,
    Button, Stack, TextField,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import moreDefault from "../../../image/icon/more_default.png";
import moreHover from "../../../image/icon/more_hover.png";
import "./VBankPaymentInfoTable.css"
import {useState} from "react";
import VBankMoreMenu from "./VBankMoreMenu";
import {pink} from "@mui/material/colors";

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

    // >> START EDIT
    const [editMode, setEditMode] = useState({
        vBankId: "",
        originVBank: "",
        isEdit: false
    });
    const [isEditChanged, setIsEditChanged] = useState(false);
    const [editValue, setEditValue] = useState(null);
    const resetEditMode = () => {
        setEditMode({vBankId: "", originVBank: "", isEdit: false});
        setIsEditChanged(false);
        setEditValue(null);
    }
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
    const handleEdit = () => {
        alert(`${editValue} 수정 요청 진행`);
        resetEditMode();
    }
    const handleCancelEditMode = () => {
        resetEditMode();
    }
    // << END EDIT

    // >> START DELETE
    const [deleteMode, setDeleteMode] = useState({
        vBankId: "",
        vBank: "",
        isDelete: false
    });
    const resetDeleteMode = () => {
        setDeleteMode({vBankId: "", vBank: "", isDelete: false});
    }
    const handleDeleteMode = (vBankId) => {
        setDeleteMode({
            vBankId: vBankId, vBank: rows.find(r => r.vBankId === vBankId).vBank, isDelete: true
        })
    }
    const handleDelete = (vBankId) => {
        alert(`${vBankId} 삭제 진행`);
        resetDeleteMode();
    }
    const handleCancelDelete = () => {
        resetDeleteMode();
    }
    // << END DELETE

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
                                                                fullWidth
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
                                                                    onClick={handleEdit}
                                                                >수정</Button>
                                                                <Button
                                                                    onClick={handleCancelEditMode}
                                                                >취소</Button>
                                                            </Stack> :
                                                            <VBankMoreMenu
                                                                vBankId={row.vBankId}
                                                                handleEditMode={handleEditMode}
                                                                handleDeleteMode={handleDeleteMode}
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
            <div>
                {deleteMode.isDelete ?
                    <DeleteVBankDialog
                        vBankId={deleteMode.vBankId}
                        vBank={deleteMode.vBank}
                        handleDelete={handleDelete}
                        handleCancelDelete={handleCancelDelete}
                    /> :
                    null}
            </div>
        </Paper>
    );
}

function DeleteVBankDialog(props) {
    const [open, setOpen] = useState(true);

    const handleDeleted = () => {
        props.handleDelete(props.vBankId);
        setOpen(false);
    }

    const handleClose = () => {
        props.handleCancelDelete();
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`가상계좌 삭제`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`정말 ${props.vBank} 가상계좌를 삭제하시겠습니까?\n삭제한 이후에는 복구하기 어렵습니다.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleted} sx={{color: pink[500]}}>삭제</Button>
                    <Button onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}