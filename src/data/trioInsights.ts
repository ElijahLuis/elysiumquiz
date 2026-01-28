import type { RealmKey } from './types';

export interface TrioInsight {
  title: string;
  insight: string;
  strengths: string[];
  challenges: string[];
}

// Generate a sorted key from three realms for consistent lookup
export function getTrioKey(realms: [RealmKey, RealmKey, RealmKey]): string {
  return [...realms].sort().join('-');
}

// All 120 unique trio combinations with titles and insights
export const trioInsights: Record<string, TrioInsight> = {
  'abyss-cavern-dross': {
    title: 'The Poisoned Depths',
    insight: 'Fear and envy twist together with self-rejection, creating a landscape where you may feel both threatened by others\' success and disgusted with your own perceived failures. This trio often emerges when external pressures combine with harsh internal criticism. Recognizing that the fear you feel is valid, while the self-disgust is a distortion, can be the first step toward gentler self-understanding.',
    strengths: ['Self-awareness of your patterns', 'Motivation to understand others\' perspectives', 'Ability to identify what needs to change'],
    challenges: ['Harsh self-judgment that stalls progress', 'Difficulty celebrating any personal wins', 'Tendency to spiral into comparison loops']
  },
  'abyss-cavern-ember': {
    title: 'The Siege Within',
    insight: 'When fear meets envy and anger, you may feel simultaneously trapped, overlooked, and furious about it. This volatile combination often manifests when you perceive threats to your place in the world while watching others seemingly thrive effortlessly. Your anger can be a source of energy for change, but only when channeled with awareness of the fear beneath it.',
    strengths: ['Powerful drive to prove yourself', 'Ability to recognize injustice quickly', 'Fire to fuel transformative action'],
    challenges: ['Risk of explosive outbursts when triggered', 'Difficulty trusting others\' intentions', 'Burnout from constant vigilance']
  },
  'abyss-cavern-glare': {
    title: 'The Exposed Wound',
    insight: 'Fear, envy, and shame create a painful awareness of perceived inadequacy. You might feel terrified of being seen while simultaneously craving what others have. This trio often emerges from experiences of feeling "less than" in formative relationships. Understanding that shame lies to you about your worth can begin to loosen its grip.',
    strengths: ['Deep empathy for others\' suffering', 'Motivation to improve and grow', 'Awareness of social dynamics'],
    challenges: ['Paralysis from fear of judgment', 'Constant self-monitoring in social situations', 'Difficulty accepting compliments or recognition']
  },
  'abyss-cavern-languish': {
    title: 'The Envious Void',
    insight: 'When fear meets envy and grief, you may feel both paralyzed and painfully aware of what you believe you lack. This landscape often emerges during periods of loss when you see others maintaining what you\'ve lost. The heaviness you carry is real, and comparing your grief to others\' apparent wholeness only deepens the wound.',
    strengths: ['Capacity for deep emotional insight', 'Ability to connect with others\' pain', 'Motivation to seek healing and resolution'],
    challenges: ['Tendency to withdraw or isolate', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in comparison']
  },
  'abyss-cavern-mist': {
    title: 'The Bewildered Craving',
    insight: 'Fear, envy, and confusion swirl together when you feel threatened yet drawn to something you don\'t fully understand. You might find yourself fixated on others while unsure why they captivate you so completely. This trio invites curiosity about what you truly need versus what you\'ve been taught to want.',
    strengths: ['Open-mindedness to explore new possibilities', 'Ability to adapt to changing circumstances', 'Capacity for curiosity and wonder'],
    challenges: ['Difficulty in discerning true desires', 'Tendency to feel lost or directionless', 'Risk of becoming overwhelmed by options']
  },
  'abyss-cavern-oasis': {
    title: 'The Jealous Haven',
    insight: 'Even amid genuine connection and love, fear and envy can create a protective vigilance—watching for threats to your happiness, comparing your relationships to others\'. This trio often appears in those who have experienced loss or abandonment. Your capacity for joy is real; so is your need for reassurance that it won\'t be taken away.',
    strengths: ['Deep capacity for loyalty and devotion', 'Ability to cherish and protect what matters', 'Wisdom about relationships from hard experience'],
    challenges: ['Hypervigilance that exhausts relationships', 'Difficulty trusting that good things can last', 'Risk of pushing loved ones away through testing']
  },
  'abyss-cavern-trace': {
    title: 'The Longing Beneath Fear',
    insight: 'Fear and envy colored by nostalgia create a yearning for a safety you may have never fully known. You might idealize past connections while fearing future ones, comparing present relationships to gilded memories. This trio invites you to grieve what was while remaining open to what could be.',
    strengths: ['Ability to learn from the past', 'Capacity for deep emotional connections', 'Motivation to create a safer, more fulfilling future'],
    challenges: ['Tendency to dwell on past mistakes or losses', 'Difficulty in letting go of what no longer serves you', 'Risk of nostalgia becoming a barrier to present joy']
  },
  'abyss-cavern-zenith': {
    title: 'The Envious Summit',
    insight: 'Pride and confidence shadowed by fear and envy can create a driven but anxious relationship with achievement. Success feels both essential and never quite enough as you scan for threats and competitors. This trio often pushes toward accomplishment while making rest feel dangerous.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'abyss-dross-ember': {
    title: 'The Revulsive Fury',
    insight: 'Fear, self-disgust, and anger create an internal landscape of threat both outside and within. You may feel simultaneously attacked by the world and repulsed by yourself, with rage as the only release valve. This trio often emerges from environments where vulnerability was punished. Your anger may be protecting a deeper tenderness that needs acknowledgment.',
    strengths: ['Intense passion and energy', 'Ability to confront injustice', 'Capacity for deep emotional experiences'],
    challenges: ['Risk of destructive outbursts', 'Difficulty in regulating emotional responses', 'Tendency to internalize anger as self-hatred']
  },
  'abyss-dross-glare': {
    title: 'The Loathing Spotlight',
    insight: 'Fear, self-disgust, and shame form a triumvirate of self-rejection. You might feel terrified of exposure while convinced that what would be seen is fundamentally flawed. This trio often forms through repeated experiences of rejection or criticism. The gentleness you\'d offer a friend is exactly what you need to offer yourself.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'abyss-dross-languish': {
    title: 'The Sickened Sorrow',
    insight: 'When fear meets self-loathing and grief, existence itself can feel unbearable. This heavy landscape often emerges during depression or after trauma, when the energy to fight seems depleted. These feelings, while overwhelming, are symptoms of a wounded self that deserves care, not further criticism.',
    strengths: ['Deep well of emotional resilience', 'Capacity to understand and process complex feelings', 'Ability to support others through their struggles'],
    challenges: ['Tendency to become overwhelmed by negative emotions', 'Difficulty in seeing a way forward', 'Risk of prolonged periods of inactivity or withdrawal']
  },
  'abyss-dross-mist': {
    title: 'The Nauseating Unknown',
    insight: 'Fear, self-disgust, and confusion create a disorienting internal experience where you can\'t trust the world or yourself. You might feel lost in uncertainty while convinced of your own inadequacy. This trio often appears when core beliefs about yourself have been shaken. The confusion can be an opening to question old, harsh narratives.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'abyss-dross-oasis': {
    title: 'The Tainted Sanctuary',
    insight: 'Even genuine moments of love and connection can feel threatened when fear and self-disgust lurk beneath. You might experience joy while waiting for the other shoe to drop, or feel undeserving of the good in your life. This trio reminds you that you can hold both—the peace is real, even when the fear visits.',
    strengths: ['Deep capacity for experiencing love and joy', 'Ability to find moments of peace amid chaos', 'Wisdom in recognizing the transient nature of emotions'],
    challenges: ['Hypervigilance that disrupts relaxation', 'Difficulty in trusting positive experiences', 'Risk of self-sabotage in relationships']
  },
  'abyss-dross-trace': {
    title: 'The Tainted Memory',
    insight: 'Fear and self-loathing can color even cherished memories with doubt. Nostalgia might feel unsafe when you remember who you were with disgust, yet still long for the feelings you\'ve lost. This trio invites compassion for all the versions of yourself who have struggled to feel enough.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'abyss-dross-zenith': {
    title: 'The Imposter\'s Peak',
    insight: 'Confidence undermined by fear and self-disgust creates the classic experience of "imposter syndrome"—achieving while convinced of your own unworthiness. You may feel simultaneously proud and terrified of being exposed. This trio is common among high achievers who learned that love was conditional on performance.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'abyss-ember-glare': {
    title: 'The Humiliated Rage',
    insight: 'Fear, anger, and shame create a volatile mix of fighting back while dreading the consequences. You might lash out and then immediately cringe, or suppress rage out of fear of what it reveals. This trio often emerges when expressing anger was dangerous in your past. Your fire has wisdom if you can learn to wield it safely.',
    strengths: ['Intense passion and energy', 'Ability to protect yourself and others', 'Capacity for deep emotional experiences'],
    challenges: ['Risk of explosive outbursts', 'Difficulty in regulating emotional responses', 'Tendency to internalize anger as self-hatred']
  },
  'abyss-ember-languish': {
    title: 'The Exhausted Fighter',
    insight: 'Fear, anger, and grief combine in those who\'ve had to fight for too long. You may feel the urge to resist while lacking the energy, oscillating between fury at your circumstances and profound weariness. This trio often needs rest before anything else—permission to stop fighting temporarily.',
    strengths: ['Remarkable resilience and endurance', 'Capacity to understand and process complex feelings', 'Ability to support others through their struggles'],
    challenges: ['Tendency to become overwhelmed by negative emotions', 'Difficulty in seeing a way forward', 'Risk of prolonged periods of inactivity or withdrawal']
  },
  'abyss-ember-mist': {
    title: 'The Bewildered Fury',
    insight: 'Fear, anger, and confusion create an alertness without clear direction. You might feel threatened but uncertain where the danger lies, frustrated by your own disorientation. This trio often appears during major life transitions when old certainties dissolve. The anger can energize your search for clarity.',
    strengths: ['Ability to adapt to new situations', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'abyss-ember-oasis': {
    title: 'The Fierce Refuge',
    insight: 'Love guarded by fear and defended by anger creates fierce protectiveness over what matters most. You may experience deep connection alongside hypervigilance about threats to it. This trio often appears in those who\'ve had to fight for their peace. Your protectiveness honors what you\'ve built.',
    strengths: ['Deep capacity for love and connection', 'Ability to protect and defend what matters', 'Wisdom in recognizing the need for boundaries'],
    challenges: ['Hypervigilance that disrupts relaxation', 'Difficulty in trusting that positive experiences will last', 'Risk of pushing loved ones away through testing']
  },
  'abyss-ember-trace': {
    title: 'The Wounded Warrior',
    insight: 'Fear and anger colored by longing create a defensive posture toward a past you can\'t return to. You might feel furious about what was lost while terrified of losing more. This trio often emerges after significant life changes. The nostalgia points to what you valued; the anger to what was taken.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'abyss-ember-zenith': {
    title: 'The Defiant Fortress',
    insight: 'Confidence fueled by fear and anger creates powerful motivation alongside constant vigilance. You may achieve greatly while scanning for threats and ready to fight. This trio often characterizes those who\'ve had to prove themselves against adversity. Your strength is real, even when it exhausts you.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'abyss-glare-languish': {
    title: 'The Hidden Mourner',
    insight: 'Fear, shame, and grief create a profound desire to withdraw from a world that feels both threatening and disappointing. You might hide not from rejection but from the exhaustion of performing normalcy. This trio needs gentleness and small, safe connections rather than pressure to engage.',
    strengths: ['Capacity for deep emotional insight', 'Ability to connect with others\' pain', 'Motivation to seek healing and resolution'],
    challenges: ['Tendency to withdraw or isolate', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in comparison']
  },
  'abyss-glare-mist': {
    title: 'The Bewildered Shame',
    insight: 'Fear, shame, and confusion create anxiety about being seen when you\'re not even sure who you are. You might dread judgment while questioning whether your self-perception is accurate. This trio often appears during identity transitions. The uncertainty can become an invitation to explore without fixed expectations.',
    strengths: ['Open-mindedness to explore new possibilities', 'Ability to adapt to changing circumstances', 'Capacity for curiosity and wonder'],
    challenges: ['Difficulty in discerning true desires', 'Tendency to feel lost or directionless', 'Risk of becoming overwhelmed by options']
  },
  'abyss-glare-oasis': {
    title: 'The Unworthy Blessing',
    insight: 'Joy and gratitude shadowed by fear and shame create a complex relationship with happiness. You might feel deeply loved while terrified of losing it, or grateful while convinced you don\'t deserve it. This trio reminds you that receiving love is a skill that can be practiced.',
    strengths: ['Deep capacity for love and gratitude', 'Ability to find joy even in difficult circumstances', 'Wisdom in recognizing the transient nature of emotions'],
    challenges: ['Tendency to dismiss or downplay positive experiences', 'Difficulty in accepting compliments or positive feedback', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'abyss-glare-trace': {
    title: 'The Haunted Memory',
    insight: 'Fear, shame, and nostalgia create a painful relationship with your past—longing for it while dreading the memories of who you were. You might miss former times while cringing at remembered mistakes. Compassion for your past self can transform shame into wisdom.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'abyss-glare-zenith': {
    title: 'The Flinching Victor',
    insight: 'Confidence undermined by fear and shame creates success that never feels fully earned. You might achieve publicly while privately dreading that each accomplishment will reveal your flaws. This trio benefits from separating self-worth from achievement.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'abyss-languish-mist': {
    title: 'The Wandering Despair',
    insight: 'Fear, grief, and confusion create a state of profound disorientation. You might feel lost in sorrow without understanding its source, or frightened without knowing of what. This trio often appears during transitional grief or existential questioning. Sometimes not knowing is part of the process.',
    strengths: ['Capacity for deep emotional insight', 'Ability to connect with others\' pain', 'Motivation to seek healing and resolution'],
    challenges: ['Tendency to withdraw or isolate', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in comparison']
  },
  'abyss-languish-oasis': {
    title: 'The Fragile Solace',
    insight: 'Love and grief walk together when you\'ve lost something precious. Fear shadows even peaceful moments with awareness of impermanence. This trio often appears in those who love deeply and have experienced loss. The fear honors what you have; the grief, what you\'ve lost.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'abyss-languish-trace': {
    title: 'The Aching Memory',
    insight: 'Fear, grief, and longing create a painful pull toward a past that can\'t return. You might yearn for former times while dreading the pain of remembering. This trio appears in prolonged mourning. The longing points to love; allow it to coexist with the grief.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'abyss-languish-zenith': {
    title: 'The Hollow Victory',
    insight: 'Confidence exists alongside fear and grief when achievement can\'t fill the emptiness. You might accomplish much while feeling that none of it matters, proud yet hollow. This trio often appears when success was expected to heal wounds it can\'t reach.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'abyss-mist-oasis': {
    title: 'The Cautious Wonder',
    insight: 'Joy and curiosity tempered by fear create an approach to life that\'s both open and watchful. You might feel genuine happiness while maintaining vigilance, curious about the world yet careful in it. This trio balances appreciation with appropriate caution.',
    strengths: ['Ability to find joy and wonder in the world', 'Capacity for curiosity and exploration', 'Wisdom in recognizing potential risks'],
    challenges: ['Tendency to second-guess positive impulses', 'Difficulty in trusting that good things can last', 'Risk of missing opportunities due to caution']
  },
  'abyss-mist-trace': {
    title: 'The Anxious Reverie',
    insight: 'Fear, curiosity, and longing combine in a restless search for something you can\'t quite name. You might be drawn to explore while anxious about what you\'ll find, nostalgic for a certainty you may have never had. This trio often drives spiritual or creative seeking.',
    strengths: ['Open-mindedness to explore new possibilities', 'Ability to adapt to changing circumstances', 'Capacity for curiosity and wonder'],
    challenges: ['Difficulty in discerning true desires', 'Tendency to feel lost or directionless', 'Risk of becoming overwhelmed by options']
  },
  'abyss-mist-zenith': {
    title: 'The Bewildered Confidence',
    insight: 'Confidence alongside fear and confusion creates the experience of being capable yet unsure. You might trust your abilities while uncertain of your direction, strong yet searching. This trio often appears at career crossroads or after achieving previous goals.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'abyss-oasis-trace': {
    title: 'The Anxious Tenderness',
    insight: 'Love, longing, and fear interweave when you cherish deeply and dread loss. You might hold precious connections while mourning their inevitable impermanence, grateful yet watchful. This trio reminds you that love isn\'t diminished by wanting.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'abyss-oasis-zenith': {
    title: 'The Guarded Triumph',
    insight: 'Confidence, love, and fear create a life well-built yet anxiously guarded. You might feel proud of what you\'ve created while scanning for threats to it. This trio often appears in those who\'ve worked hard for their happiness and know its fragility.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'abyss-trace-zenith': {
    title: 'The Wary Legacy',
    insight: 'Confidence and longing shadowed by fear create complex ambitions colored by the past. You might strive toward goals that echo former dreams while anxious about their attainment. This trio often drives meaningful work rooted in personal history.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'cavern-dross-ember': {
    title: 'The Resentful Blaze',
    insight: 'Envy, self-disgust, and anger create a painful comparison trap where others\' success fuels both outward resentment and inward criticism. You might rage at unfairness while feeling unworthy of better. This trio often emerges when external achievements are used to measure self-worth.',
    strengths: ['Ability to inspire others with genuine passion', 'Deep commitment to people and causes', 'Capacity to create meaningful, intense bonds'],
    challenges: ['Tendency to idealize or devalue relationships', 'Difficulty maintaining balance in investments', 'Risk of codependency or enmeshment']
  },
  'cavern-dross-glare': {
    title: 'The Covetous Shame',
    insight: 'Envy, self-disgust, and shame form a crushing awareness of perceived inadequacy. You might obsess over others\' qualities while feeling exposed in your own deficiencies. This trio benefits from recognizing that comparison is the thief of self-compassion.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'cavern-dross-languish': {
    title: 'The Withered Envy',
    insight: 'Envy, self-loathing, and grief create a heavy sense of lacking while having no energy to pursue. You might see what others have, hate yourself for wanting it, and feel too exhausted to try. This trio often needs rest before aspiration.',
    strengths: ['Deep well of emotional resilience', 'Capacity to understand and process complex feelings', 'Ability to support others through their struggles'],
    challenges: ['Tendency to become overwhelmed by negative emotions', 'Difficulty in seeing a way forward', 'Risk of prolonged periods of inactivity or withdrawal']
  },
  'cavern-dross-mist': {
    title: 'The Confused Comparison',
    insight: 'Envy, self-disgust, and confusion swirl when you want what others have without understanding why, and hate yourself without knowing what exactly is wrong. This trio often appears during identity exploration. The confusion can reveal that you\'re comparing yourself to projections, not realities.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'cavern-dross-oasis': {
    title: 'The Complicated Gratitude',
    insight: 'Love and gratitude alongside envy and self-disgust create conflicted feelings about your own happiness. You might feel blessed yet still compare, grateful yet still critical of yourself for wanting more. This trio invites radical acceptance of your complexity.',
    strengths: ['Deep capacity for love and gratitude', 'Ability to find joy even in difficult circumstances', 'Wisdom in recognizing the transient nature of emotions'],
    challenges: ['Tendency to dismiss or downplay positive experiences', 'Difficulty in accepting compliments or positive feedback', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'cavern-dross-trace': {
    title: 'The Corroded Memory',
    insight: 'Envy, self-loathing, and nostalgia create painful comparisons with both others and your former self. You might feel you\'ve fallen behind both peers and who you used to be. This trio needs grief for the path not taken and compassion for the one you\'re on.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'cavern-dross-zenith': {
    title: 'The Loathing Ambition',
    insight: 'Confidence undermined by envy and self-disgust creates achievement that never satisfies. You might succeed by others\' standards while feeling like a fraud who still doesn\'t measure up. This trio often fuels productive but exhausting ambition.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'cavern-ember-glare': {
    title: 'The Jealous Fury',
    insight: 'Envy, anger, and shame create rage at others\' success while dreading your own exposure. You might feel furious at unfairness while terrified of scrutiny. This trio often appears when competitiveness meets fear of judgment.',
    strengths: ['Intense passion and energy', 'Ability to protect yourself and others', 'Capacity for deep emotional experiences'],
    challenges: ['Risk of explosive outbursts', 'Difficulty in regulating emotional responses', 'Tendency to internalize anger as self-hatred']
  },
  'cavern-ember-languish': {
    title: 'The Weary Resentment',
    insight: 'Envy, anger, and grief create prolonged bitterness about what others have and you\'ve lost. You might feel too exhausted for rage yet unable to release the resentment. This trio often needs to grieve before it can forgive.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'cavern-ember-mist': {
    title: 'The Bewildered Resentment',
    insight: 'Envy, anger, and confusion create driven seeking without clear direction. You might feel intensely motivated by comparison but uncertain what you truly want for yourself. This trio can be transformed by pausing to ask: what do I actually need?',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'cavern-ember-oasis': {
    title: 'The Possessive Flame',
    insight: 'Love and passion create intense relationships where you care deeply and feel strongly about what matters. You might experience profound connection while also noticing what others have. This trio appears in those who love passionately and completely.',
    strengths: ['Ability to inspire others with genuine passion', 'Deep commitment to people and causes', 'Capacity to create meaningful, intense bonds'],
    challenges: ['Tendency to idealize or devalue relationships', 'Difficulty maintaining balance in investments', 'Risk of codependency or enmeshment']
  },
  'cavern-ember-trace': {
    title: 'The Reclaiming Fire',
    insight: 'Envy, anger, and longing create fierce motivation to recapture something lost. You might feel furious at what you once had and others still possess. This trio can fuel powerful transformation when the anger is channeled toward rebuilding.',
    strengths: ['Intense passion and energy', 'Ability to confront injustice', 'Capacity for deep emotional experiences'],
    challenges: ['Risk of destructive outbursts', 'Difficulty in regulating emotional responses', 'Tendency to internalize anger as self-hatred']
  },
  'cavern-ember-zenith': {
    title: 'The Rivalrous Blaze',
    insight: 'Confidence, envy, and anger create powerful ambition fueled by comparison. You might achieve greatly while constantly measuring against others, proud yet never quite satisfied. This trio often produces excellence alongside restlessness.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'cavern-glare-languish': {
    title: 'The Grieving Inadequacy',
    insight: 'Envy, shame, and grief create a dimmed version of desire—wanting while feeling too exposed and too tired to pursue. You might compare yourself quietly, ashamed of your own longing. This trio needs permission to want without judgment.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'cavern-glare-mist': {
    title: 'The Lost Comparist',
    insight: 'Envy, shame, and confusion create uncertainty about both what you want and whether you deserve it. You might compare yourself to others without understanding why certain things draw you. This trio invites exploration of your authentic desires.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'cavern-glare-oasis': {
    title: 'The Measuring Heart',
    insight: 'Love alongside envy and shame creates relationships colored by comparison and self-doubt. You might feel deeply connected while anxious about measuring up to your partner\'s other relationships or your own ideals. This trio thrives when you remember that love isn\'t a competition.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'cavern-glare-trace': {
    title: 'The Comparison of Ghosts',
    insight: 'Envy, shame, and nostalgia create painful comparison with both others and your past self. You might feel you\'ve fallen behind who you used to be while cringing at who you\'ve become. This trio needs compassion for your entire journey.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'cavern-glare-zenith': {
    title: 'The Measured Triumph',
    insight: 'Confidence shadowed by envy and shame creates success that requires constant validation. You might achieve to prove something while dreading that it\'s never enough. This trio often benefits from separating worth from accomplishment.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'cavern-languish-mist': {
    title: 'The Mourning Desire',
    insight: 'Envy, grief, and confusion create a weighted longing for something you can\'t quite name. You might feel the ache of comparison without energy to compete, wanting something others have but unsure what it truly is. This trio points to a need for connection more than acquisition.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'cavern-languish-oasis': {
    title: 'The Bittersweet Gratitude',
    insight: 'Love and gratitude alongside envy and grief create complex feelings about your blessings. You might appreciate what you have while mourning what you lack, comparing your journey to others\' paths. This trio thrives when you honor both the having and the wanting.',
    strengths: ['Deep capacity for love and gratitude', 'Ability to find joy even in difficult circumstances', 'Wisdom in recognizing the transient nature of emotions'],
    challenges: ['Tendency to dismiss or downplay positive experiences', 'Difficulty in accepting compliments or positive feedback', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'cavern-languish-trace': {
    title: 'The Ghosted Competition',
    insight: 'Envy, grief, and nostalgia create longing for old competitions you\'ve lost the energy for. You might miss the intensity of striving while grieving what it cost you. This trio often appears when ambition meets burnout.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'cavern-languish-zenith': {
    title: 'The Hollow Crown',
    insight: 'Confidence alongside envy and grief creates achievement that feels hollow. You might have won but lost something in the process, proud yet depleted. This trio often needs rest and reconnection with why you started.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'cavern-mist-oasis': {
    title: 'The Wondering Envy',
    insight: 'Love, curiosity, and envy create an interested fascination with others\' lives. You might genuinely care while also comparing, curious about how others achieve their happiness. This trio can become generous wisdom when observation becomes learning rather than measuring.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'cavern-mist-trace': {
    title: 'The Drifting Desire',
    insight: 'Envy, curiosity, and longing create a searching quality colored by comparison. You might seek something you\'ve seen others have, exploring possibilities while missing what\'s behind. This trio often drives creative or career exploration.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'cavern-mist-zenith': {
    title: 'The Puzzled Ambition',
    insight: 'Confidence, envy, and curiosity create driven exploration of how others succeed. You might approach comparison analytically, studying rather than simply resenting. This trio can fuel growth when it becomes research rather than rumination.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'cavern-oasis-trace': {
    title: 'The Loving Rivalry',
    insight: 'Love, longing, and envy create deep appreciation alongside awareness of what others have that you miss. You might treasure your connections while longing for qualities you see elsewhere. This trio reminds you that love isn\'t diminished by wanting.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'cavern-oasis-zenith': {
    title: 'The Ambitious Gratitude',
    insight: 'Confidence, love, and envy create satisfaction alongside continued striving. You might feel proud of what you\'ve built while still comparing, grateful yet ambitious. This trio can drive growth when grounded in appreciation.',
    strengths: ['Grounded ambition rooted in appreciation', 'Ability to celebrate progress while pursuing goals', 'Sustainable motivation without burnout'],
    challenges: ['Never feeling "done" or satisfied', 'Difficulty resting without guilt', 'Risk of always chasing what\'s next']
  },
  'cavern-trace-zenith': {
    title: 'The Yearning Victor',
    insight: 'Confidence, envy, and longing create goals shaped by the past and colored by comparison. You might strive toward futures that echo what others have or what you once had. This trio often produces meaningful work with personal roots.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'dross-ember-glare': {
    title: 'The Scorching Self-Loathing',
    insight: 'Self-disgust, anger, and shame create rage turned inward and outward simultaneously. You might hate yourself while furious at a world that seems to have made you this way. This trio often emerges from experiences of humiliation. Your anger knows something is wrong—direct it toward healing, not self-destruction.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'dross-ember-languish': {
    title: 'The Sickened Rage',
    insight: 'Self-disgust, anger, and grief create depleted rage at yourself and your circumstances. You might feel too tired for the fight yet unable to stop the internal battle. This trio often needs external compassion when self-compassion feels impossible.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'dross-ember-mist': {
    title: 'The Bewildered Revulsion',
    insight: 'Self-disgust, anger, and confusion create volatile uncertainty about who you are and why you hate it. You might feel furious at yourself without understanding what exactly is wrong. This trio invites curiosity about where these harsh judgments originated.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'dross-ember-oasis': {
    title: 'The Fierce Self-Rejection',
    insight: 'Love and connection alongside self-disgust and anger create fierce protectiveness over relationships you feel unworthy of. You might fight for love while internally convinced you don\'t deserve it. This trio shows that your capacity to love is real, regardless of what you believe about yourself.',
    strengths: ['Deep capacity for love and connection', 'Ability to protect and defend what matters', 'Wisdom in recognizing the need for boundaries'],
    challenges: ['Hypervigilance that disrupts relaxation', 'Difficulty in trusting that positive experiences will last', 'Risk of pushing loved ones away through testing']
  },
  'dross-ember-trace': {
    title: 'The Bitter Remembrance',
    insight: 'Self-disgust, anger, and longing create rage at a past self you can\'t recover and a present self you can\'t accept. You might long for who you were while hating who you\'ve become. This trio needs grief for the paths not taken and acceptance for the real one.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'dross-ember-zenith': {
    title: 'The Raging Self-Contempt',
    insight: 'Confidence alongside self-disgust and anger creates achievement fueled by the need to prove internal critics wrong. You might succeed externally while battling internally. This trio often produces remarkable results at personal cost.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'dross-glare-languish': {
    title: 'The Shamed Decay',
    insight: 'Self-disgust, shame, and grief create profound heaviness about who you are. You might feel too exposed and too repulsive to engage with life, grieving a self you may have never been. This trio needs gentle presence more than correction.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'dross-glare-mist': {
    title: 'The Lost Self-Image',
    insight: 'Self-disgust, shame, and confusion create uncertainty about who you are combined with certainty that it\'s bad. You might not know yourself but feel sure you wouldn\'t like what you\'d find. This trio invites curious exploration rather than assumed conclusions.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'dross-glare-oasis': {
    title: 'The Undeserving Loved',
    insight: 'Love and connection alongside self-disgust and shame create the painful experience of being loved while feeling unlovable. You might receive care while internally deflecting it. This trio reminds you that others may see you more clearly than you see yourself.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'dross-glare-trace': {
    title: 'The Cringing Memory',
    insight: 'Self-disgust, shame, and nostalgia create painful relationships with your past. You might long for former times while cringing at who you were in them. This trio needs compassion for all the versions of yourself who were trying their best.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'dross-glare-zenith': {
    title: 'The Successful Fraud',
    insight: 'Confidence undermined by self-disgust and shame creates the classic impostor experience. You might achieve while convinced of your unworthiness, proud in public and disgusted in private. This trio often exhausts those who can\'t reconcile external success with internal experience.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'dross-languish-mist': {
    title: 'The Bewildered Self-Loathing',
    insight: 'Self-disgust, grief, and confusion create disoriented self-hatred without clear cause. You might feel something is deeply wrong with you without understanding what. This trio often appears in depression and benefits from professional support alongside self-compassion.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'dross-languish-oasis': {
    title: 'The Tainted Solace',
    insight: 'Love alongside self-disgust and grief creates caring connections shadowed by self-rejection. You might love others deeply while treating yourself harshly, offering grace you can\'t receive. This trio asks: what if you loved yourself like you love others?',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'dross-languish-trace': {
    title: 'The Self-Exiled',
    insight: 'Self-disgust, grief, and longing create exile from a self you might have been. You might yearn for a version of yourself you feel you\'ve betrayed or lost. This trio needs mourning for the ideal self and acceptance of the real one.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'dross-languish-zenith': {
    title: 'The Sickened Triumph',
    insight: 'Confidence alongside self-disgust and grief creates success that can\'t fill the emptiness. You might achieve greatly while feeling fundamentally flawed. This trio often realizes that accomplishment can\'t heal wounds that need different medicine.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'dross-mist-oasis': {
    title: 'The Bewildered Blessing',
    insight: 'Love and curiosity alongside self-disgust create bewilderment at being cared for. You might not understand why others love you while convinced there\'s little to love. This trio invites trusting others\' perceptions alongside your own.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'dross-mist-trace': {
    title: 'The Lost Self-Seeker',
    insight: 'Self-disgust, curiosity, and longing create searching for a better version of yourself you\'re not sure exists. You might seek transformation while doubting its possibility. This trio often drives personal growth when the curiosity outweighs the criticism.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'dross-mist-zenith': {
    title: 'The Puzzled Self-Contempt',
    insight: 'Confidence alongside self-disgust and confusion creates accomplished uncertainty. You might succeed without understanding how or feeling you deserve it. This trio often benefits from connecting achievement to values rather than worth.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'dross-oasis-trace': {
    title: 'The Tainted Tenderness',
    insight: 'Love and longing alongside self-disgust create deep capacity for connection shadowed by self-rejection. You might love beautifully while believing yourself unworthy of it. This trio shows that your ability to love is not diminished by your struggle to accept yourself.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'dross-oasis-zenith': {
    title: 'The Burdened Blessing',
    insight: 'Confidence and love alongside self-disgust create lives full of good things you feel unworthy of. You might have everything yet feel fundamentally flawed. What you have is real and earned. The gap between your external success and internal experience is the work—not proving yourself further, but learning to belong to your own life.',
    strengths: ['Remarkable ability to achieve despite internal doubt', 'Deep capacity for love and connection', 'Motivation to help others avoid your pain'],
    challenges: ['Inability to internalize accomplishments or praise', 'Sabotaging relationships through self-rejection', 'Exhaustion from constantly proving worth']
  },
  'dross-trace-zenith': {
    title: 'The Haunted Success',
    insight: 'Confidence and longing alongside self-disgust create achievement colored by who you used to be and wish you weren\'t. You might succeed while unable to outrun your own harsh memories. This trio often needs integration rather than escape.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'ember-glare-languish': {
    title: 'The Humiliated Fury',
    insight: 'Anger, shame, and grief create withdrawn rage—fury that\'s too exposed and too exhausted to express. You might feel humiliated and angry while lacking energy for either fight or flight. This trio often needs validation that the anger is justified before it can rest.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'ember-glare-mist': {
    title: 'The Disoriented Fire',
    insight: 'Anger, shame, and confusion create rage without clear target. You might feel furious yet unsure why or at whom, embarrassed by emotions you don\'t understand. This trio invites curiosity about what the anger is trying to protect.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'ember-glare-oasis': {
    title: 'The Fierce Protector',
    insight: 'Love alongside anger and shame creates passionate defense of what matters, sometimes at the cost of your own exposure. You might fight for others while cringing at your own visibility. This trio shows that your protective instincts come from deep love.',
    strengths: ['Deep capacity for love and connection', 'Ability to protect and defend what matters', 'Wisdom in recognizing the need for boundaries'],
    challenges: ['Hypervigilance that disrupts relaxation', 'Difficulty in trusting that positive experiences will last', 'Risk of pushing loved ones away through testing']
  },
  'ember-glare-trace': {
    title: 'The Scorched Remembrance',
    insight: 'Anger, shame, and longing create rage at a past that still burns and embarrasses. You might yearn for different choices while furious at the ones you made, exposed by your own history. This trio needs to forgive the self who made those choices.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'ember-glare-zenith': {
    title: 'The Burning Honor',
    insight: 'Confidence alongside anger and shame creates achievements protected fiercely because you remember when they seemed impossible. You might be proud and prickly, sensitive to any hint that your accomplishments are questioned. This trio knows what it cost to get here.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'ember-languish-mist': {
    title: 'The Grieving Flame',
    insight: 'Anger, grief, and confusion create unfocused frustration without clear cause or outlet. You might feel something is wrong without knowing what, too depleted to investigate but too agitated to rest. This trio often needs permission to not have answers.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'ember-languish-oasis': {
    title: 'The Raging Serenity',
    insight: 'Love and grief alongside anger create layers of feeling about what you have and what you\'ve lost. You might appreciate your life while still furious about what it cost to build. This trio holds space for gratitude and grievance together.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'ember-languish-trace': {
    title: 'The Grieving Fury',
    insight: 'Anger, grief, and longing create fire that fuels and depletes simultaneously. You might rage at loss while yearning for return, fighting what cannot be changed. This trio often needs to move through anger toward acceptance.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'ember-languish-zenith': {
    title: 'The Triumphant Grief',
    insight: 'Confidence alongside anger and grief creates achievement shadowed by what it cost. You might have won but feel depleted, proud and furious at having had to fight so hard. This trio needs to honor both the victory and its price.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'ember-mist-oasis': {
    title: 'The Passionate Mystery',
    insight: 'Love, curiosity, and anger create intense engagement with life\'s questions. You might feel strongly about things you don\'t fully understand, passionate in your seeking. This trio often drives meaningful work when the fire is channeled into exploration and creative expression.',
    strengths: ['Ability to hold strong conviction while remaining open', 'Creative energy and innovative thinking', 'Capacity to inspire others through passionate inquiry'],
    challenges: ['Difficulty finding closure or definitive answers', 'Risk of scattered energy across too many interests', 'Potential for frustration when passion doesn\'t yield results']
  },
  'ember-mist-trace': {
    title: 'The Furious Reverie',
    insight: 'Anger, curiosity, and nostalgia create driven seeking colored by the past. You might search for something you\'ve lost without knowing exactly what, frustrated by the mystery. This trio often fuels creative or spiritual exploration.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'ember-mist-zenith': {
    title: 'The Blazing Quest',
    insight: 'Confidence alongside anger and curiosity creates powerful pursuit of unclear goals. You might feel certain you\'ll find what you\'re looking for while still searching for what that is. This trio often produces innovative work when the frustration becomes fuel.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'ember-oasis-trace': {
    title: 'The Fierce Tenderness',
    insight: 'Love, longing, and anger create passionate attachment to what matters and what\'s been lost. You might love fiercely while still mourning, protecting present connections with fire born from past losses. This trio shows that anger can be love\'s defender.',
    strengths: ['Deep capacity for love and connection', 'Ability to protect and defend what matters', 'Wisdom in recognizing the need for boundaries'],
    challenges: ['Hypervigilance that disrupts relaxation', 'Difficulty in trusting that positive experiences will last', 'Risk of pushing loved ones away through testing']
  },
  'ember-oasis-zenith': {
    title: 'The Triumphant Flame',
    insight: 'Confidence, love, and anger create lives built through fighting for what matters. You might be proud of what you\'ve created while still carrying the fire that built it. This trio often characterizes those who\'ve had to battle for their peace.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'ember-trace-zenith': {
    title: 'The Burning Legacy',
    insight: 'Confidence and longing alongside anger create ambitious drive rooted in the past. You might strive toward goals that would honor what you\'ve lost or left behind, fire and memory combined. This trio often produces meaningful work with personal roots.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'glare-languish-mist': {
    title: 'The Veiled Sorrow',
    insight: 'Shame, grief, and confusion create withdrawn uncertainty about your place in the world. You might feel too exposed and too exhausted to figure out who you are, let alone show it. This trio often needs quiet acceptance before renewed engagement.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'glare-languish-oasis': {
    title: 'The Tender Vulnerability',
    insight: 'Love alongside shame and grief creates deep connection shadowed by exposure and loss. You might care deeply while feeling too seen and too diminished. This trio shows that vulnerability, though painful, is also the pathway to intimacy.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'glare-languish-trace': {
    title: 'The Exposed Past',
    insight: 'Shame, grief, and longing create painful relationship with who you were. You might miss former times while cringing at the memories, grieving while embarrassed by the grief. This trio needs permission to mourn without judgment.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'glare-languish-zenith': {
    title: 'The Humbled Triumph',
    insight: 'Confidence alongside shame and grief creates achievement that still feels exposing. You might be proud of what you\'ve built while exhausted from constant visibility. This trio often needs privacy alongside recognition.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'glare-mist-oasis': {
    title: 'The Bashful Wonder',
    insight: 'Love and curiosity alongside shame create open-hearted exploration shadowed by self-consciousness. You might seek connection while worried about exposure, curious but cautious. This trio grows through recognizing that genuine curiosity makes you interesting, not strange.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'glare-mist-trace': {
    title: 'The Exposed Wanderer',
    insight: 'Shame, curiosity, and longing create seeking colored by self-consciousness. You might search for something while worried about how you look doing it, nostalgic for times when seeking felt less exposed. This trio often needs to prioritize the search over the appearances.',
    strengths: ['Ability to question and redefine limiting beliefs', 'Capacity for self-inquiry and exploration', 'Motivation to seek clarity and understanding'],
    challenges: ['Difficulty in trusting your own perceptions', 'Tendency to ruminate on negative thoughts', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'glare-mist-zenith': {
    title: 'The Flustered Achievement',
    insight: 'Confidence alongside shame and confusion creates capable exploration of territory that still feels exposing. You might know you\'re competent while still feeling watched and uncertain. This trio often learns that others are far less focused on you than you imagine.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'glare-oasis-trace': {
    title: 'The Blushing Memory',
    insight: 'Love and longing alongside shame create deep feeling shadowed by self-consciousness. You might connect beautifully while cringing at your own vulnerability, nostalgic for times when love felt less risky. This trio shows that your capacity for tenderness is a strength, not a weakness.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'glare-oasis-zenith': {
    title: 'The Spotlight\'s Weight',
    insight: 'Confidence and love alongside shame create full lives that still feel exposing. You might have everything you wanted while feeling constantly watched. This trio often needs to distinguish healthy visibility from old stories about exposure.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'glare-trace-zenith': {
    title: 'The Unveiled Legacy',
    insight: 'Confidence and longing alongside shame create success colored by what it took to get here. You might be proud of your accomplishments while still cringing at the journey. This trio often needs to integrate rather than hide the whole story.',
    strengths: ['Remarkable achievements despite internal struggles', 'Deep capacity for hard work and perseverance', 'Ability to inspire others with your story'],
    challenges: ['Inability to internalize success', 'Fear of exposure or being "found out"', 'Tendency to attribute success to external factors']
  },
  'languish-mist-oasis': {
    title: 'The Tender Fog',
    insight: 'Love alongside grief and confusion creates tender disorientation. You might feel deeply connected while uncertain about direction, caring while depleted. This trio often appears in caregivers and empaths who need rest alongside connection.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'languish-mist-trace': {
    title: 'The Hazy Longing',
    insight: 'Grief, confusion, and nostalgia create unclear yearning for something you can\'t quite name. You might miss something without knowing what, searching through fog. This trio often points to needs that haven\'t been articulated yet.',
    strengths: ['Capacity for self-reflection and growth', 'Ability to empathize with others\' struggles', 'Motivation to overcome personal challenges'],
    challenges: ['Tendency to hide or withdraw', 'Difficulty in accepting compliments or positive feedback', 'Risk of remaining stuck in self-criticism']
  },
  'languish-mist-zenith': {
    title: 'The Weary Bewilderment',
    insight: 'Confidence alongside grief and confusion creates capable exhaustion. You know you can do things while feeling too heavy and uncertain to start. This trio often needs rest before strategy, compassion before productivity.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'languish-oasis-trace': {
    title: 'The Melancholy Love',
    insight: 'Love, grief, and longing create bittersweet appreciation. You might cherish present connections while mourning past ones, grateful with tears. This trio holds the full truth that love and loss are intimate companions.',
    strengths: ['Deep capacity for love and connection', 'Ability to process and express grief', 'Wisdom in recognizing the transient nature of life'],
    challenges: ['Tendency to become overwhelmed by grief', 'Difficulty in finding joy or motivation', 'Risk of becoming stuck in a cycle of sorrow']
  },
  'languish-oasis-zenith': {
    title: 'The Grateful Grief',
    insight: 'Confidence and love alongside grief create full lives shadowed by loss. You might appreciate what you have while mourning what you\'ve lost, proud yet heavy. This trio shows that grief doesn\'t diminish gratitude; they coexist.',
    strengths: ['Deep capacity for love and gratitude', 'Ability to find joy even in difficult circumstances', 'Wisdom in recognizing the transient nature of emotions'],
    challenges: ['Tendency to dismiss or downplay positive experiences', 'Difficulty in accepting compliments or positive feedback', 'Risk of becoming stuck in a cycle of self-doubt']
  },
  'languish-trace-zenith': {
    title: 'The Proud Elegy',
    insight: 'Confidence and longing alongside grief create achievement colored by who and what is missing. You might succeed while still mourning, proud of a legacy that includes loss. This trio often creates meaningful work that honors what\'s been lost.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'mist-oasis-trace': {
    title: 'The Wondering Heart',
    insight: 'Love, curiosity, and longing create open-hearted seeking. You might explore life\'s mysteries while connected to both present relationships and past memories. This trio often characterizes creative souls who find meaning in the questions themselves.',
    strengths: ['Unique perspective combining multiple emotional viewpoints', 'Capacity for empathy and understanding complexity'],
    challenges: ['Integration of conflicting emotional needs', 'Finding coherence amid complexity']
  },
  'mist-oasis-zenith': {
    title: 'The Joyful Wanderer',
    insight: 'Confidence and love alongside curiosity create assured seeking. You might approach life\'s uncertainties from a secure base, exploring without anxiety. This trio often produces innovative work grounded in stable relationships.',
    strengths: ['Strong drive for success and recognition', 'Ability to inspire others with your vision', 'Capacity to achieve despite challenges'],
    challenges: ['Inability to relax or enjoy achievements', 'Tendency to see rest as a weakness', 'Risk of burnout from constant striving']
  },
  'mist-trace-zenith': {
    title: 'The Purposeful Wonder',
    insight: 'Confidence and longing alongside curiosity create directed exploration of meaningful territory. You might seek understanding of questions that matter personally, combining nostalgia with forward momentum. This trio often drives research or creative work with personal significance.',
    strengths: ['Capacity to learn from past experiences', 'Ability to empathize with your past self', 'Motivation to heal and integrate past wounds'],
    challenges: ['Tendency to dwell on past mistakes or traumas', 'Difficulty in forgiving yourself', 'Risk of nostalgia becoming a source of pain']
  },
  'oasis-trace-zenith': {
    title: 'The Grateful Dreamer',
    insight: 'Confidence and love alongside longing create full lives that still reach for more. You might feel deeply satisfied while still yearning, grateful with ambitions. This trio shows that contentment and growth are not opposites—you can appreciate what you have while building toward what you want.',
    strengths: ['Grounded ambition rooted in appreciation', 'Ability to celebrate progress while pursuing goals', 'Sustainable motivation without burnout'],
    challenges: ['Never feeling "done" or satisfied', 'Difficulty resting without guilt', 'Risk of always chasing what\'s next']
  }
};

export function getRealmTrioInsight(primaryRealm: RealmKey, secondaryRealm: RealmKey, tertiaryRealm: RealmKey): TrioInsight {
   const key = getTrioKey([primaryRealm, secondaryRealm, tertiaryRealm]);

  return trioInsights[key] || {
    title: 'Your Emotional Confluence',
    insight: 'Your emotional landscape reflects a unique blend of these three domains, creating a rich and nuanced inner world.',
    strengths: ['Unique perspective combining multiple emotional viewpoints', 'Capacity for empathy and understanding complexity'],
    challenges: ['Integration of conflicting emotional needs', 'Finding coherence amid complexity']
  };
}
