import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

export default function CardPaymentInfoTable() {

    const columns = [
        { id: "type", label: "구분" },
        { id: "name", label: "이름" },
        { id: "url", label: "URL" },
    ];

    const rows = [
        {
            type: "PG 호스팅사",
            name: "포트원",
            url: <a href={'https://admin.portone.io/'}>https://admin.portone.io/</a>
        }
    ]

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
                <Table aria-label="customer table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align="center"
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
                            <TableRow sx={{ display: "block", padding: "16px" }}>
                                데이터가 없습니다
                            </TableRow>
                        ) : (
                            rows.map((row) => {
                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={row.type}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
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
        </Paper>
    );
}
