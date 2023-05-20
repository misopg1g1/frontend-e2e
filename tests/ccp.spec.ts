import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://stagingccp.edgarluna.dev/');
});

test.describe('Pruebas E2E para login', () => {
    test('Realizar login con user1', async ({ page }) => {
      // create a new user locator
      const newUser = page.getByPlaceholder('Escriba su usuario');
  
      // Fill a user.
      await newUser.fill('user1');
      await newUser.press('Enter'); 
      // create a new password locator
      const newPass = page.getByPlaceholder('Escriba su contraseña');
      // Fill password  
      await newPass.fill('password1');
      await newPass.press('Enter');
      // Click the get started link.
      await page.getByText('Ingresar').click();

      // Expects the URL to contain intro.
      await expect(page).toHaveURL(/.*dashboard/);

      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.
      await page.getByText('Ajustes').click(); 
      // Click the get started link.
      await page.getByText('Salir').click();

      // Expects the URL to contain intro.
      await expect(newUser).toHaveText('');      
    });
    test('Realizar login con usuario desconocido', async ({ page }) => {
      // create a new user locator
      const newUser = page.getByPlaceholder('Escriba su usuario');
  
      // Fill a user.
      await newUser.fill('userX');
      await newUser.press('Enter');
  
      // create a new password locator
      const newPass = page.getByPlaceholder('Escriba su contraseña');
  
      // Fill password  
      await newPass.fill('passwordX');
      await newPass.press('Enter');
  
      // Click the get started link.
      await page.getByText('Ingresar').click();
  
      // Expects the URL to contain intro.
      const newMessage = await page.getByText('El usuario no fue encontrado.');
      await expect(newMessage).toBeVisible();
    });
    test('Realizar login con password inválido', async ({ page }) => {
      // create a new user locator
      const newUser = page.getByPlaceholder('Escriba su usuario');
  
      // Fill a user.
      await newUser.fill('user1');
      await newUser.press('Enter');
  
      // create a new password locator
      const newPass = page.getByPlaceholder('Escriba su contraseña');
  
      // Fill password  
      await newPass.fill('passwordX');
      await newPass.press('Enter');
  
      // Click the get started link.
      await page.getByText('Ingresar').click();
  
      // Expects the URL to contain intro.
      const newMessage = await page.getByText('No está autorizado para realizar ésta acción');
      await expect(newMessage).toBeVisible();
    });       
  });

test.describe('Pruebas E2E para productos', () => {
    test('Buscar y ver detalle de un producto existente', async ({ page }) => {
      // create a new user locator
      const newUser = page.getByPlaceholder('Escriba su usuario');
      // Fill a user.
      await newUser.fill('user1');
      await newUser.press('Enter');
      // create a new password locator
      const newPass = page.getByPlaceholder('Escriba su contraseña');
      // Fill password  
      await newPass.fill('password1');
      await newPass.press('Enter');
      // Click the get started link.
      await page.getByText('Ingresar').click();

      // Expects the URL to contain dashboard
      await expect(page).toHaveURL(/.*dashboard/);

      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.   
      await page.getByRole('link', { name: 'Productos' }).click();
      await page.getByRole('button', { name: 'Rows per page: 5' }).click();
      await page.getByRole('option', { name: '25' }).click();
      await page.getByText('Nombre').click();
      await page.getByText('00AA').click();

      // Expect view detail for product
      await expect(await page.getByRole('dialog').getByTitle('00AA')).toBeDefined();

      await page.getByRole('dialog').getByRole('button').click();
      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.
      await page.getByText('Ajustes').click();
      // Click the get started link.
      await page.getByText('Salir').click();

      // Expects to be in login menu without user
      await expect(newUser).toHaveText('');      
    });

    // test('Consultar y modificar stock de un producto existente', async ({ page }) => {
    //   // create a new user locator
    //   const newUser = page.getByPlaceholder('Escriba su usuario');
    //   // Fill a user.
    //   await newUser.fill('user1');
    //   await newUser.press('Enter');
    //   // create a new password locator
    //   const newPass = page.getByPlaceholder('Escriba su contraseña');
    //   // Fill password  
    //   await newPass.fill('password1');
    //   await newPass.press('Enter');
    //   // Click the get started link.
    //   await page.getByText('Ingresar').click();

    //   // Expects the URL to contain dashboard
    //   await expect(page).toHaveURL(/.*dashboard/);

    //   // Click the tab.
    //   await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
    //   // Click the get started link.   
    //   await page.getByRole('link', { name: 'Productos' }).click();
    //   await page.getByRole('button', { name: 'Rows per page: 5' }).click();
    //   await page.getByRole('option', { name: '25' }).click();
    //   await page.getByText('Nombre').click();
    //   const rowProduct = page.getByRole('row', { name: 'Select row product 00AA950aa256-1953-4b37-a693-05e432bbbb52 Otros 0 Activo' })
      
    //   await expect(rowProduct).toBeDefined();

    //   //await rowProduct.click();
    //   await rowProduct.getByTestId('CheckBoxIcon').check();

    //   const actualStock = page.getByLabel('Current Stock');
    //   const actualStockValue = actualStock.getAttribute('value')
    //   console.log(actualStockValue);

    //   await page.getByRole('button', { name: 'Actualizar' }).click();



    //   // Click the tab.
    //   await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
    //   // Click the get started link.
    //   await page.getByText('Ajustes').click();
    //   // Click the get started link.
    //   await page.getByText('Salir').click();

    //   // Expects to be in login menu without user
    //   await expect(newUser).toHaveText('');   
    // });
  });

  test.describe('Pruebas E2E para clientes', () => {
    test('Buscar y ver detalle de un cliente existente', async ({ page }) => {
      // create a new user locator
      const newUser = page.getByPlaceholder('Escriba su usuario');
      // Fill a user.
      await newUser.fill('user1');
      await newUser.press('Enter');
      // create a new password locator
      const newPass = page.getByPlaceholder('Escriba su contraseña');
      // Fill password  
      await newPass.fill('password1');
      await newPass.press('Enter');
      // Click the get started link.
      await page.getByText('Ingresar').click();

      // Expects the URL to contain dashboard
      await expect(page).toHaveURL(/.*dashboard/);

      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.   
      await page.getByRole('link', { name: 'Clientes' }).click();
      await page.getByRole('button', { name: 'Rows per page: 5' }).click();
      await page.getByRole('option', { name: '25' }).click();
      await page.getByText('Nombre').click();
      await page.getByText('Acme').click();

      // Expect view detail for product
      await expect(await page.getByRole('dialog').getByTitle('Acme')).toBeDefined();

      await page.getByRole('dialog').getByRole('button').click();
      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.
      await page.getByText('Ajustes').click();
      // Click the get started link.
      await page.getByText('Salir').click();

      // Expects to be in login menu without user
      await expect(newUser).toHaveText('');      
    });

  });

  test.describe('Pruebas E2E para visitas', () => {
    test('Buscar y ver detalle de una visita existente', async ({ page }) => {
      // create a new user locator
      const newUser = page.getByPlaceholder('Escriba su usuario');
      // Fill a user.
      await newUser.fill('user1');
      await newUser.press('Enter');
      // create a new password locator
      const newPass = page.getByPlaceholder('Escriba su contraseña');
      // Fill password  
      await newPass.fill('password1');
      await newPass.press('Enter');
      // Click the get started link.
      await page.getByText('Ingresar').click();

      // Expects the URL to contain dashboard
      await expect(page).toHaveURL(/.*dashboard/);

      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.   
      await page.getByRole('link', { name: 'Visitas' }).click();
      await page.getByRole('button', { name: 'Rows per page: 5' }).click();
      await page.getByRole('option', { name: '25' }).click();
      await page.getByText('Cliente', {exact: true}).click();
      await page.getByText('Acme').click();

      // Expect view detail for product
      await expect(page.getByRole('textbox', { name: 'Cliente' })).toHaveValue('Acme');

      await page.getByRole('dialog').getByRole('button').click();
      // Click the tab.
      await page.locator('div').filter({ hasText: /^Ajustes$/ }).first().click();   
      // Click the get started link.
      await page.getByText('Ajustes').click();
      // Click the get started link.
      await page.getByText('Salir').click();

      // Expects to be in login menu without user
      await expect(newUser).toHaveText('');      
    });

  });