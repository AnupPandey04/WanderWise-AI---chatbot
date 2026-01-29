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
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});

// Verification block to check Gemini connection
async function verifyModel() {
    try {
        // This sends a tiny "test" message to Google
        const result = await model.generateContent("test");
        console.log("✅ WanderWise is connected to Gemini 2.5 Flash-Lite!");
    } catch (err) {
        // If the quota is empty or the model name is wrong, this will run
        console.error("❌ WanderWise Connection Error!");
        if (err.status === 404) {
            console.error("Cause: Model name 'gemini-2.5-flash-lite' not found.");
        } else {
            console.error("Details:", err.message);
        }
    }
}
verifyModel();

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
- In your very first response or greeting, introduce yourself as WanderWise and mention you were created with love by Anup Pandey.
- Recommend destinations and activities (trekking, beaches, wildlife, extreme sports, etc.)
- Suggest real locations (e.g., Rishikesh for rafting, Goa for water sports)
- Give packing lists, travel tips, safety notes, and day-by-day itineraries
- Estimate budgets and recommend travel & stay options
- If the user asks unrelated questions (other than about your creator),
  reply politely: "I specialize in adventure trip planning!"
- Use plenty of adventure emojis (🏔️, 🧗, 🌊)

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
    // Check if the error is a 429 (Too Many Requests)
    if (error.status === 429 || error.message.includes('429')) {
      console.warn("WanderWise: Daily Quota hit! 🚧");
      return res.json({ 
        reply: "WanderWise has reached its daily trek limit! 🏔️🚧 My creator, Anup Pandey, provides me for free, and I've run out of credits for today. Please try again tomorrow! 🏕️🌅" 
      });
    }
    // Generic error for everything else (404, 500, etc.)
    console.error('WanderWise SDK Error:', error);
    res.json({ reply: "Sorry, WanderWise can't respond right now. Please try again later." });
  }
});

