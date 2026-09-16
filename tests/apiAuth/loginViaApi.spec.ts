import { test, expect } from "@playwright/test";


let token: string;
test("authenticate", async ({ request }) => {
  const resp = await request.post("https://api.practicesoftwaretesting.com/users/login", {
    data: {
        'email': 'customer@practicesoftwaretesting.com',
        'password': 'welcome01',
    },
  });
    const jsonData = await resp.json();
    token = jsonData.access_token;
});


test('Verify login can be performed successfully', async ({ page, request }) => {
//      const resp = await request.post("https://api.practicesoftwaretesting.com/users/login", {
//     data: {
//         'email': 'customer@practicesoftwaretesting.com',
//         'password': 'welcome01',
//     },
//   });
//     const jsonData = await resp.json();
//     token = jsonData.access_token;

    await page.goto("/");

    await page.evaluate((token) => {
        localStorage.setItem('auth-token', token);
    }, token);

    await page.reload();

    await expect( page.getByTestId("nav-menu")).toHaveText('Jane Doe');
})