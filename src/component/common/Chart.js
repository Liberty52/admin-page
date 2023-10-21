// import dynamic from "next/dynamic";
import { styled } from '@mui/material/styles';
import { lazy } from 'react';

// 동적 불러오기
const ApexChart = lazy(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null,
});

export const Chart = styled(ApexChart)``;
