const express=require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const port=3000;

//Middleware
app.use(express.static('public')); //it will allow app to use public folder for html
app.use(bodyParser.json());
app.set('view engine','ejs');    //setting ejs

// Gemini API setup
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash-latest" });



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});

//Routes
app.get("/",(req,res)=>
{
    res.render("pages/index");
});

app.get("/about",(req,res)=>{
    res.render("pages/about");
});

app.get("/contact",(req,res)=>{
    res.render("pages/contact");

});


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chat = await model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are WanderWise, an adventure trip planning assistant created by Anup Pandey. You help with: adventure recommendations, location suggestions, itinerary planning, packing checklists, budget estimation, and travel tips. Always prioritize safety. If asked about unrelated topics, politely redirect to adventure planning." }]
        },
        {
          role: "model",
          parts: [{ text: "I understand! I'm WanderWise, your adventure planning expert. I can help you plan amazing trips with location suggestions, itineraries, packing lists, and safety tips. What adventure are you dreaming of?" }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 4096,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const reply = result.response.text();
    res.json({ reply });

  } catch (error) {
    console.error('WanderWise SDK Error:', error);
    res.json({ reply: "Sorry, WanderWise can't respond right now. Please try after some time..." });
  }
});