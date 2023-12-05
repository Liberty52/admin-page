import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  useEffect(() => {
    if (!chartRef) return;

    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'orange',
          'jan',
          'feb',
          'mar',
          'apr',
          'mar',
          'jun',
          'jul',
          'aug',
          'sep',
          'oct',
          'nov',
          'dec',
        ],

        datasets: [
          {
            label: '# of Votes',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    setMyChart(myChart);
  }, [chartRef]);

  useEffect(() => {
    if (!myChart) return;
    myChart.data.datasets[0].data = data;
    myChart.update();
  }, [data, myChart]);

  return <canvas ref={chartRef} id='myChart' width='400' height='400' />;
};

export default BarChart;
