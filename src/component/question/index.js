import styled from 'styled-components';
import { DialogTitle, Table, TableCell, TableRow } from '@mui/material';

export const QuestionTableWrapper = styled(Table)`
  font-family: 'Gothic A1', sans-serif;
`;

export const QuestionTableHeader = styled(TableRow)`
  background-color: #f8f9fa;
  font-family: 'Gothic A1', sans-serif !important;
`;
export const QuestionTableCell = styled(TableCell)`
  font-family: 'Gothic A1', sans-serif !important;
  font-weight: bold !important;
`;
export const SmallTableCell = styled(QuestionTableCell)`
  width: 10%;
`;
export const MediumTableCell = styled(QuestionTableCell)`
  width: 25%;
`;
export const PointeredRow = styled(TableRow)`
  :hover {
    cursor: pointer;
  }
`;
export const QuestionDialogTitle = styled(DialogTitle)`
  font-weight: 600;
  font-size: 32px;
`;
export const QuestionDetailTitle = styled.div`
  overflow-wrap: break-word;
  font-size: 22px;
  width: 100%;
`;
