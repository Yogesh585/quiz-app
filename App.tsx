import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';

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

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number | number[]>
  >({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const currentQuestion = questions[currentIndex];

// Timer Logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Select logic
  const handleSelect = (index: number) => {
    if (currentQuestion.type === 'MCQ') {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentIndex]: index
      });
    } else {
      const currentSelections =
        (selectedAnswers[currentIndex] as number[]) || [];

      if (currentSelections.includes(index)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentIndex]: currentSelections.filter(i => i !== index)
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentIndex]: [...currentSelections, index]
        });
      }
    }
  };

  const isSelected = (index: number) => {
    if (currentQuestion.type === 'MCQ') {
      return selectedAnswers[currentIndex] === index;
    } else {
      return (selectedAnswers[currentIndex] as number[])?.includes(index);
    }
  };

  // Score calculation
  const calculateScore = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    questions.forEach((q, index) => {
      const userAnswer = selectedAnswers[index];

      if (userAnswer === undefined) {
        skipped++;
        return;
      }

      if (q.type === 'MCQ') {
        userAnswer === q.answer ? correct++ : wrong++;
      } else {
        const correctAns = q.answer as number[];
        const userAns = userAnswer as number[];

        const isCorrect =
          userAns.length === correctAns.length &&
          userAns.every(a => correctAns.includes(a));

        isCorrect ? correct++ : wrong++;
      }
    });

    return { correct, wrong, skipped };
  };

  const handleSubmit = () => {
    const res = calculateScore();
    setResult(res);
    setShowResult(true);
  };

  //  RESULT 
  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>

        {/* NAVBAR */}
        <View style={styles.navbar}>
          <Text style={styles.navTitle}></Text>
        </View>

        {/* CENTERED RESULT */}
        <View style={styles.resultContainer}>
          <Text style={styles.header}>Quiz Result</Text>

          <Text style={styles.resultText}>
            Score: {result.correct} / {questions.length}
          </Text>

          <Text style={styles.resultText}>
            Percentage: {((result.correct / questions.length) * 100).toFixed(1)}%
          </Text>

          <Text style={styles.resultText}>Correct: {result.correct}</Text>
          <Text style={styles.resultText}>Wrong: {result.wrong}</Text>
          <Text style={styles.resultText}>Skipped: {result.skipped}</Text>
        </View>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}></Text>
      </View>

      {/* CONTENT */}
      <View style={{ padding: 15, flex: 1 }}>

        {/* TIMER */}
        <Text style={{ fontSize: 14, color: 'green' }}>Time</Text>

        <Text style={[
          styles.timer,
          timeLeft <= 60 && { color: 'red' }
        ]}>
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </Text>
        <Text style={styles.counter}>
          Question {currentIndex + 1} / {questions.length}
        </Text>

        <Text style={styles.type}>[{currentQuestion.type}]</Text>

        {currentQuestion.type === 'MSQ' && (
          <Text style={styles.hint}>Select all correct options</Text>
        )}

        <Text style={styles.question}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              isSelected(index) && styles.selected
            ]}
            onPress={() => handleSelect(index)}
          >
            <Text style={{ fontSize: 16 }}>
              {String.fromCharCode(65 + index)}) {option}
            </Text>
          </TouchableOpacity>
        ))}

        {/* NAVIGATION */}
        <View style={styles.navContainer}>

          <TouchableOpacity
            disabled={currentIndex === 0}
            onPress={() => setCurrentIndex(currentIndex - 1)}
            style={[
              styles.navButton,
              styles.prevBtn,
              currentIndex === 0 && { opacity: 0.5 }
            ]}
          >
            <Text style={styles.btnText}>Previous</Text>
          </TouchableOpacity>

          {currentIndex === questions.length - 1 ? (
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setCurrentIndex(currentIndex + 1)}
              style={[styles.navButton, styles.nextBtn]}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          )}

        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

 navbar: {
  backgroundColor: '#007bff',
  height: 60,                 // fixed height
  justifyContent: 'center', 
  alignItems: 'center'        
},

  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  timer: {
    fontSize: 18,
    marginBottom: 10
  },

  counter: { fontSize: 16 },

  type: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  hint: { color: 'gray' },

  question: {
    fontSize: 20,
    marginVertical: 10
  },

  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    borderRadius: 8
  },

  selected: {
    backgroundColor: '#d0f0ff',
    borderColor: '#007bff'
  },

  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  navButton: {
    padding: 12,
    borderRadius: 8
  },

  prevBtn: {
    backgroundColor: '#dc3545'
  },

  nextBtn: {
    backgroundColor: '#007bff'
  },

  submitBtn: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff'
  },

  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  resultText: {
    fontSize: 18,
    marginVertical: 5
  }
  
});