const readline = require("readline");

// Classe que representa uma reserva
class Reserva {
  numeroQuarto: number;
  nomeHospede: string;
  dataEntrada: Date;
  dataSaida: Date;

  constructor(numeroQuarto: number, nomeHospede: string, dataEntrada: Date, dataSaida: Date) {
    this.numeroQuarto = numeroQuarto;
    this.nomeHospede = nomeHospede;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
  }
}

// Classe que gerencia as reservas do hotel
class Hotel {
  private reservas: Reserva[] = [];

  registrarReserva(reserva: Reserva): void {
    const jaReservado = this.reservas.find(r => r.numeroQuarto === reserva.numeroQuarto);

    if (jaReservado) {
      console.log(`\nQuarto ${reserva.numeroQuarto} já está reservado.`);
      return;
    }

    this.reservas.push(reserva);
    console.log(`\nReserva feita! Quarto ${reserva.numeroQuarto} - Hóspede: ${reserva.nomeHospede}`);
  }

  cancelarReserva(numeroQuarto: number): void {
    const index = this.reservas.findIndex(r => r.numeroQuarto === numeroQuarto);

    if (index === -1) {
      console.log("\nReserva não encontrada.");
      return;
    }

    const reserva = this.reservas[index];

    if (!reserva) {
      console.log("\nReserva não encontrada.");
      return;
    }

    const nome = reserva.nomeHospede;

    this.reservas.splice(index, 1);
    console.log(`\nReserva do quarto ${numeroQuarto} (${nome}) cancelada.`);
  }

  consultarStatusQuarto(numeroQuarto: number): string {
    const reserva = this.reservas.find(r => r.numeroQuarto === numeroQuarto);
    return reserva ? "Reservado" : "Disponível";
  }

  listarTodos(): void {
    if (this.reservas.length === 0) {
      console.log("\nNenhuma reserva ativa.");
      return;
    }

    console.log("\n--- Reservas ---");

    for (const r of this.reservas) {
      const entrada = r.dataEntrada.toLocaleDateString("pt-BR");
      const saida = r.dataSaida.toLocaleDateString("pt-BR");

      console.log(`[Quarto ${r.numeroQuarto}] ${r.nomeHospede} | Entrada: ${entrada} | Saída: ${saida}`);
    }
  }
}

// Leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pergunta(texto: string): Promise<string> {
  return new Promise(resolve => rl.question(texto, resolve));
}

// Programa principal
const hotel = new Hotel();

async function main() {
  let rodando = true;

  while (rodando) {
    console.log("\n=== MENU ===");
    console.log("1 - Registrar reserva");
    console.log("2 - Cancelar reserva");
    console.log("3 - Consultar status do quarto");
    console.log("4 - Listar todas as reservas");
    console.log("0 - Sair");

    const opcao = await pergunta("\nEscolha: ");

    if (opcao === "1") {
      const quarto = parseInt(await pergunta("Número do quarto: "));
      const hospede = await pergunta("Nome do hóspede: ");
      const entradaStr = await pergunta("Data de entrada (dd/mm/aaaa): ");
      const saidaStr = await pergunta("Data de saída (dd/mm/aaaa): ");

      const [diaE, mesE, anoE] = entradaStr.split("/").map(Number);
      const [diaS, mesS, anoS] = saidaStr.split("/").map(Number);

      // validação simples
      if (!diaE || !mesE || !anoE || !diaS || !mesS || !anoS) {
        console.log("\nData inválida.");
        continue;
      }

      const dataEntrada = new Date(Number(anoE), Number(mesE) - 1, Number(diaE));
      const dataSaida = new Date(Number(anoS), Number(mesS) - 1, Number(diaS));

      hotel.registrarReserva(new Reserva(quarto, hospede, dataEntrada, dataSaida));

    } else if (opcao === "2") {
      hotel.listarTodos();
      const quarto = parseInt(await pergunta("Número do quarto para cancelar: "));
      hotel.cancelarReserva(quarto);

    } else if (opcao === "3") {
      const quarto = parseInt(await pergunta("Número do quarto: "));
      const status = hotel.consultarStatusQuarto(quarto);
      console.log(`\nQuarto ${quarto}: ${status}`);

    } else if (opcao === "4") {
      hotel.listarTodos();

    } else if (opcao === "0") {
      console.log("\nAté logo!");
      rodando = false;

    } else {
      console.log("\nOpção inválida.");
    }
  }

  rl.close();
}

main();