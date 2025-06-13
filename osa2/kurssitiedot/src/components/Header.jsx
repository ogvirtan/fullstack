const Header = ({name, prio}) =>{
  if (prio === 1){
    return(
    <h1>{name}</h1>
  )
  }
  return(
    <h2>{name}</h2>
  )
}

export default Header