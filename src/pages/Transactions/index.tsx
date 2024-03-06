import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de website</td>
              <td>R$12.000</td>
              <td>
                <PriceHighlight variant="income">R$12.000</PriceHighlight>
              </td>
              <td>20/02/2021</td>
            </tr>
            <tr>
              <td width="50%">Aluguel</td>
              <td>
                <PriceHighlight variant="outcome">-R$12.000</PriceHighlight>
              </td>
              <td>Casa</td>
              <td>17/02/2021</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
