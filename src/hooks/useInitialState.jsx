import { useState, useEffect } from "react";
import initialStateJSON from "../../initialState.json";

const useInitialState = API => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => {
        setVideos(initialStateJSON.initialState);
        throw "Error API, Loading API Caché";
      });
  }, []);
  return videos;
};

export default useInitialState;
