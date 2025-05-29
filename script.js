document.addEventListener('DOMContentLoaded', function() {

    // Função para mostrar a seção com animação
    function mostrarSecao(secaoId) {
        const secoes = document.querySelectorAll('.secao');
        secoes.forEach(secao => {
            if (secao.id !== secaoId) {
                secao.style.opacity = 0;
                setTimeout(() => secao.style.display = 'none', 500);
            }
        });

        const secaoAtiva = document.getElementById(secaoId);
        secaoAtiva.style.display = 'block';
        setTimeout(() => secaoAtiva.style.opacity = 1, 50);
    }
    window.mostrarSecao = mostrarSecao;

    // Elementos
    const doacaoForm = document.getElementById('formDoacao');
    const listaDoacoes = document.getElementById('listaDoacoes');
    const tipoDoacao = document.getElementById('tipo_doacao');
    const campoValor = document.getElementById('valor');
    const mensagem = document.getElementById('mensagem');

    // Ajuste do campo valor
    tipoDoacao.addEventListener('change', function() {
        if (this.value === 'Dinheiro') {
            campoValor.required = true;
            campoValor.disabled = false;
        } else {
            campoValor.required = false;
            campoValor.disabled = true;
            campoValor.value = '';
        }
    });

    // Carregar doações do localStorage
    function carregarDoacoes() {
        const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
        doacoes.forEach((d, index) => {
            adicionarItemLista(d, index);
        });
    }

    // Função para adicionar item na lista
    function adicionarItemLista(d, index) {
        let texto;
        if (d.tipo === 'Dinheiro') {
            texto = `${d.nome} doou ${d.valor} (${d.tipo})`;
        } else {
            texto = `${d.nome} doou ${d.tipo}`;
        }

        const item = document.createElement('li');
        item.textContent = texto;

        // Duplo clique para remover
        item.addEventListener('dblclick', function() {
            if (confirm('Deseja remover esta doação?')) {
                item.remove();
                const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
                doacoes.splice(index, 1);
                localStorage.setItem('doacoes', JSON.stringify(doacoes));
                atualizarLista();
            }
        });

        listaDoacoes.appendChild(item);
    }

    // Atualizar lista
    function atualizarLista() {
        listaDoacoes.innerHTML = '';
        carregarDoacoes();
    }

    // Submissão do formulário
    doacaoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = this.nome.value;
        const tipo = this.tipo_doacao.value;
        let valor = tipo === 'Dinheiro' ? this.valor.value || 'não especificado' : '';

        const novaDoacao = { nome, tipo, valor: valor || tipo };

        const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
        doacoes.push(novaDoacao);
        localStorage.setItem('doacoes', JSON.stringify(doacoes));

        adicionarItemLista(novaDoacao, doacoes.length - 1);

        this.reset();
        campoValor.disabled = true;

        mensagem.textContent = 'Doação cadastrada com sucesso!';
        setTimeout(() => mensagem.textContent = '', 3000);
    });

    // Mostrar inicialmente a seção "inicio"
    mostrarSecao('inicio');
    carregarDoacoes();
});
