# AI usage notes

## Tools and models

- Codex desktop coding assistant (model: GPT-6, as shown by the task environment).
- PowerShell and the bundled Node/Python runtimes for workspace inspection and implementation.

## Agent instruction files

- No `AGENTS.md`, `CLAUDE.md`, or editor rule files were added.

## Plan/spec

The implementation followed the challenge's critical path: backend-owned product source, catalogue endpoints, React browsing/search/detail, enquiry form, then setup and decision notes. Interfaces were added around product sourcing and enquiry delivery so the demo integrations can be replaced.

## Prompts and moments that shaped the solution

1. The user asked first to understand the attached challenge; the PDF was summarized before coding.
2. The user asked for steps; the sequence emphasized API-first boundaries, enquiry delivery, local run setup, testing and submission docs.
3. The user then asked to start development; a fresh React + TypeScript and Node + TypeScript project was created because the workspace contained no starter repository.
4. The challenge's “no paid services/accounts” constraint led to a Docker Compose Mailpit inbox for end-to-end local SMTP, with a JSONL fallback when SMTP is absent.
5. The open-ended growth requirement led to `ProductSource` and `EnquiryDelivery` interfaces rather than coupling routes to Fake Store or one mail service.

## AI review notes

The first environment's `python` launcher was unavailable. The bundled Python runtime was located and used instead to extract the PDF. Dependency installation could not complete because the Windows sandbox rejected writes under `node_modules`, so no build or automated tests have run yet. Review the code and complete the time-spent section with your actual time before submission.

## Actual time spent

Fill in the actual time before submission, roughly split between planning, building, testing and review.
