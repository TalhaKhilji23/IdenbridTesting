import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Amplify} from 'aws-amplify';
import config from './aws-exports'; // Import the AWS Amplify configuration
import { BrowserRouter } from 'react-router-dom';
// import { generateClient } from 'aws-amplify';
// const client = generateClient();


Amplify.configure(config); // Configure Amplify with the generated file

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
