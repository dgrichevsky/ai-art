import React, { useState, useMemo, memo, useEffect, useCallback } from 'react';
import './App.css';
import {asyncPokemon} from './fetch';
import { getPokemonList } from './getPokemon';
function Swatch({params, onClick}) {
  console.log(`swatch rendered ${params.color}`);
  return (
    <div className="swatch" onClick={onClick} style={{backgroundColor: params.color, height: '60px' ,width: '50px'}} ></div>
  )
  }
  let idx = 0;
  const GoodStopWatch = (props) => {
    const [count, setCount] = useState(0);
    // idx = props.index;
    useEffect(() => {
      idx++;
      console.log("useStopwatch useEffect");
      const interval = setInterval(() => {
        setCount((prev) => {
          console.log(`Timer: ${idx} count: ${prev}`);
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return count;
  };
  const RestExample = (props) => {
    const [data = [], setData] = useState();
    // const [activeIndex = 0, setActiveIndex] = useState(false);
    const [activeIndices, setActiveIndices] = useState(new Set());
    let isMounted = false;
    useEffect(() => {
      if (!isMounted) {
        fetch("https://restcountries.com/v3.1/all")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      }
  
      return () => {
        isMounted = true;
      };
    }, []);
    let table = data.map((d, index) => (
      <li key ={index}>
        <button
          onClick={(evt) => {
            setActiveIndices(index);
          }}
        >
          click me
        </button>
        {d.name.common}
        {activeIndices === (index) && <span>{d.flag}</span>}
      </li>
    ));
    console.log(data);
  
    return (
      <div className="App">
        <ul > {table}</ul>
      </div>
    );
  };

  const PokemonComponent = () => {
    const[list = [], setList] = useState([])
    useEffect( () => { 

        (async function callPokemon() {
           let result = await asyncPokemon();
           console.log(result)
           setList(result);
        })();
    }, []);
    return (<div><ul>
      {list.map((item, index) => (
        // <span>{item}</span>
        <li key={item.id}>{item.name}</li>
      ))}
      
    </ul></div>)
  }


  // compare old to new props and if they changed, re render
  // no reason to useMemo if the dependency array is object, array, function because of compare by reference
//useMemo = render if props have  changed. use it for expensive calculations
  const  MemoedSwatch = memo(Swatch);
let idx2 = 0;
function App() {
  const [data, setAppRender] = useState(0);
  const [color, setColor] = useState('red');
  const params = useMemo(() => ({color}), [color]);
  // same as useMemo but for functions
  const onSetClick = useCallback(() => ({}), []);

  // idx2++;
  console.log('app rendered', idx2)
  return (
    <div className="App">
      <div> <button onClick={()=> setAppRender(data + 1)}> Render me</button>
      <button onClick={() => setColor(color === 'red' ? 'blue': 'red' )}>Change Color</button>
    <MemoedSwatch params={params} onClick={onSetClick}  />
    {/* <GoodStopWatch></GoodStopWatch> */}

{/* <RestExample></RestExample> */}
    </div>
    <PokemonComponent></PokemonComponent></div>
  );
}

export default App;
