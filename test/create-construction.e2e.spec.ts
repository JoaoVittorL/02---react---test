import { toast } from 'sonner';
import { test, expect } from '@playwright/test';

test('create construction in form data', async ({ page }) => {
  await page.goto('/manage/constructions', { waitUntil: 'networkidle' });

  await page.getByPlaceholder('Projeto').fill('Casa123');
  await page.getByPlaceholder('Descrição da obra').fill('Descrição da construção');

  await page.getByRole('combobox').first().click();
  await page.getByLabel('Pendente').click();

  await page.getByRole('combobox').nth(1).click();
  await page.getByLabel('Pendente').click();

  await page.getByRole('button', { name: 'Cadastrar' }).click();

  const toast = page.getByText('Pode enviar!');

  await expect(toast).toBeVisible();
});
