const fs  = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'),{encoding: 'UTF8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'),{encoding: 'UTF8'});
const users  = JSON.parse(userData);

app.get('/',function(req, resp){
    resp.render('index',{title: 'Account Summary', accounts: accounts});
});
app.get('/savings', function(req, resp){
    resp.render('account',{account: accounts.savings});
});
app.get('/checking', function(req, resp){
    resp.render('account',{account: accounts.checking});
});
app.get('/credit', function(req, resp){
    resp.render('account',{account: accounts.credit});
});
app.get('/profile',function(req, resp){
    resp.render('profile',{user: users[0]});
});

app.listen(3000, function(){
    console.log('PS Project Running on port 3000!')
});