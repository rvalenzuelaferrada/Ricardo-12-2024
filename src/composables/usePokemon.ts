import { ref } from 'vue';
import api from '@/services/api'
import type { RouteParamValue } from 'vue-router'
import type { Pokemon } from '@/types/Pokemon'

export function usePokemon() {
  const pokemon = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getPokemon = async (name: string | RouteParamValue[]) => {
    loading.value = true;
    error.value = null;

    try {
      pokemon.value = await api.fetchPokemon(name as string);
    } catch (err: unknown) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const getPokemonChain = async (name: string | RouteParamValue[]) => {
    loading.value = true;
    error.value = null;

    try {
      if (pokemon.value) {
        const pokemonSpecies = await api.fetchPokemonSpecies(pokemon.value.id);
        const data = await api.fetchPokemonChain(pokemonSpecies.evolution_chain.url);

        const speciesNames = getEvolutionSpeciesNames(data.chain);
        const evolutions: Pokemon[] = [];

        for (const speciesName of speciesNames) {
          const evolution = await api.fetchPokemon(speciesName);
          evolutions.push(evolution);
        }

        pokemon.value.evolutions = evolutions;

      } else {
        error.value = 'Pokemon is not initialized. Call getPokemon first.';
        return; // Salir de la función sin lanzar una excepción
      }
    } catch (err: unknown) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const getEvolutionSpeciesNames = (chain: any): string[] => {
    const speciesNames: string[] = [];

    // Agregar el nombre de la especie actual
    if (chain.species && chain.species.name) {
      speciesNames.push(chain.species.name);
    }

    // Recorrer evolves_to y aplicar la recursión
    if (Array.isArray(chain.evolves_to)) {
      chain.evolves_to.forEach((evolution: any) => {
        speciesNames.push(...getEvolutionSpeciesNames(evolution));
      });
    }

    return speciesNames;
  };


  return {
    pokemon,
    loading,
    error,
    getPokemon,
    getPokemonChain,
  };
}
