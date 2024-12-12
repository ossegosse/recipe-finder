import { useState, useEffect } from 'react';

// Endpoints
export const BASE_URLS = {
  CATEGORY: "https://www.themealdb.com/api/json/v1/1/filter.php?c=",
  DETAIL: "https://www.themealdb.com/api/json/v1/1/",
};


// Fetch som tar baseurl och endpoint som parametrar, 
function useGet<T>(endpoint: string, baseUrl: string) {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl + endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData: T = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, endpoint]);

  return { data, loading, error };
}

export default useGet;
