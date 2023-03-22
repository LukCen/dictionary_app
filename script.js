'use strict'
const wordName = document.querySelector('h2');

let link = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

let searchbar = document.querySelector('.searchbar');
let phonetic = document.querySelector('.phonetic')
const meaningList = document.querySelector('ul');
const meaningItemFirst = document.createElement('li');
const meaningItemSecond = document.createElement('li');
const btnPlay = document.querySelector('.btn-play')


const btn = document.querySelector('button')

const gatherData = () => fetch(`${link}${searchbar.value}`)
.then(result => result.json())

.then((entries) => {
    let accessedEntries = entries.map((entry) => {
        return {
            name: entry.word,
            meaning: entry.meanings[0],
            phonetic: entry.phonetic
        }
    })
    
    meaningItemFirst.classList.add('list-group-item');
    meaningItemSecond.classList.add('list-group-item');
    
    wordName.innerText = accessedEntries[0].name

    meaningItemFirst.innerHTML = accessedEntries[0].meaning.definitions[0].definition;
    meaningItemSecond.innerHTML = accessedEntries[0].meaning.definitions[1].definition


    phonetic.innerText = accessedEntries[0].phonetic;
    
    meaningList.append(meaningItemFirst, meaningItemSecond);
    
})

btn.addEventListener('click', () => {

    
    gatherData()
    
})


