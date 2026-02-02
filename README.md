OrangeHRM Playwright Automation
End-to-end UI automation framework for the OrangeHRM application built using Playwright and JavaScript. The framework follows the Page Object Model to ensure clean, maintainable, and scalable tests.

Setup
npm install

Run Tests
npx playwright test


Run by environment:
ENV=qa npx playwright test


Run by tag:
npx playwright test --grep @employee-lifecycle

Features
Page Object Model
Environment-based execution
Smart waits and retries
HTML reports with screenshots and videos
CI-friendly configuration
This project is designed for reliable UI automation and easy integration into CI pipelines.