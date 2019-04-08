let news = require('./news.json');
var detail = require('./detail.json');
var users = require('./users.json');
var items = require('./items.json');
var materials = require('./materials.json');

let express = require("express");
let app = express();
let cors = require('cors');

app.use(cors());

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.post('/signin', (req, res, next) => {
  let { login, password } = req.headers;
  let user = users.find((item) => {
    return item.login === login && item.password === password
  });
  res.json({
    "token": 123,
    "id": user.id,
    "role": user.role
  });
});

app.get('/items', (req, res, next) => {
  // let { token } = req.headers;
  res.json(items);
});

app.get('/materials', (req, res, next) => {
  // let { token } = req.headers;
  res.json(materials);
});

app.post('/materials/update', (req, res, next) => {
  // let { token } = req.headers;
  console.log(req.body);
  console.log(req.params);
  console.log(req.name);
  let material = req.body;
  let index = materials.findIndex((item) => {
    return item.id === material.id
  });
  materials[index] = material;
  let data = JSON.stringify(materials);
  fs.writeFileSync('materials', data);
  res.json(materials);
});

app.get('/get-news', (req, res, next) => {
  res.json(material);
});

app.get('/get-news-detail?:news_id', (req, res, next) => {
  let news_id = req.params.news_id;
  res.json(detail);
});

app.get('/get-related-news?:news_id', (req, res, next) => {
  let news_id = req.params.news_id;
  res.json(news);
});
