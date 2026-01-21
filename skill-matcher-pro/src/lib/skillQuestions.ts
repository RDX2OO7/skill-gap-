export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // index of options
}

export const skillQuestions: Record<string, Question[]> = {
    javascript: [
        {
            id: 'js1',
            text: 'What is the output of `typeof null`?',
            options: ['"null"', '"object"', '"undefined"', '"number"'],
            correctAnswer: 1
        },
        {
            id: 'js2',
            text: 'Which keyword is used to declare a block-scoped variable?',
            options: ['var', 'let', 'set', 'const'],
            correctAnswer: 1
        },
        {
            id: 'js3',
            text: 'What is a closure in JavaScript?',
            options: [
                'A way to close a browser tab',
                'A function bundled together with its lexical environment',
                'A method to terminate a loop',
                'A private class member'
            ],
            correctAnswer: 1
        },
        {
            id: 'js4',
            text: 'How do you handle asynchronous operations in modern JS?',
            options: ['Callbacks only', 'Promises and Async/Await', 'Iterators', 'Recursion'],
            correctAnswer: 1
        },
        {
            id: 'js5',
            text: 'What is the purpose of the Prototypal Inheritance?',
            options: [
                'To speed up execution',
                'To allow objects to inherit properties and methods from other objects',
                'To hide data from the user',
                'To create multiple instances of a class'
            ],
            correctAnswer: 1
        }
    ],
    react: [
        {
            id: 'react1',
            text: 'What is the main purpose of React?',
            options: ['Database management', 'Building user interfaces', 'Server-side routing', 'Data styling'],
            correctAnswer: 1
        },
        {
            id: 'react2',
            text: 'What is a Hook in React?',
            options: [
                'A way to connect to a database',
                'Functions that let you "hook into" React state and lifecycle features from function components',
                'A CSS selector',
                'A type of component'
            ],
            correctAnswer: 1
        },
        {
            id: 'react3',
            text: 'What does the `useState` hook return?',
            options: [
                'The current state value',
                'A function to update the state',
                'An array with the current state and a function to update it',
                'The state object'
            ],
            correctAnswer: 2
        },
        {
            id: 'react4',
            text: 'What is the Virtual DOM?',
            options: [
                'A direct copy of the actual DOM',
                'A lightweight representation of the real DOM in memory',
                'A browser feature for fast rendering',
                'A CSS framework'
            ],
            correctAnswer: 1
        },
        {
            id: 'react5',
            text: 'When does the `useEffect` hook run by default?',
            options: [
                'Only on the first render',
                'Every time a component updates',
                'After every render (including the first one)',
                'Only when the component unmounts'
            ],
            correctAnswer: 2
        }
    ],
    python: [
        {
            id: 'py1',
            text: 'How do you define a function in Python?',
            options: ['function myFunc():', 'def myFunc():', 'func myFunc():', 'lambda myFunc():'],
            correctAnswer: 1
        },
        {
            id: 'py2',
            text: 'What is the correct syntax for a list in Python?',
            options: ['(1, 2, 3)', '{1, 2, 3}', '[1, 2, 3]', '<1, 2, 3>'],
            correctAnswer: 2
        },
        {
            id: 'py3',
            text: 'What is a "list comprehension"?',
            options: [
                'A way to compress lists',
                'A concise way to create lists based on existing lists',
                'A documentation tool for lists',
                'A method to sort lists'
            ],
            correctAnswer: 1
        },
        {
            id: 'py4',
            text: 'Which of the following is used for exception handling?',
            options: ['try...catch', 'try...except', 'if...else', 'do...while'],
            correctAnswer: 1
        },
        {
            id: 'py5',
            text: 'What is the purpose of `__init__` in a class?',
            options: [
                'To initialize the class attributes when an object is created',
                'To delete an object',
                'To print the object',
                'To make the class private'
            ],
            correctAnswer: 0
        }
    ],
    typescript: [
        {
            id: 'ts1',
            text: 'What is TypeScript?',
            options: [
                'A new programming language',
                'A superset of JavaScript that adds static typing',
                'A database for JavaScript',
                'A faster version of Node.js'
            ],
            correctAnswer: 1
        },
        {
            id: 'ts2',
            text: 'How do you define an interface in TypeScript?',
            options: ['type MyType = {}', 'interface MyInterface {}', 'class MyClass {}', 'struct MyStruct {}'],
            correctAnswer: 1
        },
        {
            id: 'ts3',
            text: 'What is the "any" type?',
            options: [
                'A type that can be anything, effectively opting out of type checking',
                'A standard numeric type',
                'A type for strings only',
                'A type for arrays'
            ],
            correctAnswer: 0
        },
        {
            id: 'ts4',
            text: 'What is a "generic" in TypeScript?',
            options: [
                'A reusable component that can work with a variety of types',
                'A basic type like string or number',
                'A way to name variables',
                'A styling utility'
            ],
            correctAnswer: 0
        },
        {
            id: 'ts5',
            text: 'How do you specify that a property in an interface is optional?',
            options: ['property!', 'property:', 'property?', 'property??'],
            correctAnswer: 2
        }
    ],
    sql: [
        {
            id: 'sql1',
            text: 'What does SQL stand for?',
            options: [
                'Structured Query Language',
                'Simple Query Language',
                'Sequential Query Language',
                'Standard Question Language'
            ],
            correctAnswer: 0
        },
        {
            id: 'sql2',
            text: 'Which clause is used to filter records?',
            options: ['SORT BY', 'WHERE', 'HAVING', 'GROUP BY'],
            correctAnswer: 1
        },
        {
            id: 'sql3',
            text: 'What is a "JOIN"?',
            options: [
                'A way to delete data',
                'A way to combine rows from two or more tables based on a related column',
                'A way to update multiple rows',
                'A tool for database backup'
            ],
            correctAnswer: 1
        },
        {
            id: 'sql4',
            text: 'What is a Primary Key?',
            options: [
                'A unique identifier for each record in a table',
                'The first column of a table',
                'A key used to encrypt the database',
                'A password for the database'
            ],
            correctAnswer: 0
        },
        {
            id: 'sql5',
            text: 'Which command is used to add new data to a table?',
            options: ['ADD', 'UPDATE', 'INSERT INTO', 'NEW'],
            correctAnswer: 2
        }
    ]
};

export const getQuestionsForSkill = (skillId: string): Question[] => {
    // Return specific questions if available, otherwise return generic questions
    if (skillQuestions[skillId]) {
        return skillQuestions[skillId];
    }

    // Generic questions for any skill
    return [
        {
            id: 'gen1',
            text: `How would you describe your basic understanding of ${skillId.replace(/-/g, ' ')}?`,
            options: [
                'I have never heard of it',
                'I know the basic syntax/concepts',
                'I can build small projects with it',
                'I use it professionally/advanced level'
            ],
            correctAnswer: 1
        },
        {
            id: 'gen2',
            text: `Which of these best describes a core concept in ${skillId.replace(/-/g, ' ')}?`,
            options: [
                'It is a tool for everything',
                'It has specific use cases and patterns',
                'It is better than all alternatives',
                'It is deprecated'
            ],
            correctAnswer: 1
        },
        {
            id: 'gen3',
            text: `How do you stay updated with ${skillId.replace(/-/g, ' ')} developments?`,
            options: [
                'I dont',
                'Reading official documentation and community blogs',
                'Watching memes',
                'Waiting for it to change'
            ],
            correctAnswer: 1
        },
        {
            id: 'gen4',
            text: `What is a common challenge when working with ${skillId.replace(/-/g, ' ')}?`,
            options: [
                'Its too easy',
                'Debugging and optimization',
                'Finding a name for it',
                'Changing the font'
            ],
            correctAnswer: 1
        },
        {
            id: 'gen5',
            text: `Why is ${skillId.replace(/-/g, ' ')} important for modern development?`,
            options: [
                'It isnt',
                'It improves efficiency, reliability, or solves specific technical problems',
                'Everyone else is using it',
                'It looks good on a resume'
            ],
            correctAnswer: 1
        }
    ];
};
