<script setup lang="ts">
import { defineProps } from 'vue'
import { useTeamStore } from '@/stores/team.ts'

const teamStore = useTeamStore()

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const playSound = () => {
    const audio = new Audio(props.pokemon.cries.latest)
    audio.play()
}
</script>

<template>
  <div class="flex flex-col bg-blue-100 rounded-2xl border-yellow-400 border-8 pb-12 hover:bg-yellow-200 cursor-pointer">

    <button
      @click="playSound"
      class="border-4 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-600 items-end h-12 w-12 m-3"
    >
      ▶
    </button>

    <div class="flex flex-col items-center">
      <div class="bg-gradient-to-b from-50% to-50% from-red-500 to-white rounded-full m-3 border-4 border-black relative">
        <img class="h-40 w-40 z-20" v-if="pokemon.sprites" :src="pokemon.sprites.other.dream_world.front_default" alt="pokemon" />
      </div>

      <p class="font-black text-2xl hover:underline">
        <RouterLink :to="`/team/${pokemon.name}`">
          {{ pokemon.name }}
        </RouterLink>
      </p>

      <button :class="{'bg-black text-white': teamStore.isPokemonInTeam(pokemon)}" class="hover:bg-black hover:text-white border-black border-4 rounded-3xl py-2 px-4 my-4" @click="teamStore.togglePokemon(pokemon)">
        {{ teamStore.isPokemonInTeam(pokemon) ? 'Quitar' : 'Atrapar' }}
      </button>
    </div>
  </div>
</template>
