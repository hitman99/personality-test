/**
 * Created by Tomas on 2017-09-14.
 */
var Redis = require('ioredis');
var Promise = require('promise');
var redis = null;

function saveAnswers({
    username,
    answers,
    timestamp
}){
    return new Promise(function(resolve, reject){
        createUser(username)
            .then(function(data){
                redis.zadd(username + '-answers', timestamp, JSON.stringify(answers), function(err, res){
                    if(!err){
                        resolve(res);
                    }
                    else{
                        reject(err);
                    }
                });
            })
            .catch(function(err){
                reject(err);
            })
    });
}

/**
 * Returns promise
 * @param user
 */

function createUser(username){
    return new Promise(function(resolve, reject){
        usernameAvailable(username)
            .then(function(){
                redis.sadd('users', username, function(err, res){
                    if(!err){
                        resolve(res);
                    }
                    else{
                        reject('Cannot create user: ' + err);
                    }
                });
            })
            .catch(function(){
                reject('User already exists');
            });
    });
}

/**
 * Returns promise
 * @param username
 */
function usernameAvailable(username){

    return new Promise(function(resolve, reject){
        redis.sismember('users', username, function(err, res){
            if(!err){
                resolve();
            }
            else{
                reject();
            }
        });
    });
}

function getAnswersForUser(user){

}

function getUserList(){

}

function setupRedis(cfg){
    redis = new Redis(cfg.port, cfg.host);
}

module.exports = {
    saveAnswers: saveAnswers,
    getAnswersForUser: getAnswersForUser,
    getUserList: getUserList,
    setupRedis: setupRedis
}