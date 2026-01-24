import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      evolutionRequirements {
        amount
        name
      }
      evolutions {
        id
        number
        name
        image
      }
    }
  }
`;
