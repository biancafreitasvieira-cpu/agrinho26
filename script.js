// Função assíncrona para buscar os dados da API meteorológica
async function buscarPrevisao() {
    const select = document.getElementById('city-select');
    const coordenadas = select.value.split(',');
    const lat = coordenadas[0];
    const lon = coordenadas[1];

    // URL da API pública Open-Meteo (Previsão em tempo real)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extraindo as variáveis do JSON retornado pela API
        const temperatura = data.current.temperature_2m;
        const umidade = data.current.relative_humidity_2m;
        const chuva = data.current.rain;

        // Inserindo os dados dinamicamente nas tags HTML correspondentes
        document.getElementById('temp').innerText = temperatura;
        document.getElementById('humidity').innerText = umidade;
        document.getElementById('rain').innerText = chuva;

        // Chama a função que analisa os dados para criar o alerta ecológico
        gerarAlertaEcologico(chuva, umidade, temperatura);

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Não foi possível carregar os dados meteorológicos. Verifique sua conexão.");
    }
}

// Função com as regras de negócio para a sustentabilidade no campo
function gerarAlertaEcologico(chuva, umidade, temperatura) {
    const alertBox = document.getElementById('eco-alert');
    
    // Regra 1: Economia de água se já vai chover
    if (chuva > 2) {
        alertBox.className = "alert-box alert-warning";
        alertBox.innerHTML = `⚠️ <strong>ALERTA DE IRRIGAÇÃO:</strong> Chuva detectada ou prevista (${chuva}mm). 
        <strong>Desligue os sistemas de irrigação automática</strong> para economizar água e evitar que os nutrientes sejam lavados do solo.`;
    } 
    // Regra 2: Clima muito seco e quente exige cuidados contra a evaporação
    else if (umidade < 40 && temperatura > 30) {
        alertBox.className = "alert-box alert-warning";
        alertBox.innerHTML = `⚠️ <strong>ALERTA DE ESTRESSE HÍDRICO:</strong> Clima muito quente e seco. 
        Priorize a irrigação por gotejamento bem cedo ou no fim da tarde para evitar a perda de água por evaporação. Use palhada no solo para reter a umidade.`;
    } 
    // Regra 3: Condições normais favoráveis
    else {
        alertBox.className = "alert-box alert-normal";
        alertBox.innerHTML = `🌱 <strong>MANEJO IDEAL:</strong> Condições climáticas estáveis. 
        O solo mantém boa umidade natural. Momento propício para realizar o monitoramento preventivo de pragas e aplicação de manejos biológicos.`;
    }
}

// Configura o botão para rodar a função ao ser clicado
document.getElementById('update-btn').addEventListener('click', buscarPrevisao);

// Executa a busca automaticamente assim que a página terminar de carregar
window.onload = buscarPrevisao;