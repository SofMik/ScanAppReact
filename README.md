# "Сlient-side API for "SCAN" - React Project"
Completed as a practical project in the "SkillFactory: PHPPRO" course (Fullstack Web Development in JavaScript and PHP).
Client part of the API for searching for publications about a company (legal entity) in the media by TIN.

---

## Project Overview
This project is a **client-side API** for searching company publications in the media by TIN.  
It consists of:
- **Main page** (public)
- **Authorization form**
- **User's page** (search parameters)
- **Query results page**

All pages except the main one require **authorization**.

The layout prepared by designers is here <a href="https://www.figma.com/design/u3MOjzYnTnirz712GrLbFv/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82-%D0%A1%D0%9A%D0%90%D0%9D?node-id=0-1&p=f" target="_blank">link</a>

---

## Technologies

* React
* HTML & CSS
* JS
* Figma

---

## Features

✔️ Secure authentication via `POST account/login`  
✔️ Search by TIN with validation  
✔️ Real-time document loading (`POST objectsearch`)  
✔️ Carousel-based UI (`slick-carousel`)  
✔️ Adaptive layout for mobile and desktop  
✔️ Full API documentation <a href="https://gateway.scan-interfax.ru/swagger/index.html#/" target="_blank">here</a>

---

## Installation

* Clone the repository.
* Navigate to the project directory using cd your-repo.
* Install the dependencies using npm install.
* Start the development server with npm start.

A **test user account** is provided:  
- **Login:** `sf_student1`  
- **Password:** `4i2385j` 
- You can make a request using **any 10-digit INN** of a Russian enterprise.  
For example, try the INN of the State Hermitage Museum in St. Petersburg: **7830002416**.

---

## Demo

You can check the live demo here <a href="https://sofmik.github.io/ScanAppReact/" target="_blank">Live version</a>

---

Russian language

---

## Author
SofMik, student web developer
