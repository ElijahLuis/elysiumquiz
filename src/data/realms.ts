import type { RealmKey, RealmInfo } from './types';

export const realms: Record<RealmKey, RealmInfo> = {
  abyss: {
    id: 'abyss',
    name: 'Abyss',
    color: '#bf9dff',
    quote: 'Depths etched by fear, helplessness and panic.',
    coreEmotions: ['fear', 'helplessness', 'panic', 'emptiness', 'hopelessness'],
    tone: 'dark and suffocating',
    lore: 'Abyss is the place where the bottom drops out from within. It is the echo of panic, the paralysis of helplessness, and the void left by long-forgotten hope. In this realm, the world feels unsafe and your place in it precarious. Fear is not a passing visitor but a constant companion, whispering that danger lurks in every shadow. Those who find themselves in Abyss often carry deep wounds from experiences where they felt truly helpless—moments when their agency was stripped away, leaving only the raw ache of vulnerability and the suffocating weight of powerlessness.'
  },
  cavern: {
    id: 'cavern',
    name: 'Cavern',
    color: '#9ef2e3',
    quote: 'Twisting tunnels of jealousy and contempt.',
    coreEmotions: ['envy', 'jealousy', 'obsession', 'resentment', 'contempt'],
    tone: 'echoing and obsessive',
    lore: 'Cavern is where admiration decays into obsession, and where bitterness clings to the walls like moss. Every comparison echoes endlessly through the chambers of the mind. In Cavern, you measure yourself against others and always come up short. The success of others becomes a mirror reflecting your perceived lack, and the obsessive comparison becomes inescapable. This realm thrives on the painful awareness of what others possess—their achievements, their ease, their grace—while you seem forever outside looking in. Resentment builds in these tunnels, layer upon layer, until it becomes the very air you breathe.'
  },
  dross: {
    id: 'dross',
    name: 'Dross',
    color: '#f0c9b3',
    quote: 'A wasteland steeped in revulsion and self-loathing.',
    coreEmotions: ['disgust', 'revulsion', 'self-loathing', 'contamination'],
    tone: 'toxic and visceral',
    lore: 'Dross is the rancid field where rot is visible, where even one\'s thoughts curdle. Repulsion lives here, turned inward and outward. In this realm, you turn the lens of judgment most harshly upon yourself. Your own existence feels contaminated, your thoughts feel toxic, your very being feels like a mistake. Disgust permeates everything—disgust at others, but most painfully, disgust at yourself. The body becomes a prison of revulsion, and the mind becomes the torturer. To dwell in Dross is to be simultaneously repelled by and imprisoned within yourself.'
  },
  ember: {
    id: 'ember',
    name: 'Ember',
    color: '#ffb194',
    quote: 'Fields of frustration and reckless daring.',
    coreEmotions: ['anger', 'rage', 'frustration', 'defiance', 'aggression'],
    tone: 'volatile and scorched',
    lore: 'Ember burns hot with unmet demands and bold attempts. It\'s where the furious dare to act, again and again. In this realm, energy crackles through your veins—the energy of resistance, of refusal, of the will to fight. Anger here is not subtle; it is a fire that demands to be felt and expressed. Whether channeled into passionate creation or destructive outburst, the intensity is undeniable. Those in Ember refuse to accept the world as it is; they burn against injustice, frustration, and limitation. The fire can warm or destroy, depending on its aim.'
  },
  glare: {
    id: 'glare',
    name: 'Glare',
    color: '#ffd96a',
    quote: 'A searing stage of shame and judgment.',
    coreEmotions: ['shame', 'humiliation', 'exposure', 'judgment'],
    tone: 'sharp and reflective',
    lore: 'Glare is the blistering awareness of being seen, judged, and diminished. A realm of mirrors too honest to forgive. In Glare, you are constantly on stage, constantly exposed. Every flaw feels magnified, every mistake feels permanent, and the audience feels endless. Shame thrives here—not the shame of doing something wrong, but the deeper shame of being something wrong. The harshest judge lives within you, and their verdict feels irrevocable. To exist in Glare is to feel perpetually diminished, perpetually under scrutiny, perpetually falling short of an impossible standard.'
  },
  languish: {
    id: 'languish',
    name: 'Languish',
    color: '#86bfff',
    quote: 'A cold plateau where despair and grief settle.',
    coreEmotions: ['grief', 'sadness', 'despair', 'numbness', 'isolation'],
    tone: 'still and heavy',
    lore: 'Languish is the realm of things left unsaid and undone—a landscape shaped by the weight of loss. Here, the world feels gray and still, drained of color and possibility. Grief settles like fog, making each step feel heavy and purposeless. Whether mourning a person, a time, an identity, or simply the life you thought you\'d have, Languish holds space for deep sadness. There is a numbness here too—not the absence of feeling but the exhaustion that comes when you\'ve felt too much. In Languish, you move slowly through days that blur together, each one a quiet echo of the last.'
  },
  mist: {
    id: 'mist',
    name: 'Mist',
    color: '#cfe8f8',
    quote: 'A labyrinth of curiosity and doubt.',
    coreEmotions: ['confusion', 'curiosity', 'wonder', 'doubt', 'awe'],
    tone: 'dreamlike and elusive',
    lore: 'Mist veils the world in what-ifs and questions. Every step is fogged with multiple meanings. In this realm, nothing is certain, and perhaps nothing needs to be. Mist is the realm of suspended understanding, where curiosity coexists with doubt, where wonder lives alongside confusion. You cannot see clearly, but that uncertainty also contains possibility. Multiple truths seem equally valid; multiple paths seem equally viable. To dwell in Mist is to exist in creative limbo—neither lost nor found, neither settled nor restless, but somewhere in the fertile space between knowing and not knowing.'
  },
  oasis: {
    id: 'oasis',
    name: 'Oasis',
    color: '#76ffe5',
    quote: 'A refuge of belonging and grateful joy.',
    coreEmotions: ['joy', 'love', 'peace', 'gratitude', 'belonging'],
    tone: 'soothing and nurturing',
    lore: 'Oasis is the sanctuary where the heart exhales. Every breeze is a welcome, every ripple a reunion. In this realm, you are home—whether in a place, in a relationship, in yourself, or in all three. There is a profound sense of belonging and acceptance here. Love flows freely, both given and received. Joy is not forced or manufactured; it arises naturally from the simple grace of connection and peace. To dwell in Oasis is to experience the world as fundamentally safe and welcoming, and yourself as fundamentally worthy of that welcome.'
  },
  trace: {
    id: 'trace',
    name: 'Trace',
    color: '#ffa3c0',
    quote: 'Trails of nostalgia and yearning.',
    coreEmotions: ['nostalgia', 'yearning', 'longing', 'regret', 'sentimentality'],
    tone: 'wistful and drifting',
    lore: 'Trace remembers everything. It keeps echoes of the past alive, soft and sorrowful, just out of reach. In this realm, the past is not truly past; it haunts the present like a beloved ghost. There is a sweetness to the longing here, a tenderness to the regret. You might mourn not only what was lost but who you were in those moments now gone. Nostalgia can feel both like returning home and like exile from home. To dwell in Trace is to live suspended between what was and what might have been, forever reaching back toward moments that shaped you.'
  },
  zenith: {
    id: 'zenith',
    name: 'Zenith',
    color: '#ffeba3',
    quote: 'The summit of empowerment and pride.',
    coreEmotions: ['pride', 'confidence', 'empowerment', 'liberation', 'acceptance'],
    tone: 'clear and affirming',
    lore: 'Zenith is where identity aligns and the soul stands upright. Strength without cruelty. Truth without apology. In this realm, you know who you are and you stand firmly in that knowledge. There is a clarity here—not the false certainty of rigidity, but the grounded confidence of self-knowledge. Pride is not arrogance but the earned respect for your own journey and choices. You feel empowered not by dominating others but by knowing your own worth and boundaries. To dwell in Zenith is to experience yourself as fundamentally capable, fundamentally worthy, and fundamentally free to become more.'
  }
};

export const realmKeys: RealmKey[] = [
  'abyss', 'cavern', 'dross', 'ember', 'glare',
  'languish', 'mist', 'oasis', 'trace', 'zenith'
];
