import React, {useState} from 'react'

export default function useVisualMode(MODE) {
  const [mode, setMode] = useState(MODE);
  const [history, setHistory] = useState([MODE]);

  return({
    mode,
    transition(NEWMODE, replace = false){
      if(replace){
        const his = [...history]
        his.pop()
        setHistory(his)
        setMode(NEWMODE);
      } else {
        setMode(NEWMODE);
        const his = [...history]
        his.push(mode)
        setHistory(his)
      }
    },
    back(){
      const last = [...history].pop()
      const his = [...history]
      his.pop()
      setHistory(his)
      setMode(last);
    }})
}