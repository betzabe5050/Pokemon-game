<template>
    <section v-if="isLoading || !correctPokemon" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokémons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5">¿Quién es este Pokémon?</h1>
        <ContadorJuegos :wins='wins' :losses='losses' />

        <!-- Pokémon Picture -->
        <PokemonPicture
            :pokemon-id="correctPokemon.id"
            :show-pokemon="gameStatus !== GameStatus.Playing"
        />

        <!-- Pokémon Options -->
        <PokemonOptions
            :options="pokemonOptions"
            :block-selection="gameStatus !== GameStatus.Playing"
            :correct-id="correctPokemon.id"
            @selected-option="checkAnswer"
        />

        <!-- Resultado -->
        <div class="mt-4 text-center min-h-16">
            <h2 v-if="gameStatus === GameStatus.Won" class="text-2xl font-bold text-green-600 capitalize">
                ¡Correcto! Es {{ correctPokemon.name }}
            </h2>

            <template v-else-if="gameStatus === GameStatus.Lost">
                <h2 class="text-2xl font-bold text-red-600">¡Incorrecto!</h2>
                <p class="text-lg capitalize">La respuesta correcta es: {{ correctPokemon.name }}</p>
            </template>

            <button
                v-if="gameStatus !== GameStatus.Playing"
                @click="getNextOptions()"
                class="mt-3 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
                Jugar de nuevo
            </button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { GameStatus } from '../interfaces/game-status-enum';
import { usePokemonGame } from '../composables/usePokemonGame'; 
import ContadorJuegos from '../components/ContadorJuegos.vue';

const {
    gameStatus,
    isLoading,
    pokemonOptions,
    correctPokemon,
    wins, 
    losses, 
    getNextOptions,
    checkAnswer,
} = usePokemonGame();
</script>

<style scoped>
</style>