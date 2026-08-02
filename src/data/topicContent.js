const topicContent = {
  "Classification": {
    overview: "Classification means identifying the item that is different from the remaining items or grouping items that share a common relationship. SSC commonly asks word, number, letter and general-knowledge classification questions.",
    objectives: [
      "Identify the common property shared by most options",
      "Separate the option that does not follow the common rule",
      "Recognize number, letter and number relationships",
      "Solve classification questions quickly without guessing"
    ],
    concepts: [
      {
        title: "Word Classification",
        description: "Three or more words belong to one common category while one does not.",
        example: {
          question: "Rose, Lotus, Lily, Mango",
          answer: "Mango",
          explanation: "Rose, Lotus and Lily are flowers. Mango is a fruit."
        }
      },
      {
        title: "Number Classification",
        description: "Numbers follow a mathematical property.",
        example: {
          question: "16,25,36,48",
          answer: "48",
          explanation: "16,25 and 36 are perfect squares."
        }
      },
      {
        title: "Letter Classification",
        description: "Letters follow alphabetical rules.",
        example: {
          question: "ACE, BDF, CEG, DFH",
          answer: "DFH",
          explanation: "The first three follow a regular alphabetical pattern."
        }
      },
      {
        title: "GK Classification",
        description: "Objects belong to the same factual category.",
        example: {
          question: "Delhi, Mumbai, Chennai, India",
          answer: "India",
          explanation: "Three are cities while India is a country."
        }
      }
    ],
    method: [
      "Observe all options",
      "Find the common property",
      "Identify the odd one",
      "Verify",
      "Select answer"
    ],
    commonRules: [
      "Category",
      "Function",
      "Part & Whole",
      "Number Property",
      "Alphabet",
      "Meaning",
      "Profession",
      "Pattern"
    ],
    shortcuts: [
      "Start with simplest relation",
      "Check squares, cubes and primes",
      "Convert letters into positions",
      "Don't overthink"
    ],
    mistakes: [
      "Ignoring obvious relation",
      "Checking only two options",
      "Missing number properties",
      "Choosing unfamiliar option"
    ],
    revision: [
      "Find common property first",
      "Use alphabetical positions",
      "Check mathematical properties"
    ],
    practiceExamples: [
      {
        question:"Apple, Banana, Grapes, Carrot",
        options:["Apple","Banana","Grapes","Carrot"],
        answer:"Carrot",
        explanation:"Three are fruits."
      },
      {
        question:"9,16,25,30",
        options:["9","16","25","30"],
        answer:"30",
        explanation:"Others are perfect squares."
      }
    ]
  },

  "Number System": {
    overview:"Number System deals with natural numbers, whole numbers, integers, fractions, decimals, factors, multiples, divisibility, LCM, HCF and remainder.",
    objectives:[
      "Understand types of numbers",
      "Learn divisibility rules",
      "Master LCM & HCF",
      "Solve remainder questions"
    ],
    concepts:[
      {
        title:"Natural Numbers",
        description:"Counting numbers beginning from 1.",
        example:{
          question:"Smallest Natural Number?",
          answer:"1",
          explanation:"Natural numbers start from 1."
        }
      },
      {
        title:"Whole Numbers",
        description:"Whole numbers include zero.",
        example:{
          question:"Smallest Whole Number?",
          answer:"0",
          explanation:"Whole numbers begin with zero."
        }
      },
      {
        title:"Integers",
        description:"Positive, negative numbers and zero.",
        example:{
          question:"Is -5 an Integer?",
          answer:"Yes",
          explanation:"Integers include negatives."
        }
      },
      {
        title:"Prime Numbers",
        description:"Exactly two factors.",
        example:{
          question:"Is 17 Prime?",
          answer:"Yes",
          explanation:"17 has only two factors."
        }
      }
    ],
        method:[
      "Identify the type of number",
      "Apply divisibility rule",
      "Use the correct formula",
      "Simplify step by step",
      "Verify the final answer"
    ],
    commonRules:[
      "2 → Even number",
      "3 → Sum of digits divisible by 3",
      "4 → Last two digits divisible by 4",
      "5 → Ends with 0 or 5",
      "6 → Divisible by both 2 and 3",
      "8 → Last three digits divisible by 8",
      "9 → Sum of digits divisible by 9",
      "10 → Ends with 0",
      "Prime number has exactly two factors",
      "1 is neither prime nor composite"
    ],
    shortcuts:[
      "Remember divisibility rules",
      "Use prime factorization for LCM & HCF",
      "Memorize first 25 prime numbers",
      "Learn squares till 30",
      "Learn cubes till 20"
    ],
    mistakes:[
      "Confusing natural and whole numbers",
      "Forgetting remainder rules",
      "Using wrong LCM method",
      "Ignoring divisibility shortcuts",
      "Calculation mistakes"
    ],
    revision:[
      "Natural numbers start from 1",
      "Whole numbers start from 0",
      "Prime numbers have two factors",
      "LCM × HCF = Product (for two numbers)",
      "Revise divisibility rules daily"
    ],
    practiceExamples:[
      {
        question:"Smallest whole number?",
        options:["0","1","2","-1"],
        answer:"0",
        explanation:"Whole numbers start from 0."
      },
      {
        question:"Which is a prime number?",
        options:["9","15","17","21"],
        answer:"17",
        explanation:"17 has exactly two factors."
      },
      {
        question:"36 is divisible by?",
        options:["5","8","9","11"],
        answer:"9",
        explanation:"3+6=9, therefore divisible by 9."
      },
      {
        question:"LCM of 6 and 8?",
        options:["12","18","24","48"],
        answer:"24",
        explanation:"LCM is 24."
      },
      {
        question:"HCF of 24 and 36?",
        options:["6","8","10","12"],
        answer:"12",
        explanation:"12 is the greatest common factor."
      }
    ]
  }
};

export const getTopicContent = (topic) => {
  if (topicContent[topic.name]) {
    return topicContent[topic.name];
  }

  return {
    overview: `${topic.name} is part of the ${topic.subject} syllabus. This learning page will guide you through concepts, examples, practice, PYQs and revision in the correct sequence.`,
    objectives: [
      `Understand the basic concepts of ${topic.name}`,
      "Learn the standard SSC question patterns",
      "Apply the concepts through guided examples",
      "Improve accuracy before attempting timed tests"
    ],
        concepts: [
      {
        title: `Introduction to ${topic.name}`,
        description: `Begin by understanding the definitions, rules and basic question patterns associated with ${topic.name}.`,
        example: {
          question: `What should you learn first in ${topic.name}?`,
          answer: "The fundamental definitions and rules",
          explanation: "Strong fundamentals are required before shortcuts and timed practice."
        }
      }
    ],
    method: [
      "Understand the basic concept",
      "Study solved examples",
      "Practice basic questions",
      "Attempt SSC-standard questions",
      "Analyze mistakes and revise"
    ],
    commonRules: [
      "Learn definitions first",
      "Understand the standard method",
      "Practice without time pressure initially",
      "Increase speed only after improving accuracy"
    ],
    shortcuts: [
      "Use shortcuts only after understanding the normal method",
      "Write important rules in your notes",
      "Review every incorrect answer"
    ],
    mistakes: [
      "Skipping fundamentals",
      "Memorizing without understanding",
      "Using shortcuts incorrectly",
      "Not analyzing mistakes"
    ],
    revision: [
      `Review the definitions of ${topic.name}`,
      "Revise important rules",
      "Reattempt incorrect questions",
      "Practice SSC-standard questions"
    ],
    practiceExamples: []
  };
};

export default topicContent;