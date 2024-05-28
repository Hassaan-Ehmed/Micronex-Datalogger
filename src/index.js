import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {NextUIProvider} from "@nextui-org/system";
import {FirebaseProvider, setupUI, useFirebaseContext} from './context/FirebaseApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <NextUIProvider>
            <FirebaseProvider>
                    <main className="purple-dark text-foreground bg-background">
                      <Router>
                        <App />
                          <ToastContainer
                        
                          position="top-center"
                          autoClose={2000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="light"
                          transition={Bounce}
                              />
                      </Router>
                    </main>
            </FirebaseProvider>

         </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
