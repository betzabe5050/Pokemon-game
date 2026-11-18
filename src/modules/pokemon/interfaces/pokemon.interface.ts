export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}//la PokeAPI responde

export interface Result {
  name: string
  url: string
}

export interface Pokemon {
    id: number;
    name: string;
}//uso en el juego