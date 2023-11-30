import styled from 'styled-components';

export const AddPreviewEffectItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  padding: 1rem;
  border: solid 0.1rem lightgray;
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`;

export const AddPreviewEffectItemPlus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: gray;
`;
