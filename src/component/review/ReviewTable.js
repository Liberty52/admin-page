import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Stack,
  Card,
  Button,
  SvgIcon,
} from "@mui/material";
export default function ReviewTable(props) {
  const {
    items = [],
    onPageChange,
    page,
    onMinusPageButtonClicked,
    onPlusPageButtonClicked,
    pageNumberArray,
    handleDialogOn,
  } = props;
  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>작성자</TableCell>
              <TableCell>평점</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>이미지</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((review) => {
              return (
                <TableRow key={review.id}>
                  <TableCell>{review.authorName}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.content}</TableCell>
                  <TableCell>
                    <img src={review.imageUrls} alt="리뷰 이미지" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Stack>
        <Button
          startIcon={
            <SvgIcon>
              <ArrowLeftIcon />
            </SvgIcon>
          }
          onClick={onMinusPageButtonClicked}
        />
      </Stack> */}
    </Card>
  );
}
