# Twimba
## What is it? 
It's a chatbox with the tweeter design. You can like, retweet and reply other tweets, or create one yourself.
It's also the fourteenth project of the Scrimba Frontend Course, part of Module 5, where they teach you Javascript concepts

## Concepts learned for this project and practiced during it
- **textarea** HTML tag, a text input where you can create multiple lines, unlike the **input** tag. 
- **forEach** Array method, to walk through it using a function
  ```Javascript
  exampleArray.forEach( function( arrayItem ){
    console.log( arrayItem )
  })
  ```
- **dataset** HTML attribute, to link data to an HTML tag to use it in Javascript.
  ```Javascript
  /* Suppose you have an <p id="paragraph" data-any-word='aWord' data-value='87'></p> */
  const exampleEl = document.getElementById('example')
  const exampleWord = exampleEl.dataset.anyWord // 'aWord'
  const exampleValue = exampleEl.dataset.value // '87', always as String
  ```
- A way to determine **which styles to apply** to my HTML elements
  - Determine a condition and after it store a className with the styles in it to later apply that class in an `innerHTML`
  - ```Javascript
    let likeIconClass = ''
    if (tweet.isLiked)
      likeIconClass = 'liked'
    likeIcon.innerHTML = `<i class=${likeIconClass}</i>`
    ```
- **CDNs**, a service to add assets to my code or website
  - In other words, a way to add new functionalities, created by other people and posted on the internet, into my project. 
- **Font Awesome** (using CDN), to add and manage icons on HTML more easily. 
- **uuidv4()** (using CDN), to generate a random universally unique id. 


## Preview 
<img style="text-align:center" src="https://github.com/AlexMakowiecki/twimba/assets/122258496/c025f20f-3a55-4bdb-a157-8111fbd04b70" width="500"/> 


## About Scrimba!


At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
