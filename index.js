const prompt = require('prompt-sync')();
const sequelize = require('./modelo/data');
const Funcionario = require('./modelo/funcionario');

async function listarFuncionarios() {
  const funcionario = await Funcionario.findAll();
  console.log('Lista de Funcionários:');
  funcionario.forEach((Funcionario) => {
    console.log(`${Funcionario.nome} ${Funcionario.sobrenome} - ${Funcionario.cpf}`);
  });
}


async function inserirFuncionario() {
  const nome = prompt('Qual o nome do funcionário? ');
  const sobrenome = prompt('Qual o sobrenome do funcionário? ');
  const cpf = prompt('Qual o CPF do funcionário? ');
  const validado = cpf.length!==11?cpf:00000000000;
  await Funcionario.create({ nome, sobrenome, validado});
  console.log('Funcionário inserido com sucesso.');
}

async function atualizarFuncionario() {
  const id = parseInt(prompt('Qual o ID do funcionário que deseja atualizar? '));
  const funcionario = await Funcionario.findByPk(id);
  if (funcionario) {
    const nome = prompt(`Qual é o novo nome do funcionário? (${Funcionario.nome}): `) || Funcionario.nome;
    const sobrenome = prompt(`Qual é o novo sobrenome do mesmo? (${Funcionario.sobrenome}): `) || Funcionario.sobrenome;
    const cpf = parseFloat(prompt(`Qual é o novo CPF do funcionário? (${Funcionario.cpf}): `)) || Funcionario.cpf;
    await funcionario.update({ nome, sobrenome, cpf });
    console.log('O funcionário já foi atualizado com sucesso.');
  } else {
    console.log('Funcionário não existe.');
  }
}

async function apagarFuncionario() {
  const id = parseInt(prompt('Qual o ID do funcionário que deseja excluir da lista?'));
  const funcionario = await Funcionario.findByPk(id);
  if (funcionario) {
    await funcionario.destroy();
    console.log('Funcionário excluido da lista com sucesso.');
  } else {
    console.log('Funcionário não existe');
  }
}

async function opcoes() {
  while (true) {
    console.log('\nQual das opções a baixo deseja utilizar:');
    console.log('1 - Listar funcionários.');
    console.log('2 - Inserir funcionário.');
    console.log('3 - Atualizar funcionário.');
    console.log('4 - Apagar Funcionario.');
    console.log('0 - Sair');

    const opcao = parseInt(prompt('Opção escolhida: '));

    switch (opcao) {
      case 0:
        console.log('Finalizado.');
        process.exit(0);
      case 1:
        await listarFuncionarios();
        break;
      case 2:
        await inserirFuncionario();
        break;
      case 3:
        await atualizarFuncionario();
        break;
      case 4:
        await apagarFuncionario();
        break;
      default:
        console.log('Opção não existente.');
        break;
    }
  }
}

opcoes();
