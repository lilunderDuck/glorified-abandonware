build_peer_rating_sim:
  bun build ./scripts/libs/peer_rating_sim.ts --minify --target=browser --outfile=./docs/assets/peer_rating_sim.js

compile_05:
  bun ./ritual/05-gallery-js-w-template/main.tsx
  bun build ./ritual/05-gallery-js-w-template/pain.ts --bundle --minify --outfile ./docs/05-gallery-js-w-template/pain.js --format iife