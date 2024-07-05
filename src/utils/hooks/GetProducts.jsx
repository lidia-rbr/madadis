import { useState, useEffect } from 'react'

// Check axios
// Check reactstrap
export function useFetch(url) {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useReduce to store several values

  useEffect(() => {
    if (!url) return
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url]) // liste des paramètres 
  return { isLoading, data, error }
}
