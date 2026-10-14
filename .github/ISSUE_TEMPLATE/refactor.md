---
name: refactor
about: Describe this issue template's purpose here.
title: 'refactor: '
labels: ''
assignees: ''

---

## Target
Which module / class / function, and what's wrong with it now (duplication, coupling, hard to test, etc.).

## Plan
- Step 1
- Step 2

## Behavior guarantee
Explicitly: no user-visible change. List any public interface that stays identical.

## Verification
- [ ] Existing tests pass unchanged
- [ ] Added tests for previously untested paths, if any

## Risk
Low / medium / high — and what could silently break.
