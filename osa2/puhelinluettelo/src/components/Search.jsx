const Search = ({ input, onChange }) => {
  return (
    <form>
      filter shown with <input value={input} onChange={onChange} />{" "}
    </form>
  );
};
export default Search;
