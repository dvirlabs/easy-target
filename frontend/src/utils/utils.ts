import { Target } from "./types";

// export function targetToString (target: Target) {
//     return `${target.ip}:${target.port}`;
// }

export const targetToString = (target: Target): string => {
    return `${target.ip}:${target.port}`;
  };