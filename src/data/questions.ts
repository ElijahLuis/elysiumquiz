import type { Question } from './types';

export const questions: Question[] = [
  // SCENARIO QUESTIONS (7)
  {
    id: 'q1',
    type: 'scenario',
    text: 'You wake up in the middle of the night with a thought you can\'t shake. What kind of thought is it usually?',
    options: [
      { id: 'q1a', text: 'A memory of something I wish had gone differently', realms: { trace: 3, glare: 1 } },
      { id: 'q1b', text: 'A worry about something that might happen', realms: { abyss: 3 } },
      { id: 'q1c', text: 'Frustration about something unresolved', realms: { ember: 2, cavern: 2 } },
      { id: 'q1d', text: 'A moment of gratitude or excitement for tomorrow', realms: { oasis: 3 } },
      { id: 'q1e', text: 'Just confusion about why I\'m awake', realms: { mist: 2, languish: 1 } }
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
      { id: 'q2d', text: 'Frustration with myself', realms: { ember: 2, dross: 1 } },
      { id: 'q2e', text: 'Distance, like it doesn\'t apply to me', realms: { languish: 3 } }
    ]
  },
  {
    id: 'q3',
    type: 'scenario',
    text: 'Someone cancels plans with you at the last minute. You feel...',
    options: [
      { id: 'q3a', text: 'Relieved, honestly', realms: { languish: 2, mist: 1 } },
      { id: 'q3b', text: 'Annoyed and disrespected', realms: { ember: 3 } },
      { id: 'q3c', text: 'Worried I did something wrong', realms: { glare: 3 } },
      { id: 'q3d', text: 'Disappointed but understanding', realms: { oasis: 2, trace: 1 } },
      { id: 'q3e', text: 'Suspicious of their real reasons', realms: { cavern: 2, mist: 1 } }
    ]
  },
  {
    id: 'q4',
    type: 'scenario',
    text: 'You\'re at a gathering and notice someone you admire talking closely with your friend. What feeling rises first?',
    options: [
      { id: 'q4a', text: 'A twinge of worry that I\'m being replaced', realms: { cavern: 3 } },
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
      { id: 'q5b', text: 'Shrink and replay it endlessly', realms: { glare: 3 } },
      { id: 'q5c', text: 'Consider if they have a point', realms: { mist: 2, zenith: 2 } },
      { id: 'q5d', text: 'Feel disgusted with myself for failing', realms: { dross: 3 } },
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
      { id: 'q6c', text: 'Resting—I need it more than anything', realms: { languish: 2, oasis: 1 } },
      { id: 'q6d', text: 'Working on something to prove myself', realms: { ember: 3 } },
      { id: 'q6e', text: 'Connecting with someone I care about', realms: { oasis: 3 } }
    ]
  },
  {
    id: 'q7',
    type: 'scenario',
    text: 'You witness someone being treated unfairly. Your reaction is...',
    options: [
      { id: 'q7a', text: 'Anger that demands action', realms: { ember: 3, zenith: 1 } },
      { id: 'q7b', text: 'Discomfort that makes me look away', realms: { dross: 3 } },
      { id: 'q7c', text: 'Sadness for what they\'re going through', realms: { languish: 2, oasis: 1 } },
      { id: 'q7d', text: 'Confusion about what the right move is', realms: { mist: 3 } },
      { id: 'q7e', text: 'Remembering times I felt the same', realms: { trace: 3 } }
    ]
  },

  // SLIDER QUESTIONS (4)
  {
    id: 'q8',
    type: 'slider',
    text: 'When someone criticizes you...',
    leftLabel: 'I consider if they have a point',
    rightLabel: 'I feel exposed and defensive',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, mist: 1 } },
      { min: 26, max: 50, realms: { mist: 2 } },
      { min: 51, max: 75, realms: { cavern: 3 } },
      { min: 76, max: 100, realms: { glare: 3 } }
    ]
  },
  {
    id: 'q9',
    type: 'slider',
    text: 'When things don\'t go as planned...',
    leftLabel: 'I adapt and find another way',
    rightLabel: 'I need time to process what went wrong',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, ember: 1 } },
      { min: 26, max: 50, realms: { mist: 2, oasis: 1 } },
      { min: 51, max: 75, realms: { trace: 2, languish: 1 } },
      { min: 76, max: 100, realms: { languish: 3 } }
    ]
  },
  {
    id: 'q10',
    type: 'slider',
    text: 'In social situations...',
    leftLabel: 'I feel energized and present',
    rightLabel: 'I feel drained or out of place',
    ranges: [
      { min: 0, max: 25, realms: { oasis: 2, zenith: 1 } },
      { min: 26, max: 50, realms: { mist: 2, oasis: 1 } },
      { min: 51, max: 75, realms: { languish: 2, glare: 1 } },
      { min: 76, max: 100, realms: { abyss: 3 } }
    ]
  },
  {
    id: 'q11',
    type: 'slider',
    text: 'When I compare myself to others...',
    leftLabel: 'I feel inspired by their success',
    rightLabel: 'I feel diminished by their success',
    ranges: [
      { min: 0, max: 25, realms: { zenith: 2, oasis: 1 } },
      { min: 26, max: 50, realms: { mist: 2, trace: 1 } },
      { min: 51, max: 75, realms: { cavern: 3 } },
      { min: 76, max: 100, realms: { cavern: 3, dross: 1 } }
    ]
  },

  // WORD CLOUD QUESTIONS (4)
  {
    id: 'q12',
    type: 'word_cloud',
    text: 'Which word captures your energy lately?',
    options: [
      { id: 'q12a', text: 'Simmering', realms: { ember: 3 } },
      { id: 'q12b', text: 'Drifting', realms: { trace: 2, languish: 1 } },
      { id: 'q12c', text: 'Seeking', realms: { mist: 2, cavern: 1 } },
      { id: 'q12d', text: 'Grounded', realms: { oasis: 2, zenith: 1 } },
      { id: 'q12e', text: 'Heavy', realms: { languish: 2, dross: 1 } },
      { id: 'q12f', text: 'Watchful', realms: { abyss: 3 } }
    ]
  },
  {
    id: 'q13',
    type: 'word_cloud',
    text: 'Which of these feels most familiar right now?',
    options: [
      { id: 'q13a', text: 'Restless', realms: { ember: 2, mist: 1 } },
      { id: 'q13b', text: 'Tender', realms: { oasis: 2, trace: 1 } },
      { id: 'q13c', text: 'Guarded', realms: { glare: 3 } },
      { id: 'q13d', text: 'Foggy', realms: { mist: 2, languish: 1 } },
      { id: 'q13e', text: 'Determined', realms: { zenith: 2, ember: 1 } },
      { id: 'q13f', text: 'Hollow', realms: { dross: 2, abyss: 1 } }
    ]
  },
  {
    id: 'q14',
    type: 'word_cloud',
    text: 'What texture describes your inner world?',
    options: [
      { id: 'q14a', text: 'Sharp edges', realms: { ember: 3 } },
      { id: 'q14b', text: 'Soft and worn', realms: { trace: 2, languish: 1 } },
      { id: 'q14c', text: 'Tangled threads', realms: { mist: 2, cavern: 1 } },
      { id: 'q14d', text: 'Warm and smooth', realms: { oasis: 3 } },
      { id: 'q14e', text: 'Cold and still', realms: { languish: 2, abyss: 1 } },
      { id: 'q14f', text: 'Solid and clear', realms: { zenith: 3 } }
    ]
  },
  {
    id: 'q15',
    type: 'word_cloud',
    text: 'When you close your eyes, what color do you see?',
    options: [
      { id: 'q15a', text: 'Deep purple or black', realms: { abyss: 3 } },
      { id: 'q15b', text: 'Fiery orange or red', realms: { ember: 3 } },
      { id: 'q15c', text: 'Soft blue or grey', realms: { languish: 2, mist: 1 } },
      { id: 'q15d', text: 'Warm gold or yellow', realms: { zenith: 2, oasis: 1 } },
      { id: 'q15e', text: 'Dusty rose or pink', realms: { trace: 3 } },
      { id: 'q15f', text: 'Fresh green or teal', realms: { oasis: 2, mist: 1 } }
    ]
  },

  // REFLECTION QUESTIONS (6)
  {
    id: 'q16',
    type: 'reflection',
    text: 'In your quiet moments lately, where does your mind tend to wander?',
    options: [
      { id: 'q16a', text: 'To things I wish I\'d said or done differently', realms: { trace: 3 } },
      { id: 'q16b', text: 'To worries about what might happen next', realms: { abyss: 3 } },
      { id: 'q16c', text: 'To people who frustrate or disappoint me', realms: { ember: 2, cavern: 2 } },
      { id: 'q16d', text: 'To things I\'m grateful for or looking forward to', realms: { oasis: 3 } },
      { id: 'q16e', text: 'Honestly, I try not to let it wander much', realms: { dross: 2, glare: 1 } }
    ]
  },
  {
    id: 'q17',
    type: 'reflection',
    text: 'When you think about who you are, you most often feel...',
    options: [
      { id: 'q17a', text: 'Proud of how far I\'ve come', realms: { zenith: 3 } },
      { id: 'q17b', text: 'Uncertain, still figuring it out', realms: { mist: 2, trace: 1 } },
      { id: 'q17c', text: 'Critical of my flaws', realms: { dross: 3 } },
      { id: 'q17d', text: 'Disconnected from myself', realms: { languish: 3 } },
      { id: 'q17e', text: 'Protective, like I need to guard myself', realms: { cavern: 2, glare: 1 } }
    ]
  },
  {
    id: 'q18',
    type: 'reflection',
    text: 'What do you need most right now?',
    options: [
      { id: 'q18a', text: 'To feel safe and held', realms: { abyss: 2, oasis: 2 } },
      { id: 'q18b', text: 'To be seen and understood', realms: { trace: 2, glare: 1 } },
      { id: 'q18c', text: 'To release what I\'m holding', realms: { ember: 2, languish: 1 } },
      { id: 'q18d', text: 'To find clarity and direction', realms: { mist: 3 } },
      { id: 'q18e', text: 'To feel proud of myself', realms: { zenith: 2, dross: 1 } },
      { id: 'q18f', text: 'To reconnect with what matters', realms: { trace: 2, oasis: 1 } }
    ]
  },
  {
    id: 'q19',
    type: 'reflection',
    text: 'When you think about your future, what feeling arises?',
    options: [
      { id: 'q19a', text: 'Excitement about possibilities ahead', realms: { zenith: 3, oasis: 1 } },
      { id: 'q19b', text: 'Determined to prove myself', realms: { ember: 2, zenith: 2 } },
      { id: 'q19c', text: 'Nostalgic for how things used to be', realms: { trace: 3, languish: 1 } },
      { id: 'q19d', text: 'Anxious that I\'ll fall short', realms: { cavern: 2, dross: 2 } },
      { id: 'q19e', text: 'Hopeful but uncertain', realms: { oasis: 2, mist: 2 } }
    ]
  },
  {
    id: 'q20',
    type: 'reflection',
    text: 'What makes you feel most alive?',
    options: [
      { id: 'q20a', text: 'Achieving something I worked hard for', realms: { zenith: 3, ember: 1 } },
      { id: 'q20b', text: 'Deep connection with someone I trust', realms: { oasis: 3, trace: 1 } },
      { id: 'q20c', text: 'Memories of when I felt truly myself', realms: { trace: 3, oasis: 1 } },
      { id: 'q20d', text: 'Fighting for what I believe in', realms: { ember: 3, zenith: 1 } },
      { id: 'q20e', text: 'Exploring new ideas or perspectives', realms: { mist: 2, zenith: 2 } }
    ]
  },
  {
    id: 'q21',
    type: 'scenario',
    text: 'You accomplish something significant but receive little recognition. How do you respond?',
    options: [
      { id: 'q21a', text: 'I\'m satisfied knowing I did it well', realms: { zenith: 3, oasis: 1 } },
      { id: 'q21b', text: 'Frustrated that my effort went unseen', realms: { ember: 3, cavern: 1 } },
      { id: 'q21c', text: 'Questioning if it was even worth doing', realms: { dross: 2, languish: 2 } },
      { id: 'q21d', text: 'Wishing I could share it with someone who\'d understand', realms: { trace: 3, oasis: 1 } },
      { id: 'q21e', text: 'Wondering what I could have done better', realms: { mist: 2, cavern: 2 } }
    ]
  },
  {
    id: 'q22',
    type: 'scenario',
    text: 'When you make a mistake that affects others, what happens internally?',
    options: [
      { id: 'q22a', text: 'Anger at myself for being careless', realms: { dross: 2, ember: 2 } },
      { id: 'q22b', text: 'Shame that spirals into self-critique', realms: { dross: 2, glare: 2 } },
      { id: 'q22c', text: 'Frustration mixed with uncertainty', realms: { ember: 2, mist: 2 } },
      { id: 'q22d', text: 'A heavy sense of not being good enough', realms: { dross: 2, languish: 2 } },
      { id: 'q22e', text: 'Drive to immediately fix it and prove myself', realms: { ember: 2, zenith: 2 } }
    ]
  },
  {
    id: 'q23',
    type: 'reflection',
    text: 'When you feel inadequate in social situations, what layer feels strongest?',
    options: [
      { id: 'q23a', text: 'Fear of being judged for who I am', realms: { glare: 2, dross: 2 } },
      { id: 'q23b', text: 'Confusion about how to be "normal"', realms: { glare: 2, mist: 2 } },
      { id: 'q23c', text: 'Grief over not fitting in', realms: { glare: 2, languish: 2 } },
      { id: 'q23d', text: 'Determination to prove I belong', realms: { glare: 2, zenith: 2 } },
      { id: 'q23e', text: 'Envy of those who seem comfortable', realms: { glare: 2, cavern: 2 } }
    ]
  },
  {
    id: 'q24',
    type: 'scenario',
    text: 'You achieve something you\'re proud of, but someone else achieves more. How do you feel?',
    options: [
      { id: 'q24a', text: 'Still proud, but a sting of "why them?"', realms: { zenith: 2, cavern: 2 } },
      { id: 'q24b', text: 'Suddenly questioning if mine matters', realms: { cavern: 2, glare: 2 } },
      { id: 'q24c', text: 'Wistful for the recognition they received', realms: { cavern: 2, trace: 2 } },
      { id: 'q24d', text: 'Genuinely happy for both of us', realms: { zenith: 2, oasis: 2 } },
      { id: 'q24e', text: 'Confused about my own reaction', realms: { cavern: 2, mist: 2 } }
    ]
  },
  {
    id: 'q25',
    type: 'scenario',
    text: 'Something you feared would happen actually happens. Your immediate response is...',
    options: [
      { id: 'q25a', text: 'Frustration - "I knew this would happen!"', realms: { abyss: 2, ember: 2 } },
      { id: 'q25b', text: 'Resigned sadness, like giving up', realms: { abyss: 2, languish: 2 } },
      { id: 'q25c', text: 'Panic about what comes next', realms: { abyss: 3 } },
      { id: 'q25d', text: 'Shame for not preventing it', realms: { abyss: 2, glare: 2 } },
      { id: 'q25e', text: 'Determined to handle it despite the fear', realms: { abyss: 2, zenith: 2 } }
    ]
  },
  {
    id: 'q26',
    type: 'reflection',
    text: 'When you think about past versions of yourself, what emotion emerges?',
    options: [
      { id: 'q26a', text: 'Longing mixed with gratitude', realms: { trace: 2, oasis: 2 } },
      { id: 'q26b', text: 'Anger at what I lost or gave up', realms: { trace: 2, ember: 2 } },
      { id: 'q26c', text: 'Sadness for who I used to be', realms: { trace: 2, languish: 2 } },
      { id: 'q26d', text: 'Shame about my past choices', realms: { trace: 2, glare: 2 } },
      { id: 'q26e', text: 'Curiosity about how I\'ve changed', realms: { trace: 2, mist: 2 } }
    ]
  },
  {
    id: 'q27',
    type: 'reflection',
    text: 'Across different parts of your life right now, what mix of feelings are you carrying?',
    options: [
      { id: 'q27a', text: 'Worried about some things, but genuinely grateful for others', realms: { abyss: 2, oasis: 2 } },
      { id: 'q27b', text: 'Frustrated with certain situations, yet joyful about what I have', realms: { ember: 2, oasis: 2 } },
      { id: 'q27c', text: 'Longing for the past while appreciating the present', realms: { trace: 2, oasis: 2 } },
      { id: 'q27d', text: 'Anxious and angry, but trying to find moments of peace', realms: { abyss: 2, ember: 2 } },
      { id: 'q27e', text: 'Sad about loss, but also fighting for what remains', realms: { languish: 2, ember: 2 } }
    ]
  },
  {
    id: 'q28',
    type: 'scenario',
    text: 'When multiple things go wrong at once, where do you land?',
    options: [
      { id: 'q28a', text: 'Anxious it\'ll get worse, angry it happened, exhausted by it all', realms: { abyss: 2, ember: 2, languish: 1 } },
      { id: 'q28b', text: 'Ashamed of my reaction, disgusted with myself, confused about who I am', realms: { glare: 2, dross: 2, mist: 1 } },
      { id: 'q28c', text: 'Envious of those unbothered, ashamed of my weakness, lost in uncertainty', realms: { cavern: 2, glare: 2, mist: 1 } },
      { id: 'q28d', text: 'Frustrated, disappointed in myself, but still determined to fix it', realms: { ember: 2, dross: 1, zenith: 2 } },
      { id: 'q28e', text: 'Overwhelmed, sad, but somehow still present', realms: { languish: 2, oasis: 1, mist: 2 } }
    ]
  },
  {
    id: 'q29',
    type: 'reflection',
    text: 'When you want something but don\'t know how to get it, what dominates?',
    options: [
      { id: 'q29a', text: 'Envious of those who have it, nostalgic for when I did, but determined to reclaim it', realms: { cavern: 2, trace: 1, zenith: 2 } },
      { id: 'q29b', text: 'Comparing myself unfavorably, worried I\'ll be judged, but pushing forward anyway', realms: { cavern: 2, glare: 1, zenith: 2 } },
      { id: 'q29c', text: 'Frustrated with myself, angry at obstacles, unsure of my next move', realms: { dross: 2, ember: 2, mist: 1 } },
      { id: 'q29d', text: 'Longing for clarity, confused about my path, but hopeful', realms: { trace: 2, mist: 2, oasis: 1 } },
      { id: 'q29e', text: 'Angry at myself for not knowing, but driven to figure it out', realms: { ember: 2, dross: 1, zenith: 2 } }
    ]
  },
  {
    id: 'q30',
    type: 'scenario',
    text: 'When you\'re disappointed in yourself, what also shows up?',
    options: [
      { id: 'q30a', text: 'Self-disgust fuels my determination to prove myself', realms: { dross: 2, ember: 1, zenith: 2 } },
      { id: 'q30b', text: 'Anger at myself, but also gratitude for what I still have', realms: { ember: 2, dross: 1, oasis: 2 } },
      { id: 'q30c', text: 'Fear I\'ll fail again, frustration, but also appreciation for my support system', realms: { abyss: 2, ember: 2, oasis: 2 } },
      { id: 'q30d', text: 'Exhausted by trying, angry it happened, yet still finding small joys', realms: { languish: 2, ember: 2, oasis: 1 } },
      { id: 'q30e', text: 'Shame about my flaws, but warmth toward those who accept me anyway', realms: { glare: 2, oasis: 2, trace: 1 } }
    ]
  }
];

export default questions;
