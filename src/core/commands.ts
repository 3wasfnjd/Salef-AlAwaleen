/**
 * Commands the character carries out when the player asks (Gemini Live
 * function calls). Mirrors server/src/tools.ts; a unit test keeps them in sync.
 */
export const COMMAND_ENUMS = {
  move: { key: 'action', values: ['come', 'stay', 'follow', 'circle'] },
  pose: { key: 'pose', values: ['sit', 'stand'] },
  gesture: { key: 'gesture', values: ['wave', 'celebrate', 'dance', 'spin'] },
  celebration: { key: 'kind', values: ['bubble', 'firework', 'water', 'confetti'] },
  change_place: { key: 'place', values: ['majlis', 'fereej', 'barr'] },
} as const;

type Enums = typeof COMMAND_ENUMS;
export type CommandName = keyof Enums;
export type CharacterCommand = {
  [N in CommandName]: { name: N; value: Enums[N]['values'][number] };
}[CommandName];

export type MoveAction = Enums['move']['values'][number];
export type GestureName = Enums['gesture']['values'][number];

/** What the app tells the model back: did it happen, and if not, why (in words it can repeat). */
export interface CommandResult {
  ok: boolean;
  note?: string;
}

/** Validates a function call from the model; unknown names or values give null. */
export function parseCommand(name: string, args: unknown): CharacterCommand | null {
  if (!(name in COMMAND_ENUMS)) return null;
  const spec = COMMAND_ENUMS[name as CommandName];
  const value = (args as Record<string, unknown> | null)?.[spec.key];
  if (typeof value !== 'string' || !(spec.values as readonly string[]).includes(value)) return null;
  return { name, value } as CharacterCommand;
}
