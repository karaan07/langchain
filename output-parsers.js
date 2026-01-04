import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/openai";
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
  StructuredOutputParser,
} from "@langchain/core/output_parsers";
import * as dotenv from "dotenv";
dotenv.config();
//create model

const model = new ChatOpenAI({
  modelName: "got-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  verbose: true,
});

async function callStringOutputParser() {
  const prompt = ChatPromptTemplate.fromTemplate(
    `You are a comedian. tell a joke based on a word ${input}`
  );
  //another way to write prompt
  const prompt1 = ChatPromptTemplate.fromMessages(
    ["system", "generate a joke based on a word provided by the user"],
    ["human", "dog"]
  );

  const parser = new StringOutputParser();

  const chain = prompt.pipe(model).pipe(parser);

  return chain.invoke({
    input: "dog",
  });
}

async function callListOutpurParser() {
  const prompt = ChatPromptTemplate.fromTemplate(
    `Provide 5 synonyms, seperated by comas, for the following word ${input}`
  );

  const outputParser = new CommaSeparatedListOutputParser();

  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    input: "happy",
  });
}

async function callStructuredParser() {
const prompt = ChatPromptTemplate.fromTemplate(`
    Extract information from the followig phrase.
    Formatting Instruction: {format_instruction}
    Phrase:{phrase}
    `)
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name: "the name of person",
        age :"the age of the person"
    })

   const chain = prompt.pipe(model).pipe(outputParser);
   
   return await chain.invoke({
    phrase: "Max is sadie sink",
    format_instructions:outputParser.getFormatInstructions()
   })
}

const response = await callStringOutputParser();
const response1= await callListOutpurParser();
const response2= await callStructuredParser()
console.log(response);
console.log(response1)
console.log(response2)
