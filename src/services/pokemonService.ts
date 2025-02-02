export interface PokemonData {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export const fetchPokemon = async (
  name: string
): Promise<PokemonData | null> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!response.ok) throw new Error('Pokemon not found');

    const data: PokemonData = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAllPokemon = async (): Promise<{ name: string }[]> => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon-species?limit=1000'
    );
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchPokemon = async (query: string): Promise<PokemonData[]> => {
  try {
    const allPokemon = await fetchAllPokemon();

    const matchingPokemons = query.trim()
      ? allPokemon.filter((pokemon) =>
          pokemon.name.includes(query.toLowerCase())
        )
      : allPokemon;

    const pokemonDetails = await Promise.all(
      matchingPokemons.slice(0, 20).map((pokemon) => fetchPokemon(pokemon.name))
    );

    return pokemonDetails.filter(Boolean) as PokemonData[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
