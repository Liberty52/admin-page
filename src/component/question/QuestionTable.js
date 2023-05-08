import {Box, Button, Card, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import styled from 'styled-components';
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";
import {convertQuestionStatus} from "../../utils";
import {
    MediumTableCell, PointeredRow,
    QuestionTableCell,
    QuestionTableHeader,
    QuestionTableWrapper,
    SmallTableCell
} from "./index";


export const QuestionTable = (props) => {
    const {

        items = [],
        onPageChange,
        page,
        onMinusPageButtonClicked,
        onPlusPageButtonClicked,
        pageNumberArray,
        handleDialogOn
    } = props;


    return (
        <Card>

            <Box sx={{minWidth: 800}}>
                <QuestionTableWrapper>
                    <TableHead>
                        <QuestionTableHeader>
                            <QuestionTableCell>
                                연락처
                            </QuestionTableCell>
                            <QuestionTableCell>
                                제목
                            </QuestionTableCell>
                            <QuestionTableCell>
                                상태
                            </QuestionTableCell>
                            <QuestionTableCell>
                                작성 시간
                            </QuestionTableCell>
                        </QuestionTableHeader>
                    </TableHead>
                    <TableBody>
                        {items.map((question) => {

                            return (
                                <PointeredRow
                                    hover
                                    onClick={() => handleDialogOn(question.id)}
                                >
                                    {/*연락처*/}
                                    <MediumTableCell>
                                        {question.email}
                                    </MediumTableCell>
                                    {/*제목*/}
                                    <QuestionTableCell>
                                        {question.title}
                                    </QuestionTableCell>
                                    {/*상태*/}
                                    <SmallTableCell >
                                        {convertQuestionStatus(question.status)}
                                    </SmallTableCell>
                                    {/*작성시간*/}
                                    <SmallTableCell >
                                        {question.createdAt}
                                    </SmallTableCell>
                                </PointeredRow>
                            );
                        })}
                    </TableBody>
                </QuestionTableWrapper>
            </Box>
            <Stack sx={{padding : "15px 0px"}} direction={"row"} justifyContent={"center"} spacing={1} >
                <Button  startIcon={<SvgIcon><ArrowLeftIcon/></SvgIcon>}
                        onClick={onMinusPageButtonClicked}></Button>
                {pageNumberArray.map(i => <Button variant={page+1===i ? "contained" : "text"}  onClick={onPageChange}>{i}</Button>)}
                <Button  startIcon={<SvgIcon><ArrowRightIcon/></SvgIcon>}
                        onClick={onPlusPageButtonClicked}></Button>
            </Stack>
        </Card>
    );
};

// CustomersTable.propTypes = {
//     count: PropTypes.number,
//     items: PropTypes.array,
//     onDeselectAll: PropTypes.func,
//     onDeselectOne: PropTypes.func,
//     onPageChange: PropTypes.func,
//     onRowsPerPageChange: PropTypes.func,
//     onSelectAll: PropTypes.func,
//     onSelectOne: PropTypes.func,
//     page: PropTypes.number,
//     rowsPerPage: PropTypes.number,
//     selected: PropTypes.array
// };
