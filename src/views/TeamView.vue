<script setup lang="ts">
import { useTeamStore } from '@/stores/team.ts'
import PokemonCard from '@/components/PokemonCard.vue'

const teamStore = useTeamStore()
</script>

<template>
<div>
  <main class="p-6">

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
      <pokemon-card
        v-for="pokemon in teamStore.team"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
  </main>
</div>
</template>
