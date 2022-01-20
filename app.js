const express = require('express');
const ExpressError = require('./expressError');
const app = express();

app.use(express.json());


// app.get('/mean' , (req , res , next) => {
// try {
//     let nums = [];
//     let count = 0;
//     const splitArr = req.query.nums.split(',')
//     for(let i of splitArr) {
//         if(parseInt(i) === NaN) {
//             throw new ExpressError('Only Numbers Allowed' , 403);
//         }
//         if(parseInt(i) == i){
//             nums.push(parseInt(i))
//         } 
//     }
//     for(let i of nums){
//         count+=i;
//     }
//     count = count/nums.length;
//     return res.json({operation : 'mean' , value : `${count}`})
// } catch (error) {
//     return next(error);
// });

app.get('/mean' , (req , res , next) => {
    try{
        let nums = [];
    let count = 0;
    const arr = req.query.nums;
    if(arr === undefined) {
        throw new ExpressError('Numbers are required' , 400)
    }
    const splitArr = req.query.nums.split(',')
    for(let i of splitArr) {
        if(typeof(parseInt(i) !== 'number'))  throw new ExpressError('Only Numbers Allowed' , 403);
        nums.push(parseInt(i));
    }
    for(let i of nums){
        count+=i;
    }
    count = count/nums.length;
    return res.json({operation : 'mean' , value : `${count}`})
    } catch(error) {
        return next(error);
    }
})

app.get('/median' , (req , res) => {
    try{
        let nums = [];
    const arr = req.query.nums;
    if(arr === undefined) {
        throw new ExpressError('Numbers are required' , 400);
    }
    const splitArr = req.query.nums.split(',')
    ;
    for (i of splitArr) {
        if(typeof(parseInt(i) !== 'number')) throw new ExpressError('Only Nymbers Allowed' , 403);
        nums.push(parseInt(i))
    }
    
    nums.sort(function(a,b){return a-b})
    
    let medianIndex = Math.floor(nums.length / 2);
    console.log(medianIndex);
    console.log(nums[medianIndex])
    return res.json({operation : 'median' , value : `${nums[medianIndex]}`})
    }catch(error) {
        return next(error);
    }
    
})

app.get('/mode' , (req , res , next) => {
    try{
        let nums = [];
    let mostFrequent = 1;
    let count = 0;
    let winner;
    const arr = req.query.nums;
    if(arr === undefined) {
        throw new ExpressError('Numbers are required' , 400)
    }
    const splitArr = req.query.nums.split(',');
    for(i of splitArr) {
        if(typeof(parseInt(i) !== 'number'))  throw new ExpressError('Only Numbers Allowed' , 403);
        nums.push(parseInt(i));
    }
    for(let i of nums){
        for(let j of nums) {
            if(i === j){
                count++;
                if(count > mostFrequent){
                    mostFrequent = count;
                    winner = i;
                }
            }

        }
        count = 0;
    }
    console.log(winner);
    return res.json({operation : 'mode' , value : `${winner}`});
    }catch(error) {
        return next(error);
    }
    
})


app.use(function(error , req , res , next) {
    let status = error.status || 500;
    let message = error.message;

    return res.status(status).json({error : {message , status}});
});

app.listen(3000 , function () {
    console.log('App on port 3000');
})