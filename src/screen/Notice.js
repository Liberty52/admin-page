import { MainContainer } from "../component/common/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import { Box, Container, Stack, Typography } from "@mui/material";
import { NoticeTable } from "../component/notice/NoticeTable";
import { useCallback, useEffect, useState } from "react";
import { QuestionDialog } from "../component/question/QuestionDialog";
import { getNoticeList } from "../axios/Notice";

export default function Notice() {
  const [data, setData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState();
  const [isChanged, setIsChanged] = useState(false);

  function retrieveQuestionList() {
    getNoticeList(page)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    retrieveQuestionList();
  }, [page]);

  const onMinusPageButtonClicked = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const onPlusPageButtonClicked = () => {
    if (page == data.totalPage - 1) return;
    setPage((prev) => prev + 1);
  };

  const handlePageChange = useCallback((event) => {
    setPage(event.target.innerText - 1);
  }, []);
  const pageNumberArray = () => {
    if (data === undefined) return undefined;
    const array = [];
    for (let i = data.startPage; i <= data.lastPage; i++) array.push(i);
    return array;
  };

  const handleDialogOn = (id) => {
    setQuestionId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setQuestionId(undefined);
    if (isChanged) {
      retrieveQuestionList();
      setIsChanged(false);
    }
  };

  return (
    <MainContainer>
      <SideNav />
      <Box
        component="main"
        sx={{
          padding: "0 5%",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container sx={{ marginLeft: "30px" }} maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography
                  sx={{ "font-family": "'Gothic A1', sans-serif !important;" }}
                  variant="h4"
                >
                  공지사항
                </Typography>
              </Stack>
            </Stack>
            {data?.contents !== undefined ? (
              <NoticeTable
                items={data.contents}
                onPageChange={handlePageChange}
                page={page}
                onMinusPageButtonClicked={onMinusPageButtonClicked}
                onPlusPageButtonClicked={onPlusPageButtonClicked}
                pageNumberArray={pageNumberArray()}
                handleDialogOn={handleDialogOn}
                totalCount={data.totalCount}
              />
            ) : (
              <></>
            )}
          </Stack>
        </Container>
      </Box>
      <QuestionDialog
        isChanged={setIsChanged}
        open={open}
        handleClose={handleClose}
        id={questionId}
      />
    </MainContainer>
  );
}
