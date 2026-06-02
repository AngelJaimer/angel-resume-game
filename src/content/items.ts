// This résumé game is exploration-only — there is no inventory puzzle, so no
// items are ever created. `makeItem` is kept because the engine imports it.
export interface Item {
  id: string;
  name: string;
  draw?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
}

export function makeItem(id: string): Item {
  return { id, name: id, draw: undefined };
}
