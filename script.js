'use strict'
const wordName = document.querySelector('h2');

let link = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

let searchbar = document.querySelector('.searchbar');
let phonetic = document.querySelector('.phonetic')
const meaningList = document.querySelector('ul');



const btnPlay = document.querySelector('.button-play')
let soundPhonetics = new Audio();

const btn = document.querySelector('button')

const gatherData = () => fetch(`${link}${searchbar.value}`)
.then(result => result.json())

.then((entries) => {
    let accessedEntries = entries.map((entry) => {
        return {
            name: entry.word,
            meaning: entry.meanings[0],
            phonetic: entry.phonetic,
            sound: entry.phonetics[0].audio
        }
    })
    
    wordName.innerText = accessedEntries[0].name
    let displayedMeaning = accessedEntries[0].meaning.definitions;
    phonetic.innerText = accessedEntries[0].phonetic;

    // iterates over every element in displayedMeaning object and creates a separate list item for each
    displayedMeaning.forEach(item => {
        const meaningItem = document.createElement('li');
        
        meaningItem.classList.add('list-group-item');
        meaningItem.append(item.definition)
        meaningList.append(meaningItem)
    })
 
    // plays pronounciation sound if it exists within the json file
    btnPlay.addEventListener('click', () => {
        soundPhonetics.src = accessedEntries[0].sound
    
        if(phonetic.innerText !== ''){
            soundPhonetics.play()
        }
    })
    
})

btn.addEventListener('click', () => {
    
    gatherData()
    
})


