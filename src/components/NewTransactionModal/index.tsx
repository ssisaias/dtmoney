import React, { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface newTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {
    const [type, setType] = useState('deposit');

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">

            <Container>
                <h2>Cadastrar Transação</h2>
                <button type="button" className="react-modal-close-btn" onClick={onRequestClose}>
                    <img src={closeImg} alt="Fechar modal"></img>
                </button>
                <input type="text" name="titulo" id="" placeholder="Titulo" />
                <input type="number" name="valor" id="" placeholder="valor" />
                <TransactionTypeContainer>
                    <RadioBox type="button" 
                        isActive={type==='deposit'}
                        activeColor="green"
                        onClick={() => {setType('deposit')}}>
                        <img src={incomeImg} alt="entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button" 
                        isActive={type==='withdraw'}
                        activeColor="red"
                        onClick={() => {setType('withdraw')}}>
                        <img src={outcomeImg} alt="saida" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="categoria" />
                <button type="submit" name="cadastrar" id="" placeholder="cadastrar">Cadastrar</button>
            </Container>
        </Modal>
    )
}