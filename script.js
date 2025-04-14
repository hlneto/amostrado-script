function runCode() {
    const codeInput = document.getElementById('codeInput').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    try {
        const lines = codeInput.split('\n').map(line => line.trim()).filter(line => line !== '');
        
        let variables = {};
        let output = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            if (line === 'oxe') {
                continue;
            } else if (line === 'cabô') {
                break;
            } else if (line.startsWith('mostra ')) {
                let value = line.replace('mostra ', '').trim();
                if (!value.startsWith("'") && !value.startsWith('"') && variables[value]) {
                    output.push(variables[value]);
                } else {
                    output.push(value.replace(/['"]/g, '')); 
                }
            } else if (line.startsWith('tabacudo ')) {
                let parts = line.replace('tabacudo ', '').split(' é ');
                let varName = parts[0].trim();
                let varValue = parseFloat(parts[1]) || parts[1].replace(/['"]/g, '');
                variables[varName] = varValue;
            } else if (line.startsWith('homi ')) {
                let condition = line.replace('homi ', '').split(' então ')[0];
                let action = line.split(' então ')[1];
                let [varName, operator, value] = condition.split(' ');
                value = parseFloat(value) || value.replace(/['"]/g, '');

                let varValue = variables[varName] || 0;
                let result = false;

                if (operator === '==') result = varValue == value;
                else if (operator === '>') result = varValue > value;
                else if (operator === '<') result = varValue < value;

                if (result && action.startsWith('mostra ')) {
                    let value = action.replace('mostra ', '').replace(/['"]/g, '');
                    output.push(value);
                }
            } else if (line.startsWith('arrudeia ')) {
                let count = parseInt(line.replace('arrudeia ', ''));
                let nextLine = lines[i + 1];
                if (nextLine && nextLine.startsWith('mostra ')) {
                    let value = nextLine.replace('mostra ', '').replace(/['"]/g, '');
                    for (let j = 0; j < count; j++) {
                        output.push(value);
                    }
                    i++;
                }
            } else {
                output.push(`Oxente! Comando "${line}" tá errado, visse?`);
            }
        }
        outputDiv.innerHTML = output.join('<br>') || 'Nenhum resultado, oxe!';
    } catch (error) {
        outputDiv.innerHTML = 'Vixi Maria! Deu erro: ' + error.message;
    }
}
