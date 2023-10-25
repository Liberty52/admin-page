import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
export const LicenseTable = (props) => {
  const {
    name,
    price,
    state,
    nOfRating,
    meanRate,
    custom
  } = props;

  const [stateText, setStateText] = useState("");
  const [customText, setCustomText] = useState("");

  useEffect(()=> {
    check();

  })

  const check = () => {
    if(state === "ON_SALE"){
        setStateText("판매중");
    }if(state==="SOLD_OUT"){
        setStateText("품절")
    }if(state==="NOT_SALE"){
        setStateText("미판매");
    }if(custom === true){
        setCustomText("Premium License");
    }if(custom === false){
        setCustomText("Custom");
    }
  }

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>상품 이름</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>판매 상태</TableCell>
              <TableCell>평점</TableCell>
              <TableCell>댓글 개수</TableCell>
              <TableCell>커스텀 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                  <TableCell>{name}</TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{stateText}</TableCell>

                  <TableCell>
                    <Rating
                      defaultValue={meanRate}
                      size="large"
                      readOnly
                    />             
                  </TableCell>
                  <TableCell>{nOfRating}</TableCell>

                  <TableCell>{customText}</TableCell>       
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
