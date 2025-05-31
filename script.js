// Função para verificar se um número é palíndromo
function isPalindrome(num) {
    const str = num.toString();
    return str === str.split('').reverse().join('');
}

// Função para calcular a soma dos palíndromos em um intervalo
function calculatePalindromicSum(start, end) {
    let sum = 0;
    const palindromes = [];
    
    for (let i = start; i <= end; i++) {
        if (isPalindrome(i)) {
            sum += i;
            palindromes.push(i);
        }
    }
    
    return {
        sum: sum,
        palindromes: palindromes
    };
}

// Função para formatar a exibição dos palíndromos
function formatPalindromes(palindromes) {
    if (palindromes.length === 0) return 'Nenhum palíndromo encontrado';
    
    let formatted = '';
    const chunkSize = 5;
    
    for (let i = 0; i < palindromes.length; i += chunkSize) {
        const chunk = palindromes.slice(i, i + chunkSize);
        formatted += chunk.join(', ');
        if (i + chunkSize < palindromes.length) {
            formatted += ',\n';
        }
    }
    
    return formatted;
}

// Função principal que é executada quando o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    const resultDiv = document.getElementById('result');
    const calculationDiv = document.getElementById('calculation');
    
    // Evento para o botão Calcular
    calculateBtn.addEventListener('click', function() {
        const start = parseInt(startInput.value);
        const end = parseInt(endInput.value);
        
        // Validação dos inputs
        if (isNaN(start) || isNaN(end)) {
            resultDiv.textContent = 'Por favor, insira números válidos';
            calculationDiv.textContent = '';
            return;
        }
        
        if (start > end) {
            resultDiv.textContent = 'O número inicial deve ser menor que o final';
            calculationDiv.textContent = '';
            return;
        }
        
        // Cálculo dos palíndromos
        const { sum, palindromes } = calculatePalindromicSum(start, end);
        
        // Exibição dos resultados
        resultDiv.textContent = `Soma total: ${sum}`;
        calculationDiv.innerHTML = `
            <p>Palíndromos encontrados (${palindromes.length}):</p>
            <p>${formatPalindromes(palindromes)}</p>
            <p>Soma: ${palindromes.join(' + ')} = ${sum}</p>
        `;
    });
    
    // Evento para o botão Retornar
    resetBtn.addEventListener('click', function() {
        startInput.value = '';
        endInput.value = '';
        resultDiv.textContent = '';
        calculationDiv.textContent = '';
    });
});