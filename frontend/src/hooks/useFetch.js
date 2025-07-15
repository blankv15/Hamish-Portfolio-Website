
import { useState, useEffect } from 'react';

// A custom hook is just a function whose name starts with "use"
function useFetch(url) {
  // It encapsulates the state logic for data, loading, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We create a new AbortController for each fetch request.
    // This is used to cancel the fetch request if the component unmounts
    // before the request is finished, preventing memory leaks.
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        // Don't update state if the error is from aborting the request
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {hook
        setLoading(false);
      }
    };

    fetchData();

    // The cleanup function returned by useEffect
    // This will be called when the component unmounts or the url changes.
    return () => {
      abortController.abort();
    };
  }, [url]); // The effect re-runs whenever the URL prop changes

  // The hook returns the stateful values for the component to use
  return { data, loading, error };
}

export default useFetch;
