async function sendUserInputToOpenAI(userInput) {
    const apiKey = process.env.apiKey; 
        const requestData = {
        messages: [{ role: 'user', content: userInput }],
        model: 'gpt-3.5-turbo',
    };
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'model': 'gpt-3.5-turbo',
        },
        body: JSON.stringify(requestData),
        });
    
        const responseData = await response.json();
        return responseData.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        throw error;
    }
    }
    
    export { sendUserInputToOpenAI };