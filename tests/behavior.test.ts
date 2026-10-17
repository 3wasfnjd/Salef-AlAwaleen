import { describe, expect, it } from 'vitest';
import { BehaviorMachine, TRANSIENT_MS } from '../src/core/behavior';

describe('BehaviorMachine', () => {
  it('runs a normal question/answer turn', () => {
    const m = new BehaviorMachine();
    expect(m.dispatch({ type: 'userStartedSpeaking' }, 0)).toBe('listening');
    expect(m.dispatch({ type: 'userStoppedSpeaking' }, 100)).toBe('thinking');
    expect(m.dispatch({ type: 'responseStarted', story: false }, 200)).toBe('speaking');
    expect(m.dispatch({ type: 'responseFinished' }, 900)).toBe('idle');
  });

  it('enters storytelling for stories', () => {
    const m = new BehaviorMachine();
    m.dispatch({ type: 'responseStarted', story: true }, 0);
    expect(m.state).toBe('storytelling');
  });

  it('handles an interruption while storytelling, then listens', () => {
    const m = new BehaviorMachine();
    m.dispatch({ type: 'responseStarted', story: true }, 0);
    expect(m.dispatch({ type: 'userStartedSpeaking' }, 50)).toBe('interrupted');
    m.update(50 + TRANSIENT_MS.interrupted - 1);
    expect(m.state).toBe('interrupted');
    m.update(50 + TRANSIENT_MS.interrupted);
    expect(m.state).toBe('listening');
    expect(m.dispatch({ type: 'userStoppedSpeaking' }, 2000)).toBe('thinking');
  });

  it('goes to thinking if the user stops during the interrupted state', () => {
    const m = new BehaviorMachine();
    m.dispatch({ type: 'responseStarted', story: false }, 0);
    m.dispatch({ type: 'userStartedSpeaking' }, 10);
    expect(m.dispatch({ type: 'userStoppedSpeaking' }, 20)).toBe('thinking');
  });

  it('ignores events that are invalid for the current state', () => {
    const m = new BehaviorMachine();
    expect(m.dispatch({ type: 'responseFinished' }, 0)).toBe('idle');
    expect(m.dispatch({ type: 'userStoppedSpeaking' }, 0)).toBe('idle');
  });

  it('returns from reacting to idle', () => {
    const m = new BehaviorMachine();
    m.dispatch({ type: 'react' }, 0);
    m.update(TRANSIENT_MS.reacting);
    expect(m.state).toBe('idle');
  });

  it('emits change events once per transition', () => {
    const m = new BehaviorMachine();
    const seen: string[] = [];
    m.on('change', ({ from, to }) => seen.push(`${from}>${to}`));
    m.dispatch({ type: 'userStartedSpeaking' }, 0);
    m.dispatch({ type: 'userStartedSpeaking' }, 1);
    expect(seen).toEqual(['idle>listening']);
  });
});
