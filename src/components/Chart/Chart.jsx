import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Positif', 'Sembuh', 'Meninggal'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(253, 215, 3, 0.747)', 'rgba(0, 255, 0, 0.555)', 'rgba(255, 0, 0, 0.7)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Kondisi saat ini di ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Positif',
            borderColor: 'rgba(253, 215, 3, 0.747)',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Meninggal',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;