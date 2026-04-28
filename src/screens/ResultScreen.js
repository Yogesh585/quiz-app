import React from 'react';
import { View, Text } from 'react-native';
import questions from '../data/questions';

export default function ResultScreen({ route }) {

  const { answers } = route.params;

  let correct = 0;

  questions.forEach((q, i) => {
    const user = answers[i];

    if (q.type === 'MCQ') {
      if (user === q.answer) correct++;
    } else {
      const isCorrect =
        user?.length === q.answer.length &&
        user.every(a => q.answer.includes(a));

      if (isCorrect) correct++;
    }
  });

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Score: {correct} / {questions.length}</Text>
    </View>
  );
}