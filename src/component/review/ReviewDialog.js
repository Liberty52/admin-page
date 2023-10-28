import { Button, Dialog, DialogTitle, Stack, Card, DialogActions } from '@mui/material';
import { Textarea } from '@mui/joy';
import { useEffect, useState } from 'react';
import {
  getReviewDetail,
  createReviewReply,
  updateReviewReply,
  deleteReviewReply,
  deleteCustomerReview,
} from '../../axios/Review';
import { ModalMode } from '../../constants/mode';

export const ReviewDialog = (props) => {
  const { open, handleClose, id, isChanged } = props;
  const ADMINID = 'ADMIN-001';
  const [data, setData] = useState();
  const [mode, setMode] = useState(ModalMode.VIEW);
  const [adminReply, setAdminReply] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    if (id === undefined) return;
    retrieveReviewDetailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const retrieveDetail = (prevData, id) => {
    getReviewDetail(id).then((res) => {
      prevData = res.data.content;
      setData(prevData);
      setMode(ModalMode.ADD);
      for (var i = 0; prevData?.replies.length; i++) {
        if (prevData?.replies[i].authorId === ADMINID) {
          setTextAreaValue(prevData.replies[i].content);
          setAdminReply(prevData.replies[i]);
          setMode(ModalMode.EDIT);
          return;
        }
      }
    });
  };
  function retrieveReviewDetailData() {
    let prevData;
    try {
      retrieveDetail(prevData, id);
    } catch (err) {
      console.error(err);
    }
    setData(prevData);
  }
  const onTextAreaChanged = (e) => {
    setTextAreaValue(e.target.value);
  };
  const onAddButtonClicked = () => {
    if (textAreaValue === '' || textAreaValue === undefined) {
      alert('내용을 입력해주세요.');
      return;
    }
    createReviewReply(id, textAreaValue)
      .then(() => {
        alert('댓글을 작성하셨습니다.');
        isChanged(true);
        setTextAreaValue('');
        handleClose();
      })
      .catch((err) => console.errer(err));
  };
  const onUpdateModeButtonClicked = () => {
    if (mode === ModalMode.EDIT) {
      if (textAreaValue === adminReply?.content) {
        alert('내용을 변경해주세요.');
        return;
      }
      updateReviewReply(data.reviewId, adminReply?.replyId, textAreaValue)
        .then(() => {
          alert('수정했습니다.');
          isChanged(true);
          retrieveReviewDetailData();
          handleClose();
        })
        .catch((err) => console.err(err));
    } else {
      setMode(ModalMode.EDIT);
    }
  };
  const onDeleteButtonClicked = () => {
    deleteReviewReply(adminReply?.replyId).then(() => {
      alert('삭제했습니다.');
      setTextAreaValue('');
      retrieveReviewDetailData();
      handleClose();
    });
  };
  const onDeleteCustomerReview = () => {
    deleteCustomerReview(data?.reviewId).then(() => {
      alert('고객의 리뷰를 삭제했습니다.');
      setTextAreaValue('');
      window.location.reload();
    });
  };
  const onCloseButtonClicked = () => {
    handleClose();
    setMode(ModalMode.VIEW);
    setTextAreaValue('');
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      maxWidth={'lg'}
      scroll={'body'}
    >
      {id !== undefined && (
        <Stack minWidth={500} padding={2}>
          <DialogTitle>리뷰 댓글 작성</DialogTitle>
          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            <div>{data?.reviewCreatedAt}</div>
            <Button onClick={onDeleteCustomerReview} color={'error'}>
              고객리뷰삭제
            </Button>
          </Stack>
          <Card sx={{ marginTop: '10px', padding: '10px 25px' }}>
            <span>{data?.content}</span>
            <div className='img-frame' style={{ width: '200px', height: '200px' }}>
              {data?.imageUrls.length > 0 && (
                <img
                  src={data.imageUrls}
                  alt='리뷰 사진'
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </div>
          </Card>
          <hr />
          <div>
            <Textarea
              placeholder={'댓글을 작성해주세요'}
              readOnly={mode === ModalMode.VIEW}
              onChange={onTextAreaChanged}
              value={textAreaValue}
              sx={{ padding: '10px 25px' }}
            />
          </div>
          <DialogActions>
            {mode === ModalMode.ADD ? (
              <>
                <Button onClick={onAddButtonClicked}>댓글달기</Button>
              </>
            ) : (
              <>
                <Button onClick={onUpdateModeButtonClicked}>
                  {mode === ModalMode.EDIT && '수정하기'}
                </Button>
                <Button color={'error'} onClick={onDeleteButtonClicked}>
                  댓글 삭제하기
                </Button>
              </>
            )}
            <Button onClick={onCloseButtonClicked}>나가기</Button>
          </DialogActions>
        </Stack>
      )}
    </Dialog>
  );
};
