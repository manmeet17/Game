/**
 * Exposes generic methods that can be used in any service.
 */
const q = require('./controllers/questionController');
const fs = require('fs');

module.exports = {
    shuffleArray: (array) => {
        let newArr=[];
        for(let i=0;i<10;i++){
            let rand=Math.floor(Math.random()*(array.length-1));
            console.log(rand);
            newArr.push(array[rand]);
        }
        return newArr;
    },
    limitTo: (limit, array) => {

        const newAr = [];

        array.forEach((val, index) => {
            if (index < limit) {
                newAr.push(val);
            }
        });

        return newAr;
    }

};