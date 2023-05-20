import { MainContainer } from "./component/main/MainComponent";
import SideNav from "./component/common/side-nav/SideNav";
import { Box, Container, Stack, Typography, Input } from "@mui/material";
import { CustomerTable } from "../component/customer/CustomerTable";
// import { CustomerSearch } from "../component/customer/CustomerSearch";
// import { useCallback, useEffect, useState } from "react";

export default function Customer() {
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
        <Container sx={{ marginLeft: "25px" }} maxWidth="xl">
          <Stack>
            <Typography sx={{ mb: "30px" }} variant="h4">
              고객 조회
            </Typography>
            {/* <CustomerSearch /> */}
            <CustomerTable />
          </Stack>
        </Container>
      </Box>
    </MainContainer>
  );
}
