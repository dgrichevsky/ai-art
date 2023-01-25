import { Pokemon, PokemonList, getPokemon, getPokemonList } from './getPokemon';
import fetch from "node-fetch";
import './App.css';
const { PromisePool } = require('@supercharge/promise-pool')

  function PokemonComponent(fn: (a: string) => void)  {
    fetch('https://pokeapi.co/api/v2/pokemon').
    then((response) => {return response.json()}).
    then((data: PokemonList) => 
    
    {console.log('pokemon',data)
    fetch(data.results[0].url).
    then((response) => {return response.json()}).
    then((data: Pokemon) => {console.log(data.stats)});
}).catch(err => console.log(err));

}

export const asyncPokemon = async () => {
      // const data =  getFirstPokemon();
      // const pokemon = await data;
      // const pokemon2 = await data;
      const list = await getPokemonList();
      // list.results.reduce<Promise<unknown>>(async (promise, pokemon) => {
      //   await(promise);
      //   return getPokemon(pokemon.url).then((data) => {
      //     console.log(data.name);
      //   })
      // }, Promise.resolve(undefined))
      //for loop is
      // for (const item of list.results){
      //   let pok = await getPokemon(item.url);
      //   console.log(pok.name);
      // }

      // forEach is not compatible with async/await
      // list.results.slice(0, 10).forEach(async list => {
      //   let pok = await getPokemon(list.url);
      //   console.log(pok.name);
      // })
      
      
      const { results, errors } = await PromisePool
        .withConcurrency(10)
        .for(list.results)
        .process(async (data: any) => {
          return await getPokemon(data.url)
        });
      
      // const data = await Promise.all(list.results.map(pokemon => getPokemon(pokemon.url)))
      console.log('results', results);
      return results;    
}

/*
//async version
 (async function  () {
    try {    
        const listResp = await getPokemonList();
        const pokemon = await getPokemon(listResp.results[0].url);
        console.log(pokemon.name);
    } catch (e) {
        console.log(e);
    }
    return ;
})()
*/
// export default PokemonComponent;