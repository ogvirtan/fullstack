import Country from "./Country";

const Results = ({ data, search, hsc }) => {
  const filtered =
    search === ""
      ? data
      : data.filter((entry) =>
          entry.name.common.toLowerCase().includes(search.toLowerCase())
        );

  if (filtered.length > 10) {
    return <p>too many matches, specify another filter</p>;
  }
  if (filtered.length === 1) {
    const maa = filtered[0];

    return <Country maa={maa} />;
  }

  return filtered.map((c) => (
    <p key={c.cca2}>
      {c.name.common}
      <button
        id={c.cca2 + "btn"}
        onClick={() => {
          hsc(c.name.common);
        }}
      >
        Show
      </button>
    </p>
  ));
};

export default Results;
