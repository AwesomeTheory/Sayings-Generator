const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// API: get quotes
async function getQuote() {
  loading();
  const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      // If there's no author, show 'Unknown'
      if (data.quoteAuthor === '') {
          authorText.innerText = 'Unknown';
      } else {
          authorText.innerText = data.quoteAuthor;
      }
      // Reduce font size for long quotes
      if (data.quoteText.length > 120) {
          quoteText.classList.add('long-quote');
      } else {
          quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText;
      complete();
  } catch (error) {
      getQuote();
  }
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // If there's no author, show 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Reduce font size for long quotes
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
}

// If using the localQuotes array:
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
  }
}


// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

//  If using API, run getQuotes(), if using localquotes, run newQuote() instead
// newQuote();
