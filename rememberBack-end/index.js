const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const dictionary = require("./dictionary.json");

const port = 3001;
app.use(cors());
app.use(express.json());


app.get("/get", function (req, res) {  //запрос для отрисовки карточек
  res.send(dictionary);
});

app.post("/add", function (req, res) { // запрос для добавления слов в json
  const dbData = JSON.parse(fs.readFileSync("dictionary.json"))
  if ((dbData.some(i => i.englishVersion === req.body.englishVersion))) {
    res.status(409).send('слово есть в словаре')
  } else {
    fs.writeFileSync("dictionary.json", JSON.stringify([...dbData, req.body]))
    res.send('ok слово добавлено')
  }
});



app.post("/change", function (req, res) {
  const dbData = JSON.parse(fs.readFileSync("dictionary.json"))
    fs.writeFileSync('dictionary.json', JSON.stringify([...dbData.map(word => {
      if (word.id !== req.body.id) {
        return word
      } else {
        res.status(201).send('ok слово изменено')
        return req.body

      }
    })]))
  
});




app.post("/changeValueWord", function (req, res) { // запрос для добавления слов в json
  const dbData = JSON.parse(fs.readFileSync("dictionary.json"))




  if ((dbData.some(i => i.englishVersion === req.body.englishVersion))) {
    res.status(409).send('слово есть в словаре')
  } else {
    fs.writeFileSync("dictionary.json", JSON.stringify([...dbData, req.body]))
    res.send('ok слово добавлено')
  }
});





app.post("/delete", function (req, res) {
  const dbData = JSON.parse(fs.readFileSync("dictionary.json"))
  fs.writeFileSync('dictionary.json', JSON.stringify([...dbData.filter(word => word.id !== req.body.id)]))
  res.status(201).send('ok слово удалено')


});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

