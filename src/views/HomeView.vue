<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { usePokemonList } from '@/composables/usePokemonList'

const { pokemons, loadPokemons } = usePokemonList()

loadPokemons()
</script>

<template>
  <main>
    <h1>Pokemons</h1>
    <ul>
      <li class="" v-for="pokemon in pokemons" :key="pokemon.id">
        {{ pokemon.name }}
      </li>
    </ul>
    <TheWelcome />
  </main>
</template>
