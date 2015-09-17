export default function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}