import { tweetsBaseData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetsData = setTweetsData()


document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
  else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet)
  }
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  }
})

document.addEventListener('submit', function (e) {
  e.preventDefault()
  if (e.target.dataset.replyForm) {
    handleReplySubmit(e.target.dataset.replyForm)
  }
  else if (e.target.id === 'login-form') {
    handleLogin()
  }
  else if (e.target.id === 'tweet-form') {
    handleTweetSubmit()
  }
})

if (!localStorage.getItem('username'))
  document.addEventListener('click', handleLoginScreenDisplay)

function setTweetsData() {
  if (localStorage.getItem('tweets'))
    return JSON.parse(localStorage.getItem('tweets'))
  else
    return tweetsBaseData
}

function handleLoginScreenDisplay(e) {
  const loginScreen = document.getElementById('login-screen')
  if (e.target.id === 'tweet-input' || e.target.classList.contains('reply-input')) {
    loginScreen.classList.remove('hidden')
    document.getElementById('username-input').focus()
  }
  else if (e.target.id === 'login-close-btn' || e.target === loginScreen) {
    loginScreen.classList.add('hidden')
  }
}

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--
  }
  else {
    targetTweetObj.likes++
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked
  updateLocalStorageTweets()
  renderFeed()
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--
  }
  else {
    targetTweetObj.retweets++
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
  updateLocalStorageTweets()
  renderFeed()
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-section-${replyId}`).classList.toggle('hidden')
}

function handleTweetSubmit() {
  const tweetInput = document.getElementById('tweet-input')
  tweetsData.unshift({
    handle: `@${localStorage.getItem('username')}`,
    profilePic: `images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText: tweetInput.value,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4()
  })
  renderFeed()
  updateLocalStorageTweets()
  tweetInput.value = ''
}

function handleReplySubmit(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]
  const replyFormData = new FormData(document.getElementById(`reply-form-${tweetId}`))
  const replyInputValue = replyFormData.get('reply')
  const newReplyObj = {
    handle: `@${localStorage.getItem('username')}`,
    profilePic: `images/scrimbalogo.png`,
    tweetText: replyInputValue,
  }
  targetTweetObj.replies.unshift(newReplyObj)
  updateLocalStorageTweets()
  renderReplies(tweetId)
}

function handleLogin() {
  const loginScreen = document.getElementById('login-screen')
  const usernameInput = document.getElementById('username-input')
  localStorage.setItem('username', usernameInput.value)
  loginScreen.classList.add('hidden')
  document.removeEventListener("click", handleLoginScreenDisplay)
  updateLocalStorageTweets()
}

function renderReplies(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]
  document.getElementById(`replies-${tweetId}`).innerHTML = getRepliesHtml(targetTweetObj.replies)
}

function getRepliesHtml(replies) {
  let repliesHtml = ''
  if (replies.length > 0) {
    replies.forEach(function (reply) {
      repliesHtml += `
        <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
        </div>`
    })
  }
  return repliesHtml
}

function renderFeed() {
  document.getElementById('feed').innerHTML = getFeedHtml()
}

function getFeedHtml() {
  let feedHtml = ``

  tweetsData.forEach(function (tweet) {
    let likeIconClass = ''
    if (tweet.isLiked) {
      likeIconClass = 'liked'
    }

    let retweetIconClass = ''
    if (tweet.isRetweeted) {
      retweetIconClass = 'retweeted'
    }

    const repliesHtml = getRepliesHtml(tweet.replies)

    feedHtml += `
      <div class="tweet">
          <div class="tweet-inner">
              <img src="${tweet.profilePic}" class="profile-pic">
              <div>
                  <p class="handle">${tweet.handle}</p>
                  <p class="tweet-text">${tweet.tweetText}</p>
                  <div class="tweet-details">
                      <span class="tweet-detail">
                          <i class="fa-regular fa-comment-dots"
                          data-reply="${tweet.uuid}"
                          ></i>
                          ${tweet.replies.length}
                      </span>
                      <span class="tweet-detail">
                          <i class="fa-solid fa-heart ${likeIconClass}"
                          data-like="${tweet.uuid}"
                          ></i>
                          ${tweet.likes}
                      </span>
                      <span class="tweet-detail">
                          <i class="fa-solid fa-retweet ${retweetIconClass}"
                          data-retweet="${tweet.uuid}"
                          ></i>
                          ${tweet.retweets}
                      </span>
                  </div>   
              </div>            
          </div>
          <div class="hidden" id="replies-section-${tweet.uuid}">      
              <form id="reply-form-${tweet.uuid}" data-reply-form="${tweet.uuid}" class="reply-form">
                <input class="reply-input" type="text" name="reply" placeholder="Write a reply" required/>
                <button class="reply-button" type="submit"><i class="fa-solid fa-chevron-right"></i></button>
              </form>
              <div id="replies-${tweet.uuid}">
                ${repliesHtml}
              </div>
          </div>   
      </div>`
  })
  return feedHtml
}

function updateLocalStorageTweets() {
  localStorage.setItem('tweets', JSON.stringify(tweetsData))
}

renderFeed()












