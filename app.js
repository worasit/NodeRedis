/**
 * Created by worasit on 10/5/2016.
 */
"use strict";

let bluebird = require('bluebird');
let redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
let client = redis.createClient({
    host: '192.168.99.100',
    port: '6379'
});


const myJSON = {
    "age": 100,
    "name": "mkyong.com",
    "messages": ["msg 1", "msg 2", "msg 3"]
};

client.on('error', (err)=> {
    console.log("Error " + err);
});

client.set('eikon', JSON.stringify(myJSON));
client.getAsync('eikon').then((res)=> {
    let myObject = JSON.parse(res);
    console.log(myObject);
});




