const fs  = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'),{encoding: 'utf8'});
const accounts = JSON.parse(accountData);
let accountsJSON = "";

const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'),{encoding: 'utf8'});
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

app.get('/transfer', function(req, resp){
    resp.render('transfer');
});
app.post('/transfer', function(req,resp){
    const from = req.body.from;
    const to = req.body.to;
    const amount = parseInt(req.body.amount);

    accounts[from].balance -= amount;
    accounts[to].balance += amount;

    accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'),accountsJSON,"utf8");

    resp.render('transfer',{message: "Transfer Completed"});
});

app.get('/payment', function(req, resp){
    resp.render('payment',{account: accounts.credit});
});
app.post('/payment', function(req, resp){
    const amount = parseInt(req.body.amount);
    accounts.credit.balance -= amount;
    accounts.credit.available += amount;

    accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'),accountsJSON,"utf8");

    resp.render('payment',{message: "Payment Successful", account: accounts.credit});
});

app.listen(3000, function(){
    console.log('PS Project Running on port 3000!')
});