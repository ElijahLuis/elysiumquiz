# Elysium Quiz - Automated Testing System

This directory contains a comprehensive automated testing system for validating quiz congruency and accuracy.

## Quick Start

```bash
# Run all tests (except semantic)
npm test

# Run specific test suites
npm run test:unit          # Unit tests for scoring functions
npm run test:congruency    # Congruency tests for all trio combinations
npm run test:semantic      # AI-powered semantic validation (requires ANTHROPIC_API_KEY)

# Run with interactive UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Suites

### 1. Unit Tests (`tests/unit/`)
Tests individual scoring functions for mathematical correctness.

- **File:** `scoring.test.ts`
- **Tests:** 19
- **Purpose:** Validate scoring algorithm functions

### 2. Data Validation Tests (`tests/data/`)
Validates structural integrity of quiz data.

- **Files:** `questions.test.ts`, `realms.test.ts`, `trioInsights.test.ts`
- **Tests:** 32
- **Purpose:** Ensure all data is properly structured

### 3. Congruency Tests (`tests/congruency/`)
Tests answer-to-result accuracy across all realm combinations.

- **Files:** `single-realm.test.ts`, `trio-realm.test.ts`
- **Tests:** 600+
- **Purpose:** Validate that quiz produces expected results

### 4. Semantic Validation (`tests/semantic/`)
AI-powered validation of trio insight appropriateness.

- **File:** `trio-insights.test.ts`
- **Tests:** 120 trio insights
- **Purpose:** Ensure insights match realm themes
- **Requires:** `ANTHROPIC_API_KEY` environment variable

## Test Infrastructure

### Quiz Simulator (`tests/helpers/quiz-simulator.ts`)
Programmatically generates quiz answers for testing:

```typescript
import { simulateSingleRealmQuiz, simulateTrioQuiz } from './helpers/quiz-simulator';

// Generate answers that maximize a single realm
const answers = simulateSingleRealmQuiz('abyss');

// Generate answers for a specific trio (50-30-20 split)
const trioAnswers = simulateTrioQuiz('abyss', 'cavern', 'dross');
```

### Answer Pattern Generator (`tests/helpers/generators.ts`)
Generates all possible test combinations:

```typescript
import { generateAllTrioRealmPatterns } from './helpers/generators';

// Generate all 120 trio combinations
const patterns = generateAllTrioRealmPatterns();
```

### Validators (`tests/helpers/validators.ts`)
Validates quiz results for correctness:

```typescript
import { validateQuizResult } from './helpers/validators';

const validation = validateQuizResult(answers, result);
// Returns: { passed, errors, warnings, details }
```

### Semantic Validator (`tests/helpers/semantic-validator.ts`)
AI-powered validation of trio insights:

```typescript
import { validateTrioInsightSemantically } from './helpers/semantic-validator';

const result = await validateTrioInsightSemantically('abyss', 'cavern', 'dross', insight);
// Returns: { trioKey, isAppropriate, reasoning, confidence, suggestions }
```

## Key Findings

### ✅ Successes
- **693/716 tests passing (96.8%)**
- All scoring functions mathematically correct
- All data structurally valid
- All 10 realms reachable as primary
- Results are deterministic

### ⚠️ Discovered Issues
- **23 out of 120 trio combinations** are difficult/impossible to achieve
- Realms `abyss` and `glare` are over-represented in question weights
- Some realms (`ember`, `trace`, `zenith`, `oasis`) are under-represented in certain contexts

## Interpreting Test Results

### Passing Tests
Tests pass when:
- Scores are mathematically correct
- Expected realms appear in results (when achievable)
- All validations pass
- Results are deterministic

### Failing Tests
Tests fail when:
- Targeted trio combination cannot be achieved
- Indicates question weight imbalance
- **Not a bug** - reveals design issue

## Recommendations

Based on test results:

1. **Rebalance question weights** to make all 120 trios reachable
2. **Monitor production trio distribution** to see which trios users actually receive
3. **Run semantic validation** (optional) to ensure insights are appropriate

## Reports

Test results and detailed findings are saved to:
- [test-reports/TESTING_SUMMARY.md](../test-reports/TESTING_SUMMARY.md) - Comprehensive test summary
- `test-reports/semantic-validation-report.md` - Semantic validation results (after running)
- `test-reports/semantic-cache.json` - Cached semantic validation results

## Adding New Tests

### Example: Test a specific answer pattern

```typescript
import { describe, it, expect } from 'vitest';
import { determineResult } from '../../src/utils/scoring';
import type { Answer } from '../../src/data/types';

describe('Custom Quiz Pattern', () => {
  it('should produce expected result for my answer pattern', () => {
    const answers: Answer[] = [
      {
        questionId: 'q1',
        value: 'q1a',
        realmWeights: { abyss: 3, glare: 1 }
      },
      // ... more answers
    ];

    const result = determineResult(answers);

    expect(result.primaryRealm).toBe('abyss');
    expect(result.primaryScore).toBeGreaterThan(50);
  });
});
```

## Performance

- **Unit tests:** < 1 second
- **Data validation:** < 1 second
- **Congruency tests:** ~2-3 seconds
- **Semantic validation:** ~2-5 minutes (with API rate limiting)

## Continuous Integration

To run in CI/CD:

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: |
    npm install
    npm run test:unit
    npm run test:congruency
    # Skip semantic tests in CI (requires API key)
```

## Support

For issues or questions about the testing system:
1. Check [TESTING_SUMMARY.md](../test-reports/TESTING_SUMMARY.md) for detailed findings
2. Review test output for specific error messages
3. Examine `tests/helpers/` for available utilities
