import  { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import zoomPlugin from 'chartjs-plugin-zoom';
import { useFirebaseContext } from '../context/FirebaseApp';
import React from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
)



export default function BarGraph({chartsData}) {

const FirebaseContext = useFirebaseContext();

React.useEffect(()=>{


    FirebaseContext.barChartRef.current.zoom(1.7);

  

},[FirebaseContext.isTabSelected,FirebaseContext.slectedBarChart])


    const options  = {


      transitions: {
        zoom: {
          animation: {
            duration: 1000,
            easing: 'easeOutCubic'
          }
        }
      },
      maintainAspectRatio:false,
      //   responsive:true,  
        
        title : {text:"Humidity & Temperature Graph",display:true},
      //       scales: {
      //         yAxes: [{
      //           ticks: {
      //             display:false,      
      //             beginAtZero: true, // Start y-axis at 0
      //           },
      //         }],
      //       },
       
            plugins: {
              legend:{ display : false },
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'x'
                },
                limits: {
                  // min:0,
                  // max:'original',

                  x: {
                    // min: 10, // Minimum zoom limit for x-axis
                    max: 50, // Maximum zoom limit for x-axis
                    minRange: 5 // Minimum range for zoom to avoid over-zooming
                  },
                  y: {
                    // min: 10, // Minimum zoom limit for y-axis
                    max: 30, // Maximum zoom limit for y-axis
                    minRange: 5 // Minimum range for zoom to avoid over-zooming
                  }
                },
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'x',
                  }
                }
              }
          
    };

//  Default 700
  return ( <Bar width={1300} ref={FirebaseContext.barChartRef} options={options} data={chartsData}   /> )
}
