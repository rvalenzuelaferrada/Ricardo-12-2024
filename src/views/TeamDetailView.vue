<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemon } from '@/composables/usePokemon.ts'

const route = useRoute()
const { pokemon, getPokemon, loading, getPokemonChain } = usePokemon()

const playSound = () => {
  //funciona solo si pokemon existe
  if (pokemon.value) {
    const audio = new Audio(pokemon.value.cries.latest)
    audio.play()
  }
}

onMounted( async() => {
  await getPokemon(route.params.id)
  await getPokemonChain(route.params.id)
})
</script>

<template>
  <div>
    <p>Team detail view</p>
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="pokemon">
      <img class="h-40 w-40" v-if="pokemon.sprites" :src="pokemon.sprites.other.dream_world.front_default" alt="pokemon" />
      <div v-else class="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>
      <ul>
        <li>
          <p>{{ pokemon.name }}</p>
        </li>
      </ul>

      <h2>Types</h2>
      <ul>
        <li v-for="type in pokemon.types" :key="type.slot">
          <p>{{ type.type.name }}</p>
        </li>
      </ul>

      <!-- Stats con grafico -->
      <div class="flex justify-between items-end max-w-2xl">
        <!-- Barras del gráfico -->
        <div
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          class="flex flex-col items-center"
        >
          <div
            :style="{ height: `${stat.base_stat}px` }"
            class="w-full bg-blue-500 rounded-t-md"
          ></div>
          <p class="mt-2 text-sm font-medium">{{ stat.stat.name }}</p>
        </div>
      </div>

      <!-- Cries un sonido en formato ogg solo el boton de play-->
      <button
        @click="playSound"
        class="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
      >
        ▶ Play
      </button>

      <!-- Evolution chain -->
      <div v-if="pokemon.evolutions">
        <h2>Evolution chain</h2>
        <ul>
          <li v-for="evolution in pokemon.evolutions" :key="evolution.name">
            <img class="h-40 w-40" v-if="evolution.sprites" :src="evolution.sprites.other.dream_world.front_default" alt="pokemon" />
            <p>{{ evolution.name }}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
