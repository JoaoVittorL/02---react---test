import { test, expect } from '@playwright/test';

test('sign in sucessfully', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'networkidle' });

  await page.getByPlaceholder('Email').fill('joaovittor@ecoeletrica.com.br');
  await page.getByPlaceholder('Senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
});
