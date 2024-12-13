import axios from 'axios'
import type { Pokemon, PokemonListResponse } from '@/types/Pokemon'

class pokeApi {
  private client

  constructor() {
    this.client = axios.create({
      baseURL: 'https://pokeapi.co/api/v2/',
    })
  }

  async listPokemons(offset: number, limit: number): Promise<PokemonListResponse> {
    return this.client.get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => response.data);
  }

  async fetchPokemon(name: string) {
    return this.client.get(`/pokemon/${name}`)
      .then(response => response.data);
  }

  async fetchPokemonSpecies(id: int) {
    return this.client.get(`/pokemon-species/${id}`)
      .then(response => response.data);
  }

  async fetchPokemonChain(url: string) {
    return this.client.get(url)
      .then(response => response.data);
  }
}

export default new pokeApi()
