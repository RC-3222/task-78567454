# Task №78567454

## [Task](https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view)
## [Deployment](https://rc-3222.github.io/task-78567454--dist/)

## How to Use:

1. Clone this repo by running the script below:

```
git clone https://github.com/RC-3222/task-78567454.git
```
...or by any other available means.

2. Open it in your code editor (or a terminal).
3. Run `npm install` to install all the dependencies.
4. Start the dev server by running `npm run dev` and then you should be able to see the app in your browser at `localhost:9000`


## Additional Scripts

- `npm run build` builds the app for production and puts the results to `dist` folder
- `npm run test` to run unit tests for math operations

## App Structure

```
📦src                               
 ┣ 📂scss                           
 ┃ ┣ 📜_base.scss                   # Basic styling setup + initial ('Dark') theme setup
 ┃ ┣ 📜_calculator.scss             # Styling for calculator itself
 ┃ ┣ 📜_theme-switch.scss           # Styling for theme sitcher + 'Light' theme setup
 ┃ ┗ 📜index.scss                   # Main styling file which acts as an entry point
 ┣ 📂js                             
 ┃ ┣ 📂interface                 
 ┃ ┃ ┣ 📜operators.js               # Contains initialization logic for operators on calculator's keypad. 
 ┃ ┃ ┣ 📜numbers.js                 # Same as with the file above, but this time for numbers. 
 ┃ ┃ ┣ 📜switch-theme.js            # Contains logic for switching themes. 
 ┃ ┃ ┣ 📜output.js                  # Contains output getter.
 ┃ ┃ ┗ 📜index.js                   # An index file to simplify imports.
 ┃ ┣ 📂model                     
 ┃ ┃ ┣ 📜calculator.js              # Main logic for the calculator as a whole.
 ┃ ┃ ┣ 📜command.js                 # Contains an "Abstract" Command class (a base class for all the commands in this app). 
 ┃ ┃ ┣ 📜numbers.js                 # Contains a command to process user input. 
 ┃ ┃ ┣ 📜operations.js              # Contains a set of commands for various mathematical operations.
 ┃ ┃ ┗ 📜index.js                   # An index file to simplify imports.
 ┃ ┣ 📜index.js                     # Main JS file which acts as an entry point.
 ┃ ┗ 📜utils.js                     # Contains utility funtions for number validation and output formatting.
 ┗ 📜index.html                     # HTML template utilised by webpack.
```
