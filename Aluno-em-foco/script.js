const turmas = {};  // Objeto para armazenar turmas e seus alunos
const tabelaAlunos = document.getElementById("tabelaAlunos").getElementsByTagName("tbody")[0];
const tabelaHorarios = document.getElementById("tabelaHorarios").getElementsByTagName("tbody")[0];
const listaEventos = document.getElementById("listaEventos");

// Função para adicionar nova turma
function adicionarTurma() {
    const nomeTurma = document.getElementById("nomeTurma").value;
    if (nomeTurma === "") {
        alert("Por favor, insira o nome da turma.");
        return;
    }
    if (!turmas[nomeTurma]) {
        turmas[nomeTurma] = [];
        const option = document.createElement("option");
        option.value = nomeTurma;
        option.text = nomeTurma;
        document.getElementById("selecaoTurma").appendChild(option);
    }
    document.getElementById("nomeTurma").value = "";
}

// Função para exibir alunos da turma selecionada
function mostrarTurma() {
    const turmaSelecionada = document.getElementById("selecaoTurma").value;
    tabelaAlunos.innerHTML = "";
    if (turmas[turmaSelecionada]) {
        turmas[turmaSelecionada].forEach(aluno => adicionarLinhaAluno(aluno));
    }
}

// Função para adicionar aluno à turma selecionada
function adicionarAluno() {
    const turmaSelecionada = document.getElementById("selecaoTurma").value;
    const nomeAluno = document.getElementById("nomeAluno").value;
    const notaAluno = document.getElementById("notaAluno").value;

    if (nomeAluno === "" || notaAluno === "" || !turmaSelecionada) {
        alert("Por favor, preencha todos os campos e selecione uma turma.");
        return;
    }

    const aluno = { nome: nomeAluno, nota: notaAluno, frequencia: "100%" };
    turmas[turmaSelecionada].push(aluno);
    adicionarLinhaAluno(aluno);

    document.getElementById("nomeAluno").value = "";
    document.getElementById("notaAluno").value = "";
}

// Função para adicionar linha de aluno na tabela
function adicionarLinhaAluno(aluno) {
    const linha = tabelaAlunos.insertRow();
    linha.insertCell(0).innerText = aluno.nome;
    linha.insertCell(1).innerText = aluno.nota;
    linha.insertCell(2).innerText = aluno.frequencia;
    linha.insertCell(3).innerHTML = '<button onclick="removerAluno(this)">Remover</button>';
}

// Função para remover aluno da turma
function removerAluno(button) {
    const linha = button.parentNode.parentNode;
    const turmaSelecionada = document.getElementById("selecaoTurma").value;
    turmas[turmaSelecionada] = turmas[turmaSelecionada].filter(aluno => aluno.nome !== linha.cells[0].innerText);
    tabelaAlunos.deleteRow(linha.rowIndex - 1);
}

// Função para adicionar horário de aula
function adicionarHorario() {
    const materia = document.getElementById("materia").value;
    const diaSemana = document.getElementById("diaSemana").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFim = document.getElementById("horaFim").value;

    if (materia === "" || diaSemana === "" || horaInicio === "" || horaFim === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const linha = tabelaHorarios.insertRow();
    linha.insertCell(0).innerText = materia;
    linha.insertCell(1).innerText = diaSemana;
    linha.insertCell(2).innerText = `${horaInicio} - ${horaFim}`;
    linha.insertCell(3).innerHTML = '<button onclick="removerHorario(this)">Remover</button>';

    // Limpa os campos de entrada
    document.getElementById("materia").value = "";
    document.getElementById("diaSemana").value = "";
    document.getElementById("horaInicio").value = "";
    document.getElementById("horaFim").value = "";
}

// Função para remover horário
function removerHorario(button) {
    const linha = button.parentNode.parentNode;
    tabelaHorarios.deleteRow(linha.rowIndex - 1);
}

// Função para adicionar evento no calendário acadêmico
function adicionarEvento() {
    const dataEvento = document.getElementById("dataEvento").value;
    const descricaoEvento = document.getElementById("descricaoEvento").value;

    if (dataEvento === "" || descricaoEvento === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const itemEvento = document.createElement("li");
    itemEvento.innerText = `${dataEvento}: ${descricaoEvento}`;
    listaEventos.appendChild(itemEvento);

    // Limpa os campos de entrada
    document.getElementById("dataEvento").value = "";
    document.getElementById("descricaoEvento").value = "";
}
