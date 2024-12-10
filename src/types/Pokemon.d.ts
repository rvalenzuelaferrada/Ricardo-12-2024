export interface Pokemon {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: Pokemon[]
  count: number
  next: string | null
  previous: string | null
}
