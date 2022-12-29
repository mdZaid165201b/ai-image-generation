import React, { useState, useRef } from "react";
import "./home.css";
import { Configuration, OpenAIApi } from "openai";
import { FadeLoader } from "react-spinners";

function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query !== "") {
      setLoading(true);
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      try {
        const response = await openai.createImage({
          prompt: query,
          n: 1,
          size: "256x256",
        });
        setData(response.data.data[0].url);
        setLoading(false);
        inputRef.current.value = "";
      } catch (err) {
        setLoading(false);
        alert(err.message);
      }
    } else {
      alert("Search field can not be empty!!!");
    }
  };

  return (
    <div className="home">
      <h1 className="heading extraHeading">AI Image Generator</h1>
      <div className="input-field">
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="Enter text..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="submitBtn" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <h1 className="heading">Result</h1>
      {loading ? (
        <FadeLoader
          color="#054d4db3"
          radius={2}
          speedMultiplier={4}
          width={8}
          height={20}
        />
      ) : (
        <div className="resultImage">
          {data !== "" ? (
            <img className="resultingImage" src={data} height={600} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Home;
