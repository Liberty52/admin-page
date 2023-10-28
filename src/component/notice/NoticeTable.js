import {
  Box,
  Button,
  Card,
  Stack,
  SvgIcon,
  TableBody,
  TableHead,
} from '@mui/material';
import styled from 'styled-components';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { convertQuestionStatus } from '../../utils';
import {
  MediumTableCell,
  PointeredRow,
  QuestionTableCell,
  QuestionTableHeader,
  QuestionTableWrapper,
  SmallTableCell,
} from './index';
import { useNavigate } from 'react-router-dom';
import { ModalMode } from '../../constants/mode';

export const NoticeTable = (props) => {
  const {
    items = [],
    onPageChange,
    page,
    onMinusPageButtonClicked,
    onPlusPageButtonClicked,
    pageNumberArray,
    handleDialogOn,
    totalCount,
  } = props;

  const navigate = useNavigate();
  const navigateWrite = () => {
    navigate('/notice/editor', {
      state: {
        mode: ModalMode.ADD,
      },
    });
  };

  const navigateDetail = (id) => {
    navigate('/notice/detail', { state: id });
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <QuestionTableWrapper>
          <TableHead>
            <QuestionTableHeader>
              <QuestionTableCell>Notice No</QuestionTableCell>
              <QuestionTableCell>제목</QuestionTableCell>
              <QuestionTableCell>작성 시간</QuestionTableCell>
            </QuestionTableHeader>
          </TableHead>
          <TableBody>
            {items.map((notice, idx) => {
              return (
                <PointeredRow key={idx} hover onClick={() => navigateDetail(notice.noticeId)}>
                  <MediumTableCell>{totalCount - (page * 10 + 1 + idx) + 1}</MediumTableCell>
                  <QuestionTableCell>{notice.title}</QuestionTableCell>
                  <MediumTableCell>{notice.createdAt}</MediumTableCell>
                </PointeredRow>
              );
            })}
          </TableBody>
        </QuestionTableWrapper>
        <Button onClick={navigateWrite}> 작성하기 </Button>
      </Box>
      <Stack sx={{ padding: '15px 0px' }} direction={'row'} justifyContent={'center'} spacing={1}>
        <Button
          startIcon={
            <SvgIcon>
              <ArrowLeftIcon />
            </SvgIcon>
          }
          onClick={onMinusPageButtonClicked}
        ></Button>
        {pageNumberArray.map((i) => (
          <Button key={i} variant={page + 1 === i ? 'contained' : 'text'} onClick={onPageChange}>
            {i}
          </Button>
        ))}
        <Button
          startIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onPlusPageButtonClicked}
        ></Button>
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
