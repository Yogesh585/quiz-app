import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import questions from '../data/questions';

export default function QuizScreen({ navigation }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);

  const handleSelect = (index) => {
    const q = questions[currentIndex];

    if (q.type === 'MCQ') {
      setSelectedAnswers({ ...selectedAnswers, [currentIndex]: index });
    } else {
      const current = selectedAnswers[currentIndex] || [];

      if (current.includes(index)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentIndex]: current.filter(i => i !== index)
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentIndex]: [...current, index]
        });
      }
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Result', { answers: selectedAnswers });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>

      <Text style={{ fontSize: 20, textAlign: 'center' }}>Quiz</Text>

      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />

      <Text>
        Question {currentIndex + 1} / {questions.length}
      </Text>

      <QuestionCard
        question={questions[currentIndex]}
        selectedAnswers={selectedAnswers}
        currentIndex={currentIndex}
        handleSelect={handleSelect}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() => setCurrentIndex(currentIndex - 1)}
        >
          <Text>Previous</Text>
        </TouchableOpacity>

        {currentIndex === questions.length - 1 ? (
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setCurrentIndex(currentIndex + 1)}>
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View>

    </SafeAreaView>
  );
}