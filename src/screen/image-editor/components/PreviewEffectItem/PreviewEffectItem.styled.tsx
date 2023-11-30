import styled from 'styled-components';

export const PreviewEffectItemContainer = styled.div`
  width: 15rem;
  padding: 1rem;
  border: solid 0.1rem lightgray;
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`;

export const PreviewEffectItemImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 8rem;
  border-radius: 0.5rem;
`;

export const PreviewEffectItemImage = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  background-color: #f5f3f3;
`;

export const PreviewEffectItemOptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PreviewEffectItemOption = styled.p`
  font-size: 1rem;
`;

export const PreviewEffectItemName = styled.p`
  font-size: 1.3rem;
`;
