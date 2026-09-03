# General

## Rule 1 — Do not disable ESLint rules inline

Never silence ESLint with per-line comments (`// eslint-disable-next-line ...`). If a rule is systematically wrong for the project, disable it globally in `eslint.config.js` with a comment explaining why.

**Bad:**
```tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => { fetchExercises(filters); }, []);
```

**Good — fix the code:**
```tsx
useEffect(() => { fetchExercises(filters); }, [JSON.stringify(filters)]);
```

**Good — disable globally with a reason:**
```js
// eslint.config.js
rules: {
    // <why this rule does not fit the project>
    'react-hooks/exhaustive-deps': 'off',
},
```

**Exception:** a genuine one-off (e.g. required external SDK behavior). The inline disable must be accompanied by a comment stating why.
