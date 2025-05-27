document.addEventListener('DOMContentLoaded', function() {
    // Função de mostrar seção
    function mostrarSecao(secaoId) {
        const secoes = document.querySelectorAll('.secao');
        secoes.forEach(secao => {
            secao.style.display = 'none';
        });
        document.getElementById(secaoId).style.display = 'block';
    }
    window.mostrarSecao = mostrarSecao;

    // Formulário
    const doacaoForm = document.getElementById('formDoacao');
    const listaDoacoes = document.getElementById('listaDoacoes');
    const tipoDoacao = document.getElementById('tipo_doacao');
    const campoValor = document.getElementById('valor');

    // Ajuste do campo Valor
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

    // Submissão do formulário
    doacaoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = this.nome.value;
        const tipo = this.tipo_doacao.value;
        const valor = tipo === 'Dinheiro' ? (this.valor.value || 'não especificado') : 'não aplicável';

        const item = document.createElement('li');
        item.textContent = `${nome} doou ${valor} (${tipo})`;
        listaDoacoes.appendChild(item);

        this.reset();
        campoValor.disabled = true;
    });
});