import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import "./VBankPaymentInfoTable.css";
import React, {useEffect, useState} from "react";
import VBankMoreMenu from "./VBankMoreMenu";
import {blue, pink} from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../Modal";
import {deleteVBank, getVBanks, postCreateNewVBank, putVBank} from "../../../axios/Orders";

export default function VBankPaymentInfoTable() {
    const [rows, setRows] = useState([]);

    const columns = [{id: "vBank", label: "가상계좌"}];
    const setVBankData = (vbankId, bankOfVBank, accountNumber, holder, vbank, createdAt, updatedAt) => {
        return {
            vbankId, bankOfVBank, accountNumber, holder, vbank, createdAt, updatedAt
        }
    }

    useEffect(() => {
        fetchVBankList();
    }, []);

    const fetchVBankList = () => {
        getVBanks()
            .then((res) => {
                setRows([]);
                res.data.vbanks.map((d) => {
                    const row = setVBankData(
                        d.vbankId,
                        d.bankOfVBank,
                        d.accountNumber,
                        d.holder,
                        d.vbank,
                        d.createdAt,
                        d.updatedAt
                    );
                    setRows((rows) => [...rows, row]);
                });
            })
            .catch((err) => alert(`가상계좌 리스트 조회 실패.\n${err.response.data.errorMessage}`));
    }

    // >> START ADD
    const [addModal, showAddModal] = useState(false);
    const handleAdd = () => {
        showAddModal(true);
    };
    const handleAddFinish = () => {
        showAddModal(false);
        fetchVBankList();
    };
    // << END ADD

    // >> START EDIT
    const [editMode, setEditMode] = useState({
        vbankId: "",
        originBank: "",
        originAccountNumber: "",
        originHolder: "",
        isEdit: false,
    });
    const [isEditChanged, setIsEditChanged] = useState(false);
    const [editValue, setEditValue] = useState({
        bank: "",
        accountNumber: "",
        holder: ""
    });
    const resetEditMode = () => {
        setEditMode({vbankId: "", originBank: "", originAccountNumber:"", originHolder:"", isEdit: false});
        setIsEditChanged(false);
        setEditValue(null);
    };
    const handleEditMode = (vBankId) => {
        const vbankInfo = rows.find((r) => r.vbankId === vBankId);
        setEditMode({
            vbankId: vBankId,
            originBank: vbankInfo.bankOfVBank,
            originAccountNumber: vbankInfo.accountNumber,
            originHolder: vbankInfo.holder,
            isEdit: true,
        });
    };
    const handleEditChanged = (changedValue) => {
        const isChanged = editMode.originBank !== changedValue.bank ||
            editMode.originAccountNumber !== changedValue.accountNumber ||
            editMode.originHolder !== changedValue.holder;
        setIsEditChanged(isChanged);
        if (isChanged) {
            setEditValue({
                bank: changedValue.bank,
                accountNumber: changedValue.accountNumber,
                holder: changedValue.holder
            });
        }
    };
    const handleEdit = () => {
        putVBank(editMode.vbankId, {
            bank: editValue.bank,
            accountNumber: editValue.accountNumber,
            holder: editValue.holder
        })
            .then(() => {
                resetEditMode();
                fetchVBankList();
            })
            .catch((err) => alert(`가상계좌 수정 실패.\n${err.response.data.errorMessage}`));
    };
    const handleCancelEditMode = () => {
        resetEditMode();
    };
    // << END EDIT

    // >> START DELETE
    const [deleteMode, setDeleteMode] = useState({
        vbankId: "",
        vbank: "",
        isDelete: false,
    });
    const resetDeleteMode = () => {
        setDeleteMode({vbankId: "", vbank: "", isDelete: false});
    };
    const handleDeleteMode = (vBankId) => {
        setDeleteMode({
            vbankId: vBankId,
            vbank: rows.find((r) => r.vbankId === vBankId).vbank,
            isDelete: true,
        });
    };
    const handleDelete = () => {
        deleteVBank(deleteMode.vbankId)
            .then(() => {
                resetDeleteMode();
                fetchVBankList();
            })
            .catch((err) => alert(`가상계좌 삭제 실패.\n${err.response.data.errorMessage}`))
    };
    const handleCancelDelete = () => {
        resetDeleteMode();
    };
    // << END DELETE

    return (
        <div style={{marginTop: "3rem"}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h2>가상계좌 관리</h2>
                <IconButton
                    aria-label="add"
                    id="add-button"
                    onClick={handleAdd}
                    sx={{
                        color: blue[500],
                    }}
                >
                    <AddIcon/>
                </IconButton>
            </Box>
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
                                        <TableRow tabIndex={-1} key={row.vbankId}>
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
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {editMode.isEdit && row.vbankId === editMode.vbankId ? (
                                                            <EditVBankTextField
                                                                handleEditChanged={handleEditChanged}
                                                                data={row}
                                                            />
                                                        ) :
                                                        row.vbank}
                                                        {editMode.isEdit && row.vbankId === editMode.vbankId ? (
                                                            <Stack direction="row" spacing={1}>
                                                                <Button
                                                                    disabled={!isEditChanged}
                                                                    onClick={handleEdit}
                                                                >
                                                                    수정
                                                                </Button>
                                                                <Button onClick={handleCancelEditMode}>
                                                                    취소
                                                                </Button>
                                                            </Stack>
                                                        ) : (
                                                            <VBankMoreMenu
                                                                vBankId={row.vbankId}
                                                                handleEditMode={handleEditMode}
                                                                handleDeleteMode={handleDeleteMode}
                                                            />
                                                        )}
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
                <>
                    {addModal && (
                        <AddVBankModal
                            handleAddFinish={handleAddFinish}
                            closeModal={() => showAddModal(false)}
                        />
                    )}
                </>
                <div>
                    {deleteMode.isDelete ? (
                        <DeleteVBankDialog
                            vBankId={deleteMode.vbankId}
                            vBank={deleteMode.vbank}
                            handleDelete={handleDelete}
                            handleCancelDelete={handleCancelDelete}
                        />
                    ) : null}
                </div>
            </Paper>
        </div>
    );
}

function AddVBankModal(props) {
    return (
        <Modal title="가상계좌 추가" closeModal={props.closeModal}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    postCreateNewVBank({
                        bank: e.target.bank.value,
                        accountNumber: e.target.account.value,
                        holder: e.target.holder.value
                    })
                        .then(() => props.handleAddFinish())
                        .catch((err) => alert('가상계좌 추가 실패. 실패메시지: ' + err.response.data.error_message))
                }}
            >
                <TextField
                    type="text"
                    sx={{width: "100%", marginBottom: 2}}
                    label="은행이름"
                    variant="outlined"
                    name="bank"
                />
                <TextField
                    type="number"
                    sx={{width: "100%", marginBottom: 2}}
                    label="계좌번호"
                    variant="outlined"
                    name="account"
                />
                <TextField
                    type="text"
                    sx={{width: "100%", marginBottom: 2}}
                    label="예금주"
                    variant="outlined"
                    name="holder"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{width: "100%", height: 45}}
                >
                    추가하기
                </Button>
            </form>
        </Modal>
    );
}

function EditVBankTextField(props) {
    const data = props.data;
    const [changedValue, setChangedValue] = useState({
        bank: data.bankOfVBank, accountNumber: data.accountNumber, holder: data.holder
    });
    const handleBankChanged = (event) => {
        const value = {
            bank: event.target.value,
            accountNumber: changedValue.accountNumber,
            holder: changedValue.holder
        };
        props.handleEditChanged(value);
        setChangedValue(value);
    }

    const handleAccountChanged = (event) => {
        const value = {
            bank: changedValue.bank,
            accountNumber: event.target.value,
            holder: changedValue.holder
        };
        props.handleEditChanged(value);
        setChangedValue(value);
    }

    const handleHolderChanged = (event) => {
        const value = {
            bank: changedValue.bank,
            accountNumber: changedValue.accountNumber,
            holder: event.target.value
        };
        props.handleEditChanged(value);
        setChangedValue(value)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <TextField
                    type="text"
                    sx={{width: "100%"}}
                    label="은행이름"
                    variant="outlined"
                    name="bank"
                    defaultValue={data.bankOfVBank}
                    onChange={handleBankChanged}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type="number"
                    sx={{width: "100%"}}
                    label="계좌번호"
                    variant="outlined"
                    name="account"
                    defaultValue={data.accountNumber}
                    onChange={handleAccountChanged}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    type="text"
                    sx={{width: "100%"}}
                    label="예금주"
                    variant="outlined"
                    name="holder"
                    defaultValue={data.holder}
                    onChange={handleHolderChanged}
                />
            </Grid>
        </Grid>
    );
}

function DeleteVBankDialog(props) {
    const [open, setOpen] = useState(true);

    const handleDeleted = () => {
        props.handleDelete(props.vbankId);
        setOpen(false);
    };

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
                <DialogTitle id="alert-dialog-title">{`가상계좌 삭제`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`정말 ${props.vBank} 가상계좌를 삭제하시겠습니까?\n삭제한 이후에는 복구하기 어렵습니다.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleted} sx={{color: pink[500]}}>
                        삭제
                    </Button>
                    <Button onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
