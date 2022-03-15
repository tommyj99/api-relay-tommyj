const express = require("express"); // yes
let request = require("request"); // yes
// const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");
let cors = require("cors");
const app = express(); // yes

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html

app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
});
app.use(limiter);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Ready");
});
// Routes
app.get("/mynews/api/news", async (req, res) => {
  //try {
  let mainChoice = req.query.mainchoice;
  let secondaryChoice = req.query.secondarychoice;
  let date = req.query.date;
  //let apikey = req.query.apiKey;
  let url = "";

  if (mainChoice === "everything") {
    url = `https://newsapi.org/v2/everything?q=${secondaryChoice}&sortBy=relevency&language=en&from=${date}&apiKey=${process.env.REACT_APP_NEWS_API_KEY2}`; // process.env.REACT_APP_NEWS_API_KEY2
  } else {
    url = `https://newsapi.org/v2/top-headlines?language=en&from=${date}&apiKey=${process.env.REACT_APP_NEWS_API_KEY2}`; // process.env.REACT_APP_NEWS_API_KEY2
  }

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

// To run: node app.js
// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// let allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };

// app.use(allowCrossDomain);
