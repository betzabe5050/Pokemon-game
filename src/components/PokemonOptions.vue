<template>
    <section class="mt-5">
        <ul>
            <li
                v-for="{ id, name } in options"
                :key="id"
                @click="emits('selectedOption', id)"
                :class="{
                    'pointer-events-none': blockSelection,
                    '!bg-green-500 text-white': blockSelection && id === correctId,
                    '!bg-gray-200 text-gray-500': blockSelection && id !== correctId,
                }"
            >
                {{ name }}
            </li>
        </ul>
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces/pokemon.interface'

interface Props {
    options: Pokemon[]
    blockSelection: boolean
    correctId: number
}

defineProps<Props>()

const emits = defineEmits<{
    selectedOption: [id: number]
}>()
</script>

<style scoped>
@reference "tailwindcss";

li{
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100 capitalize;
}
</style>