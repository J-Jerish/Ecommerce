import * as fs from 'fs';
import * as path from 'path';

export const STATE_DIR = path.join(__dirname, '..', 'state');
export const AUTH_STATE = path.join(STATE_DIR, 'auth-state.json');

export function ensureStateDir(): void {
  if (!fs.existsSync(STATE_DIR)) {
    fs.mkdirSync(STATE_DIR, { recursive: true });
  }
}

export function readState<T>(filename: string): T {
  ensureStateDir();
  const filePath = path.join(STATE_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `State file not found: ${filePath}\nRun the previous flows in order first.`
    );
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

export function writeState(filename: string, data: unknown): void {
  ensureStateDir();
  fs.writeFileSync(path.join(STATE_DIR, filename), JSON.stringify(data, null, 2));
}

export function stateExists(filename: string): boolean {
  return fs.existsSync(path.join(STATE_DIR, filename));
}
