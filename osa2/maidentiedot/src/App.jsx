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

  const handleSearchFieldChange = (event) => {
    setSearched(event.target.value);
  };

  const handleSearchChange = (value) => {
    setSearched(value);
  };

  return (
    <div>
      <Search onChange={handleSearchFieldChange} />
      <Results data={data} search={searched} hsc={handleSearchChange} />
    </div>
  );
}

export default App;
