import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statisticline = (props) => {
  return(
  <tr>
    <td>{props.data.name}</td><td>{props.data.value} {props.data.sc}</td>
  </tr>
  )
}

const Statistics = (props) =>{
  const t = props.taul
  let allValueCount = t[3].value
  if (allValueCount === 0){
    return(
      <div>
        <h2>statistics</h2>
          <p>no feedback given</p>
      </div>
    )
  }
  return(  
    <div>
      <h2>statistics</h2>
        <table>
          <tbody>
          <Statisticline data={t[0]} />
          <Statisticline data={t[2]} />
          <Statisticline data={t[1]} />
          <Statisticline data={t[3]} />
          <Statisticline data={t[4]} />
          <Statisticline data={t[5]} />
          </tbody>
        </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let sum = good+bad+neutral
  let avg = (good-bad)/sum
  let pos = (good/sum)*100

  const taulukko = [{value:good, name:"good"}, {value:bad, name:"bad"}, {value:neutral, name:"neutral"}, {value:sum, name:"all"}, {value:avg, name:"average"}, {value:pos, name:"positive", sc:"%"}]

  return (
    <div>
      <h1>give feedback</h1>      
      <Button onClick = {()=>setGood(good+1)} text = "good" />
      <Button onClick = {()=>setNeutral(neutral+1)} text = "neutral" />
      <Button onClick = {()=>setBad(bad+1)} text = "bad" />
      <Statistics taul={taulukko}/>
    </div>
  )
}

export default App