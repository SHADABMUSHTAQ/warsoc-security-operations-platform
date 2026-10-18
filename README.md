# WarSOC — AI Event Triage Hackathon Prototype

WarSOC is a security-operations interface for reviewing security events and investigating activity. This repository also includes **AI Event Triage**, a browser-based machine-learning demonstration prepared for the **NYLP AI Hackathon 2026**. The public AI demo works without a backend or API key; the wider operations dashboard requires a compatible backend, configured services, and an authenticated account.

> **Project scope and originality:** The wider WarSOC interface and backend predate this hackathon. The AI Event Triage module is the hackathon addition. This submission does not present the entire pre-existing platform as newly built during the event. The AI demo is a prototype, not a production security service.

## Links and repository layout

| Resource | Link |
| --- | --- |
| Live frontend | [warsoc-push.vercel.app](https://warsoc-push.vercel.app) |
| Public AI demo | [AI Event Triage](https://warsoc-push.vercel.app/ai-triage) |
| Frontend source | [`main` branch](https://github.com/SHADABMUSHTAQ/warsoc-security-operations-platform/tree/main) |
| Backend source | [`backend` branch](https://github.com/SHADABMUSHTAQ/warsoc-security-operations-platform/tree/backend) |
| Demo video | [WarSOC prototype video](https://drive.google.com/file/d/1J6ub8Lq19fWRBT4GS7oCmsKRRuj_iJNQ/view?usp=drive_link) |
| Screenshots | [Screenshots folder](https://drive.google.com/drive/folders/1dDt14YzKwhN2o6GRvJgQjeyOIvKDqihJ?usp=drive_link) |

The live Vercel deployment is a frontend deployment. It does not host the FastAPI backend. The home page and `/ai-triage` are public; protected dashboard routes require a working backend and login. The home-page dashboard artwork is an illustrative preview, not a live telemetry feed.

## Problem statement

Security teams receive short, noisy event descriptions from different systems. An analyst must decide what to investigate first, but raw event text is often difficult to sort quickly. For a small team, even an initial grouping can make review more structured, provided the suggestion is transparent and checked by a human.

## Proposed solution and intended users

AI Event Triage lets a user enter a short, **non-sensitive** security-event description or select a synthetic example. A small local text classifier suggests one of four review categories and shows indicative words and known-word coverage. It then gives a category-specific prompt for the analyst's next checks. Intended users are students, security learners, and analysts exploring a lightweight triage workflow. The broader WarSOC UI shows how incident, endpoint, evidence, and compliance workflows could fit around such a capability when connected to a backend.

The hackathon demonstration is deliberately modest: it shows a real, working classification flow rather than claiming automated incident response or production detection.

## Features and current status

- **Working without backend:** public landing page and AI Event Triage at `/ai-triage`.
- **AI demo:** four sample inputs, custom text input, local classification, indicative words, known-word coverage, and analyst-review guidance.
- **Backend-dependent UI:** login, dashboard, log and incident views, endpoint views, evidence cases, legal holds, and compliance views. These are not presented as populated or functional in the standalone frontend deployment.
- **No fabricated operational data:** the public build does not bundle fake dashboard, endpoint, evidence, or compliance records. The 32 labelled AI training descriptions are synthetic examples, clearly identified as such.

## AI methodology and implementation

The model is a **Multinomial Naive Bayes text classifier**, implemented in [`src/ai/eventClassifier.js`](src/ai/eventClassifier.js). It is trained locally in the browser from 32 synthetic, labelled descriptions: eight examples for each category.

1. Lowercase and tokenize the input text.
2. Count token frequencies for each category in the labelled examples.
3. Score known input tokens against each category with add-one smoothing and a category prior.
4. Return the highest-scoring category, up to four indicative words, and the proportion of input tokens covered by the small training vocabulary.
5. Show review guidance; a human must verify the surrounding evidence.

The categories are **credential abuse**, **script execution**, **network anomaly**, and **routine activity**. Text entered on this page is classified in the browser and is not sent to an inference service. Unknown vocabulary produces an `unknown` result instead of a confident-looking category.

### AI models, providers, and APIs

| Role | Model or tool | Provider | External inference API? |
| --- | --- | --- | --- |
| Product classification | Multinomial Naive Bayes, implemented in this repository | Local browser code | No |
| Development assistance | Codex, Claude, and Qoder | OpenAI, Anthropic, and Qoder respectively | Not used for product inference |

Codex, Claude, and Qoder assisted with coding, debugging, review, and documentation during development. They are **development tools**, not the classifier that judges can run in the product. The team remains responsible for reviewing and testing the submitted code. No hosted LLM, model API key, or third-party inference API is required for AI Event Triage.

### Limitations and responsible use

The dataset is small and synthetic, so the model may misclassify unfamiliar phrasing. Its scores are not calibrated probabilities, and “routine activity” does not mean an event is safe. Do not enter customer telemetry, secrets, or personal data; do not use the output as an alert verdict or as the sole basis for a security decision. A larger, evaluated dataset and analyst feedback would be needed before real-world use.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, JavaScript, React Router, Zustand, CSS |
| Visualization and UI | Recharts, Cytoscape, Three.js, Lucide icons |
| API integration | Axios and WebSocket support for backend-connected views |
| AI demo | In-browser JavaScript Multinomial Naive Bayes implementation |
| Backend (separate branch) | Python FastAPI, MongoDB, Redis, Docker Compose |
| Hosting | Vercel for the standalone frontend |

## Run the frontend locally

Requirements: Node.js 20 or later and npm. **The AI demo does not need the backend.** From the `main` branch:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite and navigate to `/ai-triage`. Choose an example or type non-sensitive test text, then select **Analyze with local model**.

To connect protected views to your own backend, copy `.env.example` to `.env.local` and configure `VITE_API_BASE_URL` and `VITE_WS_BASE_URL` for that backend. Never commit `.env.local` or credentials. Backend setup instructions are in the [`backend` branch README](https://github.com/SHADABMUSHTAQ/warsoc-security-operations-platform/blob/backend/README.md). Its services and configuration must be running before login or operational data views can work.

## Tests and build

```bash
npm test
npm run lint
npm run build
```

The repository includes tests for the event classifier and frontend/backend contracts. These checks do not establish production security effectiveness or validate the model on real-world telemetry.

## Demo video and screenshots

The submitted video and screenshots are linked below. They should remain shared as **Anyone with the link — Viewer**; test both links in a private/incognito window before submitting.

- Demo video: [WarSOC prototype video](https://drive.google.com/file/d/1J6ub8Lq19fWRBT4GS7oCmsKRRuj_iJNQ/view?usp=drive_link)
- Product screenshots: [Screenshots folder](https://drive.google.com/drive/folders/1dDt14YzKwhN2o6GRvJgQjeyOIvKDqihJ?usp=drive_link)

The video and screenshots should match the submitted version. If they show an earlier demo state, label it clearly rather than implying the same operational data is available on the live frontend.

## Team contributions

**Submission owner: replace the placeholders with the real registered names and actual work before submitting. Do not list someone who did not contribute.**

| Team member | Role | Specific contribution |
| --- | --- | --- |
| **[Full name]** | **[Role]** | **[What this person built, tested, designed, or documented]** |

## Security and repository notes

The public branches are source-code submission copies. Do not commit `.env` files, passwords, API keys, private keys, customer data, database exports, or deployment credentials. Use the provided example configuration as a template and configure your own services. Review any fork before deploying it publicly.
