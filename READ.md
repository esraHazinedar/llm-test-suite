LLM Test Suite — Local AI Quality Testing with Playwright & Ollama

A test automation suite for validating local LLM (Large Language Model) outputs using Playwright (TypeScript) and Ollama. Built to demonstrate AI quality engineering practices including hallucination detection, output consistency, and format validation.


Tech Stack


Ollama — local on-premise LLM inference engine
Mistral 7B — open-source language model
Playwright (TypeScript) — test automation framework
Node.js — runtime



Test Cases

TestWhat it validatesOutput consistencySame prompt returns meaningful responses across multiple callsHallucination detectionModel returns factually correct answers for known factsFormat validationModel follows structured output instructions (numbered lists)


How to Run

Prerequisites


Ollama installed
Mistral model pulled locally:


bashollama pull mistral


Node.js 18+


Setup

bashnpm install
npx playwright install chromium

Run Tests

bashnpx playwright test --reporter=list


Why This Project

AI/LLM systems require a different testing approach from traditional software. Outputs are non-deterministic, models can hallucinate, and response quality degrades in unexpected ways. This suite demonstrates core AI quality assurance techniques applicable to on-premise LLM deployments.


Author

Esra Bengu Hazinedar — ISTQB CT-AI | SDET | QA Engineer

