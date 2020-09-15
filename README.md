## Refactor Tractor Group Project

**Contributors**

[Matthew Lane](https://github.com/GreyMatteOr)

[Kathryn Jackson](https://github.com/kathrynljackson)

[Katy St Sauveur](https://github.com/krogowsk531)


## Abstract

For this group project, we were tasked with refactoring an existing project — a site for recipe tracking where users can select their favorite recipes and choose meals to cook for the week. This site allows a user to see the ingredients in their individual pantry and make a shopping list of items to purchase in order to cook their favorite recipes. We were required to utilize a series of technologies, including SASS, fetch and Webpack, as well as to rely on testing (including testing with spies) to rebuild an existing application. We also were expected to refactor our CSS and HTML to be both responsive & accessible.


## Project Goals

* Build on top of pre-existing code that you did not write and navigate someone else’s codebase
* Develop processes for working remotely and submitting pull requests to perform effective code reviews that help ensure the code is accurate and that everyone understands it
* Make network requests to API endpoints to retrieve and manipulate data
* Refactor pre-existing code and use inheritance to DRY up repetitive logic
* Ensure your app is following best practices for accessibility
* Leverage Sass to DRY up your CSS
* Incorporate Webpack to streamline your workflow process
* Leverage Chai Spies to verify that your DOM manipulation is happening

## Testing

We encountered the need for testing before our scheduled lesson that taught these concepts. For this reason, we manually created a spy test that could determine the functionality of methods that manipulated the DOM. An example of this can be seen in the `dom-test.js` file. After participating in the lesson and meeting with our instructor, we implemented chai spy testing (as required by our [rubric](https://frontend.turing.io/projects/module-2/refactor-tractor-wc.html)) on our methods that utilized `fetch` and `post` to access the data from our given server.


## Technologies Used

* HTML
* SCSS
* JavaScript


## Installation

* Clone down the repo at: https://github.com/GreyMatteOr/refactor-tractor-B  
* You can use an optional argument when you run git clone (you replace the [...] with the terminal command arguments): git clone https://github.com/GreyMatteOr/refactor-tractor-B.git [what you want to name the repo]
* Then install the library dependencies. Switch into your new directory & run: npm install in the terminal.
* To verify that it is setup correctly, run npm start in your terminal. Go to http://localhost:8080/ in the browser to visit the deployed application.


## In Action

**What's Cookin' Dashboard**

![functionality 1](https://giphy.com/gifs/IzuPzeGgUiKWEanJIE)

![functionality 2](https://giphy.com/gifs/dscc49iLbkp3CgKQyd)

**Functionality**

* This site is available in desktop and mobile view.
* Users can mark their favorite recipes by selecting the apple icon on any recipe of their choice.
* ARIA tags and thoughtful color choices have been implemented as needed to increase accessibility.
* The search bar allows users to quickly find specific recipes.
* By utilizing the pantry feature, users can easily see what recipes they can cook according to the ingredients in their personal pantry.
