const { Client } = require('../models/client');

let clientauth = (req,res,next) => {
    // console.log(req.query.mobiletoken, "test test")
    let token = req.query.mobiletoken ? req.query.mobiletoken : req.cookies.lumisoft_client_token_auth;

    Client.findByToken(token,(err,client)=>{
        if(err) throw err;
        if(!client) return res.json({
            isAuth: false,
            error: true
        });

        req.token = token;
        req.client = client;
        next();
    })
}

module.exports = { clientauth }