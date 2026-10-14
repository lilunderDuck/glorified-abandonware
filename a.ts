const cached: Record<string, string> = {}

function solve(n: number): bigint {
  if (n === 0) return 4n;
  if (n === 1) return 9n;

  let prev2 = 4n; // a_{n-2}
  let prev1 = 9n; // a_{n-1}
  let current = 0n;

  for (let i = 2; i <= n; i++) {
    current = prev1 * prev2 + 1n;
    prev2 = prev1;
    prev1 = current;
  }

  return current;
}

console.log(solve(2))