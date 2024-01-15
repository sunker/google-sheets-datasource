import { test, expect } from '@grafana/plugin-e2e';

test('data query is successfull when spreadsheet id is valid', async ({ page, panelEditPage }) => {
  await panelEditPage.datasource.set('GoogleSheetsServiceAccount');
  const queryEditorRow = await panelEditPage.getQueryEditorRow('A');
  await queryEditorRow.getByText('Enter SpreadsheetID').click();
  await page.keyboard.insertText('1TZlZX67Y0s4CvRro_3pCYqRCKuXer81oFp_xcsjPpe8');
  await page.keyboard.press('Enter');
  await expect(panelEditPage.refreshPanel()).toBeOK();
  await expect(panelEditPage).not.toHavePanelError();
});
