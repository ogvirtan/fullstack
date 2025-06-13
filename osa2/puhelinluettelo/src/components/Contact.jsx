const Contact = ({name, number, onNumChange, onNameChange, onSubmit}) =>{
    return(
    <form onSubmit = {onSubmit}>
        <div>
          name: <input value = {name} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value = {number} onChange={onNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    )    
}
export default Contact