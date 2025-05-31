import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/slices/locationSlice";

const useFetch = (apiFunction, location, category) => {
  const dispatch = useDispatch();
  const cachedData = useSelector((state) => state.location.data);

  const [data, setDataState] = useState([]);
  const [loading, setLoading] = useState(!cachedData[location]?.[category]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedData[location]?.[category]) {
      setDataState(cachedData[location][category]);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await apiFunction(location);
        if (isMounted) {
          setDataState(result);
          dispatch(setData({ location, category, data: result }));
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [location, category, apiFunction, cachedData, dispatch]);

  return { data, loading, error };
};

export default useFetch;
