import { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import countries from "./services/countries";

function App() {
  const [searched, setSearched] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    countries.getAll().then((initialCountries) => {
      setData(initialCountries);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearched(event.target.value);
  };

  return (
    <div>
      <Search input={searched} onChange={handleSearchChange} />
      <Results data={data} search={searched} />
    </div>
  );
}

export default App;
