# Conduit Form Automation and Defect Assessment Suite

**Project:** RealWorld Conduit Application ([https://demo.realworld.show](https://demo.realworld.show))

**Author:** QA Engineering Team

**Date:** May 2026

**Status:** Open / Review Required

---

## 1. Introduction and Overview

This repository contains a robust automated testing framework built to validate the authentication flows of the RealWorld Conduit Application. This project demonstrates production grade automated UI testing alongside a comprehensive manual defect assessment report identifying critical security and business logic gaps within the application.

---

## 2. Tech Stack and Tools

* **Automation Framework:** Playwright (Typescript)
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

Ran automated tests on the sign up and login pages. Found three big differences between how our old tests expect the website to work and how it actually works right now. The button on the signup form is completely locked, the database allows duplicate accounts on the same email, and the system accepts weak passwords without checking them.

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
