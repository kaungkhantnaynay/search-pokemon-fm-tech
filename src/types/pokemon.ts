export interface PokemonSummary {
  id: string;
  number: string;
  name: string;
  image: string;
}

export interface PokemonAttack {
  name: string;
  type: string;
  damage: number;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  attacks: {
    fast: PokemonAttack[];
    special: PokemonAttack[];
  };
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  evolutionRequirements?: {
    amount: number;
    name: string;
  };
  evolutions: PokemonSummary[] | null;
}

export interface PokemonQueryData {
  pokemon: Pokemon | null;
}
