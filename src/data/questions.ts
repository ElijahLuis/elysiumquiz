import type { Question } from './types';

export const questions: Question[] = [
  // SCENARIO QUESTIONS (12)
  {
    id: 'q1',
    type: 'scenario',
    text: 'You wake up in the middle of the night with a thought you can\'t shake. What kind of thought is it usually?',
    options: [
      { id: 'q1a', text: 'A memory of something I wish had gone differently', realms: { trace: 3, glare: 1 } },
      { id: 'q1b', text: 'A worry about something that might happen', realms: { abyss: 3, mist: 1 } },
      { id: 'q1c', text: 'Frustration about something unresolved', realms: { ember: 2, cavern: 2 } },
      { id: 'q1d', text: 'A moment of gratitude or excitement for tomorrow', realms: { oasis: 3 } },
      { id: 'q1e', text: 'A feeling of disgust about something I did', realms: { dross: 3 } }
    ]
  },
  {
    id: 'q2',
    type: 'scenario',
    text: 'You see someone succeed at something you\'ve been struggling with. Your first reaction is...',
    options: [
      { id: 'q2a', text: 'Genuine happiness for them', realms: { oasis: 3 } },
      { id: 'q2b', text: 'Curiosity about how they did it', realms: { mist: 2, zenith: 1 } },
      { id: 'q2c', text: 'A sting of "why not me?"', realms: { cavern: 3 } },
      { id: 'q2d', text: 'Frustration with myself', realms: { ember: 2, dross: 2 } },
      { id: 'q2e', text: 'Distance, like it doesn\'t apply to me', realms: { languish: 2, abyss: 1 } }
    ]
  },
  {
    id: 'q3',
    type: 'scenario',
    text: 'Someone cancels plans with you at the last minute. You feel...',
    options: [
      { id: 'q3a', text: 'Relieved, honestly', realms: { languish: 3 } },
      { id: 'q3b', text: 'Annoyed and disrespected', realms: { ember: 3 } },
      { id: 'q3c', text: 'Worried I did something wrong', realms: { glare: 3, abyss: 1 } },
      { id: 'q3d', text: 'Disappointed but understanding', realms: { oasis: 2, trace: 1 } },
      { id: 'q3e', text: 'Suspicious of their real reasons', realms: { cavern: 2, mist: 1 } }
    ]
  },
  {
    id: 'q4',
    type: 'scenario',
    text: 'You\'re at a gathering and notice someone you admire talking closely with your friend. What feeling rises first?',
    options: [
      { id: 'q4a', text: 'A twinge of worry that I\'m being replaced', realms: { cavern: 3, abyss: 1 } },
      { id: 'q4b', text: 'Curiosity about what they\'re discussing', realms: { mist: 3, oasis: 1 } },
      { id: 'q4c', text: 'Happiness that my friend is connecting', realms: { oasis: 3 } },
      { id: 'q4d', text: 'A pull of longing, wishing I had that rapport', realms: { trace: 3, languish: 1 } },
      { id: 'q4e', text: 'Irritation at being left out', realms: { ember: 2, cavern: 1 } }
    ]
  },
  {
    id: 'q5',
    type: 'scenario',
    text: 'You receive unexpected criticism on something you worked hard on. Your instinct is to...',
    options: [
      { id: 'q5a', text: 'Defend myself and push back', realms: { ember: 3, zenith: 1 } },
      { id: 'q5b', text: 'Shrink and replay it endlessly', realms: { glare: 3, abyss: 1 } },
      { id: 'q5c', text: 'Consider if they have a point', realms: { mist: 2, zenith: 2 } },
      { id: 'q5d', text: 'Feel disgusted with myself for failing', realms: { dross: 3, glare: 1 } },
      { id: 'q5e', text: 'Withdraw and process alone', realms: { languish: 2, trace: 1 } }
    ]
  },
  {
    id: 'q6',
    type: 'scenario',
    text: 'You have a free afternoon with no obligations. What draws you?',
    options: [
      { id: 'q6a', text: 'Revisiting old photos or messages', realms: { trace: 3 } },
      { id: 'q6b', text: 'Starting something creative or new', realms: { zenith: 2, mist: 2 } },
      { id: 'q6c', text: 'Resting—I need it more than anything', realms: { languish: 3 } },
      { id: 'q6d', text: 'Working on something to prove myself', realms: { ember: 2, cavern: 1 } },
      { id: 'q6e', text: 'Connecting with someone I care about', realms: { oasis: 3 } }
    ]
  },
  {
    id: 'q7',
    type: 'scenario',
    text: 'You witness someone being treated unfairly. Your reaction is...',
    options: [
      { id: 'q7a', text: 'Anger that demands action', realms: { ember: 3, zenith: 1 } },
      { id: 'q7b', text: 'Discomfort that makes me look away', realms: { dross: 2, abyss: 2 } },
      { id: 'q7c', text: 'Sadness for what they\'re going through', realms: { languish: 3 } },
      { id: 'q7d', text: 'Confusion about what the right move is', realms: { mist: 3 } },
      { id: 'q7e', text: 'Remembering times I felt the same', realms: { trace: 2, glare: 2 } }
    ]
  },
  {
    id: 'q8',
    type: 'scenario',
    text: 'You notice something about yourself that you really don\'t like. Your response is...',
    options: [
      { id: 'q8a', text: 'To fixate on it and feel repulsed', realms: { dross: 3 } },
      { id: 'q8b', text: 'To get angry and want to change it immediately', realms: { ember: 2, dross: 1 } },
      { id: 'q8c', text: 'To compare it to how others handle it', realms: { cavern: 2, glare: 1 } },
      { id: 'q8d', text: 'To accept it as part of who I am', realms: { zenith: 3 } },
      { id: 'q8e', text: 'To feel sad about this aspect of myself', realms: { languish: 2, dross: 1 } }
    ]
  },
  {
    id: 'q9',
    type: 'scenario',
    text: 'When facing a major life decision, you typically feel...',
    options: [
      { id: 'q9a', text: 'Confident in my ability to choose wisely', realms: { zenith: 3 } },
      { id: 'q9b', text: 'Paralyzed by fear of making the wrong choice', realms: { abyss: 3 } },
      { id: 'q9c', text: 'Jealous of people who seem to have it figured out', realms: { cavern: 3 } },
      { id: 'q9d', text: 'Curious about all the possibilities', realms: { mist: 3 } },
      { id: 'q9e', text: 'Nostalgic for simpler times when choices were easier', realms: { trace: 3 } }
    ]
  },
  {
    id: 'q10',
    type: 'scenario',
    text: 'You receive praise for something you did. Your first thought is...',
    options: [
      { id: 'q10a', text: 'I earned this and feel proud', realms: { zenith: 3 } },
      { id: 'q10b', text: 'They don\'t really know the real me', realms: { dross: 2, glare: 2 } },
      { id: 'q10c', text: 'Others deserved it more than I did', realms: { cavern: 2, languish: 1 } },
      { id: 'q10d', text: 'I hope I can live up to their expectations', realms: { abyss: 2, glare: 1 } },
      { id: 'q10e', text: 'This reminds me of better times', realms: { trace: 3 } }
    ]
  },
  {
    id: 'q11',
    type: 'scenario',
    text: 'When you think about your body or appearance, you most often feel...',
    options: [
      { id: 'q11a', text: 'Comfortable and accepting', realms: { oasis: 2, zenith: 2 } },
      { id: 'q11b', text: 'Critical and disappointed in what I see', realms: { dross: 3, glare: 1 } },
      { id: 'q11c', text: 'Constantly comparing myself to others', realms: { cavern: 3 } },
      { id: 'q11d', text: 'Uncertain and aware it keeps changing', realms: { mist: 2, trace: 1 } },
      { id: 'q11e', text: 'Frustrated by societal expectations', realms: { ember: 2, dross: 1 } }
    ]
  },
  {
    id: 'q12',
    type: 'scenario',
    text: 'When you can\'t sleep, it\'s usually because...',
    options: [
      { id: 'q12a', text: 'I\'m excited about something coming up', realms: { oasis: 3 } },
      { id: 'q12b', text: 'I feel physically uncomfortable or unsettled', realms: { dross: 2, abyss: 1 } },
      { id: 'q12c', text: 'I\'m replaying something embarrassing I did', realms: { glare: 3 } },
      { id: 'q12d', text: 'I\'m angry about something that happened', realms: { ember: 3 } },
      { id: 'q12e', text: 'I feel empty and disconnected', realms: { languish: 3 } }
    ]
  },

  // SLIDER QUESTIONS (6)
  {
    id: 'q13',
    type: 'slider',
    text: 'When someone criticizes you...',
    leftLabel: 'I consider if they have a point',
    rightLabel: 'I feel exposed and defensive',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, mist: 1 } },
      { min: 26, max: 50, realms: { mist: 2 } },
      { min: 51, max: 75, realms: { glare: 2, cavern: 1 } },
      { min: 76, max: 100, realms: { glare: 3, abyss: 1 } }
    ]
  },
  {
    id: 'q14',
    type: 'slider',
    text: 'When things don\'t go as planned...',
    leftLabel: 'I adapt and find another way',
    rightLabel: 'I need time to process what went wrong',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, ember: 1 } },
      { min: 26, max: 50, realms: { mist: 2, oasis: 1 } },
      { min: 51, max: 75, realms: { trace: 2, languish: 1 } },
      { min: 76, max: 100, realms: { languish: 2, abyss: 1 } }
    ]
  },
  {
    id: 'q15',
    type: 'slider',
    text: 'In social situations...',
    leftLabel: 'I feel energized and present',
    rightLabel: 'I feel drained or out of place',
    ranges: [
      { min: 0, max: 25, realms: { oasis: 2, zenith: 1 } },
      { min: 26, max: 50, realms: { mist: 2, oasis: 1 } },
      { min: 51, max: 75, realms: { glare: 2, languish: 1 } },
      { min: 76, max: 100, realms: { abyss: 2, languish: 1 } }
    ]
  },
  {
    id: 'q16',
    type: 'slider',
    text: 'When I compare myself to others...',
    leftLabel: 'I feel inspired by their success',
    rightLabel: 'I feel diminished by their success',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, oasis: 1 } },
      { min: 26, max: 50, realms: { mist: 2, trace: 1 } },
      { min: 51, max: 75, realms: { cavern: 2, glare: 1 } },
      { min: 76, max: 100, realms: { cavern: 3, dross: 1 } }
    ]
  },
  {
    id: 'q17',
    type: 'slider',
    text: 'When I see my reflection...',
    leftLabel: 'I feel generally positive about myself',
    rightLabel: 'I struggle to look without criticism',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, oasis: 1 } },
      { min: 26, max: 50, realms: { trace: 2 } },
      { min: 51, max: 75, realms: { glare: 2, cavern: 1 } },
      { min: 76, max: 100, realms: { dross: 3 } }
    ]
  },
  {
    id: 'q18',
    type: 'slider',
    text: 'When thinking about the future...',
    leftLabel: 'I feel hopeful and excited',
    rightLabel: 'I feel dread and uncertainty',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, oasis: 1 } },
      { min: 26, max: 50, realms: { mist: 2, trace: 1 } },
      { min: 51, max: 75, realms: { abyss: 2, languish: 1 } },
      { min: 76, max: 100, realms: { abyss: 3 } }
    ]
  },

  // WORD CLOUD QUESTIONS (6)
  {
    id: 'q19',
    type: 'word_cloud',
    text: 'Which word captures your energy lately?',
    options: [
      { id: 'q19a', text: 'Simmering', realms: { ember: 3 } },
      { id: 'q19b', text: 'Drifting', realms: { trace: 2, languish: 1 } },
      { id: 'q19c', text: 'Seeking', realms: { mist: 2, cavern: 1 } },
      { id: 'q19d', text: 'Grounded', realms: { oasis: 2, zenith: 1 } },
      { id: 'q19e', text: 'Heavy', realms: { languish: 2, dross: 1 } },
      { id: 'q19f', text: 'Watchful', realms: { abyss: 2, glare: 1 } }
    ]
  },
  {
    id: 'q20',
    type: 'word_cloud',
    text: 'Which of these feels most familiar right now?',
    options: [
      { id: 'q20a', text: 'Restless', realms: { ember: 2, mist: 1 } },
      { id: 'q20b', text: 'Tender', realms: { oasis: 2, trace: 1 } },
      { id: 'q20c', text: 'Guarded', realms: { glare: 2, cavern: 1 } },
      { id: 'q20d', text: 'Foggy', realms: { mist: 2, languish: 1 } },
      { id: 'q20e', text: 'Determined', realms: { zenith: 2, ember: 1 } },
      { id: 'q20f', text: 'Hollow', realms: { abyss: 2, dross: 1 } }
    ]
  },
  {
    id: 'q21',
    type: 'word_cloud',
    text: 'What texture describes your inner world?',
    options: [
      { id: 'q21a', text: 'Sharp edges', realms: { ember: 2, glare: 1 } },
      { id: 'q21b', text: 'Soft and worn', realms: { trace: 2, languish: 1 } },
      { id: 'q21c', text: 'Tangled threads', realms: { mist: 2, cavern: 1 } },
      { id: 'q21d', text: 'Warm and smooth', realms: { oasis: 3 } },
      { id: 'q21e', text: 'Cold and still', realms: { abyss: 2, languish: 1 } },
      { id: 'q21f', text: 'Solid and clear', realms: { zenith: 3 } }
    ]
  },
  {
    id: 'q22',
    type: 'word_cloud',
    text: 'When you close your eyes, what color do you see?',
    options: [
      { id: 'q22a', text: 'Deep purple or black', realms: { abyss: 2, languish: 1 } },
      { id: 'q22b', text: 'Fiery orange or red', realms: { ember: 3 } },
      { id: 'q22c', text: 'Soft blue or grey', realms: { languish: 3 } },
      { id: 'q22d', text: 'Warm gold or yellow', realms: { zenith: 2, oasis: 1 } },
      { id: 'q22e', text: 'Dusty rose or pink', realms: { trace: 3 } },
      { id: 'q22f', text: 'Fresh green or teal', realms: { oasis: 2, mist: 1 } }
    ]
  },
  {
    id: 'q23',
    type: 'word_cloud',
    text: 'Which sensation describes how you sometimes feel about yourself?',
    options: [
      { id: 'q23a', text: 'Proud', realms: { zenith: 3 } },
      { id: 'q23b', text: 'Disgusted', realms: { dross: 3 } },
      { id: 'q23c', text: 'Invisible', realms: { languish: 2, abyss: 1 } },
      { id: 'q23d', text: 'Conflicted', realms: { mist: 2, cavern: 1 } },
      { id: 'q23e', text: 'Longing', realms: { trace: 3 } },
      { id: 'q23f', text: 'Fiery', realms: { ember: 3 } }
    ]
  },
  {
    id: 'q24',
    type: 'word_cloud',
    text: 'What best describes your relationship with success?',
    options: [
      { id: 'q24a', text: 'Secure and satisfied', realms: { oasis: 2, zenith: 2 } },
      { id: 'q24b', text: 'Always measuring against others', realms: { cavern: 3 } },
      { id: 'q24c', text: 'Frustrated by obstacles', realms: { ember: 2, glare: 1 } },
      { id: 'q24d', text: 'Questioning what it means', realms: { mist: 3 } },
      { id: 'q24e', text: 'Haunted by what could have been', realms: { trace: 2, languish: 1 } },
      { id: 'q24f', text: 'Feeling like a fraud', realms: { dross: 2, abyss: 1 } }
    ]
  },

  // REFLECTION QUESTIONS (6)
  {
    id: 'q25',
    type: 'reflection',
    text: 'In your quiet moments lately, where does your mind tend to wander?',
    options: [
      { id: 'q25a', text: 'To things I wish I\'d said or done differently', realms: { trace: 3, glare: 1 } },
      { id: 'q25b', text: 'To worries about what might happen next', realms: { abyss: 3, mist: 1 } },
      { id: 'q25c', text: 'To people who frustrate or disappoint me', realms: { ember: 2, cavern: 2 } },
      { id: 'q25d', text: 'To things I\'m grateful for or looking forward to', realms: { oasis: 3 } },
      { id: 'q25e', text: 'To critical thoughts about myself', realms: { dross: 3 } }
    ]
  },
  {
    id: 'q26',
    type: 'reflection',
    text: 'When you think about who you are, you most often feel...',
    options: [
      { id: 'q26a', text: 'Proud of how far I\'ve come', realms: { zenith: 3 } },
      { id: 'q26b', text: 'Uncertain, still figuring it out', realms: { mist: 2, trace: 1 } },
      { id: 'q26c', text: 'Exposed and judged by others', realms: { glare: 3 } },
      { id: 'q26d', text: 'Disconnected and emotionally numb', realms: { languish: 3 } },
      { id: 'q26e', text: 'Critical of my flaws and failures', realms: { dross: 2, cavern: 1 } }
    ]
  },
  {
    id: 'q27',
    type: 'reflection',
    text: 'What do you need most right now?',
    options: [
      { id: 'q27a', text: 'To feel safe and held', realms: { abyss: 2, oasis: 2 } },
      { id: 'q27b', text: 'To stop feeling so exposed and judged', realms: { glare: 3 } },
      { id: 'q27c', text: 'To release what I\'m holding', realms: { ember: 2, languish: 1 } },
      { id: 'q27d', text: 'To find clarity and direction', realms: { mist: 3 } },
      { id: 'q27e', text: 'To feel proud of myself', realms: { zenith: 2, dross: 1 } },
      { id: 'q27f', text: 'To reconnect with what matters', realms: { trace: 2, oasis: 1 } }
    ]
  },
  {
    id: 'q28',
    type: 'reflection',
    text: 'When you make a mistake, your inner voice tends to...',
    options: [
      { id: 'q28a', text: 'Encourage me to learn and move on', realms: { zenith: 3 } },
      { id: 'q28b', text: 'Attack me relentlessly with harsh criticism', realms: { dross: 3, glare: 1 } },
      { id: 'q28c', text: 'Spiral into fear about the consequences', realms: { abyss: 3 } },
      { id: 'q28d', text: 'Compare me to others who don\'t make mistakes', realms: { cavern: 3 } },
      { id: 'q28e', text: 'Feel resigned and emotionally numb', realms: { languish: 2, mist: 1 } }
    ]
  },
  {
    id: 'q29',
    type: 'reflection',
    text: 'In your most private moments, what do you struggle with most?',
    options: [
      { id: 'q29a', text: 'Feeling unworthy or fundamentally defective', realms: { dross: 3 } },
      { id: 'q29b', text: 'Wanting what others seem to have easily', realms: { cavern: 3 } },
      { id: 'q29c', text: 'Fear of being abandoned or truly alone', realms: { abyss: 3 } },
      { id: 'q29d', text: 'Anger that I just can\'t seem to let go of', realms: { ember: 3 } },
      { id: 'q29e', text: 'Grief for what I\'ve lost or never had', realms: { languish: 3 } },
      { id: 'q29f', text: 'Uncertainty about who I really am', realms: { mist: 3 } }
    ]
  },
  {
    id: 'q30',
    type: 'reflection',
    text: 'If you could change one thing about your emotional life, it would be...',
    options: [
      { id: 'q30a', text: 'To feel more confident and self-assured', realms: { zenith: 3 } },
      { id: 'q30b', text: 'To stop being so hard on myself', realms: { dross: 2, glare: 2 } },
      { id: 'q30c', text: 'To feel less afraid of the unknown', realms: { abyss: 3 } },
      { id: 'q30d', text: 'To let go of past hurts and regrets', realms: { trace: 2, ember: 1 } },
      { id: 'q30e', text: 'To stop comparing myself to others', realms: { cavern: 3 } },
      { id: 'q30f', text: 'To feel more connected and less alone', realms: { languish: 2, oasis: 1 } }
    ]
  }
];

export default questions;
