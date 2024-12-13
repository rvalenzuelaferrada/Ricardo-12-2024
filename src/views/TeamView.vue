<script setup lang="ts">
import { useTeamStore } from '@/stores/team.ts'

const teamStore = useTeamStore()
</script>

<template>
<div>
  <p>List all pokemons in team store</p>
  <ul>
    <li v-for="pokemon in teamStore.team" :key="pokemon.name">
      <img class="h-40 w-40" v-if="pokemon.sprites" :src="pokemon.sprites.other.dream_world.front_default" alt="pokemon" />
      <div v-else class="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>

      <RouterLink :to="`team/${pokemon.name}`">
        {{ pokemon.name }}
      </RouterLink>
    </li>
  </ul>
</div>
</template>
