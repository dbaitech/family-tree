import { BalkanNode } from "@/types/types";

export function convertToBalkan(nodes: BalkanNode[]): BalkanNode[] {
  return nodes.map((node) => ({
    ...node,

    // safety normalization (optional but recommended)
    pids: node.pids ?? [],
  }));
}
