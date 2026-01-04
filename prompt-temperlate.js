import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from '@langchain/openai'

import * as dotenv from "dotenv"
dotenv.config()
//create model

const model  = new ChatOpenAI({
    modelName:"got-3.5-turbo",
    temperature:0.7,
    maxTokens:1000,
    verbose:true
}) 

const prompt = ChatPromptTemplate.fromTemplate(`You are a comedian. tell a joke based on a word ${input}`)

const prompt1= ChatPromptTemplate.fromMessages(["system","generate a joke based on a word provided by the user"],
    ["human","dog"]
)
const chain = prompt.pipe(model);

const response=chain.invoke({
    input:"dog"
})

console.log(response);
