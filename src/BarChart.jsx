import React from "react";
import { Bar } from "react-chartjs-2";
export default function BarChart({data = {}}){

    const options = {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: data.name,
        },
      },
      maintainAspectRatio: false
    };
    return (
      <div style={{width:'70vh', height:'90vw'}}>
        <h2>{data.name}</h2>
        <Bar
          data={data}
          options={options}
        />
      </div>
    );
        
  }
