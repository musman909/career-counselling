import inputTypes from './inputTypes';

const testData = {
  id: 'test1',
  data: [
    {
      question: "What's your current study status?",
      options: ['Matric', 'Intermediate'],
      inputType: inputTypes.dropDown
    },
    {
      question:
        'From following, which bachelors degree program, you want to go?',
      options: ['BS(CS)', 'BS(IT)', 'BBA', 'BS (Psychology)'],
      inputType: inputTypes.dropDown
    },
    {
      question: "What's your favourite subjects?",
      inputType: inputTypes.field
    },
    {
      question: 'Current Status',
      inputType: inputTypes.checkBox,
      options: [
        'Student',
        'Freelancer',
        'Internee',
        'Job Holder',
        'Working on your own Projects',
        'Other'
      ]
    },
    {
      question: 'Desired Profession',
      inputType: inputTypes.field
    },

    {
      question: 'What game do you like the most?',
      inputType: inputTypes.checkBox,
      options: ['Indoor games', 'Outdoor games', 'Video games', 'None of these']
    },
    {
      question: 'what kind of hobbies do you have?',
      inputType: inputTypes.checkBox,
      options: [
        'Travel, meet strangers',
        'Volunteering, community service or charity work.',
        'Sports such as competing on a team or in a league, hiking or other exercise.',
        'Creative arts, including writing, music, painting and crafts.',
        'Cooking or gardening.',
        'other'
      ]
    },
    {
      question: 'Please choose the word that describes you most of the time.',
      inputType: inputTypes.radio,
      options: ['Structured', 'Flexible']
    },

    {
      question: 'Please choose the word that describes you most of the time.',
      inputType: inputTypes.radio,
      options: ['Feeling', 'Thinking']
    },
    {
      question: 'Are you a person that is more inclined to',
      inputType: inputTypes.radio,
      options: ['Be in Control', 'Be Adaptable']
    },
    {
      question: 'In general, would you describe yourself as more',
      inputType: inputTypes.radio,
      options: ['Appreciative', 'Questioning']
    },
    {
      question: 'Do your coworkers/Fellows consider you to be more',
      inputType: inputTypes.radio,
      options: ['Outgoing', 'Reserved']
    },
    {
      question: 'Do you consider yourself a person that likes to focus on',
      inputType: inputTypes.radio,
      options: ['What is', 'What Could be']
    },
    {
      question: 'Which role is more natural for you at work',
      inputType: inputTypes.radio,
      options: ['To critique and analyze', 'To compliment and appreciate']
    },

    {
      question:
        'At work you are part of a planning committee. Are you more inspired by',
      inputType: inputTypes.radio,
      options: ['Vision', 'Facts']
    },

    {
      question: 'What is more satisfying at work',
      inputType: inputTypes.radio,
      options: ['Organizing', 'Going with the flow']
    }
  ]
};

export default testData;

const test = {
  name: 'Career Consuelling Test',
  data: [
    {
      question: 'Public speaking points',
      inputType: 'dropdown',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    {
      question: 'Can work long time before system?',
      inputType: 'radio',
      options: ['yes', 'no']
    },
    {
      question: 'Self-learning capability?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'Extra courses did?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'Talent tests taken?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'Olympiad?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'Reading and writing skills?',
      inputType: 'dropdown',
      options: ['poor', 'medium', 'excellent']
    },

    {
      question: 'Memory capability score?',
      inputType: 'dropdown',
      options: ['poor', 'medium', 'excellent']
    },

    {
      question: 'Job or Higher studies?',
      inputType: 'radio',
      options: ['higherstudies', 'job']
    },

    {
      question: 'Take inputs from seniors or elders?',
      inputType: 'radio',
      options: ['yes', 'no']
    },
    {
      question: 'Interested in games?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'In a realtionship?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'Gentle or Tuff behaviour?',
      inputType: 'radio',
      options: ['stubborn', 'gentle']
    },

    {
      question: 'Management or Technical?',
      inputType: 'radio',
      options: ['Technical', 'Management']
    },

    {
      question: 'Hard worker or Smart worker?',
      inputType: 'radio',
      options: ['smart worker', 'hard worker']
    },

    {
      question: 'Worked in teams ever?',
      inputType: 'radio',
      options: ['yes', 'no']
    },

    {
      question: 'Introvert?',
      inputType: 'radio',
      options: ['yes', 'no']
    }
  ]
};
