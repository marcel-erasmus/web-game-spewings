const dictionary = [
    { 
        word: 'apples',
        hint: 'A common fruit that contains two Ps.'
    },
    { 
        word: 'lettuce',
        hint: 'One of the most common salad ingredients.'
    },
    { 
        word: 'Amsterdam',
        hint: 'A city in Europe that is said to have more bicycles than people.'
    },
    { 
        word: 'carnivore',
        hint: '"Meat good."'
    },
    { 
        word: 'radiation',
        hint: 'A word that rhymes with "meditation".'
    },
    { 
        word: 'morphine',
        hint: '"Make the pain go away..."' 
    },
    { 
        word: 'happy',
        hint: 'An emotion.' 
    },
    { 
        word: 'cadaver',
        hint: 'A macabre word that rhymes with "father".'
    },
    { 
        word: 'cow',
        hint: 'Moo...'
    },
    { 
        word: 'violent',
        hint: 'Using or involving physical force intended to hurt, damage, or kill someone or something.'
    },
    { 
        word: 'clairvoyance',
        hint: 'The supposed faculty of perceiving things or events in the future or beyond normal sensory contact.'
    },
    { 
        word: 'Kosmikophobia',
        hint: 'The fear of cosmic phenomena.'
    },
    { 
        word: 'swimming', 
        hint: 'Contains some of the letters from the word "swine".'
    },
    { 
        word: 'cannibal',
        hint: '"Looks like meat\'s back on the menu boys!"'
    },
    { 
        word: 'yellow',
        hint: 'A colour.'
    },
    { 
        word: 'amazing',
        hint: 'This word contains some of the letters of the word "fungal".'
    },
    { 
        word: 'camera',
        hint: 'A device invented in 1816 by a French dude.'
    },
    { 
        word: 'exciting',
        hint: 'If you hear this word in a work context... Run.'
    },
    { 
        word: 'reluctant',
        hint: 'Disinclined.'
    },
    { 
        word: 'global',
        hint: '"All over the world."'
    },
    { 
        word: 'electrodynamometer',
        hint: 'These instruments are very useful for accurate measurements of the RMS value of voltage irrespective of the waveform.'
    },
    { 
        word: 'whiteboard',
        hint: 'A rather scary object in software engineering interviews.'
    },
    { 
        word: 'swine',
        hint: '"Hmm... Pork."'
    },
    { 
        word: 'utilitarianism',
        hint: 'The doctrine that actions are right if they are useful or for the benefit of a majority.'
    },
    { 
        word: 'destruction',
        hint: 'The action or process of causing so much damage to something that it no longer exists or cannot be repaired.'
    },
    { 
        word: 'disaster',
        hint: 'A sudden accident or a natural catastrophe that causes great damage or loss of life.'
    },
    { 
        word: 'verbose',
        hint: 'Using or expressed in more words than are needed.'
    },
    { 
        word: 'window',
        hint: 'Without these, structures such as houses would be quite dark in general.'
    },
    { 
        word: 'New York',
        hint: 'Originally called New Amsterdam.'
    },
    { 
        word: 'shark',
        hint: 'Jaws.'
    },
    { 
        word: 'yarn',
        hint: 'Spun thread used for knitting, weaving, or sewing.'
    },
    { 
        word: 'paint',
        hint: 'A coloured substance which is spread over a surface and dries to leave a thin decorative or protective coating.'
    },
    { 
        word: 'avocado',
        hint: 'Testicle fruit.'
    },
    { 
        word: 'photograph',
        hint: 'Nickelback has a song that\s titled after this word.'
    },
    { 
        word: 'violin',
        hint: 'A device that can be used to make music.'
    },
    { 
        word: 'colourless',
        hint: 'An adjective that can used to describe a distaste for a visual object.'
    },
    { 
        word: 'guitar',
        hint: 'An object that is used to produce noise which humans call "music".'
    },
    { 
        word: 'basin',
        hint: 'This word contains some of the letters of the word "pizza".'
    },
    { 
        word: 'Micropalaeontology',
        hint: 'The study of fossils that require the use of a microscope to see the organism, its morphology and its characteristic details.'
    },
    { 
        word: 'Verminophobia',
        hint: 'Germs be scary.'
    },
    { 
        word: 'victory',
        hint: 'An outcome or condition sought after by many.'
    },
    { 
        word: 'fundamental',
        hint: 'Forming a necessary base or core; of central importance.'
    },
    { 
        word: 'whippersnappers',
        hint: 'Young and inexperienced people considered to be presumptuous or overconfident.'
    },
    { 
        word: 'pseudoantidisestablishmentarianism',
        hint: 'False opposition to the separation of church and of the state.'
    },
    { 
        word: 'Microsoft',
        hint: 'A rather large American company.'
    },
    { 
        word: 'butter',
        hint: 'A substance made by churning cream.'
    },
    { 
        word: 'rafters',
        hint: 'Parts of the internal framework of a roof.'
    },
    { 
        word: 'uncompartmentalised',
        hint: 'Not divided into isolated units.'
    },
    { 
        word: 'ridiculous',
        hint: 'Deserving or inviting derision or mockery; absurd.'
    },
    { 
        word: 'rodomontadist',
        hint: 'A person who boasts.'
    }
]

const DEFAULT_LIVES = 6

let targetWord = {}
let wordCharacters = []

let lives = DEFAULT_LIVES
let winStreak = 0

let currentWordComponents = []

let lifeComponents = []

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button-menu').addEventListener('click', presentMenu)

    document.querySelectorAll('.button-menu-dismiss').forEach((button) => {
        button.addEventListener('click', dismissMenu)
    })

    document.querySelector('.overlay').addEventListener('click', () => {
        clickOverlay()
    })

    document.querySelectorAll('.button-reset').forEach((button) => {
        button.addEventListener('click', clickButtonReset)
    })

    document.querySelectorAll('.button-hint').forEach((button) => {
        button.addEventListener('click', clickButtonHint)
    })

    document.querySelectorAll('.button-about').forEach((button) => {
        button.addEventListener('click', clickButtonAbout)
    })

    document.querySelectorAll('.button-letter-input').forEach((button) => {
      button.addEventListener('click', selectLetter)
    })

    resetGame()
})

// ==================== START: CLICK EVENTS

function clickOverlay() {
    dismissMenu()
    dismissModal()
}

function clickButtonReset() {
    dismissMenu()
    presentModal(getResetConfirmationModal())
}

function clickButtonHint() {
    document.querySelectorAll('.button-hint').forEach((button) => {
        button.classList.add("hidden")
    })

    dismissMenu()
    presentModal(getHintModal())
}

function clickButtonAbout() {
    dismissMenu()
    presentModal(getAboutModal())
}

// ==================== END: CLICK EVENTS

function resetGame() {
    lives = DEFAULT_LIVES
    winStreak = 0

    resetWord()
    resetLifeComponents()
    updateLifeSummaryValueComponent()
}

function resetWord() {
    resetCharacterComponents()
    resetLetterInputComponents()

    targetWord = dictionary[Math.floor(Math.random() * dictionary.length)]

    wordCharacters = getFilledCurrentWord(targetWord.word)

    resetCurrentWordComponent(wordCharacters)

    if (winStreak % 2 == 0) {
        document.querySelectorAll('.button-hint').forEach((button) => {
            button.classList.remove('hidden')
        })
    }
}

function resetCurrentWordComponent(currentWord) {
    const currentWordContainerComponent = document.querySelector('.container-current-word')

    currentWord.forEach((character) => {
        let currentWordComponent = document.createElement('div')
        currentWordComponent.textContent = character
        currentWordComponent.className = 'current-word-character current-word-character-unknown interactable'

        currentWordComponents.push(currentWordComponent)

        currentWordContainerComponent.appendChild(currentWordComponent)
    })
}

function resetCharacterComponents() {
    currentWordComponents.forEach((characterElement) => {
        characterElement.remove()
    })

    currentWordComponents = []
}

function resetLetterInputComponents() {
    document.querySelectorAll('.button-letter-input').forEach((button) => {
        button.removeEventListener('click', selectLetter)
        button.addEventListener('click', selectLetter)
        button.classList.remove('button-letter-input-disabled')
    })
}

function resetLifeComponents() {
    lives = DEFAULT_LIVES

    const livesContainerComponent = document.querySelector('.container-lives')

    lifeComponents.forEach((lifeComponent) => {
        lifeComponent.remove()
    })

    lifeComponents = []

    for (let i = 0; i < DEFAULT_LIVES; i++) {
        let lifeComponent = document.createElement('img')
        lifeComponent.className = 'life-indicator life'
        lifeComponent.src = 'https://images2.imgbox.com/91/a4/4GDp7JQK_o.png'
        
        lifeComponents.push(lifeComponent)

        livesContainerComponent.appendChild(lifeComponent)
    }
}

function updateCurrentWordCharacterComponent(index) {
    let component = currentWordComponents[index]

    component.textContent = wordCharacters[index]
    component.classList.remove('current-word-character-unknown')
}

function updateLifeSummaryValueComponent() {
    document.querySelector('.life-summary-value').innerText = lives
}

function getFilledCurrentWord(word) {
    let results = []
    for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ' || word[i].word === '-') {
            results.push(word[i])
        } else {
            results.push('?')
        }
    }

    return results;
}

function selectLetter(e) {
    const button = e.target;
    const pickedLetter = button.value

    button.removeEventListener('click', selectLetter, false)

    button.classList.add('button-letter-input-disabled')

    matchLetter(pickedLetter)
}

function matchLetter(letter) {
    const transformedTargetWord = targetWord.word.toUpperCase()
    let match = false;

    for (let i = 0; i < targetWord.word.length; i++) {
        if (transformedTargetWord[i] === letter) {
            wordCharacters[i] = targetWord.word[i]

            match = true

            updateCurrentWordCharacterComponent(i)
        }
    }

    if (!match) {
        decrementLives()
    }

    if (!wordCharacters.find(wordChar => { return wordChar === '?' })) {
        winStreak += 1

        incrementLives()

        presentModal(getCorrectWordModal())
        resetWord()
    } 
}

function incrementLives() {
    if (lives < 6) {
        lives += 1
    }

    updateLifeSummaryValueComponent()

    for (let i = lifeComponents.length - 1; i >= 0; i--) {
        let lifeComponent = lifeComponents[i]
        if (lifeComponent.classList.contains('death')) {
            lifeComponent.classList.remove('death')
            lifeComponent.classList.add('life')
            lifeComponent.classList.remove('interactable')
            lifeComponent.src = 'https://images2.imgbox.com/91/a4/4GDp7JQK_o.png'

            return
        }
    }
}

function decrementLives() {
    lives -= 1

    updateLifeSummaryValueComponent()

    if (lives <= 0) {
        presentModal(getGameOverModal())
        
        resetGame()

        return
    }

    for (let i = 0; i < lifeComponents.length; i++) {
        let lifeComponent = lifeComponents[i]
        if (lifeComponent.classList.contains('life')) {
            lifeComponent.classList.remove('life')
            lifeComponent.classList.add('death')
            lifeComponent.classList.add('interactable')
            lifeComponent.src = 'https://images2.imgbox.com/64/be/HflH6VtB_o.png'

            return
        }
    }
}

//  ==================== START: MENU

function presentMenu() {
    const navMenu = document.querySelector('.nav-menu')
    const overlay = document.querySelector('.overlay')

    navMenu.classList.add('nav-menu-active')
    overlay.classList.remove('hidden')
}

function dismissMenu() {
    const navMenu = document.querySelector('.nav-menu')
    const overlay = document.querySelector('.overlay')

    navMenu.classList.remove('nav-menu-active')
    overlay.classList.add('hidden')
}

//  ==================== END: MENU

//  ==================== START: MODAL

function presentModal(modalContent) {
    const modalTitleComponent = document.querySelector('.modal-title')
    const modalBodyComponent = document.querySelector('.modal-body')
    const modalActionsComponent = document.querySelector('.modal-actions')
    const overlay = document.querySelector('.overlay')
    const modal = document.querySelector('.modal')

    modalTitleComponent.replaceChildren()
    modalBodyComponent.replaceChildren()
    modalActionsComponent.replaceChildren()

    if (modalContent.modalTitle) {
        modalTitleComponent.innerHTML = modalContent.modalTitle
    }

    if (modalContent.modalBody) {
        modalBodyComponent.innerHTML = modalContent.modalBody
    }

    if (modalContent.modalActions) {
        modalContent.modalActions.forEach(modalAction => {
            modalActionsComponent.appendChild(modalAction)
        })
    }

    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function dismissModal() {
    document.querySelector('.modal').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')
}

function getResetConfirmationModal() {
    let modalTitle = 'CONFIRMATION</br></br>'
    
    let modalBody = 
        '<div>' +
            '<div class="mood-positive-text ri-refresh-line" style="font-size: 4rem;"></div></br>' +
            '<div>Are you sure that you want to restart?</div></br></br>' +
        '</div>'

    let buttonYes = document.createElement('button')
    buttonYes.innerText = 'Yurp'
    buttonYes.className = 'mood-positive'

    buttonYes.addEventListener('click', () => {
        dismissModal()
        resetGame() 
    })

    let buttonNo = document.createElement('button')
    buttonNo.innerText = 'Nope'
    buttonNo.className = 'mood-negative'

    buttonNo.addEventListener('click', () => {
        dismissModal()
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [buttonYes, buttonNo]
    }
}

function getCorrectWordModal() {
    let modalTitle = 'CORRECT</br></br>'
    
    let modalBody = 
        '<div>' +
            '<div class="mood-positive-text ri-check-line" style="font-size: 4rem;"></div></br>' +
            '<div>Good job, you got it!</div></br>' +
            `<div class="mood-positive-text">${targetWord.word}</div></br>` +
            `<div class="mood-neutral-text">Streak: ${winStreak}</div></br></br>` +
        '</div>'

    let button = document.createElement('button')
    button.innerText = 'Continue'
    button.className = 'mood-positive'

    button.addEventListener('click', () => {
        dismissModal()
        resetWord() 
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

function getGameOverModal() {
    let modalTitle = 'GAME OVER</br></br>'

    let modalBody = 
        '<div>' +
            '<div class="mood-negative-text" style="font-size: 4rem;">:(</div></br>' +
            '<div>How very dead...</div></br>' +
            '<div>The word that did you in was:</div>' +
            `<div class="mood-negative-text">${targetWord.word}</div></br>` +
            `<div class="mood-neutral-text">Streak: ${winStreak}</div></br></br>` +
        '</div>'

    let button = document.createElement('button')
    button.innerText = 'Try Again';

    button.addEventListener('click', () => {
        dismissModal()
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

function getHintModal() {
    let modalTitle = 'HINT</br></br>'

    let modalBody = 
        '<div>' +
            `<div class="ri-question-mark mood-positive-text" style="font-size: 4rem;"></div></br>` +
            `<div>${targetWord.hint}</div></br></br>` +
        '</div>'

    let button = document.createElement('button')
    button.innerText = 'Okay';

    button.addEventListener('click', () => {
        dismissModal()
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

function getAboutModal() {
    let modalTitle = 'ABOUT</br></br>'

    let modalBody = 
        '<div>' +
            '<div><span class="mood-neutral-text">SpEwInGs</span> is a word guessing game loosely based on Hangman.</div></br>' +
            '<div>You suggest letters to fill in the missing letters of the unknown word.</div></br>' +
            '<div class="mood-neutral-text">VOIDWORKS<span class="blink">_</span></div></br></br>' +
        '</div>'

    let button = document.createElement('button')
    button.innerText = 'Okay';

    button.addEventListener('click', () => {
        dismissModal()
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

//  ==================== END: MODAL
