import { Box, ButtonBase } from '@mui/material';

export const SideNavItem = (props) => {
  const { active = false, icon, title, onClick } = props;

  return (
    <li>
      <ButtonBase
        sx={{
          color: 'rgb(157, 164, 174)',
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '80px',
          py: '10px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
        onClick={onClick ? onClick : () => {}}
      >
        {icon && (
          <Box
            component='span'
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'rgb(99, 102, 241)',
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component='span'
          sx={{
            ...(active && {
              color: '#ffffff',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
