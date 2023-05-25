import Orders from "./orders/Orders";
import CanceledOrders from "../component/order/CanceledOrders";
import Payment from "../component/order/payment/Payment";
import { MainContainer } from "./component/main/MainComponent";
import SideNav from "./component/common/side-nav/SideNav";
import { Box, Container, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabContents = [
    { label: "전체 주문 조회", content: <Orders /> },
    { label: "주문 취소 관리", content: <CanceledOrders /> },
    { label: "결제 관리", content: <Payment />}
  ];

  const tabs = [];
  const tabPanels = [];

  tabContents.map((tabContent, i, arr) => {
    tabs.push(<Tab key={i} label={tabContent.label} {...a11yProps(i)} />);
    tabPanels.push(
      <TabPanel key={i} value={value} index={i}>
        {tabContent.content}
      </TabPanel>
    );
  });

  return (
    <Box sx={{ width: "100%" }}>
      <h1>주문 관리</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs}
        </Tabs>
      </Box>
      {tabPanels}
    </Box>
  );
}

export default function Order() {
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
          <BasicTabs />
        </Container>
      </Box>
    </MainContainer>
  );
}
