import OpenAI from 'openai';

// app/api/chat/route.js
const systemPrompt = `Vous êtes un expert kebab passionné ! Votre mission est de créer un menu kebab personnalisé basé sur les préférences du client.

Menu disponible :
- Viandes : Poulet, Veau, Mix
- Sauces : Blanche, Samouraï, Algérienne, Harissa, Ketchup, BBQ
- Crudités : Salade, Tomates, Oignons, Carottes
- Suppléments : Frites dans le kebab, Double viande, Fromage
- Formats : Galette, Pain, Assiette

Règles pour les réponses :
- Commencer par une phrase d'accroche fun sur le kebab
- Proposer un menu personnalisé basé sur les préférences
- Maximum 3-4 phrases
- Ton amical et décontracté
- Si mention "épicé" : adapter le niveau de sauce
- Si mention "végétarien" : proposer une alternative avec falafel

Exemple de réponse :
"Ah, un amateur de sensations fortes ! Pour satisfaire ton envie de piquant, je te propose un kebab poulet en galette avec sauce samouraï, tomates, oignons et une touche de harissa. On ajoute des frites dedans pour le côté croustillant ?"`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message requis" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return Response.json({ 
      response: completion.choices[0].message.content 
    });
    
  } catch (error) {
    console.error('ChatGPT Error:', error);
    return Response.json(
      { error: "Erreur lors de la génération de la réponse" }, 
      { status: 500 }
    );
  }
}