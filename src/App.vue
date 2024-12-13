<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTeamStore } from '@/stores/team.ts'

const teamStore = useTeamStore()
import NavLink from '@/components/NavLink.vue'
</script>

<template>
  <header class="max-w-4xl mx-auto text-center m-4">
    <img alt="Pokemon" src="./assets/pokemon_ico.png" class="h-28 mx-auto" />
    <nav class="flex justify-center space-x-4 mt-4">
      <NavLink label="Home" to="/"></NavLink>
      <NavLink :label="`Pokedex (${teamStore.team.length})`" to="/team"></NavLink>
    </nav>
  </header>

  <RouterView />
</template>
