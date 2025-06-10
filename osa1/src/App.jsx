import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = props => <div>{props.name} {props.value}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>      
      <Button onClick = {()=>setGood(good+1)} text = "good" />
      <Button onClick = {()=>setNeutral(neutral+1)} text = "neutral" />
      <Button onClick = {()=>setBad(bad+1)} text = "bad" />
      <h2>statistics</h2>
      <Display value = {good} name = "good"/>
      <Display value = {neutral} name = "neutral"/>
      <Display value = {bad} name = "bad"/>
    </div>
  )
}

export default App