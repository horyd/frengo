/*
  Here you will:
  1. Create a React Component called "Main". It will accept no props for now.
  2. Set the following keys on Main's "state":
    - attemptNumber
    - correctAnswers
    - review
    - cards
    Initialize with the appropriate values, using the "cards" variable in
    the global scope and shuffling them

  3. Set the following instance methods on the class "Main". Each should end
    with the execution of the "this.setState" function.
    - reviewAttempt
    - loadNewCard
    - showResults
    - resetGame
    - submitForm
    - _renderResult

    _renderResult will return JSX to return the correct text and GIF. You may
    find calling it with one argument, the "result" to be helpful

  4. You will be expected to move all of the "DOM Manipulations" logic
    into the JSX that this Component will render.

  5. Your JSX will include and "input" for text, and also a "button",
  all within a containing "form". Make sure to connect the form's onSubmit attribute
  to your "submitForm" instance method.

  Finally, at the end of this file, use ReactDOM.render to insert this Component
  into the DOM.
*/
