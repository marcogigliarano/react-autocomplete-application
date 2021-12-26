1. What is the difference between Component and PureComponent? give an
example where it might break my app.
PureComponent is a type of Class component useful in case wehre we want to prevent re-rendering when the same props have been passed (top-bottom).

2. Context + ShouldComponentUpdate might be dangerous. Can think of why
is that?
I never faced a similiar situation but I would try to be careful to not create a loop 

3. Describe 3 ways to pass information from a component to its PARENT.
- Calling a callback
- Updating the state managment store or context from a child component
- With a eventListener (very unusual)

4. Give 2 ways to prevent components from re-rendering.
- With Hooks we can use `useMemo`
- With Class we can use `ShouldComponentUpdate`

5. What is a fragment and why do we need it? Give an example where it
might break my app.
A fragment in React is represented of the tag <></> and it's required when we want to render more that on element. For instance this will break without a fragment:\
return <div>line1</div><div>line2</div>

6. Give 3 examples of the HOC pattern.
- Render props: pass child component to a parent as props
- Parent-Child: cloning a children inside a patern component like: <Parent><Child/></Parent>. 
- Inerithance: extending a child Class component with a Parent

7. what's the difference in handling exceptions in promises, callbacks and
async...await.
- Promise: Exception is handled from a reject function
- Callbacks: Success will be return in the `.then()` function, error in `.catch()` 
- Async-await: Success and errors will be returned in the same variable:
 const result = await samplaAsyncFunc()

8. How many arguments does setState take and why is it async.
`setState` take two arguments: previousState and currentState.\
It's always async because this way will not interrupt the rendering process, especially in case of many state updates. 

9. List the steps needed to migrate a Class to Function Component.
1 - Remove `constructor`\
2 - transform state with `useState`\
3 - transform methods in constant and use arrow functions\
4 - remove `this` refenrence from all functions\
5 - remove `render()` method, just use `return`\

10. List a few ways styles can be used with components.
The two main ways to use css in React are:\
- CSS in JS: Using libraries like `StyledComponents` that allows to write css inside a js file.\
- Importing a css file and using `className` or `id` as selectors
 

11. How to render an HTML string coming from the server.
Using the method `renderToString` of ReactDOM library
