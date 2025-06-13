import Header from './Header'
import Content from './Content'

const Total = ({lista})=>{
  const l = lista
  const sum = l.reduce(
    (acc, curr) => acc + curr.exercises,
    0,
  )
  return(
    <h4>total of {sum} exercises</h4>
  )
}

const Course = ({course}) =>{
  return(
    <div>
      <Header name = {course.name} />
      <Content lista = {course.parts} />
      <Total lista = {course.parts} />
    </div>
  )
}

export default Course