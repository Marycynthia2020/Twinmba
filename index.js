import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let tweetsData = [   
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/woman-pix.avif`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon ✅`,
        profilePic: `images/elon.jpg`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: `images/woman-pix.avif`,
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/woman-pix.avif`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/woman-pix.avif`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/woman-pix.avif`,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/woman-pix.avif`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]

let feed = document.getElementById('feed')
let tweetInput = document.getElementById('tweet-input')

let itemsInStorage = JSON.parse(localStorage.getItem(('myTweets')))

if (itemsInStorage) {
    tweetsData = itemsInStorage
    render()
    console.log(tweetsData)
}


document.addEventListener("click", function (e) {
  console.log(e.target.id);
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweet(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.dataset.delete) {
    handleDelete(e.target.dataset.delete);
  } else if (e.target === document.getElementById("tweet-btn")) {
    handleTweet();
  }
});

function handleLikeClick(tweetId) {
 

    tweetsData.filter(tweet => {
        if(tweet.uuid === tweetId) {
            let targetTweet = tweet
            if(!targetTweet.isLiked) {
                targetTweet.likes ++
            } else if(targetTweet.isLiked) {
                targetTweet.likes --
            }
            targetTweet.isLiked = !targetTweet.isLiked
            localStorage.setItem('myTweets', JSON.stringify(tweetsData))
            render()
        }
       
    })
}

function handleRetweet(tweetId) {
    tweetsData.filter(tweet => {
        if(tweet.uuid === tweetId) {
            let targetTweet = tweet
            if(!targetTweet.isRetweeted) {
                targetTweet.retweets ++
            } else if(targetTweet.isRetweeted) {
                targetTweet.retweets --
            }
            targetTweet.isRetweeted = !targetTweet.isRetweeted
            localStorage.setItem('myTweets', JSON.stringify(tweetsData))
            render()
        }
      
    })
}

function  handleReplyClick(tweetId) {
document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')
}

function handleTweet() {
    if( tweetInput.value !== '')  {

        let newTweet = {
            handle: `@Cynthia`,
            profilePic: `images/woman-pix.avif`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }
       
        tweetsData.unshift(newTweet)
        localStorage.setItem('myTweets', JSON.stringify(tweetsData))
        render()
        tweetInput.value = ''
    }
   
}

function handleDelete(tweetId) {
    tweetsData.filter(tweet => {
        if(tweet.uuid === tweetId) {
            let index = tweetsData.indexOf(tweet)
            delete tweetsData[index]
            render()

        }
    })
}

function getFeedHtml() {

    let feedHtml = ``;
  
    tweetsData.forEach((tweet) => {
       let likeClass = ''
           if (tweet.isLiked) {
          likeClass = 'liked'
      }
      let retweetClass = ''
      if(tweet.isRetweeted) {
          retweetClass = 'retweeted'
      }
  
      let repliesHtml = ``
  
      if(tweet.replies.length !== 0) {
          tweet.replies.forEach(replies => {
              repliesHtml += `
              <div class="tweet">
              <div class="tweet-inner">
                  <img src="${replies.profilePic}" class="profile-pic">
                  <div>
                      <p class="handle">${replies.handle}</p>
                      <p class="tweet-text">${replies.tweetText}</p>
                  </div>            
              </div> 
          </div>
  
              `
          })
      }
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
                                  <i class="fa-solid fa-heart ${likeClass}"
                                  data-like="${tweet.uuid}"
                                 
                                  ></i>
                                  ${tweet.likes}
                              </span>
                              <span class="tweet-detail">
                                  <i class="fa-solid fa-retweet ${retweetClass}"
                                  data-retweet="${tweet.uuid}"
                                  ></i>
                                  ${tweet.retweets}
                              </span>
                              <span class="tweet-detail">
                              <i class="fa-solid fa-trash"
                              data-delete="${tweet.uuid}"
                              ></i>
                          </span>
                          </div>   
                      </div>            
                  </div> 
                  <div  class = 'hidden' id = replies-${tweet.uuid}>
                      ${repliesHtml}
                  </div>
              </div>
          `;
    });
    return feedHtml
  }



function render() {
    feed.innerHTML = getFeedHtml()
   
}

render()