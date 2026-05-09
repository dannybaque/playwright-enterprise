# 🎭 Playwright Enterprise

A production-grade Playwright test automation framework built with enterprise best practices — reusability, scalability, and CI/CD integration.

---

## Stack

- **Playwright** — latest
- **TypeScript**
- **GitHub Actions** — CI/CD with sharding
- **Claude Code + Playwright Agents** — AI-powered test generation

---

## Project Structure

```
playwright-enterprise/
├── pages/                  # Page Object Model
│   ├── BasePage.ts
│   └── HomePage.ts
├── tests/
│   ├── fixtures/           # Custom reusable fixtures
│   │   └── index.ts
│   ├── navigation.spec.ts
│   ├── assertions.spec.ts
│   ├── home.spec.ts
│   ├── home-fixture.spec.ts
│   ├── isolation.spec.ts
│   └── steps.spec.ts
├── specs/                  # AI Planner test plans (Markdown)
├── .claude/agents/         # Playwright Agents definitions
│   ├── playwright-test-planner.md
│   ├── playwright-test-generator.md
│   └── playwright-test-healer.md
├── .github/
│   └── workflows/
│       └── playwright.yml  # CI with sharding
├── playwright.config.ts
└── .mcp.json
```

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm

### Install

```bash
git clone https://github.com/<your-username>/playwright-enterprise.git
cd playwright-enterprise
npm ci
npx playwright install
```

### Environment Setup

Create a `.env` file in the root:

```
BASE_URL=https://playwright.dev
```

> `.env` is gitignored — never commit it.

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific file
npx playwright test navigation.spec.ts

# Run only Chromium
npx playwright test --project=chromium

# Run with UI Mode (development)
npx playwright test --ui

# Run with headed browser
npx playwright test --headed

# Detect flaky tests
npx playwright test --repeat-each=3
```

---

## Debugging

```bash
# Open last HTML report
npx playwright show-report

# Run with trace always on
npx playwright test --trace on
```

---

## CI/CD

GitHub Actions workflow runs on every push and pull request to `master`.

- **Sharding** — 2 parallel machines for faster execution
- **Retries** — 2 retries on CI to handle flakiness
- **Artifacts** — HTML report uploaded on every run

```bash
# Workflow location
.github/workflows/playwright.yml
```

---

## Playwright AI Agents

This project includes the three Playwright Agents for AI-powered test automation:

| Agent | Description |
|---|---|
| **Planner** | Explores the app and generates a test plan in Markdown |
| **Generator** | Converts the plan into executable `.spec.ts` files |
| **Healer** | Analyzes failing tests and repairs broken locators automatically |

### Initialize agents

```bash
npx playwright init-agents --loop=claude
```

### Run the Planner

```bash
# Inside Claude Code
/agents → playwright-test-planner
```

---

## Playwright MCP

Control the browser with natural language via Claude Desktop.

### Setup

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

---

## Key Conventions

- `getByRole`, `getByLabel`, `getByTestId` — no CSS selectors, no XPath
- `toHaveURL(/regex/)` — regex over exact strings for environment flexibility
- `baseURL` from environment variable — works across dev, staging, prod
- `test.step()` — group actions in traces for readability
- Conventional Commits — `feat:`, `fix:`, `test:`, `chore:`, `ci:`

---

## License

MIT