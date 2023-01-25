import fetch from "node-fetch";

export interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
      name: string;
      url: string;
    }[];
  };
  export interface Pokemon {
    id: number;
    name: string;
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
  };

 export const getPokemonList = async ():Promise<PokemonList> => {
    const listResp = await fetch('https://pokeapi.co/api/v2/pokemon');
    return listResp.json();
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
const dataResp = await fetch(url);
return await dataResp.json();
};


export const getFirstPokemon = async(): Promise<Pokemon> => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('getting the list')
        const listResp = await getPokemonList();
        resolve(await getPokemon(listResp.results[0].url))
    
      }catch(e) {
        reject(e);
      }
    })
  };
  