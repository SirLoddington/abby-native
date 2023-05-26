import { useState, useEffect, useRef } from 'react';
// import EventSource from 'eventsource';

let baseURL = 'https://api.abbyhealth.app/';
baseURL = 'http://localhost:8080/';

import RNEventSource from 'react-native-event-source';

/**
 * useSSE is a custom React hook that handles Server-Sent Events (SSE) via the EventSource API.
 * It takes a url, options, and queryState as arguments, and returns an object containing data, error, and loading states.
 *
 * @function
 * @param {string} url - The URL to connect to the SSE stream.
 * @param {Object} queryState - A REACT STATE object containing key-value pairs to be appended as query parameters to the URL.
 *
 * @returns {Object} - An object containing the following properties:
 *  - data: The data received from the SSE stream, initially set to null.
 *  - error: An error object if an error occurs, initially set to null.
 *  - loading: A boolean indicating whether the data is being fetched, initially set to true.
 */
const useSSE = ({
  endpoint,
  queryState,
  dataCallback = () => {},
  isEnabled = true,
  onFinish = () => {}
}) => {
  const eventSource = useRef();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFull, setIsFull] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;
    setIsLoading(true);

    const url = baseURL + endpoint;

    const urlTransformed = new URL(url);
    Object.keys(queryState || {}).forEach((key) => {
      urlTransformed.searchParams.append(key, queryState[key]);
    });
    const urlString = urlTransformed.toString();

    const setupEventSource = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJKVENGektENEVwZTFhT1NvT3lmNiJ9.eyJpc3MiOiJodHRwczovL2FiYnloZWFsdGgtbG9jYWwuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYyYmU3M2ViNTQ1YmY1ZDUzYTMzNzMwYyIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJodHRwczovL2FiYnloZWFsdGgtbG9jYWwuYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NTA3NDI2OCwiZXhwIjoxNjg1MTYwNjY4LCJhenAiOiIwdk9MUGRhd21nWmRVQ0tiUU5RRHhwSkZ6NlVxTE1SaSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.HQVNGF7LjuZDSMynUuUk3MVRnPgo7LZfxiW7Y_Ra98A_QSCiTAl9mgFM6H0fRHMwQNAKnVnKU8NRey64FdduIZOxZmfcYaiMep1uq5Idr3nEe1bhF1GXiICDToIP0riuAAbAJJ5uT-ZaRAsFI0V-Xg2dzgwtrFXh0UMeGimOkKPD3sXfLhqB7xAxZ6qc8IJ2Q47xuU3mAIKdI7m3nAvmmBjfo1I9bY8I634a4xdXSwr6fClbppmKKKpP-9HpaLE4rqIrVxwWYhAjg8HxDjO6iNP4Nu-P87J1OiWjZYTiZz0BXvr8mBaT6GIPxWEPhpKrO4ARUcNce_lOr6nYBrKdsw`
        }
      };

      eventSource.current = new RNEventSource(urlString, options);

      eventSource.current.addEventListener('message', (res) => {
        setIsLoading(false);
        try {
          const parsed = JSON.parse(res.data);
          if (parsed.state === 'COMPLETE') {
            eventSource.current.close();
            onFinish();
          } else {
            setIsFull(parsed.isFull);
            setData(parsed.data);
            if (dataCallback) {
              dataCallback(parsed.data);
            }
          }
        } catch (e) {
          setIsLoading(false);
          setError(e);
        }
      });

      eventSource.current.onerror = (e) => {
        setError(e);
        setIsLoading(false);
      };
    };

    setupEventSource();

    // Clean up the eventSource
    return () => {
      if (eventSource.current) {
        eventSource.current.close();
      }
    };
  }, [queryState, isEnabled]);

  return { data, error, isLoading, isFull };
};

export default useSSE;
