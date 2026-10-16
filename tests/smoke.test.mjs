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
  ["/", "Software Engineer"],
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

test("Education content and cards remain readable at mobile and desktop widths", async () => {
  for (const width of [320, 390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto(`${origin}/resume`);
    await page.getByRole("tab", { name: "Education" }).click();
    await page.getByText("My education", { exact: true }).waitFor();
    await page.getByText("My academic background in Computer Science and Software Engineering provides a strong foundation in software design, system architecture, and problem-solving, complementing my hands-on experience in building scalable software applications.", { exact: true }).waitFor();
    assert.equal(await page.getByText("Occaecat do eiusmod ullamco id tempor labore consectetur tempor.").count(), 0);
    const cards = page.locator('[role="tabpanel"][data-state="active"] li');
    assert.deepEqual(await cards.evaluateAll((items) => items.map((card) => ({
      year: card.querySelector("span")?.textContent,
      degree: card.querySelector("h3")?.textContent,
      institution: card.querySelector("p")?.textContent,
    }))), [
      { year: "2018", degree: "Master's degree, Computer Software Engineering", institution: "Islamic Azad University" },
      { year: "2014", degree: "Bachelor's degree, Computer Science", institution: "Islamic Azad University" },
    ]);
    for (const card of await cards.all()) {
      const fits = await card.evaluate((element) => {
        const box = element.getBoundingClientRect();
        const date = element.querySelector("span")?.getBoundingClientRect();
        const degree = element.querySelector("h3")?.getBoundingClientRect();
        const institution = element.querySelector("p")?.getBoundingClientRect();
        return date && degree && institution &&
          date.top >= box.top && date.bottom <= degree.top + 1 &&
          degree.bottom <= institution.top + 1 && institution.bottom <= box.bottom + 1 &&
          degree.left >= box.left - 1 && degree.right <= box.right + 1 &&
          institution.left >= box.left - 1 && institution.right <= box.right + 1;
      });
      assert.ok(fits, `Education card content overlaps or escapes at ${width}px`);
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
    if (screenshotDir && (width === 390 || width === 1280)) {
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${screenshotDir}/education-${width}-top.png` });
    }
    await page.close();
  }
});

test("project carousel preserves existing work and presents five professional projects", { timeout: 90_000 }, async () => {
  const projects = [
    { title: "Bavexa", category: "Podcast platform", github: null },
    { title: "Diana Panel", category: "Open-source library", github: "https://github.com/hbsoftco/diana-vue-admin-panel" },
    { title: "Audio-to-Subtitle Tool", category: "Personal project", github: "https://github.com/hbsoftco/persian-speech-recognition" },
    { title: "RoydadOn", category: "Event Booking / Event Management", description: "An online event booking platform for discovering events and managing reservations." },
    { title: "Malima", category: "Real Estate", description: "A real estate platform for property discovery and digital services, with structured property information management." },
    { title: "Bitland", category: "Cryptocurrency / Digital Assets", description: "A cryptocurrency platform for accessing digital asset buying and selling services." },
    { title: "EasyKart", category: "Financial Services / Digital Payments", description: "A digital financial services platform offering payment services and international transaction solutions." },
    { title: "Kartabl", category: "Remote Workforce Management", description: "A remote workforce management platform with employee workspaces, time tracking, activity monitoring, administrative reporting, and employee management." },
  ];
  assert.equal(new Set(projects.map((project) => project.title)).size, projects.length);

  for (const width of [390, 768, 1024, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`${origin}/work`);
    assert.equal(await page.locator(".swiper-slide").count(), projects.length);
    for (const [index, project] of projects.entries()) {
      if (index) await page.getByRole("button", { name: "Next slide" }).click();
      await page.getByRole("heading", { name: project.title, exact: true }).waitFor();
      assert.equal(await page.locator(".text-outline").textContent(), String(index + 1).padStart(2, "0"));
      assert.equal(await page.locator("h1").locator("..").locator("p").textContent(), project.category);
      await page.locator(".swiper-slide-active").getByText(project.title, { exact: true }).waitFor();
      assert.equal(await page.locator(".swiper-slide-active img").count(), 0);
      if (project.description) {
        await page.getByText(project.description, { exact: true }).waitFor();
        assert.equal(await page.getByRole("list", { name: "Technologies" }).count(), 0);
      }
      const github = page.getByRole("link", { name: `Open ${project.title} GitHub repository` });
      assert.equal(await github.count(), project.github ? 1 : 0);
      if (project.github) assert.equal(await github.getAttribute("href"), project.github);
      assert.equal(await page.getByRole("link", { name: `Open ${project.title} live project` }).count(), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `Work overflows at ${width}px on ${project.title}`);
    }
    if (screenshotDir && (width === 390 || width === 1280)) {
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${screenshotDir}/work-kartabl-${width}.png` });
      if (width === 390) {
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.screenshot({ path: `${screenshotDir}/work-kartabl-${width}-bottom.png` });
      }
    }
    assert.deepEqual(errors, [], `Work browser errors at ${width}px`);
    await page.close();
  }
});

test("CV, social URLs, and metadata are present", async () => {
  const page = await browser.newPage();
  await page.goto(origin);
  assert.match(await page.title(), /Hossein Bajan.*Software Engineer/);
  assert.equal(await page.locator("section > div > div span.text-xl").first().textContent(), "Software Engineer");
  assert.equal(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent()).jobTitle, "Software Engineer");
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
  await page.waitForFunction(() => document.querySelector('[data-testid="navigation-progress"]')?.getAttribute("role") === "progressbar");
  await page.waitForFunction(() => document.querySelector('[data-testid="navigation-progress"]')?.getAttribute("role") === null);
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

test("Languages tab presents the four self-reported languages without disturbing Education", async () => {
  for (const width of [390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto(`${origin}/resume`);
    const tab = page.getByRole("tab", { name: "Languages" });
    await tab.focus();
    await tab.press("Enter");
    assert.equal(await tab.getAttribute("aria-selected"), "true");
    await page.getByRole("heading", { name: "Languages" }).waitFor();
    for (const [language, proficiency] of [
      ["Persian (Farsi)", "Native"],
      ["Kurdish (Kurmanji)", "Native"],
      ["English", "B2 — Upper-Intermediate"],
      ["German", "A2 — Elementary"],
    ]) {
      const card = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: language }) });
      assert.equal(await card.count(), 1);
      await card.getByText(proficiency, { exact: true }).waitFor();
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
    if (screenshotDir && (width === 390 || width === 1280)) {
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${screenshotDir}/languages-${width}.png` });
    }
    await page.getByRole("tab", { name: "Education" }).click();
    await page.getByText("My education", { exact: true }).waitFor();
    await page.getByRole("tab", { name: "About me" }).click();
    await page.getByText(/I am a Software Engineer specializing in Vue\.js/).waitFor();
    await page.close();
  }
});

test("global navigation progress follows visual completion and clears on history or interrupted navigation", { timeout: 60_000 }, async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 844 } });
  const waitForProgressToClear = async () => {
    await page.waitForFunction(() => document.querySelector('[data-testid="navigation-progress"]')?.getAttribute("role") === "progressbar");
    await page.waitForFunction(() => document.querySelector('[data-testid="navigation-progress"]')?.getAttribute("role") === null);
  };
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const bar = page.getByTestId("navigation-progress");
  assert.equal(await bar.count(), 1);
  assert.equal(await bar.getAttribute("role"), null);
  await page.locator('header a[href="/services"]').click();
  await page.waitForURL("**/services");
  await page.waitForFunction(() => document.querySelector('[data-testid="navigation-progress"]')?.getAttribute("role") === "progressbar");
  const active = await bar.evaluate((element) => ({
    now: element.getAttribute("aria-valuenow"),
    top: element.getBoundingClientRect().top,
    height: element.getBoundingClientRect().height,
    direction: element.getAttribute("dir"),
    pointerEvents: getComputedStyle(element).pointerEvents,
    transformOrigin: element.firstElementChild && getComputedStyle(element.firstElementChild).transformOrigin,
    progress: element.firstElementChild?.style.transform,
  }));
  assert.equal(active.now, null);
  assert.equal(active.top, 0);
  assert.equal(active.height, 3);
  assert.equal(active.direction, "ltr");
  assert.equal(active.pointerEvents, "none");
  assert.match(active.transformOrigin, /^0px/);
  assert.notEqual(active.progress, "scaleX(1)");
  await page.waitForFunction(() => document.querySelector('[data-testid="navigation-progress"]')?.getAttribute("role") === null);
  await page.locator('header a[href="/services"]').click();
  await page.waitForTimeout(200);
  assert.equal(await bar.getAttribute("role"), null);

  await page.locator('header a[href="/resume"]').click();
  await page.waitForURL("**/resume");
  await waitForProgressToClear();
  await page.goBack();
  await page.waitForURL("**/services");
  await waitForProgressToClear();
  await page.goForward();
  await page.waitForURL("**/resume");
  await waitForProgressToClear();

  await page.locator('header a[href="/work"]').click();
  await page.locator('header a[href="/contact"]').first().click();
  await page.waitForURL("**/contact");
  await waitForProgressToClear();
  assert.equal(await bar.count(), 1);
  await page.close();
});

test("reduced motion and non-route clicks do not leave a progress bar", async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 844 }, reducedMotion: "reduce" });
  await page.goto(origin, { waitUntil: "networkidle" });
  const bar = page.getByTestId("navigation-progress");
  await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="navigation-progress"]');
    window.__progressShown = false;
    new MutationObserver(() => {
      if (bar?.getAttribute("role") === "progressbar") window.__progressShown = true;
    }).observe(bar, { attributes: true, attributeFilter: ["role"] });
  });
  await page.locator('header a[href="/services"]').click();
  await page.waitForURL("**/services");
  await page.waitForTimeout(350);
  assert.equal(await bar.getAttribute("role"), null);
  assert.equal(await page.evaluate(() => window.__progressShown), false);
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator('header a[href="/resume"]').evaluate((link) => {
    link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ctrlKey: true }));
  });
  await page.waitForTimeout(180);
  assert.equal(await bar.getAttribute("role"), null);
  await page.locator('a[href="https://github.com/hbsoftco"]').evaluate((link) => {
    link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
  });
  await page.waitForTimeout(180);
  assert.equal(await bar.getAttribute("role"), null);
  const download = page.waitForEvent("download");
  await page.locator("a[download]").click();
  assert.match((await download).suggestedFilename(), /Hossein-Bajan-Resume\.pdf/);
  assert.equal(await bar.getAttribute("role"), null);
  await page.close();
});

test("a canceled navigation cannot leave progress stuck", async () => {
  const page = await browser.newPage();
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.clock.install();
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.href = "/services";
    link.textContent = "Canceled navigation";
    link.addEventListener("click", (event) => event.preventDefault());
    document.body.append(link);
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
  });
  await page.clock.runFor(200);
  assert.equal(await page.getByTestId("navigation-progress").getAttribute("role"), "progressbar");
  await page.clock.runFor(15000);
  assert.equal(await page.getByTestId("navigation-progress").getAttribute("role"), null);
  assert.equal(new URL(page.url()).pathname, "/");
  await page.close();
});
