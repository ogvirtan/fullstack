const Header = (props) =>{
  return(
  <>
    <h1>{props.course}</h1>
  </>
  )
}
const Content = (props)=>{
  return(
  <>
    <Part item = {props.lista[0]}/>
    <Part item = {props.lista[1]}/>
    <Part item = {props.lista[2]}/>
  </>
  )
}
const Part = (props)=>{
  return(
  <>
    <p>{props.item.name} {props.item.exercises}</p>
  </>
  )
}
const Total = (props)=>{
  function sum(l){
    let rval = 0
    l.forEach(element => {
      rval += element.exercises
    })
    return rval
  }
  return(
  <>
    <p>Number of exercises sum {sum(props.lista)}</p>
  </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name} />
      <Content lista = {course.parts} />
      <Total lista = {course.parts} />
    </div>
    )
}

export default App