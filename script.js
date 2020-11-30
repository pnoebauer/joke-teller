const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

function sayJoke(joke) {
    VoiceRSS.speech({
        key: '35cecc1b51bc4c258b769245552a1df3',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.joke) {
            joke = data.joke;
        }
        else {
            joke = data.setup + ' ... ' + data.delivery;
        }
        // Text-to-Speech
        sayJoke(joke);
        //Disable Button
        toggleButton();
    } catch (error) {
        console.log('error fetching jokes', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);