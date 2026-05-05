# Sistema de Reservas de Hotel

## Como executar

```
ts-node hotel.ts
```

---

## O que o programa faz

```
=== MENU ===
1 - Registrar reserva
2 - Cancelar reserva
3 - Consultar status do quarto
4 - Listar todas as reservas
0 - Sair
```

- **Opção 1:** Digita o número do quarto, nome do hóspede e datas de entrada e saída.
- **Opção 2:** Mostra as reservas e pede o número do quarto para cancelar.
- **Opção 3:** Pede o número do quarto e mostra se está Reservado ou Disponível.
- **Opção 4:** Lista todas as reservas ativas.
- **Opção 0:** Encerra o programa.

As datas devem ser digitadas no formato **dd/mm/aaaa** (ex: 10/06/2025).

---

## Estrutura do código

- **Classe Reserva:** representa uma reserva com número do quarto, hóspede e datas.
- **Classe Hotel:** gerencia as reservas com os métodos de registrar, cancelar e consultar.
- **Função main:** controla o menu e lê o que o usuário digita no terminal.
