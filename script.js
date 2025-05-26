document.addEventListener("DOMContentLoaded", function() {
    const tipoDoacao = document.getElementById('tipoDoacao');
    const valorInput = document.getElementById('valorInput');
    const doacoes = [];

    // Atualiza a obrigatoriedade do campo de valor
    tipoDoacao.addEventListener('change', function() {
        valorInput.required = this.value === 'Dinheiro';
    });

    const form = document.getElementById('doacaoForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = form.elements['nome_doador'].value;
        const tipo = form.elements['tipo_doacao'].value;
        const valor = parseFloat(form.elements['valor'].value) || 0;

        doacoes.push({ nome, tipo, valor });

        alert('Doação cadastrada com sucesso!');
        form.reset();

        atualizarLista(); // Atualiza a lista após cada doação
    });

    function atualizarLista() {
        const filtro = document.getElementById('filtro').value;
        const lista = document.getElementById('listaDoacoes');
        lista.innerHTML = '';

        const filtradas = doacoes.filter(d => d.tipo === filtro || filtro === 'Todos');

        lista.innerHTML = filtradas.length === 0 
            ? '<li>Nenhuma doação cadastrada.</li>' 
            : filtradas.map(d => `<li>Nome: ${d.nome} | Tipo: ${d.tipo} | Valor: R$ ${d.valor.toFixed(2)}</li>`).join('');
    }

    document.getElementById('filtro').addEventListener('change', atualizarLista);
});
