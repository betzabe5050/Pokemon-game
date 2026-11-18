<template>
  <section class="flex gap-3 mb-4">
    <div class="fixed bottom-4 left-4 px-5 py-3 rounded-lg bg-green-100 text-green-700 font-semibold shadow">
      Ganados: {{ wins }}
    </div>
    <div class="fixed top-4 right-4 px-5 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow">
      Total: {{ wins + losses }}
    </div>
    <div class="fixed bottom-4 right-4 px-5 py-3 rounded-lg bg-red-100 text-red-700 font-semibold shadow">
      Perdidos: {{ losses }}
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  wins: number
  losses: number
}

defineProps<Props>()
</script>