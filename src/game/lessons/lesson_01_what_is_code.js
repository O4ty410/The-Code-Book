const lesson = {
  id: 'lesson_01',
  title: 'What Is Code?',
  sector: 'Alpha',
  xpReward: 20,
  requiredLessons: [],
  slides: [
    {
      type: 'text',
      content: 'Code is a set of instructions written in a language a computer can understand.',
    },
    {
      type: 'text',
      content: 'Every app, game, and website you use was built with code.',
    },
    {
      type: 'quiz',
      question: 'What is code?',
      options: [
        'A secret message',
        'Instructions a computer can follow',
        'A type of robot',
        'A programming game',
      ],
      correct: 1,
    },
  ],
};

export default lesson;
