import { useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export interface NewTransaction {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (transaction: NewTransaction) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextData);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = api.get(`/transactions`, {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    const { data } = await response;
    setTransactions(data);
  }, []);

  //The useCallback hook is used to prevent the function from being recreated every time the component is rendered
  // it has a dependency array as the second argument, which means that the function will only be recreated if the dependencies change
  const createTransaction = useCallback(async (transaction: NewTransaction) => {
    const { description, price, category, type } = transaction;
    const createdAt = new Date();
    const response = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt,
    });
    setTransactions((state) => [response.data, ...state]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
