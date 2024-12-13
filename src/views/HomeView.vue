<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { usePokemonList } from '@/composables/usePokemonList'
import { useTeamStore } from '@/stores/team.ts'
import PokemonCard from '@/components/PokemonCard.vue'

const { pokemons, loadPokemons } = usePokemonList()
const teamStore = useTeamStore()

const load = async () => {
  await loadPokemons()
}
</script>

<template>
  <main class="p-6">

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
      <pokemon-card
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>

    <InfiniteLoading @infinite="load" />

    <div v-if="teamStore.error.message" class="fixed px-3 bottom-0 left-0 w-full py-8 bg-red-500 text-white text-center shadow-2xl flex flex-row items-center justify-center">
      <div @click="teamStore.clearError()" class="hover:bg-red-400 bg-red-800 p-3 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer">
        <p>x</p>
      </div>
      <p class="ml-3">{{ teamStore.error.message }}</p>
    </div>
  </main>
</template>
