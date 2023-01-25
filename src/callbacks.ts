import { PokemonList } from "./getPokemon";
import fetch from 'node-fetch';
function getPokemonList (cb: (err: Error | undefined, pokemonList: PokemonList | undefined) => void):Promise<PokemonList> | void;
function getPokemonList():Promise<PokemonList> | void;
function getPokemonList (cb?: (err: Error | undefined, pokemonList: PokemonList | undefined) => void): Promise<PokemonList> | void  {
if(cb) {
    fetch('https://pokeapi.co/api/v2/pokemon')
.then(resp => resp.json()).then((data: PokemonList) => cb(undefined, data)).catch(err => cb(err, undefined))
return undefined;
} else {
return fetch('https://pokeapi.co/api/v2/pokemon')
.then(resp => resp.json());
}
};


getPokemonList((err: Error | undefined, data: PokemonList | undefined) => {
    console.log(data);
});

(async function(){
    const list = await getPokemonList();
    console.log(list);
})()

//function overloading
