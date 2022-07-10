const dictionary = [
    'apples',
    'lettuce',
    'Amsterdam',
    'carnivore',
    'radiation',
    'morphine',
    'happy',
    'cadaver',
    'cow',
    'violent',
    'clairvoyance',
    'Kosmikophobia',
    'swimming',
    'cannibal',
    'yellow',
    'amazing',
    'camera',
    'exciting',
    'reluctant',
    'global',
    'electrodynamometer',
    'whiteboard',
    'swine',
    'utilitarianism',
    'destruction',
    'disaster',
    'verbose',
    'window',
    'New York',
    'shark',
    'yarn',
    'paint',
    'avocado',
    'photograph',
    'violin',
    'colorless',
    'guitar',
    'basin',
    'Micropalaeontology',
    'Verminophobia',
    'victory',
    'fundamental',
    'whippersnappers',
    'pseudoantidisestablishmentarianism',
    'Microsoft',
    'butter',
    'rafters',
    'uncompartmentalized',
    'ridiculous',
    'rodomontadist'
]

const DEFAULT_LIVES = 6

let targetWord = []
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

    wordCharacters = getFilledCurrentWord(targetWord)

    resetCurrentWordComponent(wordCharacters)
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
        if (word[i] === ' ' || word[i] === '-') {
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
    const transformedTargetWord = targetWord.toUpperCase()
    let match = false;

    for (let i = 0; i < targetWord.length; i++) {
        if (transformedTargetWord[i] === letter) {
            wordCharacters[i] = targetWord[i]

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
            `<div class="mood-positive-text">${targetWord}</div></br>` +
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
            `<div class="mood-negative-text">${targetWord}</div></br>` +
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

function getAboutModal() {
    let modalTitle = 'ABOUT</br></br>'

    let modalBody = 
        '<div>' +
            '<div><span class="mood-neutral-text">SpEwInGs</span> is a word guessing game loosely based on Hangman.</div></br>' +
            '<div>You suggest letters to fill in the missing letters of the unknown word.</div></br>' +
            '<div class="mood-neutral-text">VOIDWORKS<span class="blink">_</span></div></br></br>'
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
