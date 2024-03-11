import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SeachFormContainer } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
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
