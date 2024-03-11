import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SeachFormContainer } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

import { memo } from "react";
/* Por que um component renderiza?
- Hooks changed (mudou estado, contexto, reducer)
- Props changed
- Parent rerendered

Qual o Fluxo de renderização?
1*. O react recria o HTML da interface daquele component
2. compara a versão do HTML recirada com a versão anterior
3. SE mudou alguma coisa, ele reescreve o HTML na tela

Solução: MEMO
0. Hooks changed OR props changed (deep comparison)
0.1 Comparar com a versão anterior dos hooks e props
0.2 Se mudou algo, ele vai para o passo 1* do fluxo regular, acima.
*/

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(TransactionsContext, (ctx) => ctx.fetchTransactions);

  const { register, handleSubmit, formState: { isSubmitting} } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SeachFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} weight="fill" />
        Buscar
      </button>
    </SeachFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);