import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";
import { useState } from "react";

export function Header() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isNewTransactionModalOpen} onOpenChange={setIsNewTransactionModalOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal onRequestClose={() => setIsNewTransactionModalOpen(false)} />
        </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  );
}
