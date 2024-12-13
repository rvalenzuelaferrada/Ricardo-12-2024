import { ref } from 'vue'
import api from '@/services/api'

export function usePokemonList() {
  const pokemons = ref<{ name: string; url: string }[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const offset = ref(0)
  const limit = ref(25)

  const loadPokemons = async () => {
    try {
      isLoading.value = true
      const data = await api.listPokemons(offset.value, limit.value)

      pokemons.value = [...pokemons.value, ...data.results]

      //llamar api al detalle de cada pokemon
      for (const pokemon of pokemons.value) {
        const data = await api.fetchPokemon(pokemon.name)
        const index = pokemons.value.findIndex(p => p.name === pokemon.name)
        pokemons.value[index] = data
      }
    } catch (err: unknown) {
      console.log(err)
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
      offset.value += limit.value
    }
  }

  return {
    pokemons,
    loadPokemons,
  }
}
