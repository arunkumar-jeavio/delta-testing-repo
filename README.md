# delta-testing-repo

A deliberately small **login application** used as a *mock product* to test release-delta detection in the
QA AI Nexus framework. It is a stand-in for a real product repository: the interesting part is its **git history**
— features added, behaviour modified, a directory removed, a rename, a hotfix on a released line and a late fix
during regression — not the application itself.

All accounts are fake demo accounts (see `src/auth/users.js`). Nothing here is a real credential.

```
npm test      # unit tests (node:test, no dependencies)
npm start     # http://localhost:3000
```

Releases follow the same shape as the real product: `release/vX.Y.Z` branches, pull-request merges, the release
merged into `main`, and the tag `vX.Y.Z` on that merge.
