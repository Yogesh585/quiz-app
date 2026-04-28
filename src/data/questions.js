const questions = [
  {
    id: 1,
    type: 'MCQ',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    answer: 1
  },
  {
    id: 2,
    type: 'MCQ',
    question: 'Which data structure uses LIFO (Last In First Out)?',
    options: ['Queue', 'Linked List', 'Stack', 'Tree'],
    answer: 2
  },
  {
    id: 3,
    type: 'MCQ',
    question: 'The SI unit of electric charge is:',
    options: ['Ampere', 'Volt', 'Watt', 'Coulomb'],
    answer: 3
  },
  {
    id: 4,
    type: 'MCQ',
    question: 'Which sorting algorithm has best-case time complexity O(n)?',
    options: ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Bubble Sort'],
    answer: 2
  },
  {
    id: 5,
    type: 'MCQ',
    question: "Newton's second law relates force to:",
    options: ['Velocity', 'Displacement', 'Mass × Acceleration', 'Energy'],
    answer: 2
  },

  {
    id: 6,
    type: 'MSQ',
    question: 'Which of the following are linear data structures?',
    options: ['Array', 'Binary Tree', 'Queue', 'Graph', 'Linked List'],
    answer: [0, 2, 4]
  },
  {
    id: 7,
    type: 'MSQ',
    question: 'Which sorting algorithms have worst-case time complexity O(n log n)?',
    options: ['Bubble Sort', 'Merge Sort', 'Heap Sort', 'Insertion Sort', 'Quick Sort'],
    answer: [1, 2]
  },
  {
    id: 8,
    type: 'MSQ',
    question: 'Which of the following are vector quantities?',
    options: ['Speed', 'Velocity', 'Mass', 'Force', 'Temperature', 'Acceleration'],
    answer: [1, 3, 5]
  }
];

export default questions;