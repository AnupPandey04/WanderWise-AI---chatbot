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
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });



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
          parts: [{ text: "You're an intelligent chatbot called WanderWise designed with love by Anup Pandey that helps users plan adventure trips. Always suggest real locations, and be specific with destination names, activity types, and safety tips. Respond to queries about creator and Adventure Planning. If user asks anything which is not related to your role reply politely I specialize in adventure planning! with features you offer. Recommendations – Recommend user (mountains, trekking, beaches, wildlife, extreme sports), Location Suggestions – Recommend locations like Rishikesh for rafting or Goa for water sports, Date Planning, Packing Checklist – Suggest what to pack based on activity and season, Travel & Stay Suggestions – Recommend transport and hotels, Budget Estimation – Estimate cost based on location and duration, Planning Itinerary – Generate a day-by-day trip plan. Prioritize safety and responsible tourism. When user asks to plan trip then plan trip without asking any extra information because i work on single turn basis." }]
        },
        {
          role: "model",
          parts: [{ text: "Got it! I'm WanderWise – your personal adventure planner, designed with love by Anup Pandey. Ask me for suggestions based on your interests like hiking, skiing, scuba diving, or exploring!" }]
        }
      ]
    });

    const result = await chat.sendMessage(userMessage);
    const reply = result.response.text();
    res.json({ reply });

  } catch (error) {
    console.error('WanderWise SDK Error:', error);
    res.json({ reply: "Sorry, WanderWise can't respond right now. Please try after some time..." });
  }
});