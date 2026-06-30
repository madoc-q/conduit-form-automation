```python
import os
from weasyprint import HTML

html_content = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page {
        size: A4;
        margin: 20mm 20mm 20mm 20mm;
        @bottom-right {
            content: "Page " counter(page) " of " counter(pages);
            font-family: "Times New Roman", Times, serif;
            font-size: 10pt;
            color: #555555;
        }
    }
    body {
        font-family: "Times New Roman", Times, serif;
        font-size: 11pt;
        line-height: 1.5;
        color: #000000;
        margin: 0;
        padding: 0;
    }
    .title-section {
        text-align: center;
        margin-bottom: 30px;
    }
    h1 {
        font-size: 18pt;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 5px;
        margin-top: 0;
    }
    .subtitle {
        font-size: 12pt;
        font-style: italic;
        margin-bottom: 25px;
    }
    .metadata-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
    }
    .metadata-table td {
        padding: 4px 0;
        vertical-align: top;
    }
    .metadata-table td.label {
        width: 15%;
        font-weight: bold;
    }
    .metadata-table td.value {
        width: 35%;
    }
    h2 {
        font-size: 14pt;
        font-weight: bold;
        border-bottom: 1px solid #000000;
        padding-bottom: 3px;
        margin-top: 25px;
        margin-bottom: 12px;
        page-break-after: avoid;
    }
    h3 {
        font-size: 12pt;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 8px;
        page-break-after: avoid;
    }
    h4 {
        font-size: 11pt;
        font-weight: bold;
        font-style: italic;
        margin-top: 12px;
        margin-bottom: 6px;
        page-break-after: avoid;
    }
    p {
        margin-top: 0;
        margin-bottom: 10px;
        text-align: justify;
    }
    ul {
        margin-top: 0;
        margin-bottom: 10px;
        padding-left: 20px;
    }
    li {
        margin-bottom: 4px;
    }
    .defect-block {
        margin-bottom: 25px;
    }
    .field-list {
        margin-bottom: 12px;
    }
    .field-item {
        margin-bottom: 3px;
    }
    .field-name {
        font-weight: bold;
        display: inline-block;
        width: 120px;
    }
    .field-value {
        display: inline;
    }
    .divider {
        border-top: 1px dashed #cccccc;
        margin: 20px 0;
    }
    code {
        font-family: Consolas, "Courier New", Courier, monospace;
        background-color: #f4f4f4;
        padding: 1px 4px;
        font-size: 10pt;
    }
    pre {
        font-family: Consolas, "Courier New", Courier, monospace;
        background-color: #f4f4f4;
        padding: 10px;
        font-size: 10pt;
        border: 1px solid #cccccc;
        margin-top: 5px;
        margin-bottom: 10px;
        white-space: pre-wrap;
    }
</style>
</head>
<body>

<div class="title-section">
    <h1>Conduit Form Automation and Defect Assessment Suite</h1>
    <div class="subtitle">Technical Documentation and Testing Framework Report</div>
</div>

<table class="metadata-table">
    <tr>
        <td class="label">Project:</td>
        <td class="value">RealWorld Conduit Application (https://demo.realworld.show)</td>
        <td class="label">Date:</td>
        <td class="value">June 2026</td>
    </tr>
    <tr>
        <td class="label">Author:</td>
        <td class="value">QA Engineering Team</td>
        <td class="label">Status:</td>
        <td class="value">Open / Review Required</td>
    </tr>
</table>

<h2>1. Introduction and Overview</h2>
<p>This repository contains a robust automated testing framework built to validate the authentication flows of the RealWorld Conduit Application. This project demonstrates production grade automated UI testing alongside a comprehensive manual defect assessment report identifying critical security and business logic gaps within the application.</p>

<h2>2. Tech Stack and Tools</h2>
<ul>
    <li><strong>Automation Framework:</strong> Playwright (Python)</li>
    <li><strong>Design Pattern:</strong> Page Object Model (POM)</li>
    <li><strong>Target Application:</strong> RealWorld Conduit Application (https://demo.realworld.show)</li>
    <li><strong>Documentation Format:</strong> Microsoft Word / Standard Document Layout</li>
</ul>

<h2>3. Core Test Coverage</h2>
<p>The automation suite focuses heavily on testing critical authentication vectors on the Sign Up page, including:</p>
<ul>
    <li>Validation of required user input fields.</li>
    <li>Error handling for boundary cases.</li>
    <li>Form submission and UI behavior under invalid data constraints.</li>
</ul>

<h2>4. Executive Summary of Defects</h2>
<p>We ran automated tests on the sign up and login pages. We found three big differences between how our old tests expect the website to work and how it actually works right now. The button on the signup form is completely locked, the database allows duplicate accounts on the same email, and the system accepts weak passwords without checking them.</p>

<h2>5. Defect Reports</h2>

<div class="defect-block">
    <h3>DB-001: Critical Bug - Multiple Accounts Allowed with the Same Email</h3>
    <div class="field-list">
        <div class="field-item"><span class="field-name">Bug ID:</span><span class="field-value">DB-001</span></div>
        <div class="field-item"><span class="field-name">Severity:</span><span class="field-value">Critical</span></div>
        <div class="field-item"><span class="field-name">Priority:</span><span class="field-value">High</span></div>
        <div class="field-item"><span class="field-name">Component:</span><span class="field-value">Sign up / Database</span></div>
        <div class="field-item"><span class="field-name">Summary:</span><span class="field-value">The website lets two different people sign up using the exact same email address.</span></div>
    </div>

    <h4>Description</h4>
    <p>Right now, the website does not check if an email is already taken when someone creates a new account. In normal websites, an email must belong to only one person so that password resets work properly and people cannot steal your identity.</p>

    <h4>Steps to Reproduce</h4>
    <ul>
        <li>Go to the sign up page.</li>
        <li>Create an account using the email <code>user@mail.com</code> and the username <code>Alex</code>.</li>
        <li>Log out.</li>
        <li>Go back to the sign up page.</li>
        <li>Create a new account using the exact same email <code>user@mail.com</code> but change the username to <code>Sam</code>.</li>
    </ul>

    <h4>Expected Result</h4>
    <p>The website should stop you and say: "This email is already in use."</p>

    <h4>Actual Result</h4>
    <p>The website lets you create both accounts with the same email, which is a major database error.</p>
</div>

<div class="divider"></div>

<div class="defect-block">
    <h3>DB-002: UI Bug - Sign Up Button is Dead with No Error Message</h3>
    <div class="field-list">
        <div class="field-item"><span class="field-name">Bug ID:</span><span class="field-value">DB-002</span></div>
        <div class="field-item"><span class="field-name">Severity:</span><span class="field-value">Minor</span></div>
        <div class="field-item"><span class="field-name">Priority:</span><span class="field-value">Medium</span></div>
        <div class="field-item"><span class="field-name">Component:</span><span class="field-value">Sign Up Form</span></div>
        <div class="field-item"><span class="field-name">Summary:</span><span class="field-value">The Sign up button is completely unclickable when the form is blank, but it never tells the user why.</span></div>
    </div>

    <h4>Description</h4>
    <p>Our automated tests try to click the submit button on an empty form to check for error banners. However, the website locks the button so it cannot be clicked at all. This blocks our automation from testing empty states, and it confuses real users because the button looks broken and gives no helpful feedback.</p>

    <h4>Steps to Reproduce</h4>
    <ul>
        <li>Go to the sign up page.</li>
        <li>Leave all the text boxes completely empty.</li>
        <li>Try to click the Sign up button.</li>
    </ul>

    <h4>Expected Result</h4>
    <p>The button should either be clickable and show an error message, or the empty fields should turn red to show they are required.</p>

    <h4>Actual Result</h4>
    <p>Nothing happens. The button remains completely unclickable and silent.</p>
</div>

<div class="divider"></div>

<div class="defect-block">
    <h3>DB-003: Requirement Gap - Weak Passwords Short as 3 Characters Accepted</h3>
    <div class="field-list">
        <div class="field-item"><span class="field-name">Bug ID:</span><span class="field-value">DB-003</span></div>
        <div class="field-item"><span class="field-name">Severity:</span><span class="field-value">Major</span></div>
        <div class="field-item"><span class="field-name">Priority:</span><span class="field-value">High</span></div>
        <div class="field-item"><span class="field-name">Component:</span><span class="field-value">Sign up / Security</span></div>
        <div class="field-item"><span class="field-name">Summary:</span><span class="field-value">The app allows users to create incredibly short and weak passwords without warning them.</span></div>
    </div>

    <h4>Description</h4>
    <p>The system lets users create an account with a password as short as "abc". It does not enforce any minimum length or security rules, making accounts very easy to hack.</p>

    <h4>Steps to Reproduce</h4>
    <ul>
        <li>Go to the sign up page.</li>
        <li>Enter a unique username and email.</li>
        <li>Type "abc" as the password.</li>
        <li>Click Sign up.</li>
    </ul>

    <h4>Expected Result</h4>
    <p>The system should reject the password and display a message saying "Password is too short".</p>

    <h4>Actual Result</h4>
    <p>The account is created immediately with the weak password.</p>
</div>

<h2>6. Testing Strategy Adjustments</h2>
<p>To fix our automation test plan, we will make these simple updates:</p>
<ul>
    <li><strong>Remove Empty Form Test:</strong> Since the button cannot be clicked when empty, we will stop trying to submit empty forms. Instead, we will test with poorly formatted data like a fake email to see if error messages show up.</li>
    <li><strong>Test Duplicate Usernames:</strong> We will stop testing for duplicate emails since the app allows them right now. Instead, we will test if the app correctly stops people from using the exact same username.</li>
    <li><strong>Hold Password Length Tests:</strong> We will turn off the short password tests until the development team adds a password limit rule to the code.</li>
</ul>

<h2>7. Local Setup and Installation</h2>
<p>To pull down the project and run the automated test execution suite locally, follow these steps:</p>

<h4>1. Clone the Repository</h4>
<pre>git clone https://github.com/YOUR_USERNAME/conduit-form-automation.git
cd conduit-form-automation</pre>

<h4>2. Install Dependencies</h4>
<p>Ensure you have Python installed, then run:</p>
<pre>pip install playwright
playwright install</pre>

<h4>3. Run Automated Tests</h4>
<p>Execute the script via terminal:</p>
<pre>pytest</pre>

</body>
</html>
"""

with open("README.html", "w") as f:
    f.write(html_content)

HTML("README.html").write_pdf("README.pdf")
print("PDF generated successfully.")



```

```text
PDF generated successfully.


```

Your PDF file is ready


Here is the clean, professional text layout with all emojis and em dashes completely removed. It is structured exactly like a standard Word document report. You can paste this straight into your file:

---

# Conduit Form Automation and Defect Assessment Suite

**Project:** RealWorld Conduit Application ([https://demo.realworld.show](https://demo.realworld.show))

**Author:** QA Engineering Team

**Date:** June 2026

**Status:** Open / Review Required

---

## 1. Introduction and Overview

This repository contains a robust automated testing framework built to validate the authentication flows of the RealWorld Conduit Application. This project demonstrates production grade automated UI testing alongside a comprehensive manual defect assessment report identifying critical security and business logic gaps within the application.

---

## 2. Tech Stack and Tools

* **Automation Framework:** Playwright (Python)
* **Design Pattern:** Page Object Model (POM)
* **Target Application:** RealWorld Conduit Application ([https://demo.realworld.show](https://demo.realworld.show))
* **Documentation Format:** Microsoft Word / Standard Document Layout

---

## 3. Core Test Coverage

The automation suite focuses heavily on testing critical authentication vectors on the Sign Up page, including:

* Validation of required user input fields.
* Error handling for boundary cases.
* Form submission and UI behavior under invalid data constraints.

---

## 4. Executive Summary of Defects

We ran automated tests on the sign up and login pages. We found three big differences between how our old tests expect the website to work and how it actually works right now. The button on the signup form is completely locked, the database allows duplicate accounts on the same email, and the system accepts weak passwords without checking them.

---

## 5. Defect Reports

### DB-001: Critical Bug - Multiple Accounts Allowed with the Same Email

* **Bug ID:** DB-001
* **Severity:** Critical
* **Priority:** High
* **Component:** Sign up / Database
* **Summary:** The website lets two different people sign up using the exact same email address.

#### Description

Right now, the website does not check if an email is already taken when someone creates a new account. In normal websites, an email must belong to only one person so that password resets work properly and people cannot steal your identity.

#### Steps to Reproduce

1. Go to the sign up page.
2. Create an account using the email user@mail.com and the username Alex.
3. Log out.
4. Go back to the sign up page.
5. Create a new account using the exact same email user@mail.com but change the username to Sam.

#### Expected Result

The website should stop you and say: "This email is already in use."

#### Actual Result

The website lets you create both accounts with the same email, which is a major database error.

---

### DB-002: UI Bug - Sign Up Button is Dead with No Error Message

* **Bug ID:** DB-002
* **Severity:** Minor
* **Priority:** Medium
* **Component:** Sign Up Form
* **Summary:** The Sign up button is completely unclickable when the form is blank, but it never tells the user why.

#### Description

Our automated tests try to click the submit button on an empty form to check for error banners. However, the website locks the button so it cannot be clicked at all. This blocks our automation from testing empty states, and it confuses real users because the button looks broken and gives no helpful feedback.

#### Steps to Reproduce

1. Go to the sign up page.
2. Leave all the text boxes completely empty.
3. Try to click the Sign up button.

#### Expected Result

The button should either be clickable and show an error message, or the empty fields should turn red to show they are required.

#### Actual Result

Nothing happens. The button remains completely unclickable and silent.

---

### DB-003: Requirement Gap - Weak Passwords Short as 3 Characters Accepted

* **Bug ID:** DB-003
* **Severity:** Major
* **Priority:** High
* **Component:** Sign up / Security
* **Summary:** The app allows users to create incredibly short and weak passwords without warning them.

#### Description

The system lets users create an account with a password as short as "abc". It does not enforce any minimum length or security rules, making accounts very easy to hack.

#### Steps to Reproduce

1. Go to the sign up page.
2. Enter a unique username and email.
3. Type "abc" as the password.
4. Click Sign up.

#### Expected Result

The system should reject the password and display a message saying "Password is too short".

#### Actual Result

The account is created immediately with the weak password.

---

## 6. Testing Strategy Adjustments

To fix our automation test plan, we will make these simple updates:

* **Remove Empty Form Test:** Since the button cannot be clicked when empty, we will stop trying to submit empty forms. Instead, we will test with poorly formatted data like a fake email to see if error messages show up.
* **Test Duplicate Usernames:** We will stop testing for duplicate emails since the app allows them right now. Instead, we will test if the app correctly stops people from using the exact same username.
* **Hold Password Length Tests:** We will turn off the short password tests until the development team adds a password limit rule to the code.

---

## 7. Local Setup and Installation

To pull down the project and run the automated test execution suite locally, follow these steps:

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/conduit-form-automation.git
cd conduit-form-automation

```

#### 2. Install Dependencies

Ensure you have Python installed, then run:

```bash
pip install playwright
playwright install

```

#### 3. Run Automated Tests

Execute the script via terminal:

```bash
pytest

```
