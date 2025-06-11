const Part = ({object})=>{
  return(
    <p>{object.name} {object.exercises}</p>
  )
}

const Content = ({lista})=>{
  const objects = lista

  return(
    objects.map(item => <Part key = {item.name} object={item}/>)
  )
}

export default Content