import React, { useState, useEffect } from "react";
import "./styles.css";

async function fetchData(repositoly) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

  return response.json();
}

export default function App() {
  const [repoList, setRepoList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    fetchData()
      .then((pokeResponse) => {
        setRepoList(Object.values(pokeResponse.results));
      })
      .catch(() => setError("There are somethings wrong,pleas try again later"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="App">
      {!isLoading && repoList.length && (
        <div>
          <h3>PokeIndex</h3>
          {repoList.map((repo) => (
            <>
              <ul>
                <li>{repo.name}</li>
              </ul>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
