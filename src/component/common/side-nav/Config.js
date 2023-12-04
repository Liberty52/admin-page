import {
  ChartBarIcon,
  StarIcon,
  UsersIcon,
  ClipboardIcon,
  QuestionMarkCircleIcon,
  GiftIcon,
  ComputerDesktopIcon,
  ArrowLeftOnRectangleIcon,
  PhotoIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import { SvgIcon } from '@mui/material';
import {
  PATH_PRODUCT,
  CUSTOMER,
  REVIEW,
  ORDER,
  QUESTION,
  NOTICE,
  LICENSE,
  SALES,
  PATH_IMAGE_EDITOR,
} from '../../../constants/path';

export const items = [
  {
    title: 'Sales',
    path: SALES,
    icon: (
      <SvgIcon fontSize='small'>
        <CurrencyDollarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Customers',
    path: CUSTOMER,
    icon: (
      <SvgIcon fontSize='small'>
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Review',
    path: REVIEW,
    icon: (
      <SvgIcon fontSize='small'>
        <StarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Order',
    path: ORDER,
    icon: (
      <SvgIcon fontSize='small'>
        <GiftIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Question',
    path: QUESTION,
    icon: (
      <SvgIcon fontSize='small'>
        <QuestionMarkCircleIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Notice',
    path: NOTICE,
    icon: (
      <SvgIcon fontSize='small'>
        <ClipboardIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Product',
    path: PATH_PRODUCT,
    icon: (
      <SvgIcon fontSize={'small'}>
        <ComputerDesktopIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Image Editor',
    path: PATH_IMAGE_EDITOR,
    icon: (
      <SvgIcon fontSize={'small'}>
        <PhotoIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Sample Image',
    path: LICENSE,
    icon: (
      <SvgIcon fontSize='small'>
        <PhotoIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Logout',
    onClick: () => {
      onLogoutClicked();
    },
    icon: (
      <SvgIcon fontSize={'small'}>
        <ArrowLeftOnRectangleIcon />
      </SvgIcon>
    ),
  },
];

function onLogoutClicked() {
  if (window.confirm('로그아웃 하시겠습니까?')) {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
  }
}
