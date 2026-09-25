import { useState, useEffect } from "react";

export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
    fetch(`${baseUrl}/${endpoint}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return res.json();
      })
      .then((resData) => {
        if (!isMounted) return;
        // Handle DRF paginated responses or direct arrays/objects
        if (resData && typeof resData === "object" && "results" in resData) {
          setData(resData.results);
        } else {
          setData(resData);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setError(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
