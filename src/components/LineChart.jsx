import React, { useRef } from 'react'
import  { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { lineChartsData } from '../data/DUMMY_DATA';
import zoomPlugin, { getZoomLevel } from 'chartjs-plugin-zoom';
import { useFirebaseContext } from '../context/FirebaseApp';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
)



export default function BarGraphLineChart({chartsData}) {   

const FirebaseContext = useFirebaseContext();

const chartInstance = FirebaseContext?.lineChartRef?.current;

// FirebaseContext?.lineChartRef?.current.resetZoom();


React.useEffect(()=>{
  
  FirebaseContext?.lineChartRef?.current.zoom(1.85)  ;

},[FirebaseContext.isTabSelected,FirebaseContext.slectedLineChart])

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
            scales: {
              xAxes: [{
                ticks: {
                    min:'10',
                    max:'10'
                  // display:false,      
                  // beginAtZero: true, // Start y-axis at 0
                },
              }],
            },
        
              plugins: {
              legend:{ display : false },
                zoom: {
                  // y: {min: 10, max: 30},
                  // x: {min: 50, max: 30},
                  pan: {
                    enabled: true,
                    mode: 'x'
                },
                limits: {
                  //  minRange:10

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

                    // limits: {
                    //   x: {
                    //       minRange: 10
                    //   },
                    // }
                  }
                }
              }
          
    };



//  Default 700
  return ( <Line width={1300} ref={FirebaseContext.lineChartRef} options={options} data={chartsData}   className='cursor-'/> )
}
