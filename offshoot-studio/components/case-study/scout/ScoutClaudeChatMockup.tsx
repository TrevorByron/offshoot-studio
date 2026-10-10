'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import styles from './ScoutClaudeChatMockup.module.css';

const USER_MESSAGE =
  'You are a person at a trucking company responsible for making sure your fleet is being the most efficient with how they purchase fuel.\n\n' +
  'What are your primary jobs to be done? What does a day in your life look like. Tell me in the form of a narrative.';

const ASSISTANT_MESSAGE =
  `I pull into the office at 5:30 AM, before most of the drivers have even started their routes. The coffee's brewing, and I've got three monitors lighting up my desk in the pre-dawn darkness. This is my quiet time—the two hours where I can actually think before the phone starts ringing.

First thing I do is pull up yesterday's fuel transactions. Forty-seven trucks, scattered across I-80, I-40, and I-10. I'm scanning for the outliers—the guy who paid $4.12 per gallon in California when he passed three Flying J's where our fleet discount would've gotten him $3.67. There's always a few. Sometimes it's unavoidable; a driver's running low and has to take what they can get. But sometimes it's lazy routing, and that's money straight out of our margins.

I export the data into my spreadsheet—the one I've been building for three years that nobody else in the company really understands. It cross-references fuel prices by location, our negotiated rates at partner stations, average MPG by truck and driver, and optimal refueling points based on current routes. I'm looking for patterns. Why is Driver 23's fuel efficiency down 8% this month? Is it his driving style, or do we need to look at that truck's maintenance records?

By 7 AM, dispatch is calling. They want to add an urgent run from Memphis to Phoenix. My job is to tell them the most fuel-efficient way to do it. Which truck has the capacity and the best fuel economy? Where should they refuel? I pull up our partner network—we've got volume discounts with TA/Petro, Pilot Flying J, and Loves. I map three refueling stops that optimize for price and minimal detour. I send the route to the driver with the fuel stop sequence. Every mile off-route is a dollar wasted.

Mid-morning, I'm on the phone with our fuel card company. We've been seeing some weird charges—looks like a couple drivers are buying DEF at retail prices instead of using our bulk suppliers. Small stuff, maybe $30 a transaction, but it adds up. I flag it for the safety manager to address in the next driver meeting.

Then I'm analyzing our idling reports. The telematics system tracks every minute a truck sits with the engine running. I see Driver 8 idled for 4.2 hours yesterday. I call him. Turns out he was stuck at a shipper's warehouse waiting for a late load. Not his fault, but I make a note—we need to talk to that customer about detention time. Idling burns about a gallon an hour. That's $15-20 we're losing because someone else can't get their act together.

Lunch is at my desk because I'm preparing for the afternoon's main event: our weekly fuel bid review. We run about 850,000 miles a month, burning roughly 100,000 gallons. Fuel is 35-40% of our operating costs. I've got proposals from three fuel management companies who promise better rates, better coverage, better reporting. I'm skeptical. I've heard it all before. But I run the numbers anyway, comparing their claimed savings against our actual consumption patterns. If someone can legitimately save us even 3 cents per gallon, that's $3,000 a month. Worth the meeting.

The afternoon is spent on strategic planning. Winter's coming, which means different fuel blends, different pricing, different route considerations. I'm building next quarter's fuel budget forecast. I factor in the Department of Energy's diesel price projections, our planned mileage increases, three new trucks coming into the fleet, and historical seasonal variations. The CFO needs this by Friday, and it needs to be accurate within 5% or I'll hear about it for the next three months.

Around 4 PM, a driver calls me directly. He's in rural Wyoming, his fuel light just came on, and the next truck stop is 67 miles away. I pull up his route, check his tank capacity and recent MPG, and do the math. He'll make it, but it'll be close. I tell him to drop to 55 mph, minimize his AC use, and head straight there. I also make a note—we need to review this route. Nobody should be cutting it that close.

Before I leave, I update the dashboard I present at Monday's operations meeting. Current average cost per mile for fuel: $1.23. Month-to-date variance from budget: -2.3% (we're under, which is good). Year-over-year fuel efficiency improvement: 4.7%. These numbers tell the story of whether I'm doing my job or not.

I shut down at 6 PM. Tomorrow I'll be in early again, doing the same dance. Hunting for pennies that become thousands. Optimizing routes that save minutes and gallons. Negotiating with vendors who all promise the moon. Training drivers who don't always understand why it matters where they fill up.

My job is invisible when it's done right. Nobody celebrates the money we didn't spend. But I know the truth: in an industry where profit margins are razor-thin, I'm the difference between a profitable quarter and a bloodbath. Every gallon matters. Every mile counts.`;

const CHIPS: { id: string; label: string; kind: 'code' | 'learn' | 'write' | 'life' | 'spark' }[] = [
  { id: 'code', label: 'Code', kind: 'code' },
  { id: 'learn', label: 'Learn', kind: 'learn' },
  { id: 'write', label: 'Write', kind: 'write' },
  { id: 'ops', label: 'Ops', kind: 'life' },
  { id: 'suggest', label: 'Suggest', kind: 'spark' },
];

type Phase = 'idle' | 'typing' | 'awaitingSend' | 'sent' | 'thinking' | 'reply' | 'done';
type Theme = 'dark' | 'light';

type ScoutClaudeChatMockupProps = {
  userMessage?: string;
  assistantMessage?: string;
  theme?: Theme;
  activationIndex?: number;
  headerTitle?: string;
  headerMeta?: string;
  ariaLabel?: string;
  awaitingSendHint?: string;
};

/** Assistant stream — slightly quicker than the user pass. */
function assistantTypingDelayMs(prevChar: string, nextChar: string | undefined): number {
  if (nextChar === '\n') return 28 + Math.random() * 22;
  if (prevChar === '\n') return 18 + Math.random() * 18;
  if (/[.?!]/.test(prevChar)) return 20 + Math.random() * 55;
  if (prevChar === ' ') return 8 + Math.random() * 14;
  if (/[,:;]/.test(prevChar)) return 14 + Math.random() * 28;
  return 6 + Math.random() * 13;
}

/** User typing — deliberately slower and more human. */
function userTypingDelayMs(prevChar: string, nextChar: string | undefined): number {
  if (nextChar === '\n') return 55 + Math.random() * 45;
  if (prevChar === '\n') return 40 + Math.random() * 38;
  if (/[.?!]/.test(prevChar)) return 55 + Math.random() * 95;
  if (prevChar === ' ') return 22 + Math.random() * 36;
  if (/[,:;]/.test(prevChar)) return 32 + Math.random() * 48;
  return 18 + Math.random() * 32;
}

/** Entire mockup (composer + thread) fits inside the viewport with a small inset. */
function isFullyInViewport(el: HTMLElement, inset = 8): boolean {
  const r = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return (
    r.top >= inset &&
    r.left >= inset &&
    r.bottom <= vh - inset &&
    r.right <= vw - inset
  );
}

function ChipGlyph({ kind }: { kind: (typeof CHIPS)[number]['kind'] }) {
  const c = styles.chipSvg;
  const stroke = 'currentColor' as const;
  switch (kind) {
    case 'code':
      return (
        <svg className={c} viewBox="0 0 12 12" aria-hidden>
          <path
            d="M3.5 9 1 6l2.5-3M8.5 3 11 6l-2.5 3M7 2l-2 8"
            fill="none"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'learn':
      return (
        <svg className={c} viewBox="0 0 12 12" aria-hidden>
          <path
            d="M2 5 6 3l4 2v4.5a.5.5 0 0 1-.25.43L6 11l-3.75-1.62A.5.5 0 0 1 2 8.95z"
            fill="none"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d="M6 6v5" fill="none" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case 'write':
      return (
        <svg className={c} viewBox="0 0 12 12" aria-hidden>
          <path
            d="m8 2 2 2-5 5H5V7zM3 10h6"
            fill="none"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'life':
      return (
        <svg className={c} viewBox="0 0 12 12" aria-hidden>
          <path
            d="M3 9V5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4"
            fill="none"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path d="M2.5 9h7" fill="none" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
          <path d="M4 3V2M6 2.5V1M8 3V2" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'spark':
      return (
        <svg className={c} viewBox="0 0 12 12" aria-hidden>
          <path
            d="M6 1v2M6 9v2M1 6h2M9 6h2M2.5 2.5l1.4 1.4M8.1 8.1l1.4 1.4M9.5 2.5 8.1 3.9M2.5 9.5l1.4-1.4"
            fill="none"
            stroke={stroke}
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="6" cy="6" r="2.2" fill="none" stroke={stroke} strokeWidth="1.1" />
        </svg>
      );
    default:
      return null;
  }
}

function AudioBars() {
  return (
    <span className={styles.audioIcon} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={styles.audioBar} />
      ))}
    </span>
  );
}

export default function ScoutClaudeChatMockup({
  userMessage = USER_MESSAGE,
  assistantMessage = ASSISTANT_MESSAGE,
  theme = 'dark',
  activationIndex = 0,
  headerTitle = 'Research',
  headerMeta = 'Discovery',
  ariaLabel = 'Simulated chat: the prompt types into the composer; after you click Send, the assistant streams a first-person fleet fuel manager narrative.',
  awaitingSendHint = 'Click Send for a first-person day in fleet fuel operations',
}: ScoutClaudeChatMockupProps) {
  const composerId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);
  const composerScrollRef = useRef<HTMLDivElement | null>(null);
  const hasRunRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const phaseRef = useRef<Phase>('idle');
  /** Last intersection ratio for the mockup root (fallback if rect checks are flaky). */
  const visibleRatioRef = useRef(0);

  const [phase, setPhase] = useState<Phase>('idle');
  phaseRef.current = phase;
  const [composerText, setComposerText] = useState('');
  const [threadUserText, setThreadUserText] = useState('');
  const [assistantText, setAssistantText] = useState('');

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const runReducedMotion = useCallback(() => {
    clearTimers();
    hasRunRef.current = true;
    setPhase('awaitingSend');
    setComposerText(userMessage);
    setThreadUserText('');
    setAssistantText('');
  }, [clearTimers, userMessage]);

  const runAssistantStream = useCallback(() => {
    setPhase('reply');
    let j = 0;
    const typeAssistant = () => {
      if (j < assistantMessage.length) {
        setAssistantText(assistantMessage.slice(0, j + 1));
        j += 1;
        const prevA = assistantMessage[j - 1];
        const nextA = assistantMessage[j];
        schedule(typeAssistant, assistantTypingDelayMs(prevA, nextA));
      } else {
        setPhase('done');
      }
    };
    typeAssistant();
  }, [assistantMessage, schedule]);

  const handleSendClick = useCallback(() => {
    if (phaseRef.current !== 'awaitingSend') return;
    clearTimers();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      setThreadUserText(userMessage);
      setComposerText('');
      setAssistantText(assistantMessage);
      return;
    }
    setPhase('sent');
    schedule(() => {
      setThreadUserText(userMessage);
      setComposerText('');
      setPhase('thinking');
    }, 640);
    schedule(() => {
      runAssistantStream();
    }, 1080);
  }, [assistantMessage, clearTimers, runAssistantStream, schedule, userMessage]);

  const runSequence = useCallback(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    clearTimers();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      runReducedMotion();
      return;
    }

    setPhase('typing');
    setComposerText('');
    setThreadUserText('');
    setAssistantText('');

    let i = 0;
    const typeUser = () => {
      if (i < userMessage.length) {
        setComposerText(userMessage.slice(0, i + 1));
        i += 1;
        const prev = userMessage[i - 1];
        const next = userMessage[i];
        schedule(typeUser, userTypingDelayMs(prev, next));
        return;
      }
      setPhase('awaitingSend');
    };

    /** Pause before first keystroke so the reader can land on the panel. */
    schedule(typeUser, 820);
  }, [clearTimers, runReducedMotion, schedule, userMessage]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Prefer the case-study modal scroll container when present; otherwise viewport.
    const scrollRoot =
      (root.closest('[data-case-study-scroll]') as Element | null) ?? null;
    const slide = root.closest('.ss-img');
    if (slide && slide.getAttribute('data-index') !== String(activationIndex)) return undefined;

    const isMockupReady = () =>
      isFullyInViewport(root) || visibleRatioRef.current >= 0.55;

    const maybeStart = () => {
      if (slide && !slide.classList.contains('active')) return;
      if (!isMockupReady()) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        runReducedMotion();
        return;
      }
      runSequence();
    };

    const mo = slide
      ? new MutationObserver(() => {
          requestAnimationFrame(maybeStart);
        })
      : null;
    mo?.observe(slide!, { attributes: true, attributeFilter: ['class'] });

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e) visibleRatioRef.current = e.intersectionRatio;
        requestAnimationFrame(maybeStart);
      },
      {
        root: scrollRoot,
        threshold: [0, 0.25, 0.5, 0.55, 0.75, 0.9, 1],
      }
    );
    io.observe(root);

    const tReassertA = window.setTimeout(maybeStart, 0);
    const tReassertB = window.setTimeout(maybeStart, 120);

    const onScrollOrResize = () => {
      requestAnimationFrame(maybeStart);
    };
    const scrollTarget = scrollRoot ?? window;
    scrollTarget.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.clearTimeout(tReassertA);
      window.clearTimeout(tReassertB);
      mo?.disconnect();
      io.disconnect();
      scrollTarget.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      clearTimers();
      hasRunRef.current = false;
      visibleRatioRef.current = 0;
    };
  }, [activationIndex, clearTimers, runReducedMotion, runSequence]);

  const showThinking = phase === 'thinking';
  const showThreadUser = threadUserText.length > 0;
  const showAssistant = assistantText.length > 0 || phase === 'reply';

  const showComposerCaret =
    phase === 'typing' ||
    phase === 'awaitingSend' ||
    (phase === 'sent' && composerText.length > 0);
  const showIdleHeroPlaceholder = composerText.length === 0 && phase === 'idle';
  const showComposerPlaceholder =
    composerText.length === 0 &&
    (phase === 'thinking' || phase === 'reply' || phase === 'done');
  const showFollowUpCaret =
    showComposerPlaceholder && (phase === 'thinking' || phase === 'reply' || phase === 'done');

  useLayoutEffect(() => {
    const el = composerScrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [composerText, showIdleHeroPlaceholder, showComposerPlaceholder, showFollowUpCaret]);

  useLayoutEffect(() => {
    const el = threadRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [assistantText, threadUserText, phase]);

  const hintText =
    phase === 'sent'
      ? 'Sending…'
      : phase === 'typing'
        ? 'Question is typing — click Send when you are ready'
        : phase === 'awaitingSend'
          ? awaitingSendHint
          : phase === 'thinking'
            ? 'Assistant is responding…'
            : phase === 'reply'
              ? 'Streaming reply…'
              : 'Keep going — your next message goes here.';

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${theme === 'light' ? styles.rootLight : ''}`}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.headerTitle}>{headerTitle}</span>
        </div>
        <span className={styles.headerMeta}>{headerMeta}</span>
      </div>

      <div ref={threadRef} className={styles.thread}>
        {showThreadUser ? <div className={styles.userBubble}>{threadUserText}</div> : null}
        {showThinking ? (
          <div className={styles.assistantWrap}>
            <span className={styles.assistantAvatar} aria-hidden />
            <div className={styles.thinking} aria-hidden>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        ) : null}
        {showAssistant ? (
          <div className={styles.assistantWrap}>
            <span className={styles.assistantAvatar} aria-hidden />
            <div className={styles.assistantBubble}>
              {assistantText}
              {phase === 'reply' && assistantText.length < assistantMessage.length ? (
                <span className={styles.caret} aria-hidden />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.composerDock}>
        <label className={styles.srOnly} htmlFor={composerId}>
          Message composer
        </label>
        <div className={styles.composerCard}>
          <div
            id={composerId}
            ref={composerScrollRef}
            className={styles.composerMain}
            role="textbox"
            aria-multiline="true"
            aria-readonly="true"
            tabIndex={0}
          >
            <div className={styles.composerInner}>
              {showIdleHeroPlaceholder ? (
                <span className={styles.placeholderHero}>How can I help you today?</span>
              ) : null}
              {composerText}
              {showComposerCaret ? <span className={styles.caret} aria-hidden /> : null}
              {showComposerPlaceholder ? (
                <>
                  <span className={styles.placeholder}>Reply to continue the conversation…</span>
                  {showFollowUpCaret ? <span className={styles.caretMuted} aria-hidden /> : null}
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.composerToolbar}>
            <button type="button" className={styles.attachBtn} aria-label="Add attachment">
              +
            </button>
            {(phase === 'typing' || phase === 'awaitingSend' || phase === 'sent') && (
              <button
                type="button"
                className={
                  phase === 'awaitingSend' ? `${styles.send} ${styles.sendActive}` : styles.send
                }
                disabled={phase !== 'awaitingSend'}
                onClick={handleSendClick}
                aria-label="Send message"
              >
                Send
              </button>
            )}
            <div className={styles.toolbarRight}>
              <span className={styles.modelPill}>
                Balanced <span className={styles.chev}>▾</span>
              </span>
              <AudioBars />
            </div>
          </div>
        </div>

        <div className={styles.chipsRow}>
          {CHIPS.map((chip) => (
            <span key={chip.id} className={styles.chip}>
              <ChipGlyph kind={chip.kind} />
              {chip.label}
            </span>
          ))}
        </div>

        <p className={styles.composerHint}>{hintText}</p>
      </div>
    </div>
  );
}
