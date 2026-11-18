<template>
    <section>
        <img
            :src="imageSrc"  alt="Pokémon" class="h-[200px] transition-all duration-500" :class="{ 'brightness-0': !showPokemon }"
        />
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
    pokemonId: number
    showPokemon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showPokemon: false,
})

const imageSrc = computed(
    () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
)
</script>

<style scoped>
img{
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>