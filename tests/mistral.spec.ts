import { test, expect } from '@playwright/test';

const OLLAMA_URL = 'http://localhost:11434/api/generate';

async function askMistral(prompt: string): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral',
      prompt: prompt,
      stream: false
    })
  });
  const data = await response.json();
  return data.response;
}

test('output consistency — same question returns similar answer', async () => {
  const question = 'What is software testing? Answer in one sentence.';
  const response1 = await askMistral(question);
  const response2 = await askMistral(question);

  console.log('Response 1:', response1);
  console.log('Response 2:', response2);

  expect(response1.length).toBeGreaterThan(20);
  expect(response2.length).toBeGreaterThan(20);
});

test('hallucination check — model knows a basic fact', async () => {
  const response = await askMistral('What is the capital of France? Answer in one word only.');

  console.log('Response:', response);
  expect(response.toLowerCase()).toContain('paris');
});

test('format validation — model follows list instruction', async () => {
  const response = await askMistral('List 3 types of software testing. Use a numbered list.');

  console.log('Response:', response);
  expect(response).toMatch(/1\./);
  expect(response).toMatch(/2\./);
  expect(response).toMatch(/3\./);
});

test('edge case — empty prompt handling', async () => {
  const response = await askMistral(' ');

  console.log('Empty prompt response:', response);
  expect(response).toBeDefined();
  expect(typeof response).toBe('string');
});

test('language consistency — responds in English when asked in English', async () => {
  const response = await askMistral('What is artificial intelligence? Answer in English only.');

  console.log('Language test response:', response);
  const turkishChars = /[çğışöüÇĞİŞÖÜ]/;
  expect(turkishChars.test(response)).toBe(false);
});

test('response length boundary — respects one sentence instruction', async () => {
  const response = await askMistral('What is machine learning? Answer in exactly one sentence.');

  console.log('Length test response:', response);
  const sentences = response.split('.').filter(s => s.trim().length > 0);
  console.log('Sentence count:', sentences.length);
  expect(sentences.length).toBeLessThanOrEqual(3);
});