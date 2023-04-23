const express = require('express');
const app = express();
const port = 3000;

app.listen(port,function(){
  console.log(`Сервер запущен: http://localhost:${port}`);
});

//подключение статических данных
app.use(express.static('public')); 

//Подключение hbs
const hbs = require('hbs');
app.set('views','views');
app.set('view engine','hbs');

//Подключение библиотеки faker
const { faker } = require('@faker-js/faker');

let users = [];
let allTags = [ 'system', 'bus', 'circuit', 'application', 'firewall' ];
for (let i = 1; i <= 10; i++) {
  let user = {
    id: i-1,
    username: faker.internet.userName(),
    text: faker.hacker.phrase(),
    avatar: faker.image.avatar(),
    tags: faker.helpers.uniqueArray(allTags, 3),
    age: faker.datatype.number(70),
    color: faker.vehicle.color(),
    music: faker.music.genre(),
    company: faker.company.name(),
    phone: faker.phone.number('+7 983 ### ## ##'),
    about: faker.lorem.text()
  }
  users.push(user);
}

app.get('/',(req,res)=>{
  let tag = req.query.tag;
  if (!tag) {
    res.render('index',{
      users: users
    });
  } else {
    let search = [];
    for (let i = 0; i < users.length; i++){
      let item = users[i];
      if (item.tags.includes(tag)) {
        search.push(item);
      }
    }
    res.render('index',{
      users: search
    });
  }
});

app.get('/profile',(req,res)=>{
  let id = req.query.id;
  if (!id) {
    res.render('Такого пользователя нет');
  } else {
    res.render('profile',users[id]);
  }
});