<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemon } from '@/composables/usePokemon.ts'
import PokemonCard from '@/components/PokemonCard.vue'

const route = useRoute()
const { pokemon, getPokemon, loading, getPokemonChain } = usePokemon()

onMounted( async() => {
  await getPokemon(route.params.id)
  await getPokemonChain()
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div v-if="loading">
      <p>Cargando...</p>
    </div>

    <div class="flex flex-row" v-else-if="pokemon">
      <pokemon-card :pokemon="pokemon" />

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
    </div>

    <div class="flex flex-col">
      <!-- Evolution chain -->
      <div v-if="pokemon.evolutions">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
          <pokemon-card
            v-for="pokemon in pokemon.evolutions"
            :key="pokemon.name"
            :pokemon="pokemon"
          />
        </div>
      </div>
    </div>

  </div>
</template>
