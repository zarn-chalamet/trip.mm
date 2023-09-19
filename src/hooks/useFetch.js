import { useEffect, useState } from "react";

function useFetch(url) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    setLoading(true);
    fetch(url, { signal })
      .then((respond) => {
        if (!respond.ok) {
          throw Error("something went wrong!");
        }
        return respond.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });

    //cleanup function
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { data, loading, error };
}
export default useFetch;
