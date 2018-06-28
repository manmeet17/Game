/**
 * Exposes generic methods that can be used in any service.
 */
const q=require('./controllers/questionController');
const fs=require('fs');

module.exports = {
    shuffleArray : (array) => {
        let temp = [];
        let len = array.length;
        while(len){
            temp.push(array.splice(Math.floor(Math.random()*array.length),1)[0]);
            len--;
        }
        return temp;
    },
    limitTo : (limit, array) => {
        
        const newAr = [];
        
        array.forEach((val, index) => {
            if (index < limit) {
                newAr.push(val);
            }
        });

        return newAr;
    }

};