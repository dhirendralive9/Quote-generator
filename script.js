// Get Quotes from Api 
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

//show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote 
function newQuote() {
    loading();
     //Pick a random quote from apiQuotes  array 
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if the author field is blank and replace it with 'unknown' 
     if(!quote.author){
      authorText.textContent = 'Unknown';
     }else{
        authorText.textContent= quote.author;
     }
     // check Quote Length to determine styling 
     if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
     } else {
        quoteText.classList.remove('long-quote');

     }
      //Set Quotw, hide Loader
     quoteText.textContent = quote.text;
     complete();
}


async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
       const response = await fetch(apiUrl);
       apiQuotes = await response.json();
       
       newQuote();
    } catch (error){
        alert(error)
        //catch error here
    }
}



//tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



// On load 
getQuotes();

