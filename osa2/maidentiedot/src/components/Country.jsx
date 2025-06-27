const Country = ({ maa }) => {
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
};
export default Country;
