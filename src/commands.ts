import type { CharacterCommand, CommandResult } from './core/commands';
import type { EnvironmentId } from './scene/environments';
import type { SceneApp } from './scene/SceneApp';
import type { XRExperience } from './xr/XRExperience';

const SPIN_SECONDS = 1.1;

/**
 * Carries out the character's voice commands. The headset handles movement
 * and celebrations (XRExperience.command); gestures, sitting and the place
 * work the same on the page and in the majlis. Each result goes back to the
 * model, which then comments in its own words (or explains why not).
 */
export class CommandRunner {
  private spin = -1;

  constructor(
    private readonly app: SceneApp,
    private readonly xr: XRExperience,
    private readonly setEnvironment: (id: EnvironmentId) => unknown,
  ) {
    app.onFrame((dt) => this.updateSpin(dt));
  }

  readonly run = (cmd: CharacterCommand): CommandResult => {
    const inXr = this.xr.command(cmd);
    if (inXr) return inXr;
    switch (cmd.name) {
      case 'move':
        return { ok: false, note: 'Walking along with the player works in the headset, in mixed reality.' };
      case 'pose':
        this.app.setPosture(cmd.value === 'sit' ? 'seated' : 'standing');
        return { ok: true };
      case 'gesture':
        return this.gesture(cmd.value);
      case 'celebration':
        return { ok: false, note: 'The celebrations (bubbles, fireworks…) show in the headset.' };
      case 'change_place':
        void this.setEnvironment(cmd.value);
        return { ok: true };
    }
  };

  private gesture(g: CharacterCommand['value']): CommandResult {
    const rig = this.app.character;
    if (!rig) return { ok: false, note: 'not ready yet' };
    if (g === 'spin') {
      this.spin = 0;
      return { ok: true };
    }
    const move = g as 'wave' | 'celebrate' | 'dance';
    if (rig.perform?.(move)) return { ok: true };
    // Standing clips: get up first if sitting.
    if (this.app.currentPosture === 'seated') {
      this.app.setPosture('standing');
      if (rig.perform?.(move)) return { ok: true, note: 'stood up to do it' };
    }
    // No such animation for this character: a happy reaction instead.
    this.app.behavior.dispatch({ type: 'react' }, performance.now());
    return { ok: true, note: `no ${move} animation, so a happy reaction instead` };
  }

  private updateSpin(dt: number): void {
    const obj = this.app.character?.object;
    if (this.spin < 0 || !obj) return;
    this.spin += dt / SPIN_SECONDS;
    const p = Math.min(1, this.spin);
    obj.rotation.y = Math.PI * 2 * (p * p * (3 - 2 * p));
    if (p >= 1) {
      obj.rotation.y = 0;
      this.spin = -1;
    }
  }
}
