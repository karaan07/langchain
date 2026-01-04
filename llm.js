import { ChatOpenAI } from "@langchain/openai";

const model  = new ChatOpenAI({
    modelName:"got-3.5-turbo",
    temperature:0.7,
    maxTokens:1000,
    verbose:true
}) 

const response= await model.invoke("Write a poem about Ai")

console.log(response);
