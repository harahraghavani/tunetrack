import React, { useEffect, useState } from "react";
import "./App.css";
import { api } from "./api";

function App() {
  const [data, setData] = useState(null);
  console.log('data: ', data?.tracks.hits[4].track?.hub?.actions[1].uri);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api("/search", "GET", null, {
          term: "so far away"
        });
        setData(result);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Extract the audio URL
  const audioUrl = data?.tracks.hits[4].track?.hub?.actions[1].uri;
  console.log('audioUrl: ', audioUrl);

  return (
    <div className="App">
      <div>
        {audioUrl ? (
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>No audio preview available</p>
        )}
      </div>
    </div>
  );
}

export default App;
