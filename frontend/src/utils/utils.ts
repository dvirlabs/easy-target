import { Target } from "./types";

export function targetToString (target: Target) {
    return `${target.ip}:${target.port}`;
}