import type { Room } from '../engine/types';
import { LOBBY } from './lobby';
import { ELEVATOR } from './elevator';
import { OUTSIDE } from './outside';
import { BIGTECH } from './bigtech';
import { SCALEUPS } from './scaleups';
import { STARTUP } from './startup';
import { BASEMENT } from './basement';
import { ROOFTOP } from './rooftop';

// Register every room here, keyed by its id. Exits reference these ids.
export const ROOMS: Record<string, Room> = {
  lobby: LOBBY,
  elevator: ELEVATOR,
  outside: OUTSIDE,
  bigtech: BIGTECH,
  scaleups: SCALEUPS,
  startup: STARTUP,
  basement: BASEMENT,
  rooftop: ROOFTOP,
};

// The room the game opens in.
export const START_ROOM = 'lobby';
