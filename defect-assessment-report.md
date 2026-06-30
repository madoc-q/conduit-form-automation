Defect Assessment and Bug Report Document
Project: RealWorld Conduit Application (https://demo.realworld.show)

Author: QA Engineering Team

Date: May 2026

Status: Open / Review Required

Executive Summary
We ran automated tests on the sign up and login pages. We found three big differences between how our old tests expect the website to work and how it actually works right now. The button on the signup form is completely locked, the database allows duplicate accounts on the same email, and the system accepts weak passwords without checking them.

Defect Reports
DB-001: Critical Bug – Multiple Accounts Allowed with the Same Email
Bug ID: DB-001

Severity: Critical

Priority: High

Component: Sign up / Database

Summary: The website lets two different people sign up using the exact same email address.

Description
Right now, the website does not check if an email is already taken when someone creates a new account. In normal websites, an email must belong to only one person so that password resets work properly and people cannot steal your identity.

Steps to Reproduce
Go to the sign up page.

Create an account using the email user@mail.com and the username Alex.

Log out.

Go back to the sign up page.

Create a new account using the exact same email user@mail.com but change the username to Sam.

Expected Result
The website should stop you and say: "This email is already in use."

Actual Result
The website lets you create both accounts with the same email, which is a major database error.

DB-002: UI Bug – Sign Up Button is Dead with No Error Message
Bug ID: DB-002

Severity: Minor

Priority: Medium

Component: Sign Up Form

Summary: The Sign up button is completely unclickable when the form is blank, but it never tells the user why.

Description
Our automated tests try to click the submit button on an empty form to check for error banners. However, the website locks the button so it cannot be clicked at all. This blocks our automation from testing empty states, and it confuses real users because the button looks broken and gives no helpful feedback.

Steps to Reproduce
Go to the sign up page.

Leave all the text boxes completely empty.

Try to click the Sign up button.

Expected Result
The button should either be clickable and show an error message, or the empty fields should turn red to show they are required.

Actual Result
Nothing happens. The button remains completely unclickable and silent.

DB-003: Requirement Gap – Weak Passwords Short as 3 Characters Accepted
Bug ID: DB-003

Severity: Major

Priority: High

Component: Sign up / Security

Summary: The app allows users to create incredibly short and weak passwords without warning them.

Description
The system lets users create an account with a password as short as "abc". It does not enforce any minimum length or security rules, making accounts very easy to hack.

Steps to Reproduce
Go to the sign up page.

Enter a unique username and email.

Type "abc" as the password.

Click Sign up.

Expected Result
The system should reject the password and display a message saying "Password is too short".

Actual Result
The account is created immediately with the weak password.

Testing Strategy Adjustments
To fix our automation test plan, we will make these simple updates:

Remove Empty Form Test: Since the button cannot be clicked when empty, we will stop trying to submit empty forms. Instead, we will test with poorly formatted data like a fake email to see if error messages show up.

Test Duplicate Usernames: We will stop testing for duplicate emails since the app allows them right now. Instead, we will test if the app correctly stops people from using the exact same username.

Hold Password Length Tests: We will turn off the short password tests until the development team adds a password limit rule to the code.