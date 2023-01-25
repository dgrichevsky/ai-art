import { getPokemon, getPokemonList } from './getPokemon';
describe('getPokemon', () => {
it("should get list", async () => {
await getPokemonList().then(list=> {
    console.log('running test')
    expect(list.count).toBe(1279);
})

})

});