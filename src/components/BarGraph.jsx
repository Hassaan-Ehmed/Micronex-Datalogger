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

  if(FirebaseContext.isTabSelected === "gauges"){
    
    FirebaseContext.barChartRef.current.zoom(0);
    FirebaseContext.barChartRef.current.zoom(1.4);

  }

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
                  min:0,
                  max:'original',
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
