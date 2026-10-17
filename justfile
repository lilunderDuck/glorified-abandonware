build_peer_rating_sim:
  bun build ./scripts/libs/peer_rating_sim.ts --minify --target=browser --outfile=./docs/assets/peer_rating_sim.js

update_submission:
  bun ./ritual/00-submission-tracker/main.tsx

compile_05:
  bun ./ritual/05-gallery-js-w-template/main.tsx
  bun build ./ritual/05-gallery-js-w-template/pain.ts --bundle --minify --outfile ./docs/05-gallery-js-w-template/pain.js --format iife

compile_06:
  bun ./ritual/06-a-moment-of-time/main.tsx
  bun build ./ritual/06-a-moment-of-time/pain.ts --bundle --minify --outfile ./docs/06-a-moment-of-time/pain.js --format iife