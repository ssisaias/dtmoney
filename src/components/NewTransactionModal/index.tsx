import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface newTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        const data = {
            title,
            value, 
            category,
            type
        }

        api.post('/transactions', data);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <button type="button" className="react-modal-close-btn" onClick={onRequestClose}>
                    <img src={closeImg} alt="Fechar modal"></img>
                </button>
                <input type="text" value={title} onChange={event => setTitle(event.target.value)} name="titulo" id="" placeholder="Titulo" />
                <input type="number" value={value} onChange={event => setValue(Number(event.target.value))} name="valor" id="" placeholder="valor" />
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
                <input placeholder="categoria" value={category} onChange={event => setCategory(event.target.value)} />
                <button type="submit" name="cadastrar" id="" placeholder="cadastrar">Cadastrar</button>
            </Container>
        </Modal>
    )
}