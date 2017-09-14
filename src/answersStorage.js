/**
 * Created by Tomas on 2017-09-14.
 */
var Redis = require('ioredis');
var Promise = require('promise');
var redis = new Redis();

function saveAnswers(user, answers){
    return new Promise(function(resolve, reject){
        createUser(user.name)
            .then(function(data){
                resolve(data);
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
                redis.sadd(username, function(res, err){
                    if(!err){
                        resolve(res);
                    }
                    else{
                        reject('Cannot create user');
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
        redis.sismember(username, function(res, err){
            if(!err){
                resolve();
            }
            else{
                reject();
            }
        });
    });
}

function saveUserAnswers(){

}

function getAnswersForUser(user){

}

function getUserList(){

}

module.exports = {
    saveAnswers: saveAnswers,
    getAnswersForUser: getAnswersForUser,
    getUserList: getUserList
}