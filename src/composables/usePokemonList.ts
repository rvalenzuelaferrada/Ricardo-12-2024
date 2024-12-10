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
    } catch (err: unknown) {
      console.log(err)
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
    }
  }

  return {
    pokemons,
    loadPokemons,
  }
}
