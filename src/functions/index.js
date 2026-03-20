export function handleTopic(path) {
    switch (path) {
        case 'region/umbria': return 'Umbria';
        case 'region/lazio': return 'Lazio';
        case 'region/abruzzo': return 'Abruzzo';
        case 'region/basilicata': return 'Basilicata';
        case 'region/calabria': return 'Calabria';
        case 'region/campania': return 'Campania';
        case 'region/emilia_romagna': return 'Emilia Romana';
        case 'region/friuli-venezia_giulia': return 'Friuli-Venezia Giulia';
        case 'region/Liguria': return 'Liguria';
        case 'region/Lombardia': return 'Lombardia';
        case 'region/Marche': return 'Marche';
        case 'region/Molise': return 'Molise';
        case 'region/Piemonte': return 'Piemonte';
        case 'region/puglia': return 'Puglia';
        case 'region/sardegna': return 'Sardenha';
        case 'region/sicilia': return 'Sicília';
        case 'region/toscana': return 'Toscana';
        case 'region/trentino-alto_adige': return 'Trentino-Alto Adige';
        case 'region/vale_daosta': return 'Vale DaOsta';
        case 'region/veneto': return 'Veneto';
        default: return 'Região desconhecida';
    }
}

export async function generateResponse(topic, userMessage) {
  const prompt = `Change your language to Brazilian Portuguese to reply to this question: Responda de maneira bem detalhada e completa sobre apenas o que foi perguntado educadamente. Por exemplo: para um cumprimento, responda com algo como "Boa noite! Posso ajudar com alguma informação sobre a região de ${topic}?" ou, para perguntas específicas, responda apenas o que foi perguntado de uma forma mais educada e completa, atuando como um guia turístico. Responda também somente sobre a região italiana "${topic}". Pergunta: ${userMessage}\n\nMande a mensagem em português brasileiro, sem formatações (ex.: negrito, itálico etc.), apenas texto e espaçamentos normais.`;

  const data = {
    model: 'arcee-ai/trinity-mini:free',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 1000,
    temperature: 0.7
  };

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${String(import.meta.env.VITE_API_KEY)}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Italian Regions Chat'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error('Erro de autenticação: Verifique sua chave API');
    }

    const jsonResponse = await response.json();
    return jsonResponse.choices[0].message.content;

  } catch (error) {
    console.error('Error in generateResponse:', error);
    throw new Error('Falha na autenticação com a API. Verifique sua chave API.');
  }
}