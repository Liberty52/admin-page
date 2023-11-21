import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Sheet } from '@mui/joy';
import { Button, Stack } from '@mui/joy';

const SalesDialog = ({ open, onClose, searchProductName, product }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        hideBackdrop={true}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            minWidth: 500,
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <DialogContent>
            <DialogTitle>상품 검색</DialogTitle>
            <>{searchProductName}...</>
          </DialogContent>
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={1} marginTop={2}>
            <Button>추가하기</Button>
            <Button onClick={handleClose} color={'danger'}>
              취소하기
            </Button>
          </Stack>
        </Sheet>
      </Dialog>
    </>
  );
};

export default SalesDialog;
