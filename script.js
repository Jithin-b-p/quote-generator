const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let data = [];

function newQuote() {
  const quote = data[0].q;
  const author = data[0].a;

  renderQuoteAndAuthor(quote, author);
}

// show new Quote if the server is down.
function newQuoteForServerDown() {
  // picking a random quote from data array.
  const quote = data[Math.floor(Math.random() * data.length)];

  renderQuoteAndAuthor(quote.text, quote.author);
}

function renderQuoteAndAuthor(quote, author) {
  // check if author field is blank and replace it with unknown
  if (!author) authorText.textContent = "unknown";
  else authorText.textContent = author;

  // check the quote length to determine the styling.
  if (quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote;
}

// tweet a quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// eventListener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// getting quote from API
async function quoteGenerator() {
  const apiUrl =
    "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random";

  try {
    const response = await fetch(apiUrl);
    data = await response.json();
    newQuote();

  } catch (error) {
    // catch error here.
    console.error(error);
    const localResponse = await fetch("./assets/data/quotes.json");
    data = await localResponse.json();
    newQuoteForServerDown();
  }
}

// on load.
quoteGenerator();
