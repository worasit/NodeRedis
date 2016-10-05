/**
 * Created by worasit on 10/5/2016.
 */
"use strict";

let bluebird = require('bluebird');
let redis = require('redis');

// set redis to be a promises
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// connection redis to redis server with options
let client = redis.createClient({
    host: '192.168.99.100',
    port: '6379'
});


client.on('error', (err)=> {
    console.log("Error " + err);
});



// JSON Object Payload
const myJSON = {
    "age": 20,
    "name": "mkyong.com",
    "messages": ["msg 1", "msg 2", "msg 3"]
};

// Set key as a System name
client.set('eikon', JSON.stringify(myJSON));
// Set expiration in second
client.expire('eikon', 60);

// Get key and its value using promises.
client.getAsync('eikon').then((res)=> {
    let myObject = JSON.parse(res);
    console.log(myObject);
});



// Whenever we set a value into the same key it will replacec the old one with a new one.
// Command SET KEY VALUE
//         TTL KEY
//         GET KEY