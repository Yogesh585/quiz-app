import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuestionCard({
  question,
  selectedAnswers,
  currentIndex,
  handleSelect
}) {

  const isSelected = (index) => {
    if (question.type === 'MCQ') {
      return selectedAnswers[currentIndex] === index;
    }
    return (selectedAnswers[currentIndex] || []).includes(index);
  };

  return (
    <View>
      <Text>[{question.type}]</Text>

      {question.type === 'MSQ' && (
        <Text style={{ color: 'gray' }}>Select all correct options</Text>
      )}

      <Text>{question.question}</Text>

      {question.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleSelect(i)}
          style={{
            padding: 10,
            borderWidth: 1,
            marginVertical: 5,
            backgroundColor: isSelected(i) ? '#d0f0ff' : '#fff'
          }}
        >
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}