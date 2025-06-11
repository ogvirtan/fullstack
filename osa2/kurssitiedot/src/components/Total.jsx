
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

export default Total