const Search = ({ input, onChange }) => {
  return (
    <form>
      find countries <input value={input} onChange={onChange} />{" "}
    </form>
  );
};
export default Search;
