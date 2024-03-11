import { useContextSelector } from "use-context-selector";
import {
  Transaction,
  TransactionsContext,
} from "../contexts/TransactionsContext";
import { useMemo } from "react";

interface Summary {
  income: number;
  outcome: number;
  balance: number;
}

export function useSummary() {
  const { transactions } = useContextSelector(
    TransactionsContext,
    (state) => state
  );
    // useMemo works similar to memo, but it is a hook instead, used to make a function only runs again when a dependecy of that function changes
  const summary = useMemo<Summary>(() => {
    return transactions.reduce(
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
  }, [transactions]);

  return summary;
}
