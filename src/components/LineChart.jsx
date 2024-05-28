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

React.useEffect(()=>{

  if(FirebaseContext.isTabSelected === "line"){
    
    FirebaseContext.lineChartRef.current.zoom(0);
    
    if(window.innerWidth < 500){
  
      // console.log("width",window.innerWidth)
      
      FirebaseContext.lineChartRef.current.zoom(1.9);
    }else if(window.innerWidth > 500){
      
      // console.log("width",window.innerWidth)
      FirebaseContext.lineChartRef.current.zoom(1.8);
    }

  }

//  return ()=> FirebaseContext.lineChartRef.current.zoom(0);

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
                  y: {min: 10, max: 30},
                  x: {min: 50, max: 30},
                  pan: {
                    enabled: true,
                    mode: 'x'
                },
                limits: {
                  //  minRange:10
                },
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'x',

                    limits: {
                      x: {
                          minRange: 15
                      },
                    }
                  }
                }
              }
          
    };



//  Default 700
  return ( <Line width={1300} ref={FirebaseContext.lineChartRef} options={options} data={chartsData}   className='cursor-'/> )
}
