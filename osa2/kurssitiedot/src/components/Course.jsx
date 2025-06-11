import Header from './Header'
import Content from './Content'
import Total from './Total'

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