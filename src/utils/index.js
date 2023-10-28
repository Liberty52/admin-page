export const convertQuestionStatus = (status) => {
  if (status === 'WAITING') return '대기';
  else return '완료';
};
