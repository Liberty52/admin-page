import styled from "styled-components";
import {Card, Input} from "@mui/joy";
import {Stack} from "@mui/material";

export const ProductCard = styled(Card)`
  :hover {
    cursor: pointer;
    background-color: #efefef;
  }
`
export const ProductRatingBox = styled.div`
  display: flex;
  align-items: center;
`
export const ProductRatingText = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
`

export const CardImage = styled.img`
  padding: 10px 0px;
  height: 200px;
  object-fit: contain !important;
`
export const ProductBox = styled(Stack)`
`

export const PointeredBox = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const ProductChevronLeft = styled.span`
  margin-right: 10px;
`

export const ProductDetailName = styled.div`
  font-size: 20px;
  font-weight: bold;
`

export const CardDetailImage = styled.img`
  padding: 10px 0px;
  display: block;
  margin: 0 auto;
  max-height: 400px;
  object-fit: contain !important;
  border-radius: 25px;
`

export const ProductOptionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
export const ProductOptionDetailAddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer !important;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #D8D8DF;
  
`

export const ProductOptionInput = styled(Input)`
  text-align: center !important;
`
export const ProductOptionDetailButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: ${props => props.focused ? 1 : -1};
  top: 0;
  width: calc(100% - 10px);
  height: 100%;
  padding: 0 5px;
`

export const ProductOptionDetailWrapper = styled.div`
  position: relative;
`
export const ProductOptionDetailButtonWrapper = styled.div`
  z-index : 2;
  :hover{
    cursor: pointer;
  }
`

export const ProductOptionModalTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    
`