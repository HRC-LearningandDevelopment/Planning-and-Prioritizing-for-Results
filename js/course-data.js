/* ==========================================================================
   Planning and Prioritizing for Results — course content
   Everything a content editor might change lives in this file.
   Source: SP-Planning-and-Prioritizing-for-Results.pptx (slide text,
   tables and speaker notes), restructured for self-paced learning.
   ========================================================================== */

window.COURSE = {
  id: 'hrc-planning-prioritizing',
  storageKey: 'hrc-ppr-v1',
  title: 'Planning and Prioritizing for Results',
  programme: 'Succession Development Programme',
  need: 'Planning & Organizing',
  contact: 'learning@healthreconconnect.com',
  passMark: 70 // final knowledge check pass mark, in percent
};

/* ---------- Videos ---------------------------------------------------------
   Replace url with a YouTube link (watch, youtu.be or embed form all work).
   The summary is what learners read when they opt out of YouTube, so update
   it to match the video you link.                                           */
window.VIDEOS = {
  v1: {
    title: 'Video: Urgent vs Important in Practice',
    url: '[VIDEO_1_URL]',
    summary: `
      <p>The video walks through the urgent vs important matrix using everyday work examples.</p>
      <ul>
        <li><strong>Urgent</strong> means it demands attention now. <strong>Important</strong> means it moves your results. They are not the same thing.</li>
        <li>Most people spend their day on urgent work, important or not, because urgent work is loud. That's how the same problems keep coming back.</li>
        <li>Important but not urgent work (root-cause fixes, preparation, learning) is where results are made. It never shouts, so it has to be scheduled on purpose.</li>
        <li>Urgent but unimportant interruptions should be batched, delegated or deferred. Work that is neither should be dropped.</li>
      </ul>
      <p>Takeaway: protect a block of time every week for the important work that prevents tomorrow's fires.</p>`
  },
  v2: {
    title: 'Video: Building a Daily Planning Routine',
    url: '[VIDEO_2_URL]',
    summary: `
      <p>The video shows how a short daily routine keeps you in charge of your day.</p>
      <ul>
        <li><strong>Plan</strong> before you open email: check deadlines and commitments, choose your top three, and block focus time.</li>
        <li><strong>Do</strong> in focused blocks of 60–90 minutes. Check messages at set times instead of reacting to every notification.</li>
        <li><strong>Review</strong> at the end of the day: what got done, what carries over, and which deadlines are at risk. Set tomorrow's first task.</li>
        <li>A weekly review (about 20 minutes on Monday) catches deadlines and capacity problems before they become surprises.</li>
      </ul>
      <p>Takeaway: fifteen minutes a day of planning and reviewing saves hours of fire-fighting.</p>`
  }
};

/* ---------- Activities -----------------------------------------------------
   Types: buckets (drag/tap into fixed categories), sequence (unique ordered
   steps), match (genuine 1:1 pairs, drawn with lines), flip (explore
   independent concepts), hunt (find the one thing that matters in data),
   sim (branching decision simulation), selfcheck, calculator.
   Every scored activity has keyPoints, revealed on completion.             */
window.ACTIVITIES = {

  /* ---- Module 1 ---- */
  costs: {
    type: 'flip',
    title: 'What Poor Planning Costs in RCM',
    instructions: 'Flip each card to see what happens when planning slips, and what planning does about it.',
    cards: [
      { icon: 'cash', front: 'Lost Cash', sub: 'The cost you can\u2019t recover',
        back: 'Claims that pass their timely-filing deadline are usually lost for good. Every day of delay on high-value work costs money.<br><br><strong>What planning does:</strong> puts high-value, near-deadline claims first, every day.' },
      { icon: 'fire', front: 'Constant Fire-Fighting', sub: 'The same problems, again',
        back: 'When urgent work always wins, the important work, like fixing root causes, never gets done, so the same denials and errors keep coming back.<br><br><strong>What planning does:</strong> protects time for the work that prevents the fires.' },
      { icon: 'battery', front: 'Burnout and Broken Promises', sub: 'The cost to people and trust',
        back: 'Month-end overtime, missed deadlines and clients who stop trusting our commitments.<br><br><strong>What planning does:</strong> spreads the load, surfaces risks early, and makes commitments you can keep.' }
    ],
    keyPoints: [
      'Planning isn\u2019t about doing more. It\u2019s about doing the right things first.',
      'In RCM, lost time turns directly into lost cash: a claim past timely filing rarely comes back.',
      'Fire-fighting is a symptom. The cure is time spent on important, not-urgent work.',
      'Reliability is visible: clients and leaders notice who keeps their commitments.'
    ]
  },

  selfcheck: {
    type: 'selfcheck',
    optional: false,
    title: 'Self-Check: Busy or Productive?',
    instructions: 'Answer honestly for a typical week. Nobody else sees this, and your score updates as you go.',
    statements: [
      'I start my day with email or chat rather than my plan.',
      'Most of my day goes on things that came up that day.',
      'In the last month, a deadline slipped because something else took over.',
      'I couldn\u2019t name my top three priorities for this week right now.',
      'I work late at month-end most months.'
    ],
    bands: [
      { max: 1, label: 'Planner', text: 'You already plan more than most. Use this course to sharpen your prioritizing and to help others plan.' },
      { max: 3, label: 'Sometimes reactive', text: 'Very common. A few habits, especially a daily Plan\u2013Do\u2013Review, will move you into planner territory.' },
      { max: 5, label: 'Fire-fighter', text: 'Your day is running you. The good news: the tools in this course are built for exactly this, and small changes show results quickly.' }
    ],
    keyPoints: [
      'Most people are sometimes reactive. The goal is to make planning a habit, not to be perfect.',
      'Starting the day with your plan, not your inbox, is the single biggest lever on this list.',
      'Keep your score in mind: you\u2019ll be asked to pick one habit to change at the end of Part 1.'
    ]
  },

  /* ---- Module 2 ---- */
  eisenhower: {
    type: 'buckets',
    title: 'Sort the Tuesday Task List',
    instructions: 'It\u2019s Tuesday morning. Place each task in the box where it belongs. Drag it, or tap a task and then tap a box.',
    buckets: [
      { id: 'do', label: 'Do Now', hint: 'Urgent and important', tone: 'pink' },
      { id: 'schedule', label: 'Schedule', hint: 'Important, not urgent', tone: 'green' },
      { id: 'minimise', label: 'Minimise or Delegate', hint: 'Urgent, not important', tone: 'amber' },
      { id: 'drop', label: 'Drop', hint: 'Neither', tone: 'grey' }
    ],
    items: [
      { id: 'e1', text: 'Payer B claims that reach timely filing on Thursday', bucket: 'do', why: 'They\u2019re due in two days and they\u2019re money: urgent and important.' },
      { id: 'e2', text: 'A client escalation about a missed payment posting', bucket: 'do', why: 'A live client issue affects trust and cash today.' },
      { id: 'e3', text: 'Pre-checking next week\u2019s month-end posting file', bucket: 'schedule', why: 'Not due yet, but doing it now prevents a month-end fire.' },
      { id: 'e4', text: 'A cross-training session on a new payer', bucket: 'schedule', why: 'Learning builds capacity. It\u2019s never urgent, so it has to be booked.' },
      { id: 'e5', text: 'A colleague\u2019s portal login question that the IT help desk could answer', bucket: 'minimise', why: 'Urgent for them, not important for your plan. Point them to the help desk or offer a set time.' },
      { id: 'e6', text: 'A routine \u201cany update?\u201d status ping', bucket: 'minimise', why: 'Answer it in your next message batch, not the second it arrives.' },
      { id: 'e7', text: 'Re-formatting a report nobody reads', bucket: 'drop', why: 'Low value and not needed. Stop doing it, or ask whether anyone uses it.' },
      { id: 'e8', text: 'Copying five people into an email that only one needs', bucket: 'drop', why: 'It creates noise for everyone else. Drop the habit.' }
    ],
    keyPoints: [
      'Urgent is about time; important is about results. Ask both questions of every task.',
      'The Schedule box is where results are made. Every hour there means fewer fires later.',
      'Minimise doesn\u2019t mean ignore: batch it, delegate it, or offer a set time.',
      'Dropping low-value work is a decision, not laziness. It frees time for the Schedule box.'
    ]
  },

  /* ---- Module 3 ---- */
  lens: {
    type: 'buckets',
    title: 'Put Each Claim in Its Quadrant',
    instructions: 'For this exercise, treat $1,000 or more as high value and 10 days or fewer to timely filing as a close deadline. Drag each claim, or tap it and then tap a quadrant.',
    buckets: [
      { id: 'first', label: '1 \u00b7 Do First', hint: 'High value, deadline close', tone: 'pink' },
      { id: 'next', label: '2 \u00b7 Do Next', hint: 'Low value, deadline close', tone: 'amber' },
      { id: 'plan', label: '3 \u00b7 Plan', hint: 'High value, deadline far', tone: 'cyan' },
      { id: 'batch', label: '4 \u00b7 Batch', hint: 'Low value, deadline far', tone: 'grey' }
    ],
    items: [
      { id: 'l1', text: '14 claims for Payer B, $8,500 in total, 6 days left', bucket: 'first', why: 'High value and close to the deadline: every day counts.' },
      { id: 'l2', text: 'One claim worth $11,300, 2 days left', bucket: 'first', why: 'The highest value on the list and almost out of time.' },
      { id: 'l3', text: 'One claim worth $120, 4 days left', bucket: 'next', why: 'Low value, but once it passes timely filing it\u2019s lost. A quick win before it goes.' },
      { id: 'l4', text: '9 small claims at $45 each ($405), 7 days left', bucket: 'next', why: 'Low value in total but close to the deadline: clear them after the Do-first work.' },
      { id: 'l5', text: 'One claim worth $6,200, 75 days left', bucket: 'plan', why: 'High value with time: schedule it before it becomes urgent.' },
      { id: 'l6', text: 'A group of claims worth $3,900, 40 days left', bucket: 'plan', why: 'Valuable, not yet urgent. Put it in this week\u2019s plan.' },
      { id: 'l7', text: 'One claim worth $95, 80 days left', bucket: 'batch', why: 'Low value, plenty of time: group it with similar work.' },
      { id: 'l8', text: '30 claims at about $20 each ($600), 55 days left', bucket: 'batch', why: 'Clear them together in one block later in the week.' }
    ],
    keyPoints: [
      'Oldest-first feels fair, but it ignores value and deadlines. The lens doesn\u2019t.',
      'Do next beats Plan: a low-value claim about to be lost outranks a high-value claim with weeks to go.',
      'Plan stops high-value work from drifting into a deadline crunch.',
      'Batching low-value, far-deadline work clears it efficiently without stealing your best hours.'
    ]
  },

  override: {
    type: 'hunt',
    title: 'Find the Item That Jumps the Queue',
    instructions: 'This worklist is already sorted with the priority lens. One item should still go before everything else. Click it.',
    render: 'worklist',
    rows: [
      { id: 'w1', claim: 'CLM-4471', payer: 'Payer B', value: '$4,850', days: '5', note: 'Corrected claim ready to resubmit' },
      { id: 'w2', claim: 'CLM-4502', payer: 'Payer A', value: '$2,300', days: '8', note: 'Missing modifier, fix and resubmit' },
      { id: 'w3', claim: 'CLM-3988', payer: 'Payer D', value: '$310', days: '6', note: 'Awaiting explanation of benefits' },
      { id: 'w4', claim: 'CLM-4123', payer: 'Payer A', value: '$1,900', days: '30', note: 'Appeal draft started' },
      { id: 'w5', claim: 'CLM-4610', payer: 'Payer C', value: '$85', days: '42', note: 'Remittance attached shows a different patient\u2019s name and date of birth' }
    ],
    spots: {
      w1: { correct: false, feedback: 'This is the top of the lens-sorted list: high value, close deadline. Normally it goes first. But something on this list overrides the grid entirely. Read the notes column.' },
      w2: { correct: false, feedback: 'High value with 8 days left: a solid Do-first item. Still not the one that jumps the whole queue. Look for a risk the grid can\u2019t measure.' },
      w3: { correct: false, feedback: 'Low value, close deadline: Do next. It\u2019s correctly placed. Keep looking.' },
      w4: { correct: false, feedback: 'High value with 30 days left: Plan it. Nothing here overrides the grid.' },
      w5: { correct: true, feedback: 'Another patient\u2019s details on this remittance is a possible HIPAA / patient information issue. It\u2019s escalated immediately, whatever its $85 value.' }
    },
    keyPoints: [
      'Two things always override the grid: compliance or PHI risk, and client commitments.',
      'A possible HIPAA or patient information issue is escalated immediately, regardless of dollar value.',
      'The lens orders your claims; it doesn\u2019t replace reading them. Notes can change everything.'
    ]
  },

  /* ---- Module 4 ---- */
  pdr: {
    type: 'buckets',
    title: 'Build Your Routine',
    instructions: 'Place each habit in the part of the day where it belongs.',
    buckets: [
      { id: 'plan', label: 'Plan', hint: 'Start of day \u00b7 10 min', tone: 'cyan' },
      { id: 'do', label: 'Do', hint: 'During the day', tone: 'violet' },
      { id: 'review', label: 'Review', hint: 'End of day \u00b7 5 min', tone: 'green' }
    ],
    items: [
      { id: 'p1', text: 'Check deadlines and commitments', bucket: 'plan', why: 'You can\u2019t prioritize what you haven\u2019t looked at. This comes first.' },
      { id: 'p2', text: 'Pick your top three priorities', bucket: 'plan', why: 'Choosing before the day starts is what stops the inbox choosing for you.' },
      { id: 'p3', text: 'Block focus time in your calendar', bucket: 'plan', why: 'Booked at the start of the day, so the time exists before anyone asks for it.' },
      { id: 'p4', text: 'Work in 60\u201390 minute focus blocks', bucket: 'do', why: 'This is how the plan gets done: sustained attention on the top three.' },
      { id: 'p5', text: 'Check email and chat at set times, about three times a day', bucket: 'do', why: 'Batching keeps messages from running your day.' },
      { id: 'p6', text: 'Protect your top three from interruptions', bucket: 'do', why: 'Use \u201cnot now, can I come back at 2?\u201d during the day.' },
      { id: 'p7', text: 'Note what got done and what carries over', bucket: 'review', why: 'Closing the loop makes tomorrow\u2019s plan honest.' },
      { id: 'p8', text: 'Flag risks to deadlines early', bucket: 'review', why: 'A risk raised at 5 pm today has options; one raised on deadline day doesn\u2019t.' },
      { id: 'p9', text: 'Set tomorrow\u2019s first task', bucket: 'review', why: 'You start tomorrow with momentum instead of your inbox.' }
    ],
    keyPoints: [
      'Fifteen minutes a day (ten to plan, five to review) saves hours of fire-fighting.',
      'Plan before you open email. Once the inbox is open, it sets the agenda.',
      'Review is where risks surface while there\u2019s still time to act.',
      'Add a 20-minute weekly review on Monday for deadlines, capacity and risks.'
    ]
  },

  /* ---- Path A: Specialist / Senior Analyst ---- */
  triage: {
    type: 'sequence',
    title: 'Order the Daily Triage',
    instructions: 'Click the five triage steps in the order you\u2019d do them each morning. Click a numbered step again to remove it.',
    items: [
      { id: 't1', text: 'Sort by deadline', detail: 'Order your queue by days left before timely filing.', accept: [1] },
      { id: 't2', text: 'Then sort by value', detail: 'Within each deadline band, work the highest dollar value first.', accept: [2] },
      { id: 't3', text: 'Spot patterns', detail: 'Same payer and same denial reason on several claims? That\u2019s a pattern to escalate.', accept: [3, 4] },
      { id: 't4', text: 'Check commitments', detail: 'Anything promised to a client or your ATL today goes into your plan.', accept: [3, 4] },
      { id: 't5', text: 'Set your top three', detail: 'Plus a realistic target count for the day. This always comes last because it depends on everything above.', accept: [5] }
    ],
    note: 'Spotting patterns and checking commitments can happen in either order; both are accepted.',
    keyPoints: [
      'Work the plan, not the inbox: the order work arrives in isn\u2019t the order it should be done in.',
      'Deadline first, then value: that\u2019s the priority lens applied to your own queue.',
      'Patterns are worth more than individual claims. One fix can clear dozens of denials.',
      'Your top three and target come last, because they depend on everything you just learned.'
    ]
  },

  focus: {
    type: 'flip',
    title: 'Four Ways to Protect Your Plan',
    instructions: 'Flip each card for the tactic and the words to use.',
    cards: [
      { icon: 'clock', front: 'Block Focus Time', sub: 'Treat it like a meeting',
        back: 'Two 60\u201390 minute blocks a day for your highest-priority claims. Put them in your calendar so others can see them.' },
      { icon: 'chat', front: 'Batch Messages', sub: 'Messages on your schedule',
        back: 'Check email and chat at set times, for example 10 am, 1 pm and 4 pm, unless something is genuinely urgent.' },
      { icon: 'hand', front: 'Say \u201cNot Now\u201d Politely', sub: 'With a time to come back',
        back: '\u201cI\u2019m finishing claims due Thursday. Can I come back to you at 2 pm?\u201d A time, or an alternative, keeps it kind.' },
      { icon: 'flag', front: 'Escalate Early, With Facts', sub: 'When you\u2019re genuinely overloaded',
        back: '\u201cI have 60 claims due this week and capacity for about 45. Which should I prioritize, or can someone help with the Payer C group?\u201d' }
    ],
    keyPoints: [
      'Your plan is only as good as your ability to protect it.',
      '\u201cNot now\u201d works when it comes with a time or an alternative.',
      'Escalating early, with numbers and a suggestion, is a strength, not a weakness.'
    ]
  },

  simA: {
    type: 'sim',
    title: 'Simulation: A Tuesday That Tries to Run You',
    intro: 'You\u2019re a Senior Analyst. Make each call. If a choice isn\u2019t the strongest, you\u2019ll see why and can try again.',
    steps: [
      {
        situation: '<p><strong>9:40 am.</strong> You\u2019re in your morning focus block, working the Payer B claims due Thursday. A chat pops up from Sam:</p><blockquote>\u201cHey, can you help me with the portal login? It keeps timing out.\u201d</blockquote><p>What do you reply?</p>',
        options: [
          { text: 'Stop and help now. It\u2019ll only take a minute.', correct: false, feedback: 'Kind, but \u201ca minute\u201d rarely is, and it breaks the focus block protecting your highest-value claims. Sam\u2019s problem is urgent to Sam, not important to your plan.' },
          { text: '\u201cI\u2019m finishing claims due Thursday. Can I come back to you at 11? If it can\u2019t wait, the IT help desk can reset it.\u201d', correct: true, feedback: 'That\u2019s a polite \u201cnot now\u201d: a reason, a time, and an alternative. Sam isn\u2019t stuck and your plan stays intact.' },
          { text: 'Leave the message unread until the end of the day.', correct: false, feedback: 'It protects your focus, but Sam has no idea when, or whether, you\u2019ll respond. \u201cNot now\u201d needs a time or an alternative.' }
        ]
      },
      {
        situation: '<p><strong>11:30 am.</strong> You re-plan the week. You have <strong>60 claims due by Friday</strong> and realistic capacity for <strong>about 45</strong>.</p><p>What do you do?</p>',
        options: [
          { text: 'Work late every night this week to get through all 60.', correct: false, feedback: 'Overtime might close part of the gap, but it hides the problem from your ATL, risks errors, and isn\u2019t sustainable. Raise it first; overtime is one option they can weigh.' },
          { text: 'Keep going and tell your ATL on Thursday if you\u2019re still behind.', correct: false, feedback: 'By Thursday the options are gone: nobody can be moved, and claims will miss timely filing. Early is the whole point.' },
          { text: 'Raise it with your ATL today, with facts and a suggestion.', correct: true, feedback: 'Right. Raised on Tuesday, a 15-claim gap is easy to solve. Raised on Friday, it\u2019s lost cash.' }
        ]
      },
      {
        situation: '<p>Which message do you send your ATL?</p>',
        options: [
          { text: '\u201cI\u2019m totally swamped this week, sorry. Can you help?\u201d', correct: false, feedback: 'Honest, but your ATL can\u2019t act on \u201cswamped\u201d. How much is due? How much can you do? What\u2019s at risk?' },
          { text: '\u201cI have 60 claims due this week and capacity for about 45. The 15 at risk are the Payer C group, about $2,100, due Friday. Could someone take Payer C, or should I prioritize differently?\u201d', correct: true, feedback: 'Facts (60 vs 45), the specific risk (Payer C, $2,100, Friday) and a suggested solution. Your ATL can decide in one reply.' },
          { text: '\u201cHeads up: the Payer C claims are going to miss timely filing.\u201d', correct: false, feedback: 'It flags the risk but presents it as already lost, with no numbers and no suggestion. Give your ATL something to act on.' }
        ]
      },
      {
        situation: '<p>Your ATL replies:</p><blockquote>\u201cThanks for flagging early. Nobody\u2019s free today. If something has to slip, what would you push?\u201d</blockquote>',
        options: [
          { text: 'The Payer B claims due Thursday. They\u2019re the biggest batch.', correct: false, feedback: 'Biggest batch, but high value and close to the deadline: those are Do first. Pushing them is the most expensive choice on the table.' },
          { text: 'Protect the appeal letter promised to the client and the high-value, near-deadline claims; move the low-value batch with 60 days left to next week.', correct: true, feedback: 'That\u2019s the lens plus the override: client commitment first, Do first next, and the Batch work slips because it has time.' },
          { text: 'Keep working oldest first and see what\u2019s left on Friday.', correct: false, feedback: 'Oldest-first ignores value and deadlines. Decide what slips on purpose, not by accident.' }
        ]
      }
    ],
    keyPoints: [
      'A polite \u201cnot now\u201d has three parts: a reason, a time, and an alternative.',
      'Escalate early. A gap raised on Tuesday has options; on Friday it\u2019s lost cash.',
      'Escalate with facts: what\u2019s due, what you can do, what\u2019s at risk, and a suggestion.',
      'When something must slip, choose deliberately with the lens: Batch work moves first.'
    ]
  },

  queue: {
    type: 'sequence',
    title: 'Rank Your Monday Queue',
    instructions: 'Click the six items in the order you\u2019d work them, using the priority lens and the two overrides.',
    showTable: true,
    columns: ['Item', 'Value', 'Deadline'],
    items: [
      { id: 'q5', text: 'An appeal letter you promised the client', cells: ['\u2014', 'Today, 5 pm'], detail: 'A client commitment due today: an override. Do it early so it\u2019s not at risk.', accept: [1] },
      { id: 'q1', text: '12 claims for Payer B', cells: ['$14,200', 'Timely filing in 3 days'], detail: 'High value, deadline in 3 days: Do first. Use your morning focus block.', accept: [2] },
      { id: 'q6', text: '8 claims for Payer A', cells: ['$9,000', '25 days left'], detail: 'High value, 25 days left: Plan it for later this week.', accept: [3, 4] },
      { id: 'q2', text: 'Update the team\u2019s denial tracker (your ATL asked)', cells: ['\u2014', 'Friday'], detail: 'Important, due Friday: schedule a slot so it\u2019s done on time.', accept: [3, 4] },
      { id: 'q3', text: 'A colleague needs help with a payer portal login', cells: ['\u2014', 'Today, if possible'], detail: 'Urgent for them, not important for your plan: offer a set time, or point them to the right support.', accept: [5, 6] },
      { id: 'q4', text: '40 low-value claims (about $35 each)', cells: ['$1,400', '60 days left'], detail: 'Low value, plenty of time: Batch them in a block later in the week.', accept: [5, 6] }
    ],
    note: 'There\u2019s room for judgement: items with similar priority are accepted in either order.',
    keyPoints: [
      'Overrides first: the client commitment due today goes before even high-value claims.',
      'Then the lens: high value and close (Do first) before high value and far (Plan).',
      'Requests from colleagues are real, but they\u2019re handled with a set time, not by abandoning your plan.',
      'If your order differed slightly but you used the same reasoning, that\u2019s a strong plan.'
    ]
  },

  /* ---- Path B: ATL / TL ---- */
  allocate: {
    type: 'flip',
    title: 'Four Allocation Principles',
    instructions: 'Flip each card for the principle and why it matters.',
    cards: [
      { icon: 'target', front: 'Deadline and Value First', sub: 'Then payer expertise and skill',
        back: 'Allocate by timely-filing deadline and dollar value first, then match by payer expertise. Arrival order is not a priority.' },
      { icon: 'people', front: 'Match Work to People', sub: 'Stretch, don\u2019t strain',
        back: 'Give your strongest people the most complex, high-value work. Use simpler work to develop newer team members.' },
      { icon: 'clock', front: 'Ten-Minute Huddle', sub: 'Every morning, rebalance at midday',
        back: 'A short allocation huddle each morning sets the day. Check again at midday and move work if someone\u2019s ahead or stuck.' },
      { icon: 'chart', front: 'Track High-Value Ageing', sub: 'Not just the count worked',
        back: 'A team can work 300 claims and still let the $10,000 ones age. Watch the ageing of high-value claims, not just volume.' }
    ],
    keyPoints: [
      'Daily allocation is your most powerful planning lever as an ATL or TL.',
      'Count worked is a vanity metric if high-value claims are ageing.',
      'Allocation is also development: the right simpler work grows newer people.'
    ]
  },

  calc: {
    type: 'calculator',
    optional: true,
    title: 'Try It: Quick Capacity Check',
    instructions: 'Change the numbers to see whether today\u2019s work fits today\u2019s capacity. The defaults are the example from the workshop.',
    defaults: { people: 6, hours: 8, productive: 85, volume: 300, rate: 6 }
  },

  dashboard: {
    type: 'hunt',
    title: 'Find the 9 am Warning Sign',
    instructions: 'It\u2019s 9 am and this is your team\u2019s dashboard. One figure tells you that you need to act before lunch. Click it.',
    render: 'tiles',
    tiles: [
      { id: 'd1', label: 'Claims worked yesterday', value: '312', sub: 'Up 8% on last week' },
      { id: 'd2', label: 'Team present today', value: '6 of 6', sub: 'No unplanned absence' },
      { id: 'd3', label: 'Average productivity', value: '6.1 / hr', sub: 'Target 6.0' },
      { id: 'd4', label: 'Work due today vs capacity', value: '50 hrs / 41 hrs', sub: '300 claims at 6 / hr vs 6 people \u00d7 8 hrs \u00d7 85%' },
      { id: 'd5', label: 'Quality score', value: '98.2%', sub: 'Target 97%' },
      { id: 'd6', label: 'Total open queue', value: '1,240', sub: 'Down 3% this week' }
    ],
    spots: {
      d1: { correct: false, feedback: 'Good news, but it\u2019s yesterday, and it\u2019s a count. A team can work more claims and still miss today\u2019s deadlines.' },
      d2: { correct: false, feedback: 'Full attendance is already built into today\u2019s capacity. It doesn\u2019t change the picture.' },
      d3: { correct: false, feedback: 'On target. Productivity isn\u2019t the problem today.' },
      d4: { correct: true, feedback: 'Nine hours of work more than you have people for. At 9 am you can still move, reassign or escalate. At 5 pm you can\u2019t.' },
      d5: { correct: false, feedback: 'Above target. Worth keeping, but it\u2019s not what needs action this morning.' },
      d6: { correct: false, feedback: 'The overall queue is shrinking, which can hide a problem: what matters today is what\u2019s due today.' }
    },
    keyPoints: [
      'Check capacity, not just volume: people \u00d7 hours \u00d7 productive time vs work due.',
      'Know the gap at 9 am, not at 5 pm: decide what moves, what gets help, and what you escalate.',
      'Totals and yesterday\u2019s counts can look healthy while today\u2019s deadlines are at risk.'
    ]
  },

  monthend: {
    type: 'sequence',
    title: 'Plan Month-End Backwards',
    instructions: 'Start at the client\u2019s deadline and work back. Click the steps from the final deadline back to the earliest step.',
    items: [
      { id: 'm0', text: 'Final report to the client', detail: 'Day 0: the client\u2019s deadline. Everything is planned back from here.', accept: [1] },
      { id: 'm1', text: 'Reconciliation', detail: 'Day \u22121: reconcile the day before the report.', accept: [2] },
      { id: 'm2', text: 'Posting cut-off', detail: 'Day \u22122: posting closes two days out.', accept: [3] },
      { id: 'm3', text: 'Last claim submissions', detail: 'Day \u22123: final submissions three days out.', accept: [4] },
      { id: 'm4', text: 'Push high-value denials and follow-ups', detail: 'Day \u22125: the big push on high-value work, about five days out.', accept: [5] }
    ],
    keyPoints: [
      'Start from the client\u2019s deadline and work back: Day 0, \u22121, \u22122, \u22123, \u22125.',
      'Name one owner per step, and build in a buffer day.',
      'Check status daily in the last week, and flag any risk to the date the day you see it.',
      'Adjust the day counts to your own client\u2019s calendar.'
    ]
  },

  risks: {
    type: 'match',
    title: 'Match Each Predictable Risk to Its Control',
    instructions: 'Click a risk on the left, then the planning control on the right that prevents it. Click a linked item to unlink it.',
    left: [
      { id: 'r1', text: 'Two people book leave for the last week of the month' },
      { id: 'r2', text: 'Thanksgiving closes payer offices and banks for part of month-end week' },
      { id: 'r3', text: 'Only Priya knows the Payer D portal workflow' },
      { id: 'r4', text: 'Volume jumps 12% with no warning' }
    ],
    right: [
      { id: 'c1', text: 'One shared leave calendar, reviewed every Monday and before approving leave near month-end' },
      { id: 'c2', text: 'Pull cut-offs forward around the holiday' },
      { id: 'c3', text: 'A cross-skill matrix with at least two people trained on every critical task' },
      { id: 'c4', text: '10\u201315% spare capacity in busy weeks, with an \u201cif this, then that\u201d plan B decided in advance' }
    ],
    pairs: { r1: 'c1', r2: 'c2', r3: 'c3', r4: 'c4' },
    why: {
      r1: 'A shared, regularly reviewed leave calendar shows the clash before you approve it.',
      r2: 'US federal holidays close payers and banks. Your cut-offs move forward, not the client\u2019s deadline.',
      r3: 'A single point of knowledge is a single point of failure. Train a second person.',
      r4: 'You can\u2019t predict the spike, but you can pre-decide the response and keep slack for it.'
    },
    keyPoints: [
      'Most month-end problems are predictable. Plan for them before they happen.',
      'Leave and holidays are known weeks ahead: check them every Monday.',
      'Train at least two people on every critical task.',
      'Keep 10\u201315% buffer in busy weeks and decide plan B in advance.'
    ]
  },

  simB: {
    type: 'sim',
    title: 'Simulation: The Month-End Crunch',
    intro: 'You\u2019re the TL. Six working days to month-end. Two of your eight team members are on leave this week, US Thanksgiving falls inside the window, and volume is up 10% on last month.',
    steps: [
      {
        situation: '<p>What\u2019s your overall approach?</p>',
        options: [
          { text: 'Ask everyone to work overtime all week to get through it.', correct: false, feedback: 'It burns people out and still might not fix the timing problem: payers will be closed for part of Thanksgiving no matter how late you work. Overtime is a short, targeted tool, not the plan.' },
          { text: 'Re-plan backwards: pull cut-offs forward around the holiday, prioritize high-value and near-deadline work, borrow a cross-skilled person, and tell your manager about any risk now.', correct: true, feedback: 'This deals with the holiday, protects the most valuable work, adds capacity where it matters, and gives your manager time to help. Let\u2019s work through it.' },
          { text: 'Keep the current plan and hope the volume eases.', correct: false, feedback: 'Hope isn\u2019t a plan. The risk grows every day you wait.' }
        ]
      },
      {
        situation: '<p>Payer offices are closed Thursday and Friday of Thanksgiving week. Your posting cut-off was that Friday.</p><p>What do you do with the cut-off?</p>',
        options: [
          { text: 'Keep Friday. The team can catch up on Monday.', correct: false, feedback: 'Monday is too close to the client\u2019s report date and leaves no buffer. The holiday is known; plan around it.' },
          { text: 'Move the posting cut-off to Wednesday and pull last submissions forward to Tuesday.', correct: true, feedback: 'Backwards planning in action: the client\u2019s date holds, and every step before it moves to fit the holiday.' },
          { text: 'Quietly move the client\u2019s report date back a few days.', correct: false, feedback: 'The client\u2019s deadline is a commitment. Changing it without agreement costs trust that\u2019s hard to win back.' }
        ]
      },
      {
        situation: '<p>Your manager lends you Ana, who is cross-skilled on your payers, for three days.</p><p>Where do you put her?</p>',
        options: [
          { text: 'On the low-value backlog, to bring the total count down fast.', correct: false, feedback: 'The count drops, but the high-value claims keep ageing. Borrowed capacity should go where the value and deadlines are.' },
          { text: 'On high-value denials and near-deadline follow-ups for the client with the earliest cut-off.', correct: true, feedback: 'Capacity added where it matters most: highest value, closest deadline.' },
          { text: 'Split her time evenly across every queue so it\u2019s fair.', correct: false, feedback: 'Even isn\u2019t the same as effective. Spread thin, she won\u2019t move the work that\u2019s actually at risk.' }
        ]
      },
      {
        situation: '<p>Time to update your manager. What do you say?</p>',
        options: [
          { text: 'Nothing yet. You\u2019ll update them once you know whether you\u2019ll make it.', correct: false, feedback: 'By then it\u2019s too late for them to help. Flag risk to the date the day you see it.' },
          { text: '\u201cMonth-end for Client X is at risk: two on leave, Thanksgiving closures, volume up 10%. I\u2019ve moved cut-offs to Wednesday and put Ana on high-value denials. Remaining risk is about 40 low-value claims. Could you approve four hours of targeted overtime on Wednesday if we need it? I\u2019ll update you Tuesday at 4 pm.\u201d', correct: true, feedback: 'The risk, what you\u2019ve done, what\u2019s left, a specific ask (targeted overtime, not all week) and when you\u2019ll update. Your manager can say yes in one line.' },
          { text: '\u201cIt\u2019s tight, but we\u2019ll be fine.\u201d', correct: false, feedback: 'Reassuring, but if it goes wrong your manager hears about it with no time to help. Give them the facts.' }
        ]
      }
    ],
    keyPoints: [
      'Re-plan backwards from the client\u2019s date: the deadline holds; the steps before it move.',
      'Known holidays and leave are planning inputs, not surprises.',
      'Put extra capacity on the highest-value, nearest-deadline work.',
      'Overtime is a short, targeted tool, not the plan.',
      'Tell your manager early: risk, actions taken, what\u2019s left, and a specific ask.'
    ]
  },

  /* ---- Path C: AM / Manager ---- */
  demandcap: {
    type: 'buckets',
    title: 'Demand or Capacity?',
    instructions: 'You\u2019re building next quarter\u2019s plan. Is each item part of the demand coming at you, or does it change the capacity you have?',
    buckets: [
      { id: 'demand', label: 'Demand', hint: 'What\u2019s coming', tone: 'amber' },
      { id: 'capacity', label: 'Capacity', hint: 'What you have', tone: 'cyan' }
    ],
    items: [
      { id: 'dc1', text: 'Inflow has risen about 4% a month since August', bucket: 'demand', why: 'A volume trend: more work arriving.' },
      { id: 'dc2', text: 'A client adds a new service line on 1 December', bucket: 'demand', why: 'Client changes like go-lives and new services add demand.' },
      { id: 'dc3', text: 'Payer C has started denying more claims for missing authorisation', bucket: 'demand', why: 'Payer and denial trends create rework: more demand.' },
      { id: 'dc4', text: 'The year-end peak in claim volume', bucket: 'demand', why: 'A predictable seasonal peak in what\u2019s coming.' },
      { id: 'dc5', text: 'Three people on planned leave in the week of 22 December', bucket: 'capacity', why: 'Leave is subtracted from the hours you have.' },
      { id: 'dc6', text: 'US federal holidays on 25 December and 1 January', bucket: 'capacity', why: 'Holidays reduce productive days in the quarter.' },
      { id: 'dc7', text: 'Two new hires who\u2019ll need about eight weeks to reach full productivity', bucket: 'capacity', why: 'Ramp-up time means headcount isn\u2019t the same as capacity.' },
      { id: 'dc8', text: 'Only one person can work the Payer D portal', bucket: 'capacity', why: 'Skills coverage is part of capacity: who can cover what.' }
    ],
    keyPoints: [
      'Plan the next quarter, not just the next week.',
      'Capacity = people \u00d7 productive hours \u00d7 productivity rate, minus leave, training, holidays, attrition and ramp-up.',
      'Headcount isn\u2019t capacity: new hires and single points of skill change the real number.',
      'Watch leading indicators (inflow, ageing trend, denial rate, attrition) so you see a gap coming.'
    ]
  },

  gaps: {
    type: 'flip',
    title: 'Five Ways to Close a Capacity Gap',
    instructions: 'Flip each card for when the option works and what to watch for.',
    cards: [
      { icon: 'people', front: 'Cross-Train', sub: 'Build flexible capacity',
        back: '<strong>Works when:</strong> you have time before the gap hits.<br><strong>Watch for:</strong> it takes weeks, so start before you need it.' },
      { icon: 'swap', front: 'Reallocate', sub: 'From lower-impact work',
        back: '<strong>Works when:</strong> some initiatives can pause.<br><strong>Watch for:</strong> be explicit about what stops, and tell the people affected.' },
      { icon: 'clock', front: 'Short-Term Overtime', sub: 'Targeted, time-boxed',
        back: '<strong>Works when:</strong> the peak is short and specific, like month-end.<br><strong>Watch for:</strong> as a standing plan it burns people out.' },
      { icon: 'plus', front: 'Hire', sub: 'Allow for lead time',
        back: '<strong>Works when:</strong> the demand is lasting.<br><strong>Watch for:</strong> hiring plus ramp-up can take months. Plan backfill early.' },
      { icon: 'handshake', front: 'Agree Timelines or Scope', sub: 'With the client',
        back: '<strong>Works when:</strong> the other options can\u2019t close the gap safely.<br><strong>Watch for:</strong> do it early and offer a trade-off, not a surprise.' }
    ],
    keyPoints: [
      'Every gap-closing option has a lead time. Start with the one that fits your timeline.',
      'Overtime is a tool for peaks, not a capacity plan.',
      'Talking to the client about timelines or scope is legitimate when done early, with options.'
    ]
  },

  impact: {
    type: 'buckets',
    title: 'Sort the Initiatives',
    instructions: 'Six initiatives are competing for your team\u2019s time. Place each in the impact/effort box where it belongs.',
    buckets: [
      { id: 'quick', label: 'Quick Win', hint: 'High impact, low effort \u00b7 do first', tone: 'green' },
      { id: 'major', label: 'Major Project', hint: 'High impact, high effort \u00b7 plan and resource', tone: 'cyan' },
      { id: 'fill', label: 'Fill-In', hint: 'Low impact, low effort \u00b7 spare capacity only', tone: 'grey' },
      { id: 'sink', label: 'Time Sink', hint: 'Low impact, high effort \u00b7 stop or push back', tone: 'pink' }
    ],
    items: [
      { id: 'i1', text: 'Fix a payer-mapping rule that causes about 200 denials a month. Roughly two hours of configuration.', bucket: 'quick', why: 'Huge impact for two hours. Do it this week.' },
      { id: 'i2', text: 'Add the timely-filing date as a sortable column in the work queue. One morning with IT.', bucket: 'quick', why: 'Every analyst can triage by deadline from tomorrow, for one morning\u2019s effort.' },
      { id: 'i3', text: 'Automate eligibility checks for your largest client. Three months; expected to cut denials by 20%.', bucket: 'major', why: 'High impact and high effort: worth doing, but it needs a plan, an owner and resources.' },
      { id: 'i4', text: 'Stand up a dedicated team for the new client before go-live. Six weeks of hiring and training.', bucket: 'major', why: 'Essential and substantial. Resource it properly and start early.' },
      { id: 'i5', text: 'Rename shared-drive folders to a tidier convention. An afternoon; nobody is blocked today.', bucket: 'fill', why: 'Nice to have, small effort. Only when there\u2019s spare capacity.' },
      { id: 'i6', text: 'Rebuild the weekly status report in a new dashboard tool. Five weeks of effort; no client or leader has asked for it.', bucket: 'sink', why: 'Big effort, little impact. Stop it, or push back with a trade-off.' }
    ],
    keyPoints: [
      'You can\u2019t do everything at once. Choose deliberately.',
      'Quick wins first; major projects get proper planning and resourcing.',
      'Fill-ins only when there\u2019s spare capacity. Time sinks get stopped or pushed back.',
      'Saying no with a trade-off turns refusal into a shared decision: \u201cWe can deliver X by the 15th if we move Y to next month. Which matters more?\u201d'
    ]
  },

  trigger: {
    type: 'hunt',
    title: 'Find the Week the Trigger Fires',
    instructions: 'Your trigger: \u201cIf inflow is above 110% of forecast for two weeks, we activate the cross-trained pool.\u201d Click the cell where you act.',
    render: 'grid',
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    gridRows: [
      { label: 'Inflow, % of forecast', cells: [['g11', '98%'], ['g12', '104%'], ['g13', '112%'], ['g14', '114%']] },
      { label: 'Claims aged 60+ days', cells: [['g21', '8.1%'], ['g22', '8.0%'], ['g23', '8.3%'], ['g24', '8.4%']] },
      { label: 'Denial rate', cells: [['g31', '6.2%'], ['g32', '6.0%'], ['g33', '6.1%'], ['g34', '6.3%']] },
      { label: 'Leavers', cells: [['g41', '0'], ['g42', '0'], ['g43', '1'], ['g44', '0']] }
    ],
    spots: {
      g11: { correct: false, feedback: 'Below forecast. No action.' },
      g12: { correct: false, feedback: 'Slightly above forecast, but under the 110% trigger. Watch, don\u2019t act.' },
      g13: { correct: false, feedback: 'The first week above 110%. Your trigger needs two weeks in a row, so this is the warning, not the action. One more week to check.' },
      g14: { correct: true, feedback: 'Two consecutive weeks above 110% (112%, then 114%). The trigger fires: activate the cross-trained pool now, without waiting for a crisis.' },
      g21: { correct: false, feedback: 'Ageing is stable. It\u2019s a leading indicator to watch, but it\u2019s not the trigger you set.' },
      g22: { correct: false, feedback: 'Stable. Not the trigger.' },
      g23: { correct: false, feedback: 'A small rise worth noting, but no trigger is set on ageing here.' },
      g24: { correct: false, feedback: 'Creeping up slightly: keep an eye on it. Still not your trigger.' },
      g31: { correct: false, feedback: 'Steady denial rate. Not the trigger.' },
      g32: { correct: false, feedback: 'Steady. Not the trigger.' },
      g33: { correct: false, feedback: 'Steady. Not the trigger.' },
      g34: { correct: false, feedback: 'Within its normal range. Not the trigger.' },
      g41: { correct: false, feedback: 'No leavers. Not the trigger.' },
      g42: { correct: false, feedback: 'No leavers. Not the trigger.' },
      g43: { correct: false, feedback: 'One leaver was already in your Expected scenario, so it\u2019s planned for. It isn\u2019t what this trigger watches.' },
      g44: { correct: false, feedback: 'No leavers. Not the trigger.' }
    },
    keyPoints: [
      'Triggers turn a plan into action, without waiting for a crisis.',
      'A good trigger is specific: a measure, a threshold, a duration, and the action it starts.',
      'Sketch best, expected and worst-case scenarios each quarter, and review them monthly.'
    ]
  },

  simC: {
    type: 'sim',
    title: 'Simulation: The Q4 Squeeze',
    intro: 'A new client goes live on 1 November and needs four FTEs. An existing client\u2019s month-end falls in the same week. Two experienced team members have resigned and leave in two weeks. There\u2019s no budget for new hires until January.',
    steps: [
      {
        situation: '<p>What\u2019s your overall plan?</p>',
        options: [
          { text: 'Ask the new client to delay their go-live until January.', correct: false, feedback: 'It may damage a brand-new relationship and revenue. Only consider it if phasing truly can\u2019t work.' },
          { text: 'Phase it: protect the existing client\u2019s month-end, staff the go-live with a cross-trained pool and temporary reallocation, agree a phased ramp-up with the new client, start backfill planning, and brief leadership on risks and triggers.', correct: true, feedback: 'This protects the commitment you\u2019ve already made, starts the new client realistically, and uses the capacity you already have. Let\u2019s work through the details.' },
          { text: 'Move everyone onto the go-live and deal with month-end afterwards.', correct: false, feedback: 'It puts the existing client\u2019s month-end, and their trust, at serious risk.' }
        ]
      },
      {
        situation: '<p>Where do the four FTEs for go-live week come from?</p>',
        options: [
          { text: 'The two most experienced people from the existing client\u2019s month-end team, plus two others.', correct: false, feedback: 'That strips the existing client\u2019s month-end of its strongest people in its busiest week: the commitment you said you\u2019d protect.' },
          { text: 'The cross-trained pool, plus people freed by pausing lower-impact work like the dashboard rebuild. The existing month-end team is ring-fenced until close.', correct: true, feedback: 'Reallocation from lower-impact work is capacity you already have. Ring-fencing month-end keeps your existing commitment safe.' },
          { text: 'Ask everyone to do overtime to cover both.', correct: false, feedback: 'Overtime across a whole quarter, with two people leaving, is a recipe for more resignations. It\u2019s a peak tool, not a plan.' }
        ]
      },
      {
        situation: '<p>The new client\u2019s operations lead pushes back:</p><blockquote>\u201cWe expected full volume from day one.\u201d</blockquote><p>How do you reply?</p>',
        options: [
          { text: '\u201cUnderstood, we\u2019ll make it work.\u201d', correct: false, feedback: 'You\u2019d be promising capacity you don\u2019t have. Breaking it later costs far more trust than a clear trade-off now.' },
          { text: '\u201cWe can take 60% of volume from 1 November and full volume from 1 December, which protects quality from day one. If full volume on day one is essential, we\u2019d need to agree a later go-live. Which matters more to you?\u201d', correct: true, feedback: 'Saying no with a trade-off: two clear options and a question that makes it a shared decision.' },
          { text: '\u201cThat\u2019s not possible with our current staffing.\u201d', correct: false, feedback: 'Honest, but a flat no with no alternative leaves the client nowhere to go. Offer a trade-off.' }
        ]
      },
      {
        situation: '<p>You brief leadership. Which plan do you present?</p>',
        options: [
          { text: '\u201cWe\u2019ll monitor it closely and escalate if needed.\u201d', correct: false, feedback: '\u201cMonitor closely\u201d isn\u2019t a trigger. Leadership can\u2019t tell when you\u2019ll act, or what you\u2019ll do.' },
          { text: '\u201cIf new-client inflow is above 110% of the phased forecast for two weeks, or 60+ day ageing passes 10%, we fully activate the cross-trained pool and pause the process review. Backfill requests go in now for January.\u201d', correct: true, feedback: 'Specific triggers, pre-decided actions, and backfill started with enough lead time. That\u2019s a plan leadership can support.' },
          { text: 'Wait until January when hiring budget opens, then brief them.', correct: false, feedback: 'By January the risk will already have landed. Bring leadership in early, with clear triggers.' }
        ]
      }
    ],
    keyPoints: [
      'Protect what you\u2019ve already committed before taking on new work.',
      'Phase new work to match real capacity, and say so early.',
      'Saying no with a trade-off turns a refusal into a shared decision.',
      'Bring leadership in early with specific triggers and pre-decided actions.',
      'Start backfill planning now: hiring has lead time.'
    ]
  }
};

/* ---------- Quizzes -------------------------------------------------------- */
window.QUIZZES = {
  cfu1: { title: 'Check for Understanding', questions: [
    { q: 'Why do claims that pass their timely-filing deadline matter so much?',
      options: ['They need an extra round of review', 'They usually can\u2019t be recovered', 'They take longer to post'], answer: 1,
      explain: 'Past timely filing, a claim is usually lost for good. That\u2019s why delay on high-value work costs real money.' },
    { q: 'According to this course, what is planning really about?',
      options: ['Doing more in less time', 'Never being interrupted', 'Doing the right things first'], answer: 2,
      explain: 'Planning isn\u2019t about doing more. It\u2019s about doing the right things first.' }
  ]},
  cfu2: { title: 'Check for Understanding', questions: [
    { q: 'A denial keeps coming back for the same reason. Fixing the root cause would take about an hour. Where does it belong?',
      options: ['Do Now', 'Schedule', 'Minimise or Delegate', 'Drop'], answer: 1,
      explain: 'Important but not urgent: schedule it. This is exactly the work that prevents future fires.' },
    { q: 'Which box is \u201cwhere results are made\u201d?',
      options: ['Do Now: urgent and important', 'Schedule: important, not urgent', 'Minimise: urgent, not important'], answer: 1,
      explain: 'Every hour in Schedule means fewer fires later. Protect time for it every week.' },
    { q: 'You\u2019re in a focus block. A colleague asks a question that someone else on the team could easily answer. What do you do?',
      options: ['Answer immediately so they aren\u2019t blocked', 'Point them to the right person, or offer a set time', 'Ignore it'], answer: 1,
      explain: 'Urgent for them, not important for your plan: minimise or delegate, kindly.' }
  ]},
  cfu3: { title: 'Check for Understanding', questions: [
    { q: 'Two claims: $300 due in 2 days, and $5,000 due in 40 days. Which do you work first?',
      options: ['The $5,000 claim', 'The $300 claim', 'Whichever arrived first'], answer: 1,
      explain: 'The $300 claim is Do next: close to its deadline and lost if you wait. The $5,000 claim is Plan: valuable, but it still has time.' },
    { q: 'Which two things always override the priority grid?',
      options: ['Oldest claims and largest batches', 'Compliance or PHI risk, and client commitments', 'Manager requests and month-end'], answer: 1,
      explain: 'Possible HIPAA or patient information issues, and anything promised to a client by a date, always go first.' },
    { q: 'What\u2019s wrong with working your queue oldest-first?',
      options: ['Nothing, it\u2019s the fairest method', 'It ignores dollar value and timely-filing deadlines', 'It takes too long to sort'], answer: 1,
      explain: 'Oldest-first feels fair, but a high-value claim with 3 days left can sit behind dozens of low-value ones.' }
  ]},
  cfu4: { title: 'Check for Understanding', questions: [
    { q: 'It\u2019s Tuesday, 9 am. What do you do first?',
      options: ['Reply to the 25 unread emails in your inbox', 'Work the three claims ($6,800 in total) that reach timely filing on Thursday', 'Start the process-improvement idea your manager mentioned last week', 'Re-format yesterday\u2019s report so it looks neater'], answer: 1,
      optionFeedback: [
        'Minimise: batch email at set times rather than letting it run your morning.',
        'Do now: urgent, important, high value and close to the deadline.',
        'Schedule: important but not urgent. Block time for it later today or this week; don\u2019t let it disappear.',
        'Drop: low value. Only do it if there\u2019s a real need.'
      ],
      explain: 'The Thursday claims are urgent, important and high value, so they come first.' },
    { q: 'How long does the start-of-day Plan step take?',
      options: ['About 10 minutes', 'About an hour', 'It\u2019s not needed if you review at night'], answer: 0,
      explain: 'Ten minutes to plan, five to review: fifteen minutes a day that saves hours.' },
    { q: 'What does the weekly review cover?',
      options: ['Everyone\u2019s performance ratings', 'The week\u2019s deadlines, your capacity and any risks', 'Clearing your inbox to zero'], answer: 1,
      explain: 'About 20 minutes on Monday on deadlines, capacity and risks, so you\u2019re rarely surprised by a deadline.' }
  ]},
  cfuA: { title: 'Check for Understanding', questions: [
    { q: 'In your daily triage, after sorting by days left before timely filing, what comes next?',
      options: ['Work the highest dollar value first within each deadline band', 'Work the oldest claims first', 'Answer your messages'], answer: 0,
      explain: 'Deadline first, then value: the priority lens applied to your own queue.' },
    { q: 'You notice the same payer denying several claims for the same reason. What should you do?',
      options: ['Work each claim as normal', 'Escalate it as a pattern', 'Move them to the bottom of the queue'], answer: 1,
      explain: 'A pattern is worth escalating: one root-cause fix can clear many denials.' }
  ]},
  cfuB: { title: 'Check for Understanding', questions: [
    { q: 'Six people, eight hours each, 85% productive time. Roughly how many productive hours do you have?',
      options: ['48 hours', 'About 41 hours', 'About 36 hours'], answer: 1,
      explain: '6 \u00d7 8 \u00d7 0.85 = 40.8, so about 41 hours. Compare that with the hours of work due, every morning.' },
    { q: 'A US federal holiday closes payer offices in month-end week. What do you do?',
      options: ['Ask the client for a later deadline', 'Pull your cut-offs forward', 'Plan overtime for the day after'], answer: 1,
      explain: 'The client\u2019s deadline holds. Your internal cut-offs move forward around the holiday.' }
  ]},
  cfuC: { title: 'Check for Understanding', questions: [
    { q: 'What turns a scenario plan into action without waiting for a crisis?',
      options: ['Monthly status meetings', 'Clear triggers', 'A bigger overtime budget'], answer: 1,
      explain: 'Triggers (a measure, a threshold, a duration and an action) mean you act early.' },
    { q: 'An initiative is low impact and high effort. What should you do with it?',
      options: ['Do it first', 'Plan and resource it properly', 'Stop it, or push back'], answer: 2,
      explain: 'That\u2019s a time sink. Stop it, or push back with a clear trade-off.' }
  ]},
  final: { title: 'Final Knowledge Check', graded: true, questions: [
    { q: 'Which box of the urgent vs important matrix should you protect the most time for?',
      options: ['Urgent and important', 'Important, not urgent', 'Urgent, not important'], answer: 1,
      explain: 'Important, not urgent: this is where you prevent problems through root-cause fixes, preparation and learning.' },
    { q: 'Two claims: $300 due in 2 days, and $5,000 due in 40 days. Which do you work first?',
      options: ['The $5,000 claim', 'The $300 claim', 'Whichever arrived first'], answer: 1,
      explain: 'The $300 claim is close to its deadline, so do it next before it\u2019s lost; then plan the $5,000 claim, which still has time.' },
    { q: 'What\u2019s the best way to plan month-end?',
      options: ['Forwards from day one', 'Backwards from the deadline, with owners and a buffer', 'Reuse last month\u2019s plan'], answer: 1,
      explain: 'Plan backwards from the client\u2019s deadline, with one owner per step, a buffer day and daily checks in the final week.' },
    { q: 'A $40 claim\u2019s paperwork may contain another patient\u2019s information. What do you do?',
      options: ['Batch it, since it\u2019s low value with time left', 'Escalate it immediately', 'Fix it when you next work that payer'], answer: 1,
      explain: 'Compliance and PHI risk override the grid. Escalate immediately, whatever the dollar value.' },
    { q: 'You promised a client an appeal letter by 5 pm today. You also have high-value claims due in 3 days. What goes first?',
      options: ['The high-value claims', 'The appeal letter', 'Whichever is quicker'], answer: 1,
      explain: 'A client commitment due today is an override. Do it early so it\u2019s not at risk, then the high-value claims.' },
    { q: 'Which belongs in your 10-minute start-of-day Plan?',
      options: ['Clear every unread message', 'Check deadlines, pick your top three, and block focus time', 'Review yesterday\u2019s quality scores in detail'], answer: 1,
      explain: 'Check deadlines and commitments, pick your top three, and block focus time, before the inbox sets your agenda.' },
    { q: 'What\u2019s the recommended way to handle email and chat during the day?',
      options: ['Respond to each message as it arrives', 'Check at set times, about three times a day', 'Only check at the end of the day'], answer: 1,
      explain: 'Batching at set times (for example 10 am, 1 pm and 4 pm) keeps messages from running your day, while still being responsive.' },
    { q: 'You realise you have more work due this week than you can complete. What\u2019s the best move?',
      options: ['Work late and say nothing', 'Raise it early, with facts and a suggested solution', 'Wait to see how the week goes'], answer: 1,
      explain: 'Raise capacity risks early, with facts (what\u2019s due vs what you can do) and a suggestion.' },
    { q: '40 claims at about $35 each, with 60 days left before timely filing. Where do they sit in the priority lens?',
      options: ['Do First', 'Do Next', 'Plan', 'Batch'], answer: 3,
      explain: 'Low value, deadline far: batch them and clear them in a block later in the week.' },
    { q: 'Which is an example of the Schedule box at work?',
      options: ['Answering a routine status ping straight away', 'Booking an hour this week to fix the root cause of a recurring denial', 'Re-checking a report nobody uses'], answer: 1,
      explain: 'Root-cause fixes are important but not urgent. Scheduling them is how the fires stop coming back.' }
  ]}
};

/* ---------- Reflections ---------------------------------------------------- */
window.REFLECTIONS = {
  r_habit: 'Look back at your self-check score. Which one Plan\u2013Do\u2013Review habit will you start tomorrow, and at what time of day?',
  rA1: 'What\u2019s the first change you\u2019ll make to how you plan your day?',
  rA2: 'Which interruption costs you the most time, and how will you handle it?',
  rA3: 'What will you discuss with your mentor?',
  rB1: 'Where does your team\u2019s plan usually break down?',
  rB2: 'Which predictable risk (leave, holidays, volume) will you plan for first?',
  rB3: 'What will you discuss with your mentor?',
  rC1: 'Where is your biggest capacity risk in the next quarter?',
  rC2: 'Which initiative is a time sink you should stop or push back?',
  rC3: 'What triggers will you set, and what will you discuss with your mentor?'
};

/* ---------- Paths ---------------------------------------------------------- */
window.PATHS = {
  A: { id: 'A', role: 'Specialist / Senior Analyst', title: 'Planning Your Own Work', module: 'pathA', tone: 'cyan',
       bullets: ['Plan and prioritize your own queue', 'Protect focus time and handle interruptions', 'Know when to escalate overload'] },
  B: { id: 'B', role: 'ATL / TL', title: 'Planning Your Team\u2019s Work', module: 'pathB', tone: 'violet',
       bullets: ['Allocate work across your team by priority', 'Plan month-end backwards from the deadline', 'Plan around leave and US holidays'] },
  C: { id: 'C', role: 'AM / Manager', title: 'Planning Capacity and Priorities', module: 'pathC', tone: 'amber',
       bullets: ['Match capacity to demand', 'Prioritize across clients and initiatives', 'Plan for risk with scenarios'] }
};

/* ---------- Modules and pages ----------------------------------------------
   Block types: html, act, quiz, video, reflect, name, pathpicker, results,
   certificate, downloads. act/quiz/video blocks are required for module
   completion unless the activity is marked optional.                        */
window.MODULES = [
  { id: 'welcome', part: 'start', title: 'Welcome', pages: [
    { title: 'Planning and Prioritizing for Results', hero: true, blocks: [
      { t: 'html', html: `
        <p class="lede">Learn practical ways to decide what matters most, plan your time and your team\u2019s time, and deliver results without constant fire-fighting.</p>
        <p>This is the formal learning for your <strong>Planning &amp; Organizing</strong> development need in the Succession Development Programme. It takes about 50 minutes, and your progress saves automatically in this browser, so you can stop and come back at any time.</p>` },
      { t: 'name' },
      { t: 'html', html: `
        <h3>How It Works</h3>
        <ol class="flow">
          <li><strong>Part 1: the foundation.</strong> Core planning tools everyone uses. About 20 minutes.</li>
          <li><strong>Part 2: your path.</strong> Choose your level and follow the path built for your role. About 20 minutes.</li>
          <li><strong>Wrap-up.</strong> Key takeaways, a final knowledge check, your certificate and your next steps. About 10 minutes.</li>
        </ol>
        <div class="callout tip"><p>Have your IDP open for the reflection prompts. Your answers are saved here and can be downloaded as a PDF to bring to your mentor.</p></div>` }
    ]},
    { title: 'What You\u2019ll Be Able to Do', blocks: [
      { t: 'html', html: `
        <p>By the end of this course, you\u2019ll be able to:</p>
        <ul class="objectives">
          <li><span class="ob-mark" aria-hidden="true"></span><div><strong>Separate urgent from important</strong><br>and protect time for the work that prevents problems.</div></li>
          <li><span class="ob-mark" aria-hidden="true"></span><div><strong>Prioritize using the RCM priority lens</strong><br>dollar value, timely-filing deadline, compliance and client commitments.</div></li>
          <li><span class="ob-mark" aria-hidden="true"></span><div><strong>Plan your day, week and month</strong><br>with a simple Plan\u2013Do\u2013Review routine.</div></li>
          <li><span class="ob-mark" aria-hidden="true"></span><div><strong>Apply planning at your level</strong><br>your own queue, your team\u2019s work, or the account\u2019s capacity.</div></li>
        </ul>
        <p>The first three apply to everyone. The fourth depends on the path you choose in Part 2.</p>` }
    ]}
  ]},

  { id: 'm1', part: 'p1', title: 'Why Planning Matters', pages: [
    { title: 'Why Planning Matters in RCM', blocks: [
      { t: 'html', html: `<p class="lede">Planning isn\u2019t about doing more. It\u2019s about doing the right things first.</p>
        <p>In revenue cycle management, poor planning has real costs. Explore the three below.</p>` },
      { t: 'act', id: 'costs' }
    ]},
    { title: 'Busy or Productive?', blocks: [
      { t: 'html', html: `<p>Before going further, a quick, private self-check. Keep your score in mind as you work through the course.</p>` },
      { t: 'act', id: 'selfcheck' }
    ]},
    { title: 'Check for Understanding', blocks: [ { t: 'quiz', id: 'cfu1' } ] }
  ]},

  { id: 'm2', part: 'p1', title: 'Urgent vs Important', pages: [
    { title: 'Urgent vs Important', blocks: [
      { t: 'html', html: `<p class="lede">Every task is urgent, important, both, or neither. The trick is asking both questions.</p>
        <p>The Eisenhower matrix, popularised by Stephen Covey, applied to RCM:</p>
        <div class="matrix" role="table" aria-label="Urgent vs important matrix">
          <div class="mx-axis mx-axis-top" aria-hidden="true"><span>Urgent</span><span>Not urgent</span></div>
          <div class="mx-axis mx-axis-side" aria-hidden="true"><span>Important</span><span>Not important</span></div>
          <div class="mx-cell tone-pink" role="cell"><h4>Do Now</h4><p class="mx-sub">Urgent and important</p><p>Claims hitting timely filing this week, a client escalation, a committed deliverable due today.</p></div>
          <div class="mx-cell tone-green mx-key" role="cell"><h4>Schedule</h4><p class="mx-sub">Important, not urgent</p><p>Root-cause fixes, month-end preparation, learning and cross-training, process improvements.</p></div>
          <div class="mx-cell tone-amber" role="cell"><h4>Minimise or Delegate</h4><p class="mx-sub">Urgent, not important</p><p>Interruptions others could handle, some meetings and chat requests, routine status checks.</p></div>
          <div class="mx-cell tone-grey" role="cell"><h4>Drop</h4><p class="mx-sub">Neither</p><p>Re-checking reports nobody uses, perfecting low-value work, unnecessary copy-ins.</p></div>
        </div>
        <div class="callout key"><p><strong>The key insight:</strong> the Schedule box is where results are made. It never shouts, so it has to be booked on purpose. Every hour spent there means fewer fires to fight later. Aim to protect time for it every week.</p></div>` }
    ]},
    { title: 'Watch: Urgent vs Important in Practice', blocks: [ { t: 'video', id: 'v1' } ] },
    { title: 'Try It: Sort the Task List', blocks: [ { t: 'act', id: 'eisenhower' } ] },
    { title: 'Check for Understanding', blocks: [ { t: 'quiz', id: 'cfu2' } ] }
  ]},

  { id: 'm3', part: 'p1', title: 'The RCM Priority Lens', pages: [
    { title: 'The RCM Priority Lens', blocks: [
      { t: 'html', html: `<p class="lede">Within urgent work, how do you decide the order? Working oldest first ignores value and deadlines. Use this lens instead.</p>
        <div class="lens">
          <div class="lens-grid">
            <div class="lens-cell tone-amber"><span class="lens-n">2</span><h4>Do Next</h4><p>Low value, deadline close. Quick wins before they\u2019re lost.</p></div>
            <div class="lens-cell tone-pink"><span class="lens-n">1</span><h4>Do First</h4><p>High value, deadline close. Every day counts.</p></div>
            <div class="lens-cell tone-grey"><span class="lens-n">4</span><h4>Batch</h4><p>Low value, deadline far. Group and clear in blocks.</p></div>
            <div class="lens-cell tone-cyan"><span class="lens-n">3</span><h4>Plan</h4><p>High value, deadline far. Schedule before it becomes urgent.</p></div>
            <div class="lens-x" aria-hidden="true">Dollar value: low \u2192 high</div>
            <div class="lens-y" aria-hidden="true">Deadline: far \u2192 close</div>
          </div>
          <div class="lens-over">
            <h4>Two Overrides: These Always Go First</h4>
            <p><strong>Compliance or PHI risk.</strong> Possible HIPAA or patient information issues are escalated immediately, whatever their dollar value.</p>
            <p><strong>Client commitments.</strong> Anything we\u2019ve promised a client by a date. Breaking a commitment costs trust that\u2019s hard to win back.</p>
          </div>
        </div>
        <p>Notice that <strong>Do Next</strong> ranks above <strong>Plan</strong>: a low-value claim about to be lost beats a high-value claim that still has weeks. Once it\u2019s lost, it\u2019s lost.</p>` }
    ]},
    { title: 'Try It: Sort the Claims', blocks: [ { t: 'act', id: 'lens' } ] },
    { title: 'Try It: Spot the Override', blocks: [ { t: 'act', id: 'override' } ] },
    { title: 'Check for Understanding', blocks: [ { t: 'quiz', id: 'cfu3' } ] }
  ]},

  { id: 'm4', part: 'p1', title: 'Plan, Do, Review', pages: [
    { title: 'Plan, Do, Review: A Simple Routine', blocks: [
      { t: 'html', html: `<p class="lede">Fifteen minutes a day that saves hours.</p>
        <div class="pdr">
          <div class="pdr-step tone-cyan"><h4>Plan</h4><p class="pdr-when">Start of day \u00b7 10 min</p><p>Check deadlines and commitments. Pick your top three. Block focus time.</p></div>
          <div class="pdr-step tone-violet"><h4>Do</h4><p class="pdr-when">During the day</p><p>Work in 60\u201390 minute focus blocks. Batch email and chat. Protect your top three.</p></div>
          <div class="pdr-step tone-green"><h4>Review</h4><p class="pdr-when">End of day \u00b7 5 min</p><p>What got done? What carries over? Flag risks early. Set tomorrow\u2019s first task.</p></div>
        </div>
        <div class="callout tip"><p><strong>Weekly:</strong> spend 20 minutes on Monday reviewing the week\u2019s deadlines, your capacity and any risks. Do this and you\u2019ll rarely be surprised by a deadline.</p></div>` }
    ]},
    { title: 'Watch: Building a Daily Routine', blocks: [ { t: 'video', id: 'v2' } ] },
    { title: 'Try It: Build Your Routine', blocks: [ { t: 'act', id: 'pdr' } ] },
    { title: 'Pause and Reflect', blocks: [
      { t: 'html', html: `<p>Turn the routine into a commitment. Your answer is saved here and included in your PDF.</p>` },
      { t: 'reflect', id: 'r_habit' }
    ]},
    { title: 'Check for Understanding', blocks: [
      { t: 'quiz', id: 'cfu4' },
      { t: 'html', html: `<div class="callout key"><p><strong>That\u2019s Part 1.</strong> Next, choose the path for your role.</p></div>` }
    ]}
  ]},

  { id: 'choose', part: 'p2', title: 'Choose Your Path', pages: [
    { title: 'Choose Your Path', blocks: [
      { t: 'html', html: `<p>Pick the path that matches your current role. It becomes required for your certificate. If you\u2019re preparing for your next role, you\u2019re welcome to explore the other paths too; they\u2019re optional.</p>` },
      { t: 'pathpicker' }
    ]}
  ]},

  { id: 'pathA', part: 'p2', path: 'A', title: 'Planning Your Own Work', pages: [
    { title: 'Your Daily Triage Routine', blocks: [
      { t: 'html', html: `<p class="lede">Fifteen minutes at the start of your day turns a queue into a plan.</p>
        <p>The order your work arrives in isn\u2019t the order it should be done in. First-in-first-out feels fair, but it lets high-value claims slip past their deadline. Work the plan, not the inbox.</p>` },
      { t: 'act', id: 'triage' }
    ]},
    { title: 'Protect Your Focus', blocks: [
      { t: 'html', html: `<p class="lede">Interruptions are the biggest threat to your plan.</p>` },
      { t: 'act', id: 'focus' }
    ]},
    { title: 'Practise the Conversations', blocks: [ { t: 'act', id: 'simA' } ] },
    { title: 'Scenario: Your Monday Queue', blocks: [ { t: 'act', id: 'queue' } ] },
    { title: 'Put It Into Practice', blocks: [
      { t: 'html', html: `<div class="assignment"><p class="as-tag">Your on-the-job assignment \u00b7 DI-30</p>
        <h3>Take Over the Work-Queue Allocation</h3>
        <p>Plan work by ageing, dollar value and payer rather than first-in-first-out. Start with your own queue, then agree with your ATL to allocate for a small group.</p>
        <p><strong>Proof of completion:</strong> four weeks of allocation with improvement in high-value ageing. Dates are in your personal training plan.</p></div>
        <h3>Pause and Reflect</h3>` },
      { t: 'reflect', id: 'rA1' }, { t: 'reflect', id: 'rA2' }, { t: 'reflect', id: 'rA3' }
    ]},
    { title: 'Check for Understanding', blocks: [ { t: 'quiz', id: 'cfuA' } ] }
  ]},

  { id: 'pathB', part: 'p2', path: 'B', title: 'Planning Your Team\u2019s Work', pages: [
    { title: 'Allocate by Priority, Not Arrival', blocks: [
      { t: 'html', html: `<p class="lede">Daily allocation is your most powerful planning lever.</p>` },
      { t: 'act', id: 'allocate' },
      { t: 'act', id: 'calc' }
    ]},
    { title: 'Read the Dashboard', blocks: [ { t: 'act', id: 'dashboard' } ] },
    { title: 'Plan Month-End Backwards', blocks: [
      { t: 'html', html: `<p class="lede">Month-end runs smoothly when it\u2019s planned backwards from the client\u2019s deadline.</p>
        <p>Start with the final report date, then work back. Give every step one owner, build in a buffer day, and check status daily in the final week.</p>` },
      { t: 'act', id: 'monthend' }
    ]},
    { title: 'Leave, US Holidays and Contingency', blocks: [
      { t: 'html', html: `<p class="lede">Most month-end problems are predictable. Plan for them.</p>` },
      { t: 'act', id: 'risks' }
    ]},
    { title: 'Practise: The Month-End Crunch', blocks: [ { t: 'act', id: 'simB' } ] },
    { title: 'Put It Into Practice', blocks: [
      { t: 'html', html: `<div class="assignment two">
          <div><p class="as-tag">ATL \u00b7 DI-30</p><h3>Take Over the Work-Queue Allocation</h3>
          <p>Own daily allocation by ageing, value and payer.</p><p><strong>Proof:</strong> four weeks with improvement in high-value ageing.</p></div>
          <div><p class="as-tag">TL \u00b7 DI-28</p><h3>Own the Month-End Close Plan for Your Client</h3>
          <p>Build and run the plan: cut-offs, posting, reconciliation, reporting.</p><p><strong>Proof:</strong> two closes delivered on date with no missed deliverable.</p></div>
        </div>
        <h3>Pause and Reflect</h3>` },
      { t: 'reflect', id: 'rB1' }, { t: 'reflect', id: 'rB2' }, { t: 'reflect', id: 'rB3' }
    ]},
    { title: 'Check for Understanding', blocks: [ { t: 'quiz', id: 'cfuB' } ] }
  ]},

  { id: 'pathC', part: 'p2', path: 'C', title: 'Planning Capacity and Priorities', pages: [
    { title: 'Capacity vs Demand', blocks: [
      { t: 'html', html: `<p class="lede">At your level, plan the next quarter, not just the next week.</p>` },
      { t: 'act', id: 'demandcap' }
    ]},
    { title: 'Closing a Gap', blocks: [ { t: 'act', id: 'gaps' } ] },
    { title: 'Prioritize Across Clients and Initiatives', blocks: [
      { t: 'html', html: `<p class="lede">You can\u2019t do everything at once. Choose deliberately.</p>` },
      { t: 'act', id: 'impact' }
    ]},
    { title: 'Plan for What Could Go Wrong', blocks: [
      { t: 'html', html: `<p>Decide your moves before you need them. Sketch three scenarios for the next quarter and your response to each:</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Scenario</th><th>What it looks like</th><th>Your planned response</th></tr></thead>
          <tbody>
            <tr><td><strong>Best case</strong></td><td>Volume as forecast, no attrition</td><td>Use spare capacity for improvement projects</td></tr>
            <tr><td><strong>Expected</strong></td><td>Volume +5%, one leaver</td><td>Cross-train two people; small overtime budget at month-end</td></tr>
            <tr><td><strong>Worst case</strong></td><td>Volume +15%, two leavers, a client go-live slips</td><td>Activate the cross-trained pool, re-sequence projects, talk to the client early</td></tr>
          </tbody></table></div>
        <p>Then set triggers, and review the scenarios monthly.</p>` },
      { t: 'act', id: 'trigger' }
    ]},
    { title: 'Practise: The Q4 Squeeze', blocks: [ { t: 'act', id: 'simC' } ] },
    { title: 'Put It Into Practice', blocks: [
      { t: 'html', html: `<div class="assignment"><p class="as-tag">Your on-the-job assignment \u00b7 DI-29</p>
        <h3>Build the Shift and Capacity Plan</h3>
        <p>Plan coverage against forecast volume, leave and US holidays, and hold it for a quarter.</p>
        <p><strong>Proof of completion:</strong> a quarter completed with service levels met and no unplanned overtime spike.</p></div>
        <h3>Pause and Reflect</h3>` },
      { t: 'reflect', id: 'rC1' }, { t: 'reflect', id: 'rC2' }, { t: 'reflect', id: 'rC3' }
    ]},
    { title: 'Check for Understanding', blocks: [ { t: 'quiz', id: 'cfuC' } ] }
  ]},

  { id: 'wrap', part: 'wrap', title: 'Final Check', pages: [
    { title: 'Five Ideas to Take Back to Your Desk', blocks: [
      { t: 'html', html: `<p>A quick recap before the final knowledge check.</p>
        <ol class="takeaways">
          <li>Protect time for important, not-urgent work. It\u2019s where results are made.</li>
          <li>Prioritize by deadline and dollar value, and put compliance and client commitments first.</li>
          <li>Plan, Do, Review: ten minutes in the morning, five minutes at the end of the day.</li>
          <li>Plan big deadlines backwards, with owners, a buffer and early warnings.</li>
          <li>Raise capacity risks early, with facts and a suggested solution.</li>
        </ol>` }
    ]},
    { title: 'Final Knowledge Check', blocks: [
      { t: 'html', html: `<p>Ten questions for everyone. You need <strong>${window.COURSE.passMark}%</strong> to pass, and you can retake it.</p>` },
      { t: 'quiz', id: 'final' }
    ]}
  ]},

  { id: 'finish', part: 'wrap', title: 'Results and Certificate', pages: [
    { title: 'Your Results', blocks: [ { t: 'results' } ] },
    { title: 'Your Next Steps', blocks: [
      { t: 'html', html: `<ol class="flow">
          <li><strong>Complete this course.</strong> Pass the final check and download your certificate.</li>
          <li><strong>Start your on-the-job assignment.</strong> The dates are in your personal training plan.</li>
          <li><strong>Talk to your mentor.</strong> Bring your reflections (download them below) and your assignment plan to your next session.</li>
          <li><strong>Try Plan, Do, Review for two weeks.</strong> Notice what changes in your day.</li>
        </ol>` },
      { t: 'downloads' }
    ]},
    { title: 'Your Certificate', blocks: [ { t: 'certificate' } ] }
  ]}
];
