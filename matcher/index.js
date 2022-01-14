`use strict`;

const patterns = require(`../patterns`);
const XRegExp=require(`xregexp`);
const { forEach } = require("xregexp");
const patternDict = require("../patterns");
const weather =require("../weather")

let matchPattern=(str,cb) => {
    let getResult=false;
    for (const[key, value] of Object.entries(patternDict)) {
        if(XRegExp.test(str,XRegExp(value.pattern)))
        {
            getResult=true;
            return cb({intent: value.intent, entities: createEntities(str,value.pattern).groups});
        }
    }
    return cb({});
}

let createEntities = (str,pattern) => {
    return XRegExp.exec(str,XRegExp(pattern ,"i"))
}

module.exports=matchPattern
    


