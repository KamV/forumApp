let news = require('./news.json');
var detail = require('./detail.json');
var users = require('./users.json');
var items = require('./items.json');
var materials = require('./materials.json');
var requests = require('./requests.json');
var stock = require('./stock.json');

let express = require("express");
let app = express();
let cors = require('cors');
let fs = require('fs');
let path = 'src/api/';
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  let selectedStockItems = stock.slice(0, stock.length);
  selectedStockItems.forEach((stockItem , i) => {
    let selectedItems = items.find((item) => {
      return item.name === stockItem.name
    });
    selectedStockItems[i] = Object.assign(
      {},
      { id: stockItem.id },
      { name: stockItem.name },
      { minValue: stockItem.minValue },
      { checkDate: stockItem.checkDate },
      { value: stockItem.value },
      { monthlyConsumption: selectedItems ? selectedItems.monthlyConsumption : null },
      { nextMonthlyConsumption: selectedItems ? selectedItems.monthlyConsumption : null },
      { valueInWork: stockItem.valueInWork },
      { annualConsumption: stockItem.annualConsumption }
    );
  });
  res.json(selectedStockItems);
});

app.get('/materials', (req, res, next) => {
  // let { token } = req.headers;
  res.json(materials);
});

app.post('/materials/add', (req, res, next) => {
  // let { token } = req.headers;
  let material = req.body;
  let index = materials.findIndex((item) => {
    return item.articule === material.articule && item.name === material.name
  });
  if (index === -1) {
    let data = JSON.stringify(materials);
    const newId = materials.length !== 0 ? materials.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1 : 0;
    materials.push({
      id: newId,
      name: material.name,
      articule: material.articule
    });
    fs.writeFileSync(path + 'materials.json', JSON.stringify(materials));
  }
  res.json(materials);
});

app.post('/materials/update', (req, res, next) => {
  // let { token } = req.headers;
  let material = req.body;
  let index = materials.findIndex((item) => {
    return item.id === material.id
  });
  materials[index] = material;
  let data = JSON.stringify(materials);
  fs.writeFileSync(path + 'materials.json', data);
  res.json(materials);
});

app.get('/requests', (req, res, next) => {
  // let { token } = req.headers;
  let selectedRequests = requests.slice(0, requests.length);
  selectedRequests.forEach((item , i) => {
    let user = users.find((user => user.id === item.authorId));
    selectedRequests[i] = Object.assign(
      {},
      { id: item.id },
      { author: user },
      { name: item.name },
      { value: item.value },
      { date: item.date },
      { comment: item.comment },
      { status: item.status }
    );
  });
  res.json(selectedRequests);
});

app.post('/requests', (req, res, next) => {
  // let { token } = req.headers;
  let authorId = req.body.authorId;
  let selectedRequests = requests.filter((item) => {
    return item.authorId === authorId
  });
  selectedRequests.forEach((item , i) => {
    let user = users.find((user => user.id === item.authorId));
    selectedRequests[i] = Object.assign(
      {},
      { id: item.id },
      { author: user },
      { name: item.name },
      { value: item.value },
      { date: item.date },
      { comment: item.comment },
      { status: item.status }
    );
  });
  res.json(selectedRequests);
});

app.post('/requests/add', (req, res, next) => {
  // let { token } = req.headers;
  let authorId = req.body.authorId;
  let request = req.body.request;
  const newId = requests.length !== 0 ? requests.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1 : 0;
  let date = request.date.split('-');
  if (!requests) {
    requests = [];
  }
  requests.push({
    id: newId,
    authorId: authorId,
    name: request.name,
    value: request.value,
    date: date[2] + '.' + date[1] + '.' + date[0],
    comment: request.comment,
    status: 'На рассмотрении'
  });
  fs.writeFileSync(path + 'requests.json', JSON.stringify(requests));
  let selectedRequests = requests.filter((item) => {
    return item.authorId === authorId
  });
  selectedRequests.forEach((item , i) => {
    let user = users.find((user => user.id === item.authorId));
    selectedRequests[i] = Object.assign(
      {},
      { id: item.id },
      { author: user },
      { author: user },
      { name: item.name },
      { value: item.value },
      { date: item.date },
      { comment: item.comment },
      { status: item.status }
    );
  });
  res.json(selectedRequests);
});

app.post('/requests/update-status', (req, res, next) => {
  // let { token } = req.headers;
  let id = req.body.id;
  let status = req.body.status;
  let name = req.body.name;
  let value = req.body.value;
  let stockItem = stock.find((item) => {
    return item.name === name
  });

  if (status !== 'Одобрено' || (status === 'Одобрено' && stockItem.value - value >= 0)) {
    let index = requests.findIndex((item) => {
      return item.id === id
    });
    requests[index].status = status;
    fs.writeFileSync(path + 'requests.json', JSON.stringify(requests));
    let selectedRequests = requests.slice(0, requests.length);
    selectedRequests.forEach((item , i) => {
      let user = users.find((user => user.id === item.authorId));
      selectedRequests[i] = Object.assign(
        {},
        { id: item.id },
        { author: user },
        { author: user },
        { name: item.name },
        { value: item.value },
        { date: item.date },
        { comment: item.comment },
        { status: item.status }
      );
    });

    if (status === 'Одобрено') {
      let itemIndex = stock.findIndex((item) => {
        return item.name === name
      });
      stock[itemIndex].value = stock[itemIndex].value - value;
      stock[itemIndex].valueInWork = stock[itemIndex].valueInWork + value;
      fs.writeFileSync(path + 'stock.json', JSON.stringify(stock));
    }

    res.json(selectedRequests);
  } else {
    res.json(requests);
  }
});

app.post('/requests/delete', (req, res, next) => {
  // let { token } = req.headers;
  let id = req.body.id;
  let authorId = req.body.authorId;
  let status = req.body.status;
  let name = req.body.name;
  let value = req.body.value;
  requests = requests.filter((item) => {
    return item.id !== id
  });

  fs.writeFileSync(path + 'requests.json', JSON.stringify(requests));

  let selectedRequests = requests.filter((item) => {
    return item.authorId === authorId
  });
  selectedRequests.forEach((item , i) => {
    let user = users.find((user => user.id === item.authorId));
    selectedRequests[i] = Object.assign(
      {},
      { id: item.id },
      { author: user },
      { name: item.name },
      { value: item.value },
      { date: item.date },
      { comment: item.comment },
      { status: item.status }
    );
  });
   if (status === 'Одобрено') {
     let itemIndex = stock.findIndex((item) => {
       return item.name === name
     });
     stock[itemIndex].valueInWork = stock[itemIndex].valueInWork - value;
     stock[itemIndex].annualConsumption = stock[itemIndex].annualConsumption + value;
     fs.writeFileSync(path + 'stock.json', JSON.stringify(stock));
   }

  res.json(selectedRequests);
});

app.get('/stock/items', (req, res, next) => {
  // let { token } = req.headers;
  res.json(stock);
});

app.post('/stock/add', (req, res, next) => {
  // let { token } = req.headers;
  let stockItem = req.body.stockItem;
  const newId = stock.length !== 0 ? stock.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1 : 0;
  let date = stockItem.checkDate.split('-');
  stock.push({
    id: newId,
    name: stockItem.name,
    minValue: stockItem.minValue,
    checkDate: date[2] + '.' + date[1] + '.' + date[0],
    value: stockItem.value,
    valueInWork: 0,
    annualConsumption: 0
  });
  fs.writeFileSync(path + 'stock.json', JSON.stringify(stock));
  res.json(stock);
});

app.post('/stock/update', (req, res, next) => {
  // let { token } = req.headers;
  let stockItem = req.body.stockItem;
  let index = stock.findIndex((item) => {
    return item.id === stockItem.id
  });
  stock[index] = stockItem;
  fs.writeFileSync(path + 'stock.json', JSON.stringify(stock));
  res.json(stock);
});

app.post('/stock/delete', (req, res, next) => {
  // let { token } = req.headers;
  let id = req.body.id;
  stock = stock.filter((item) => {
    return item.id !== id
  });
  fs.writeFileSync(path + 'stock.json', JSON.stringify(stock));
  res.json(stock);
});

// app.get('/get-news', (req, res, next) => {
//   res.json(material);
// });
//
// app.get('/get-news-detail?:news_id', (req, res, next) => {
//   let news_id = req.params.news_id;
//   res.json(detail);
// });
//
// app.get('/get-related-news?:news_id', (req, res, next) => {
//   let news_id = req.params.news_id;
//   res.json(news);
// });
