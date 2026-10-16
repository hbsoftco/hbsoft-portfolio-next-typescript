import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3100";
const chromePath = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";
const screenshotDir = process.env.SCREENSHOT_DIR;
let browser;

before(async () => {
  browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox"],
  });
  if (screenshotDir) await mkdir(screenshotDir, { recursive: true });
});

after(async () => {
  await browser?.close();
});

const routes = [
  ["/", "Senior Front-End Engineer"],
  ["/services", "Frontend Architecture"],
  ["/resume", "My experience"],
  ["/work", "Bavexa"],
  ["/contact", "Get in touch"],
];

test("all routes render without horizontal overflow or browser errors", { timeout: 180_000 }, async () => {
  for (const width of [390, 768, 1024, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.url().startsWith(origin) && response.status() >= 400) {
        errors.push(`${response.status()} ${response.url()}`);
      }
    });
    page.on("requestfailed", (request) => {
      if (request.url().startsWith(origin)) errors.push(`Failed ${request.url()}`);
    });
    for (const [route, text] of routes) {
      const response = await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200, `${route} at ${width}px`);
      await page.getByText(text, { exact: false }).first().waitFor();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      assert.ok(overflow <= 1, `${route} overflows by ${overflow}px at ${width}px`);
      if (screenshotDir && (width === 390 || width === 1280)) {
        await page.waitForTimeout(route === "/" ? 7600 : 3200);
        const name = route === "/" ? "home" : route.slice(1);
        await page.screenshot({
          path: `${screenshotDir}/${name}-${width}-top.png`,
        });
        if (width === 390) {
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
          await page.waitForTimeout(300);
          await page.screenshot({ path: `${screenshotDir}/${name}-${width}-bottom.png` });
        }
      }
    }
    assert.deepEqual(errors, [], `browser errors at ${width}px`);
    await page.close();
  }
});

test("Education tab retains its two existing entries", async () => {
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto(`${origin}/resume`);
    await page.getByRole("tab", { name: "Education" }).click();
    await page.getByText("My education", { exact: true }).waitFor();
    assert.equal(await page.getByText("Islamic Azad University", { exact: true }).count(), 2);
    await page.getByText("Master's degree, Computer Software Engineering").waitFor();
    await page.getByText("Bachelor's degree, Computer Science").waitFor();
    if (screenshotDir) {
      await page.waitForTimeout(3200);
      await page.screenshot({ path: `${screenshotDir}/education-${width}-top.png` });
    }
    await page.close();
  }
});

test("project slides show the matching titles and only available repository links", async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 844 } });
  await page.goto(`${origin}/work`);
  await page.getByRole("heading", { name: "Bavexa" }).waitFor();
  assert.equal(await page.getByRole("link", { name: /Bavexa.*repository/ }).count(), 0);
  await page.getByRole("button", { name: "Next slide" }).click();
  await page.getByRole("heading", { name: "Diana Panel" }).waitFor();
  assert.equal(
    await page.getByRole("link", { name: /Diana Panel GitHub repository/ }).getAttribute("href"),
    "https://github.com/hbsoftco/diana-vue-admin-panel",
  );
  await page.getByRole("button", { name: "Next slide" }).click();
  await page.getByRole("heading", { name: "Audio-to-Subtitle Tool" }).waitFor();
  assert.equal(
    await page.getByRole("link", { name: /Audio-to-Subtitle Tool GitHub repository/ }).getAttribute("href"),
    "https://github.com/hbsoftco/persian-speech-recognition",
  );
  await page.close();
});

test("CV, social URLs, and metadata are present", async () => {
  const page = await browser.newPage();
  await page.goto(origin);
  assert.match(await page.title(), /Hossein Bajan.*Senior Front-End Engineer/);
  assert.equal(await page.locator('a[download]').getAttribute("href"), "/resume/Hossein-Bajan-Resume.pdf");
  for (const url of [
    "https://github.com/hbsoftco",
    "https://linkedin.com/in/hbsoftco",
    "https://stackoverflow.com/users/4308163/hossein-bajan",
  ]) {
    assert.equal(await page.locator(`a[href="${url}"]`).count(), 1);
  }
  const pdf = await page.request.get(`${origin}/resume/Hossein-Bajan-Resume.pdf`);
  assert.equal(pdf.status(), 200);
  assert.match(pdf.headers()["content-type"], /application\/pdf/);
  assert.equal((await pdf.body()).subarray(0, 4).toString(), "%PDF");
  await page.close();
});

test("mobile navigation and contact fields remain usable", async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(origin);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "contact", exact: true }).click();
  await page.getByRole("heading", { name: "Get in touch" }).waitFor();
  await page.getByRole("button", { name: "Open email draft" }).click();
  assert.equal(await page.locator('input[name="firstName"]').evaluate((input) => input.validity.valueMissing), true);
  await page.getByRole("textbox", { name: "First name" }).fill("Test");
  await page.getByRole("textbox", { name: "Last name" }).fill("Visitor");
  await page.getByRole("textbox", { name: "Email address" }).fill("visitor@example.com");
  await page.getByRole("combobox", { name: "Inquiry topic" }).click();
  await page.getByRole("option", { name: "Frontend Architecture" }).click();
  await page.getByRole("textbox", { name: "Message" }).fill("Hello");
  assert.match(await page.getByRole("combobox", { name: "Inquiry topic" }).textContent(), /Frontend Architecture/);
  assert.equal(
    await page.locator("form").evaluate((form) => new FormData(form).get("topic")),
    "Frontend Architecture",
  );
  await page.close();
});
