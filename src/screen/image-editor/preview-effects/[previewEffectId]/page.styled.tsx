import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

export const ContentMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 6rem;
  padding-top: 4rem;
`;

export const EffectDetailTitle = styled.h1``;

export const EffectDetailInputContainer = styled.div`
  display: flex;
  width: 90%;
  min-width: 30rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const EffectDetailButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
`;

const EffectDetailButton = styled.button`
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  border: solid 1px;
  :hover {
    background-color: #f9f9f9;
  }
`;

export const EffectDetailEditButton = styled(EffectDetailButton)`
  color: #3c76d2;
  border-color: #a9cbee;
`;

export const EffectDetailDeleteButton = styled(EffectDetailButton)`
  color: #d33b7d;
  border-color: #eeb1b1;
`;

export const EffectDetailRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: solid 0.1rem lightgray;
  padding-bottom: 0.3rem;
`;

export const EffectDetailLabel = styled.label`
  font-size: 1.3rem;
`;

export const EffectDetailInput = styled.input`
  width: 20rem;
  font-size: 1.2rem;
  border: solid 1px #a9cbee;
  border-radius: 5px;
  text-align: end;
  padding: 0.3rem 0;
  :focus {
    outline: none;
    border-color: #eeb1b1;
  }
  :focus,
  :hover {
    background-color: #f9f9f9;
  }
`;

export const EffectDetailImageWrapper = styled.div`
  width: 20rem;
  cursor: pointer;
`;

export const EffectDetailImage = styled.img`
  width: 100%;
  object-fit: cover;
  :hover {
    filter: brightness(80%);
  }
  background-color: #f1eded;
`;

export const EffectDetailProgress = styled(CircularProgress)`
  width: 100%;
  filter: grayscale(80%);
`;

export const EffectDetailImageAddButton = styled(EffectDetailEditButton)``;
