import styled from 'styled-components';
import { Card, Input } from '@mui/joy';
import { Stack } from '@mui/material';

export const ProductCard = styled(Card)`
  :hover {
    cursor: pointer;
    background-color: #efefef;
  }
`;
export const ProductRatingBox = styled.div`
  display: flex;
  align-items: center;
`;
export const ProductRatingText = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
`;

export const CardImage = styled.img`
  padding: 10px 0px;
  height: 200px;
  object-fit: contain !important;
`;
export const ProductBox = styled(Stack)``;
export const ProductHeaderWrapper = styled(Stack)`
  margin-bottom: 20px;
`;
export const ProductTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

export const ProductAddButtonWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export const PointeredBox = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export const ProductChevronLeft = styled.span`
  margin-right: 10px;
`;

export const ProductDetailName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const CardDetailImage = styled.img`
  padding: 10px 0px;
  display: block;
  margin: 0 auto;
  max-height: 400px;
  object-fit: contain !important;
  border-radius: 25px;
`;

export const ProductOptionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-decoration: ${(props) => (props.onSale ? 'none' : 'line-through')};
  color: ${(props) => (props.onSale ? 'black' : 'rgba(0,0,0,0.3)')};
`;

export const ProductOptionDetailAddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer !important;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #d8d8df;
`;

export const ProductOptionInput = styled(Input)``;
export const ProductOptionTitleWrapper = styled.div`
  position: relative;
  background-color: white;
`;
export const HoverButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: ${(props) => (props.focused ? 1 : -1)};
  top: 2px;
  width: calc(100% - 10px);
  height: 100%;
  padding: 0 5px;
  opacity: 0.5;
`;

export const ProductOptionDetailWrapper = styled.div`
  position: relative;
`;
export const ProductOptionItemWrapper = styled.div`
  box-sizing: border-box;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #d8d8df;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: ${(props) => (props.onSale ? 'white' : '#B0B0B0')};
`;
export const ProductOptionItemName = styled.div`
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: calc(75% - 1%);
`;
export const ProductOptionItemStock = styled.div`
  position: absolute;
  left: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(25%);
  font-size: 8px;
  color: gray;
`;
export const HoverButton = styled.div`
  z-index: 2;
  :hover {
    cursor: pointer;
  }
`;

export const ProductOptionModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ProductOptionaModalPriceQuantityName = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
`;
