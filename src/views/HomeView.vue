<script setup lang="ts">
import { usePokemonList } from '@/composables/usePokemonList'
import { useTeamStore } from '@/stores/team.ts'

const { pokemons, loadPokemons } = usePokemonList()
const teamStore = useTeamStore()

loadPokemons()
</script>

<template>
  <main>
    <h1>Pokemons</h1>
    <p v-if="teamStore.error" class="text-red-500">{{ teamStore.error.message }}</p>
    <ul>
      <li
        class="border border-blue-400 m-5 p-2"
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        {{ pokemon.name }}
        <button @click="teamStore.togglePokemon(pokemon)">
          {{ teamStore.isPokemonInTeam(pokemon) ? 'Remove' : 'Add' }} Pokemon
        </button>
      </li>
    </ul>
  </main>
</template>
