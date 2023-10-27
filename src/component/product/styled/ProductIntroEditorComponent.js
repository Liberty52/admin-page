import styled from "styled-components";

export const HTMLSizeLimiter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 10px 0px;
`;

export const HTMLEditor = styled.div`
  width: 100%;
`;

export const CurrentHtmlSizeSpan = styled.span`
  color: ${(props) => (props.isExeed ? "red" : "black")};
`;
