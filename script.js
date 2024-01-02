let inputText = document.querySelector('#input-text');
let counter = document.querySelector('p');

// Word Counter
inputText.addEventListener('input', () => {
    let input = inputText.value;
    let words = input.split(' ');
    let wordCount = words.filter((item) => item != "").length
    if(wordCount <= 500){
        counter.textContent = `${wordCount}/500`;
    }
    else{
        alert("Do not enter more than 500 words!!");
    }
    if(!input || wordCount == -1){
        counter.textContent = '0/500';
    }
})

let speech = new SpeechSynthesisUtterance();
speech.value = 1
speech.rate = 1
let playBtn = document.querySelector('.play-btn');
let synthesizer = window.speechSynthesis;


playBtn.addEventListener('click', () => {
    if(inputText.value === ''){
        alert("Enter something in the text box");
    }
    else if(!synthesizer.speaking){
        speech.text = inputText.value.trim();
        speech.voice = (voiceSelect.value)?voices[voiceSelect.value]:voices[0]
        synthesizer.speak(speech);
        document.querySelector('.play-btn>p').innerHTML = '<i class="fa fa-stop"></i> Stop';
        speech.onend = () => {
            document.querySelector('.play-btn>p').innerHTML = '<i class="fa fa-play-circle"></i> Play';
        }
    }
    else if(synthesizer.speaking){
        synthesizer.cancel();
        document.querySelector('.play-btn>p').innerHTML = '<i class="fa fa-play-circle"></i> Play';
    }
})

let volumeInput = document.querySelector('#volume-input');
let rateInput = document.querySelector('#rate-input');
let volumeIndicator = document.querySelector('#volume-indicator');
let rateIndicator = document.querySelector('#rate-indicator');



volumeInput.addEventListener('input', () => {
    if(synthesizer.speaking){
        synthesizer.cancel();
        document.querySelector('.play-btn>p').innerHTML = '<i class="fa fa-play-circle"></i> Play';
    }
    let volume = volumeInput.value/10;
    volumeIndicator.innerHTML = volumeInput.value
    speech.volume = volume
})

rateInput.addEventListener('input', () => {
    if(synthesizer.speaking){
        synthesizer.cancel();
        document.querySelector('.play-btn>p').innerHTML = '<i class="fa fa-play-circle"></i> Play';
    }
    rateIndicator.innerHTML = rateInput.value
    speech.rate = rateInput.value
})

let voiceSelect = document.querySelector('select')
voices = []

window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices()
    speech.voice = voices[voiceSelect.value]
    voices.forEach((voice, index) => (voiceSelect.options[index] = new Option(voice.name, index)));
}

voiceSelect.addEventListener('input', ()=>{
    speech.voice = voices[voiceSelect.value]
})