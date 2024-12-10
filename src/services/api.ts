import axios from 'axios'
import type { PokemonListResponse } from '@/types/Pokemon'

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
}

export default new pokeApi()
