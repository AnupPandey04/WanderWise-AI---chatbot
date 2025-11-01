const express=require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const port=3000;

//Middleware
app.use(express.static('public')); //it will allow app to use public folder for html
app.use(express.json()); //to parse json data
app.set('view engine','ejs');    //setting ejs

// Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


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
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{
            text: `
You're WanderWise — an intelligent chatbot created with love by Anup Pandey.
You specialize in adventure trip planning and always give detailed, real, and safe recommendations.

Your functions:
- Recommend destinations and activities (trekking, beaches, wildlife, extreme sports, etc.)
- Suggest real locations (e.g., Rishikesh for rafting, Goa for water sports)
- Give packing lists, travel tips, safety notes, and day-by-day itineraries
- Estimate budgets and recommend travel & stay options
- If user asks unrelated questions, reply politely: "I specialize in adventure trip planning!"

Always:
- Be friendly and concise
- Encourage responsible tourism
- Work in single-turn conversations (don’t ask extra questions)
            `
          }]
        },
        {
          role: "model",
          parts: [{
            text: "Got it! I'm WanderWise – your personal adventure planner, ready to help you design your next thrilling journey!"
          }]
        }
      ]
    });

    const result = await chat.sendMessage(userMessage);
    const reply = result.response.text();
    res.json({ reply });

  } catch (error) {
    console.error('WanderWise SDK Error:', error);
    res.json({ reply: "Sorry, WanderWise can't respond right now. Please try again later." });
  }
});
