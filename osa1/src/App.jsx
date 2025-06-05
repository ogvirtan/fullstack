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
    <Part osa={props.osa1} tehtava={props.tehtava1} />
    <Part osa={props.osa2} tehtava={props.tehtava2} />
    <Part osa={props.osa3} tehtava={props.tehtava3} />
  </>
  )
}
const Part = (props)=>{
  return(
  <>
    <p>{props.osa} {props.tehtava}</p>
  </>
  )
}
const Total = (props)=>{
  return(
  <>
    <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
  </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content osa1={part1.name} tehtava1={part1.exercises} osa2={part2.name} tehtava2={part2.exercises} osa3={part3.name} tehtava3={part3.exercises}/>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises} />
    </div>
  )
}

export default App