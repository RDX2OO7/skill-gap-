export interface InterviewQuestion {
    id: string;
    question: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    expectedKeywords?: string[];
    hint?: string;
}

export const interviewCategories = [
    {
        id: 'aptitude',
        name: 'Aptitude (Filter Round)',
        icon: '💡',
        purpose: 'Check raw brain power. No excuses.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'logical',
        name: 'Logical Reasoning',
        icon: '🧠',
        purpose: 'Can you reason, not memorize?',
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'cs-fundamentals',
        name: 'Computer Science Fundamentals',
        icon: '💻',
        purpose: 'See if you actually understand computers.',
        color: 'from-green-500 to-emerald-500'
    },
    {
        id: 'coding',
        name: 'Coding & Problem Solving',
        icon: '⚡',
        purpose: 'Can you build logic from zero?',
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'system-thinking',
        name: 'System Thinking',
        icon: '🏗️',
        purpose: 'Can you think BIG?',
        color: 'from-indigo-500 to-blue-500'
    },
    {
        id: 'behavioral',
        name: 'Behavioral & Attitude',
        icon: '🎯',
        purpose: 'Are you dangerous or dependable?',
        color: 'from-teal-500 to-green-500'
    },
    {
        id: 'curveball',
        name: 'Curveball Questions',
        icon: '🎲',
        purpose: 'Test originality.',
        color: 'from-yellow-500 to-orange-500'
    }
];

export const interviewQuestions: Record<string, InterviewQuestion[]> = {
    aptitude: [
        { id: 'apt1', question: 'A train travels 60 km in 45 minutes. What is its speed in km/h?', category: 'aptitude', difficulty: 'easy', expectedKeywords: ['80', 'km/h', 'speed'], hint: 'Convert minutes to hours first' },
        { id: 'apt2', question: 'If 5 machines can produce 5 products in 5 minutes, how long will it take 100 machines to produce 100 products?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['5', 'minutes', 'same'], hint: 'Think about the rate per machine' },
        { id: 'apt3', question: 'A clock shows 3:15. What is the angle between the hour and minute hands?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['7.5', 'degrees'], hint: 'Hour hand also moves with minutes' },
        { id: 'apt4', question: 'In a class of 60 students, 30 play cricket, 25 play football, and 10 play both. How many play neither?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['15', 'students'], hint: 'Use Venn diagram logic' },
        { id: 'apt5', question: 'A person invests $10,000 at 5% annual interest. What is the total amount after 2 years with compound interest?', category: 'aptitude', difficulty: 'hard', expectedKeywords: ['11025', '10250'], hint: 'Compound interest formula: A = P(1 + r)^t' },
        { id: 'apt6', question: 'If a car travels at 40 km/h for the first half of a journey and 60 km/h for the second half, what is the average speed?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['48', 'harmonic', 'average'], hint: 'Average speed is not arithmetic mean of speeds' },
        { id: 'apt7', question: 'A pipe can fill a tank in 6 hours. Another pipe can empty it in 8 hours. If both are opened, how long to fill the tank?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['24', 'hours'], hint: 'Calculate net rate per hour' },
        { id: 'apt8', question: 'The ratio of ages of A and B is 3:5. After 10 years, the ratio will be 5:7. What is A\'s current age?', category: 'aptitude', difficulty: 'hard', expectedKeywords: ['15', 'years'], hint: 'Set up equations with the ratios' },
        { id: 'apt9', question: 'A shopkeeper marks up an item by 40% and then gives a 20% discount. What is the net profit percentage?', category: 'aptitude', difficulty: 'easy', expectedKeywords: ['12', 'percent'], hint: 'Calculate step by step: markup then discount' },
        { id: 'apt10', question: 'How many times do the hands of a clock overlap in 24 hours?', category: 'aptitude', difficulty: 'hard', expectedKeywords: ['22', 'times'], hint: 'They overlap 11 times in 12 hours, but not at 11:00' },
        { id: 'apt11', question: 'A number when divided by 5 gives remainder 3. What is the remainder when the square of this number is divided by 5?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['4', 'remainder'], hint: 'Try with a sample number like 8 or 13' },
        { id: 'apt12', question: 'If 20% of A equals 30% of B, then what percentage of A is B?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['66.67', '2/3', '66'], hint: 'Set up equation: 0.2A = 0.3B' },
        { id: 'apt13', question: 'A man can row 6 km/h in still water. River flows at 2 km/h. How long to row 8 km downstream and back?', category: 'aptitude', difficulty: 'hard', expectedKeywords: ['3', 'hours', 'downstream', 'upstream'], hint: 'Downstream speed = 8 km/h, Upstream = 4 km/h' },
        { id: 'apt14', question: 'In how many ways can you arrange the letters of the word "BANANA"?', category: 'aptitude', difficulty: 'medium', expectedKeywords: ['60', 'permutation'], hint: 'Use formula: n! / (n1! × n2! × ...) for repeated letters' },
        { id: 'apt15', question: 'A cube is painted red on all faces and then cut into 27 smaller equal cubes. How many cubes have exactly 2 red faces?', category: 'aptitude', difficulty: 'hard', expectedKeywords: ['12', 'edge', 'cubes'], hint: 'These are the edge cubes (not corners)' }
    ],
    logical: [
        { id: 'log1', question: 'All roses are flowers. Some flowers fade quickly. Can we conclude that some roses fade quickly?', category: 'logical', difficulty: 'easy', expectedKeywords: ['no', 'cannot', 'conclude'], hint: 'Check if the logic is valid' },
        { id: 'log2', question: 'What comes next in the sequence: 2, 6, 12, 20, 30, ?', category: 'logical', difficulty: 'medium', expectedKeywords: ['42'], hint: 'Look at the differences between consecutive numbers' },
        { id: 'log3', question: 'If you have a 3-liter jug and a 5-liter jug, how can you measure exactly 4 liters?', category: 'logical', difficulty: 'hard', expectedKeywords: ['fill', 'pour', 'transfer'], hint: 'Think about filling and transferring between jugs' },
        { id: 'log4', question: 'A bat and ball cost $1.10 together. The bat costs $1 more than the ball. How much does the ball cost?', category: 'logical', difficulty: 'medium', expectedKeywords: ['0.05', '5 cents', 'five cents'], hint: 'Don\'t jump to the obvious answer' },
        { id: 'log5', question: 'You have 12 balls, one of which is slightly heavier. Using a balance scale only 3 times, how do you find the heavy ball?', category: 'logical', difficulty: 'hard', expectedKeywords: ['divide', 'groups', 'weigh'], hint: 'Divide into groups of 4' },
        { id: 'log6', question: 'Five friends sit in a row. A is not next to B. C is not next to D. B is between E and C. Who sits in the middle?', category: 'logical', difficulty: 'medium', expectedKeywords: ['B', 'middle'], hint: 'Draw it out step by step' },
        { id: 'log7', question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?', category: 'logical', difficulty: 'easy', expectedKeywords: ['yes', 'transitive'], hint: 'This is transitive property' },
        { id: 'log8', question: 'You have 9 coins, one is counterfeit and lighter. Using a balance scale twice, how do you find it?', category: 'logical', difficulty: 'hard', expectedKeywords: ['divide', 'three', 'groups'], hint: 'Divide into 3 groups of 3' },
        { id: 'log9', question: 'What is the next letter in this sequence: J, F, M, A, M, J, J, ?', category: 'logical', difficulty: 'easy', expectedKeywords: ['A', 'August', 'months'], hint: 'Think about calendar' },
        { id: 'log10', question: 'Three switches outside a room control three bulbs inside. You can only enter once. How do you determine which switch controls which bulb?', category: 'logical', difficulty: 'hard', expectedKeywords: ['heat', 'warm', 'temperature', 'touch'], hint: 'Use heat as an indicator' },
        { id: 'log11', question: 'If it takes 5 minutes to cut a log into 5 pieces, how long to cut it into 10 pieces?', category: 'logical', difficulty: 'medium', expectedKeywords: ['9', 'minutes', 'cuts'], hint: '5 pieces need 4 cuts, 10 pieces need 9 cuts' },
        { id: 'log12', question: 'A farmer has 17 sheep. All but 9 die. How many are left?', category: 'logical', difficulty: 'easy', expectedKeywords: ['9', 'alive'], hint: 'Read carefully: "all but 9"' },
        { id: 'log13', question: 'You\'re in a race and overtake the person in 2nd place. What position are you in now?', category: 'logical', difficulty: 'easy', expectedKeywords: ['2nd', 'second'], hint: 'You took their position' },
        { id: 'log14', question: 'A man builds a house with all 4 sides facing south. A bear walks by. What color is the bear?', category: 'logical', difficulty: 'medium', expectedKeywords: ['white', 'polar', 'north pole'], hint: 'Where can all sides face south?' },
        { id: 'log15', question: 'If you have a 7-minute hourglass and an 11-minute hourglass, how can you measure exactly 15 minutes?', category: 'logical', difficulty: 'hard', expectedKeywords: ['start', 'both', 'flip', 'together'], hint: 'Start both together, then flip strategically' }
    ],
    'cs-fundamentals': [
        { id: 'cs1', question: 'What is the difference between a stack and a queue?', category: 'cs-fundamentals', difficulty: 'easy', expectedKeywords: ['LIFO', 'FIFO', 'last in first out', 'first in first out'], hint: 'Think about the order of operations' },
        { id: 'cs2', question: 'Explain the concept of Big O notation and why O(n²) is worse than O(n log n).', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['time complexity', 'growth rate', 'efficiency', 'scalability'], hint: 'Focus on how performance scales with input size' },
        { id: 'cs3', question: 'What is the difference between TCP and UDP protocols?', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['reliable', 'unreliable', 'connection', 'speed'], hint: 'Think about reliability vs speed' },
        { id: 'cs4', question: 'Explain how a hash table works and what happens during a collision.', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['hash function', 'chaining', 'open addressing', 'key-value'], hint: 'Consider how data is stored and retrieved' },
        { id: 'cs5', question: 'What is the difference between process and thread? When would you use multithreading?', category: 'cs-fundamentals', difficulty: 'hard', expectedKeywords: ['memory', 'shared', 'concurrent', 'parallel'], hint: 'Think about resource sharing' },
        { id: 'cs6', question: 'What is the difference between HTTP and HTTPS? How does HTTPS ensure security?', category: 'cs-fundamentals', difficulty: 'easy', expectedKeywords: ['SSL', 'TLS', 'encryption', 'certificate'], hint: 'Think about encryption' },
        { id: 'cs7', question: 'Explain the concept of virtual memory and why it\'s important.', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['RAM', 'disk', 'paging', 'swap', 'isolation'], hint: 'Consider what happens when RAM is full' },
        { id: 'cs8', question: 'What is the CAP theorem in distributed systems?', category: 'cs-fundamentals', difficulty: 'hard', expectedKeywords: ['consistency', 'availability', 'partition tolerance', 'two'], hint: 'You can only guarantee 2 out of 3' },
        { id: 'cs9', question: 'Explain the difference between compiled and interpreted languages.', category: 'cs-fundamentals', difficulty: 'easy', expectedKeywords: ['compile', 'runtime', 'machine code', 'interpreter'], hint: 'Think about when code is translated' },
        { id: 'cs10', question: 'What is a deadlock? How can you prevent it?', category: 'cs-fundamentals', difficulty: 'hard', expectedKeywords: ['circular wait', 'mutex', 'lock', 'resource', 'prevention'], hint: 'Multiple processes waiting for each other' },
        { id: 'cs11', question: 'Explain the difference between symmetric and asymmetric encryption.', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['public', 'private', 'key', 'RSA', 'AES'], hint: 'Think about number of keys used' },
        { id: 'cs12', question: 'What is the purpose of DNS? How does it work?', category: 'cs-fundamentals', difficulty: 'easy', expectedKeywords: ['domain', 'IP address', 'resolution', 'lookup'], hint: 'Translates names to numbers' },
        { id: 'cs13', question: 'Explain the concept of normalization in databases. Why is it important?', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['redundancy', 'anomaly', '1NF', '2NF', '3NF'], hint: 'Reduces data duplication' },
        { id: 'cs14', question: 'What is the difference between IPv4 and IPv6?', category: 'cs-fundamentals', difficulty: 'easy', expectedKeywords: ['32-bit', '128-bit', 'address space', 'exhaustion'], hint: 'Think about address length' },
        { id: 'cs15', question: 'Explain how garbage collection works in programming languages like Java or Python.', category: 'cs-fundamentals', difficulty: 'medium', expectedKeywords: ['memory', 'reference', 'mark', 'sweep', 'automatic'], hint: 'Automatic memory management' }
    ],
    coding: [
        { id: 'code1', question: 'Write a function to reverse a string without using built-in reverse methods.', category: 'coding', difficulty: 'easy', expectedKeywords: ['loop', 'iterate', 'swap', 'two pointers'], hint: 'Use two pointers or build from end' },
        { id: 'code2', question: 'How would you find the first non-repeating character in a string?', category: 'coding', difficulty: 'medium', expectedKeywords: ['hash map', 'frequency', 'count', 'dictionary'], hint: 'Count character frequencies first' },
        { id: 'code3', question: 'Explain your approach to detect a cycle in a linked list.', category: 'coding', difficulty: 'medium', expectedKeywords: ['Floyd', 'slow', 'fast', 'pointer', 'tortoise', 'hare'], hint: 'Two pointer technique' },
        { id: 'code4', question: 'How would you implement a LRU (Least Recently Used) cache?', category: 'coding', difficulty: 'hard', expectedKeywords: ['hash map', 'doubly linked list', 'O(1)', 'eviction'], hint: 'Combine hash map with doubly linked list' },
        { id: 'code5', question: 'Given an array of integers, find two numbers that add up to a target sum.', category: 'coding', difficulty: 'easy', expectedKeywords: ['hash map', 'complement', 'two pass', 'O(n)'], hint: 'Store complements in a hash map' },
        { id: 'code6', question: 'How would you check if a string is a valid palindrome?', category: 'coding', difficulty: 'easy', expectedKeywords: ['two pointers', 'reverse', 'compare', 'middle'], hint: 'Compare from both ends' },
        { id: 'code7', question: 'Explain how to find the maximum subarray sum (Kadane\'s algorithm).', category: 'coding', difficulty: 'medium', expectedKeywords: ['current', 'maximum', 'dynamic', 'reset'], hint: 'Keep track of current and global max' },
        { id: 'code8', question: 'How would you merge two sorted arrays into one sorted array?', category: 'coding', difficulty: 'easy', expectedKeywords: ['two pointers', 'compare', 'merge', 'O(n+m)'], hint: 'Use two pointers, one for each array' },
        { id: 'code9', question: 'Describe an algorithm to find the kth largest element in an unsorted array.', category: 'coding', difficulty: 'hard', expectedKeywords: ['quickselect', 'heap', 'partition', 'priority queue'], hint: 'Use quickselect or min-heap' },
        { id: 'code10', question: 'How would you implement a binary search algorithm?', category: 'coding', difficulty: 'easy', expectedKeywords: ['sorted', 'middle', 'divide', 'O(log n)'], hint: 'Divide search space in half each time' },
        { id: 'code11', question: 'Explain how to validate if a binary tree is a valid Binary Search Tree.', category: 'coding', difficulty: 'medium', expectedKeywords: ['inorder', 'traversal', 'range', 'recursive'], hint: 'Check if inorder traversal is sorted' },
        { id: 'code12', question: 'How would you find the longest common subsequence between two strings?', category: 'coding', difficulty: 'hard', expectedKeywords: ['dynamic programming', 'table', 'dp', 'matrix'], hint: 'Use 2D DP table' },
        { id: 'code13', question: 'Describe an approach to rotate an array by k positions.', category: 'coding', difficulty: 'medium', expectedKeywords: ['reverse', 'three', 'parts', 'in-place'], hint: 'Reverse in three parts' },
        { id: 'code14', question: 'How would you implement a stack using queues?', category: 'coding', difficulty: 'medium', expectedKeywords: ['two queues', 'transfer', 'push', 'pop'], hint: 'Use two queues and transfer elements' },
        { id: 'code15', question: 'Explain how to find all permutations of a string.', category: 'coding', difficulty: 'hard', expectedKeywords: ['backtracking', 'recursive', 'swap', 'permutation'], hint: 'Use backtracking or recursion' }
    ],
    'system-thinking': [
        { id: 'sys1', question: 'How would you design a URL shortener like bit.ly?', category: 'system-thinking', difficulty: 'medium', expectedKeywords: ['hash', 'database', 'redirect', 'unique', 'base62'], hint: 'Think about storage, uniqueness, and redirection' },
        { id: 'sys2', question: 'Design a system to handle 1 million concurrent users for a chat application.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['websocket', 'load balancer', 'database', 'scaling', 'sharding'], hint: 'Consider real-time communication and scalability' },
        { id: 'sys3', question: 'How would you design a rate limiter to prevent API abuse?', category: 'system-thinking', difficulty: 'medium', expectedKeywords: ['token bucket', 'sliding window', 'redis', 'counter'], hint: 'Think about tracking requests over time' },
        { id: 'sys4', question: 'Explain how you would design a notification system that sends emails, SMS, and push notifications.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['queue', 'worker', 'priority', 'retry', 'template'], hint: 'Consider asynchronous processing and reliability' },
        { id: 'sys5', question: 'How would you design a parking lot system?', category: 'system-thinking', difficulty: 'medium', expectedKeywords: ['slots', 'availability', 'vehicle type', 'payment', 'database'], hint: 'Think about different vehicle types and tracking' },
        { id: 'sys6', question: 'Design a file storage system like Dropbox or Google Drive.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['chunks', 'metadata', 'sync', 'versioning', 'deduplication'], hint: 'Consider file chunking and synchronization' },
        { id: 'sys7', question: 'How would you design a search autocomplete system?', category: 'system-thinking', difficulty: 'medium', expectedKeywords: ['trie', 'cache', 'ranking', 'prefix', 'popularity'], hint: 'Use trie data structure' },
        { id: 'sys8', question: 'Design a system for a food delivery app like Uber Eats.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['geolocation', 'matching', 'real-time', 'tracking', 'database'], hint: 'Think about matching, tracking, and real-time updates' },
        { id: 'sys9', question: 'How would you design a distributed cache system?', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['consistent hashing', 'replication', 'eviction', 'redis'], hint: 'Consider consistent hashing for distribution' },
        { id: 'sys10', question: 'Design a system to detect and prevent credit card fraud in real-time.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['machine learning', 'rules', 'pattern', 'anomaly', 'real-time'], hint: 'Combine rule-based and ML approaches' },
        { id: 'sys11', question: 'How would you design a ticketing system like BookMyShow?', category: 'system-thinking', difficulty: 'medium', expectedKeywords: ['concurrency', 'locking', 'seats', 'payment', 'timeout'], hint: 'Handle concurrent seat booking' },
        { id: 'sys12', question: 'Design a web crawler for a search engine.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['queue', 'robots.txt', 'politeness', 'distributed', 'dedup'], hint: 'Consider politeness and deduplication' },
        { id: 'sys13', question: 'How would you design a social media news feed like Facebook or Twitter?', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['fanout', 'timeline', 'ranking', 'cache', 'push', 'pull'], hint: 'Think about fanout on write vs read' },
        { id: 'sys14', question: 'Design a system for online code execution like LeetCode or HackerRank.', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['sandbox', 'docker', 'timeout', 'queue', 'security'], hint: 'Security and isolation are critical' },
        { id: 'sys15', question: 'How would you design a metrics and monitoring system for microservices?', category: 'system-thinking', difficulty: 'hard', expectedKeywords: ['time series', 'aggregation', 'alerting', 'prometheus', 'grafana'], hint: 'Use time-series database' }
    ],
    behavioral: [
        { id: 'beh1', question: 'Tell me about a time when you had to learn a new technology quickly for a project.', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['learned', 'documentation', 'practice', 'project', 'deadline'], hint: 'Use STAR method: Situation, Task, Action, Result' },
        { id: 'beh2', question: 'Describe a situation where you disagreed with a team member. How did you handle it?', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['communication', 'compromise', 'respect', 'solution', 'team'], hint: 'Show conflict resolution skills' },
        { id: 'beh3', question: 'What is your biggest technical weakness and how are you working to improve it?', category: 'behavioral', difficulty: 'easy', expectedKeywords: ['learning', 'practice', 'improve', 'resources', 'progress'], hint: 'Be honest but show growth mindset' },
        { id: 'beh4', question: 'Tell me about a project you\'re most proud of. What was your role and what challenges did you face?', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['built', 'challenge', 'solved', 'impact', 'learned'], hint: 'Highlight your specific contributions' },
        { id: 'beh5', question: 'How do you stay updated with new technologies and industry trends?', category: 'behavioral', difficulty: 'easy', expectedKeywords: ['blogs', 'documentation', 'projects', 'community', 'practice'], hint: 'Show continuous learning habits' },
        { id: 'beh6', question: 'Describe a time when you failed. What did you learn from it?', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['mistake', 'learned', 'improved', 'reflection', 'growth'], hint: 'Focus on learning and growth' },
        { id: 'beh7', question: 'How do you prioritize tasks when you have multiple deadlines?', category: 'behavioral', difficulty: 'easy', expectedKeywords: ['priority', 'urgent', 'important', 'plan', 'communicate'], hint: 'Mention frameworks like Eisenhower matrix' },
        { id: 'beh8', question: 'Tell me about a time when you had to work with a difficult stakeholder or client.', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['communication', 'empathy', 'expectations', 'solution'], hint: 'Show emotional intelligence' },
        { id: 'beh9', question: 'Describe a situation where you took initiative without being asked.', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['proactive', 'identified', 'solved', 'initiative', 'impact'], hint: 'Show ownership and leadership' },
        { id: 'beh10', question: 'How do you handle receiving critical feedback?', category: 'behavioral', difficulty: 'easy', expectedKeywords: ['listen', 'reflect', 'improve', 'grateful', 'action'], hint: 'Show openness to feedback' },
        { id: 'beh11', question: 'Tell me about a time when you had to explain a complex technical concept to a non-technical person.', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['simple', 'analogy', 'patient', 'understood', 'communication'], hint: 'Show communication skills' },
        { id: 'beh12', question: 'Describe a situation where you had to make a decision with incomplete information.', category: 'behavioral', difficulty: 'hard', expectedKeywords: ['analysis', 'risk', 'decision', 'assumptions', 'outcome'], hint: 'Show decision-making under uncertainty' },
        { id: 'beh13', question: 'How do you ensure code quality in your projects?', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['testing', 'review', 'standards', 'documentation', 'refactor'], hint: 'Mention practices like code reviews, testing' },
        { id: 'beh14', question: 'Tell me about a time when you mentored or helped a junior developer.', category: 'behavioral', difficulty: 'medium', expectedKeywords: ['taught', 'patient', 'explained', 'growth', 'support'], hint: 'Show leadership and teaching ability' },
        { id: 'beh15', question: 'Why do you want to work as an intern at our company?', category: 'behavioral', difficulty: 'easy', expectedKeywords: ['learn', 'grow', 'contribute', 'mission', 'technology'], hint: 'Research the company beforehand' }
    ],
    curveball: [
        { id: 'curve1', question: 'If you were a programming language, which one would you be and why?', category: 'curveball', difficulty: 'medium', expectedKeywords: ['personality', 'characteristics', 'strengths', 'analogy'], hint: 'Show creativity and self-awareness' },
        { id: 'curve2', question: 'How would you explain cloud computing to a 5-year-old?', category: 'curveball', difficulty: 'medium', expectedKeywords: ['simple', 'analogy', 'storage', 'internet', 'accessible'], hint: 'Use simple analogies' },
        { id: 'curve3', question: 'You have 1000 bottles of wine, one of which is poisoned. You have 10 test strips that turn positive if exposed to poison. How do you find the poisoned bottle?', category: 'curveball', difficulty: 'hard', expectedKeywords: ['binary', 'combination', 'bits', 'encoding'], hint: 'Think in binary - each strip is a bit' },
        { id: 'curve4', question: 'If you could remove one feature from the internet, what would it be and why?', category: 'curveball', difficulty: 'medium', expectedKeywords: ['reasoning', 'impact', 'society', 'technology'], hint: 'Show critical thinking about technology\'s impact' },
        { id: 'curve5', question: 'Design an algorithm to make people happier.', category: 'curveball', difficulty: 'hard', expectedKeywords: ['metrics', 'factors', 'feedback', 'personalization', 'ethics'], hint: 'Think about measurable factors and ethical considerations' },
        { id: 'curve6', question: 'If you were stranded on a desert island and could only have 3 programming tools/languages, what would they be?', category: 'curveball', difficulty: 'easy', expectedKeywords: ['versatile', 'practical', 'reasoning', 'survival'], hint: 'Think about versatility and practicality' },
        { id: 'curve7', question: 'How many tennis balls can fit in a school bus?', category: 'curveball', difficulty: 'medium', expectedKeywords: ['estimate', 'volume', 'calculation', 'assumptions'], hint: 'Make reasonable assumptions and calculate' },
        { id: 'curve8', question: 'If you could have dinner with any computer scientist (living or dead), who would it be and why?', category: 'curveball', difficulty: 'easy', expectedKeywords: ['inspiration', 'contribution', 'learn', 'influence'], hint: 'Show knowledge of CS history' },
        { id: 'curve9', question: 'You have a 100-story building and 2 eggs. What\'s the minimum number of drops needed to find the critical floor?', category: 'curveball', difficulty: 'hard', expectedKeywords: ['dynamic programming', 'optimal', 'strategy', '14'], hint: 'Use optimal strategy, not binary search' },
        { id: 'curve10', question: 'If you could add one feature to any existing app, what would it be?', category: 'curveball', difficulty: 'medium', expectedKeywords: ['user experience', 'problem', 'solution', 'innovation'], hint: 'Identify a real pain point' },
        { id: 'curve11', question: 'How would you move Mount Fuji?', category: 'curveball', difficulty: 'hard', expectedKeywords: ['creative', 'redefine', 'approach', 'thinking'], hint: 'Think outside the box - redefine the problem' },
        { id: 'curve12', question: 'If you were a superhero, what would your power be and how would you use it in software development?', category: 'curveball', difficulty: 'easy', expectedKeywords: ['creativity', 'analogy', 'development', 'problem-solving'], hint: 'Connect it to actual development challenges' },
        { id: 'curve13', question: 'Estimate how much money is spent on gas in the US every year.', category: 'curveball', difficulty: 'medium', expectedKeywords: ['estimation', 'population', 'calculation', 'assumptions'], hint: 'Break it down: population, cars, miles, price' },
        { id: 'curve14', question: 'If you could uninvent one technology, what would it be and why?', category: 'curveball', difficulty: 'medium', expectedKeywords: ['impact', 'society', 'ethics', 'reasoning'], hint: 'Consider both positive and negative impacts' },
        { id: 'curve15', question: 'You\'re shrunk to the size of a coin and thrown into a blender. The blades start in 60 seconds. What do you do?', category: 'curveball', difficulty: 'hard', expectedKeywords: ['creative', 'physics', 'escape', 'problem-solving'], hint: 'Think about physics at that scale' }
    ]
};

export const getQuestionsByCategory = (categoryId: string): InterviewQuestion[] => {
    return interviewQuestions[categoryId] || [];
};

export const getAllCategories = () => {
    return interviewCategories;
};
