import styled from "styled-components";

export const NoticeListWrapper = styled.div``;
export const NoticeItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid black;
  :hover {
    cursor: pointer;
  }
`;
export const NoticeTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;
export const NoticeItemDate = styled.div`
  color: rgba(0, 0, 0, 0.4);
`;
export const NoticeDetailHeader = styled.div``;
export const NoticeDetailTitle = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
  @media (max-width: 500px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
export const NoticeDetailCreatedAt = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  @media (max-width: 500px) {
    border-bottom: none;
  }
`;

export const MoveListAnchor = styled.span`
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`;

export const QuestionPageButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const QuestionPageButton = styled.div`
  font-weight: bold;
  color: white;
  background-color: #2e2e2e;
  padding: 8px 15px;

  :hover {
    cursor: pointer;
    background-color: #3e3e3e;
  }
`;

export const MoveToListButton = styled(QuestionPageButton)`
  margin-right: 10px;
`;

export const DetailPageButtonWrapper = styled(QuestionPageButtonWrapper)`
  margin-top: 15px;
`;

export const Viewer = styled.div`
  margin: 20px 0px;
`;
