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
