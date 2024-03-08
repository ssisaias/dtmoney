import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import {
  Transaction,
  TransactionsContext,
} from "../../contexts/TransactionsContext";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction: Transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.balance += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.balance -= transaction.price;
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      balance: 0,
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#ffffff" />
        </header>
        <strong>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.balance)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
