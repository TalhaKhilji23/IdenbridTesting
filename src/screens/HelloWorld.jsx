// src/screens/HelloWorld.js
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// import { getMessage } from '../graphql/queries';

const HelloWorld = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // const response = await API.graphql(graphqlOperation(getMessage));

        // const response = await API.graphql({
        //     ...graphqlOperation(getMessage),
        //     authMode:  "AMAZON_COGNITO_USER_POOLS"
        //   });
        
        // setMessage(response.data.getMessage);
      } catch (error) {
        console.error('Error fetching message from Lambda:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Hello from Lambda</h1>
      <p>{message}</p>
    </div>
  );
};

export default HelloWorld;
