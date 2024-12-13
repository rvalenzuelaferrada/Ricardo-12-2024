<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { usePokemonList } from '@/composables/usePokemonList'
import { useTeamStore } from '@/stores/team.ts'

const { pokemons, loadPokemons } = usePokemonList()
const teamStore = useTeamStore()

const load = async () => {
  await loadPokemons()
}
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
        <img class="h-40 w-40" v-if="pokemon.sprites" :src="pokemon.sprites.other.dream_world.front_default" alt="pokemon" />
        <div v-else class="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>

        {{ pokemon.name }}
        <button @click="teamStore.togglePokemon(pokemon)">
          {{ teamStore.isPokemonInTeam(pokemon) ? 'Remove' : 'Add' }} Pokemon
        </button>
      </li>
    </ul>
    <InfiniteLoading @infinite="load" />
  </main>
</template>
