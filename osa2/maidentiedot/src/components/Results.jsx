const Results = ({ data, search }) => {
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

    return (
      <div>
        <h1>{maa.name.common}</h1>
        <p>Capital {maa.capital}</p>
        <p>Area {maa.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(maa.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <picture>
          <source srcSet={maa.flags.png} />
          <img src={maa.flags.png} />
        </picture>
      </div>
    );
  }

  return filtered.map((c) => <p key={c.cca2}>{c.name.common}</p>);
};

export default Results;
