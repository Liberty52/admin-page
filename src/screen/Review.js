import SideNav from "./component/common/side-nav/SideNav";
import { MainContainer } from "./component/main/MainComponent";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewTable from "../component/review/ReviewTable";
import ReviewDialog from "../component/review/ReviewDialog";
import { getReviewList } from "../axios/Review";

export default function Review() {
  const [data, setData] = useState();
  const [page, setPage] = useState(0);

  function retrieveReviewList() {
    getReviewList(page)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    retrieveReviewList();
  }, [page]);

  const handlePageChange = () => {};
  const onMinusPageButtonClicked = () => {};
  const onPlusPageButtonClicked = () => {};
  const pageNumberArray = () => {};
  const handleDialogOn = () => {};
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
                  리뷰
                </Typography>
              </Stack>
            </Stack>
            {data?.contents !== undefined ? (
              <ReviewTable
                items={data.contents}
                onPageChange={handlePageChange}
                page={page}
                onMinusPageButtonClicked={onMinusPageButtonClicked}
                onPlusPageButtonClicked={onPlusPageButtonClicked}
                pageNumberArray={pageNumberArray()}
                handleDialogOn={handleDialogOn}
              />
            ) : (
              <></>
            )}
          </Stack>
        </Container>
      </Box>
      {/* <ReviewDialog isChanged={setIsChanged}  open={open} /> */}
    </MainContainer>
  );
}
