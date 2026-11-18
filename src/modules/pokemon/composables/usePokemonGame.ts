import { computed, onMounted, ref } from 'vue'
import confetti from 'canvas-confetti'
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
    
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([]);
    const correctPokemon = ref<Pokemon | null>(null);
    const isLoading = computed(() => pokemons.value.length === 0);

    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonsArray = response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id,
            }
        });
        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextOptions = (howMany: number = 4 ) => {
        gameStatus.value = GameStatus.Playing;
        pokemons.value.sort(() => Math.random() - 0.5);
        pokemonOptions.value = pokemons.value.slice(0, howMany);

        const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
        correctPokemon.value = pokemonOptions.value[randomIndex] ?? null;
    };
    
//validar respuestaa y confetti
const checkAnswer = (id: number) => {
        if (gameStatus.value !== GameStatus.Playing) return;
        if (id === correctPokemon.value?.id) {
            gameStatus.value = GameStatus.Won;
            confetti({ particleCount: 300, spread: 150, origin: { y: 0.6 } });
        } else {
            gameStatus.value = GameStatus.Lost;
        }
    };


    // Lo montamos directamente para ver el resultado al momento en que cargue la aplicación
    onMounted(async ()=>{
        await new Promise((r) => setTimeout(r, 1000));
        pokemons.value=await getPokemons();
        getNextOptions();
        console.log({ pokemons });
        console.log(pokemonOptions.value);
    });
    
    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        correctPokemon, 
        // Methods
        getNextOptions,
        checkAnswer
    };
}