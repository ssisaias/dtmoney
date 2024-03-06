import { MagnifyingGlass } from "phosphor-react";
import { SeachFormContainer } from "./styles";

export function SearchForm() {
  return (
    <SeachFormContainer>
      <input type="text" placeholder="Busque transações" />
      <button type="submit">
        <MagnifyingGlass size={20} weight="fill" />
        Buscar
      </button>
    </SeachFormContainer>
  );
}
