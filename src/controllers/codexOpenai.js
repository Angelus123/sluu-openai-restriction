import dotenv from 'dotenv';
import model from '../database/models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { Configuration, OpenAIApi } from  "openai"; 
import {encode, decode} from 'gpt-3-encoder';
import {Op} from "sequelize"

/**
 * Get the Models
 */
const User = model.User;
const Role = model.Role

dotenv.config();
const configuration = new Configuration({ 
  apiKey: process.env.OPENAI_API_KEY, 
}); 

const openai = new OpenAIApi(configuration); 
/**
 *  1) Question and answer code tool
 */
export const qAndA = catchAsync(async(req,res,next)=>{

  /**
   *Tokenize request question
   */
  const encoded = encode(req.body.question)
  if(encoded.length>=100){
    return next(new AppError("The number of words should be less than 100",403))
  }
 
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown
      
      Q: ${req.body.question}\nA:`,
      
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
     res.status(200).json({
      status:"success",
      data:response.data
      
    })
})
 
   /**
   * 3) Sql translate
   */
 
    export const sqlTranslate = catchAsync(async(req,res,next)=>{

      /**
       * Get Sql translate
       */
      
       const  { query} =req.body
        const promptInput =`### Postgres SQL tables, with their properties:\n#\n### ${query}`
        /**
        * Tokenize request question
        */
         const encoded = encode(promptInput)
         console.log("encoded:-", encoded.length)
         if(encoded.length>=150){
           return next(new AppError("The number of words should be less than 150",403))
         }
        const response = await openai.createCompletion({
        model: "curie",
        prompt:promptInput ,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
      });
      console.log("response:", response.data)
       res.status(200).json({
        status:"success",
        data: response.data
      })
    
    })

    /**
   * 4) Sql request
   */
 
  export const sqlRequest = catchAsync(async(req,res,next)=>{

    /**
     * Get Sql request
     */
     const  {query} =req.body;
     const promptInput =query;
        /**
        * Tokenize request question
        */
         const encoded = encode(promptInput)
         if(encoded.length>=60){
           return next(new AppError("The number of words in query should be less than 60",403))
         }
     const response = await openai.createCompletion({
      model: "curie",
      prompt:promptInput+":" ,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log("response:", response.data)
       res.status(200).json({
        status:"success",
        data: response.data
      })
  
  })


  /**
   * 5) Parse unstructured data (W+E)
   */
 
     export const parseUnstructuredData = catchAsync(async(req,res,next)=>{

      /**
       * Get Parse unstructured data (W+E)
       */

       const  {query} =req.body;
       const promptInput =query;
          /**
          * Tokenize request question
          */
           const encoded = encode(promptInput)
           if(encoded.length>=200){
             return next(new AppError("The number of words in query should be less than 100",403))
           }
     
       const response = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: promptInput,
        temperature: 0,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
       res.status(200).json({
        status:"success",
        data: response.data
      })
    
    })



  /**
   * 6) Python to natural language (W)
   */
 
     export const pythonToNaturalLanguage = catchAsync(async(req,res,next)=>{

      /**
       * Get Python to natural language (W)
       */
       const  {query} =req.body;
       const promptInput =query;
     /**
          * Tokenize request question
          */
      const encoded = encode(promptInput)
      if(encoded.length>=120){
        return next(new AppError("The number of words in query should be less than 120",403))
      }
       const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: "# Python 3 "+promptInput,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
  
      console.log("response:", response.data)
       res.status(200).json({
        status:"success",
        data: response.data
      })
    
    })


  /**
   * 7)  Calculate time complexity (E)
   */
 
      export const calculateTimeComplexity = catchAsync(async(req,res,next)=>{

        /**
         * Get  Calculate time complexity (E)
         */
         const  {query} =req.body;
         const promptInput =query;
       /**
            * Tokenize request question
            */
        const encoded = encode(promptInput)
        if(encoded.length>=64){
          return next(new AppError("The number of words in query should be less than 64",403))
        }
       
         const response = await openai.createCompletion({
          model: "text-curie-001",
          prompt: promptInput,
          temperature: 0,
          max_tokens: 64,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          stop: ["\n"],
        });
    
        console.log("response:", response.data)
       res.status(200).json({
        status:"success",
        data: response.data
      })
      
      })

  /**
   * 8)  Programming language Converter (W+E)
   */
 
     export const programmingLanguageConverter = catchAsync(async(req,res,next)=>{

      /**
       * Get Programming language Converter (W+E)
       */
       const  {query} =req.body;
       const promptInput =query;
     /**
          * Tokenize request question
          */
      const encoded = encode(promptInput)
      if(encoded.length>=80){
        return next(new AppError("The number of words in query should be less than 80",403))
      }
     
     
       const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: promptInput,
        temperature: 0,
        max_tokens: 54,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["###"],
      });
  
      console.log("response:", response.data)
      res.status(200).json({
       status:"success",
       data: response.data
     })
    
    })

  /**
   * 9) Explain code (w)
   */
 
   export const explainCode = catchAsync(async(req,res,next)=>{

    /**
     * Get Explain code (w)
     */

     const  {query} =req.body;
       const promptInput =query;
     /**
          * Tokenize request question
          */
      const encoded = encode(promptInput)
      if(encoded.length>=500){
        return next(new AppError("The number of words in query should be less than 500",403))
      }
     
   
     const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: promptInput,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\"\"\""],
    });
    console.log("response:", response.data)
       res.status(200).json({
        status:"success",
        data: response.data
      })
  
  })

/**
   * 10) Python bug fixer (W+E)
   */
 
 export const pythonBugFixer = catchAsync(async(req,res,next)=>{

  /**
   * Python bug fixer (W+E)
   */

   const  {query} =req.body;
   const promptInput =query;
 /**
      * Tokenize request question
      */
  const encoded = encode(promptInput)
  if(encoded.length>=150){
    return next(new AppError("The number of words in query should be less than 150",403))
  }
 
 
   const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: promptInput,
    temperature: 0,
    max_tokens: 182,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["###"],
  });

  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})

/**
   * 11)Javascript helper chatbox (W)
   */
 
 export const  javascriptHelperChatbox = catchAsync(async(req,res,next)=>{

  /**
   * Javascript helper chatbox (W)
   */
   const  {query} =req.body;
       const promptInput =query;
     /**
          * Tokenize request 
          */
         console.log("query: ", query)
   const encoded = encode(promptInput)
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }
   const response = await openai.createCompletion({
    model: "text-curie-001",
    prompt: `You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou:${promptInput}\nJavaScript chatbot`,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  // console.log("__response", response)

  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})


/**
   * 12)Write python docstring (W+E)
   */
 
 export const  writePythonDocstring = catchAsync(async(req,res,next)=>{

  /**
   * Write python docstring (W+E)
   */
   const  {query} =req.body;
   const promptInput =query;
   const encoded = encode(promptInput)
  /**
   * Tokenize request 
   */
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }
 
   const response = await openai.createCompletion({
    model: "text-babbage-001",
    prompt: `# Python 3 \n${query}\n\n# Explanation of what the code does\n\n#`,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})


/**
   * 13) Javascript one line function (W+E)
   */
 
 export const  javascriptOneLineFunction = catchAsync(async(req,res,next)=>{

  /**
   * Javascript one line function (W+E)
   */
   const  {query} =req.body;
   const promptInput =query;
   const encoded = encode(promptInput)
  /**
   * Tokenize request 
   */
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }
 
   const response = await openai.createCompletion({
    model: "text-babbage-001",
    prompt: `Use list comprehension to convert this into one line of JavaScript:\n\n${query}\n});\n\nJavaScript one line version:`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [";"],
  });

  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})

/**
   * 14) Completions
   */
 
 export const  completions = catchAsync(async(req,res,next)=>{

  /**
   * Completions
   */
   const  {query} =req.body;
   const promptInput =query;
   const encoded = encode(promptInput)
  /**
   * Tokenize request 
   */
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }

   const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "make the ball blue",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

   console.log("response:", response.data)
       res.status(200).json({
        status:"success",
        data: response.data
      })

})


/**
   * 15) Text to Commands
   */
 
 export const  textToCommands = catchAsync(async(req,res,next)=>{

  /**
   * Text to Commands
   */
   const  {query} =req.body;
   const promptInput =query;
   const encoded = encode(promptInput)
   console.log(query)
  /**
   * Tokenize request 
   */
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }
 
   const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: promptInput,
    temperature: 0,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.2,
    presence_penalty: 0.0,
    stop: ["\n"],
  });

  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})

/**
   * 16) Ml/Ai language tutor
   */
 
 export const  MlAiLanguageTutor = catchAsync(async(req,res,next)=>{

  /**
   * Ml/Ai language tutor
   */
   const  {query} =req.body;
   const promptInput =query;
   const encoded = encode(promptInput)
  /**
   * Tokenize request 
   */
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }
 
   const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `ML Tutor: I am a ML/AI language model tutor\nYou: What is a language model?\nML Tutor: A language model is a statistical model that describes the probability of a word given the previous words.\nYou: ${query}`,
    temperature: 0.3,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });

  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})

/**
   * 17) Javascript to Python
   */
 
 export const  javascriptToPython = catchAsync(async(req,res,next)=>{

  /**
   * Javascript to Python
   */
   const  {query} =req.body;
   const promptInput =query;
   const encoded = encode(promptInput)
  /**
   * Tokenize request 
   */
   if(encoded.length>=150){
     return next(new AppError("The number of words in query should be less than 150",403))
   }
 
   const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: `#JavaScript to Python:\nJavaScript: ${query}\n\nPython:`,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  console.log("response:", response.data)
  res.status(200).json({
   status:"success",
   data: response.data
 })

})