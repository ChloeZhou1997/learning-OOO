import {
  introduction,
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10,
  chapter11,
  chapter12,
  chapter13,
  chapter14,
  chapter15,
  conclusion
} from './chapters'

export const prerequisiteQuiz = {
    title: 'Prerequisite Knowledge Check',
    questions: [
        {
            type: 'mcq',
            question: 'What is the primary purpose of a `for` loop?',
            options: [
                'To declare a variable.',
                'To execute a block of code a specific number of times.',
                'To define a reusable function.',
                'To handle errors in the program.'
            ],
            answerIndex: 1
        },
        {
            type: 'mcq',
            question: 'A function in programming is best described as:',
            options: [
                'A variable that holds multiple values.',
                'A conditional statement that directs program flow.',
                'A named, reusable block of code that performs a specific task.',
                'The entry point of every application.'
            ],
            answerIndex: 2
        },
        {
            type: 'mcq',
            question: 'Which of the following correctly declares a variable named `userName` and assigns it a string value in JavaScript?',
            options: [
                'string userName = "Alice";',
                'userName: "Alice";',
                'let userName = "Alice";',
                'let "Alice" = userName;'
            ],
            answerIndex: 2
        }
    ]
};

export const courseContent = [
    introduction,
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8,
    chapter9,
    chapter10,
    chapter11,
    chapter12,
    chapter13,
    chapter14,
    chapter15,
    conclusion
];