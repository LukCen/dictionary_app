'use strict'
const wordName = document.querySelector('h2');

let link = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

let searchbar = document.querySelector('.searchbar');
let phonetic = document.querySelector('.phonetic')
const meaningList = document.querySelector('ul');
const fontSelect = document.querySelector('select')



const btnPlay = document.querySelector('.button-play')
let soundPhonetics = new Audio();

// search button
const btn = document.querySelector('button')


fontSelect.addEventListener('change', () => {
    let currentlySelectedOption = fontSelect.options[fontSelect.selectedIndex];
  
    let selectedFont = currentlySelectedOption.textContent;

    if(selectedFont === 'Serif'){
        document.body.style.fontFamily = "'Rockwell', 'Times New Roman', serif"
       
    }

    if(selectedFont === 'Sans-serif'){
        document.body.style.fontFamily = "'Helvetica', 'Verdana', sans-serif";
       
    }

    if(selectedFont === 'Monospace'){
        document.body.style.fontFamily = "'Courier', 'Courier New', monospace";
        
    }
})

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
    // will need to look into this cause it seems like it's not always able to find the file
    btnPlay.addEventListener('click', () => {
        soundPhonetics.src = accessedEntries[0].sound;
    
        if(phonetic.innerText !== ''){
            soundPhonetics.play()
        }

    })
    
})

// checks if list containing meanings is empty

const listEmpty = () => {
    console.log(meaningList.innerHTML.trim() === '')
    return meaningList.innerHTML.trim() === ''
}

btn.addEventListener('click', () => {

    // if the list containing meanings isn't empty (eg. the user just made a query using the search bar) it'll remove every single list item and then run the gatherData function again - prevents info from other queries from cluttering the screen
    if(listEmpty() === false){
        meaningList.innerHTML = ''
        gatherData()
    } else if(listEmpty() === true){
        gatherData()
    }
    
})


