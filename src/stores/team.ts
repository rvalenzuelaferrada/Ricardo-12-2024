import { defineStore } from 'pinia';
import type { Pokemon } from '@/types/Pokemon'

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [] as Pokemon[],
    error: { message: '' } as { message: string }
  }),

  actions: {
    togglePokemon(pokemon: Pokemon) {
      try {
        this.clearError()

        if (this.isPokemonInTeam(pokemon)) {
          this.removePokemon(pokemon)
        } else {
          this.addPokemon(pokemon)
        }
      } catch (err: unknown) {
        this.error.message = (err as Error).message
      }
    },

    isPokemonInTeam(pokemon: Pokemon) {
      return this.team.some(p => p.name === pokemon.name)
    },

    addPokemon(pokemon: Pokemon) {
        if (this.team.length >= 6) {
          throw new Error('Team is full')
        }

        this.team.push(pokemon)
    },

    removePokemon(pokemon: Pokemon) {
      this.team = this.team.filter(p => p.name !== pokemon.name)
    },

    clearError() {
      this.error.message = ''
    }
  }
})
