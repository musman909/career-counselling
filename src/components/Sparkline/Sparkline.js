import React from 'react';
import { Bar } from 'react-chartjs-2';

const Sparkline = (props) => {
  return (
    <div>
      <Bar
        width={60}
        height={30}
        data={{
          labels: [1, 5, 6, 10, 9, 12, 4, 9],
          datasets: [
            {
              data: [1, 7, 9, 12, 11, 15, 6, 11],
              backgroundColor: props.backgroundColor,
              hoverBackgroundColor: props.hoverBackgroundColor
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          responsive: false,
          layout: {
            padding: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }
          },
          legend: {
            display: false
          },
          elements: {
            line: {
              borderColor: '#fff',
              borderWidth: 0
            },
            point: {
              radius: 0
            }
          },
          tooltips: {
            enabled: false
          },
          scales: {
            yAxes: [
              {
                display: false,
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                display: false,
                barPercentage: 0.5
              }
            ]
          }
        }}
      />
    </div>
  );
};

export default Sparkline;
