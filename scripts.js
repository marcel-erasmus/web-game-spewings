const DEFAULT_LIVES = 6

let dictionary = []
let wordPool = []

let targetWord = {}
let wordCharacters = []

let lives = DEFAULT_LIVES
let winStreak = 0

let currentWordComponents = []

let lifeComponents = []

document.addEventListener('DOMContentLoaded', async () => {
    dictionary = await getDictionary()

    if (dictionary.length == 0) {
        document.querySelector('.container-loader').innerText = 'Unable to obtain dictionary...'
        
        return
    } else {
        document.querySelector('.container-loader').classList.add('hidden')
        document.querySelector('.container-main').classList.remove('hidden')
    }

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

async function getDictionary() {
    const response = await fetch('https://gist.githubusercontent.com/VoidBeans/f3d777ee297d0e26955a2fdfa21a20ce/raw/a46e976c7aa8f5c56ca1fb976529b09455bddfd1/web-game-spewings-dictionary.json')

    if (response.ok) {
        return await response.json();
    } else {
        console.log("HTTP Status: " + response.status);

        return []
    }
  }

// ==================== START: CLICK EVENTS

function clickOverlay() {
    dismissMenu()
    dismissModal()
}

function clickButtonReset() {
    dismissMenu()
    presentModal(getResetConfirmationModalContent())
}

function clickButtonHint() {
    dismissMenu()
    presentModal(getHintModalContent())
}

function clickButtonAbout() {
    dismissMenu()
    presentModal(getAboutModalContent())
}

// ==================== END: CLICK EVENTS

function resetGame() {
    wordPool = [...dictionary]

    lives = DEFAULT_LIVES
    winStreak = 0

    resetWord()
    resetLifeComponents()
    updateLifeSummaryValueComponent()
}

function resetWord() {
    let randomWordIndex = Math.floor(Math.random() * wordPool.length)

    targetWord = wordPool[randomWordIndex]

    wordPool.splice(randomWordIndex, 1)

    if (wordPool.length == 0) {
        wordPool = [...dictionary]
    }

    wordCharacters = getFilledCurrentWord(targetWord.word)

    resetCharacterComponents()
    resetLetterInputComponents()
    resetCurrentWordComponent(wordCharacters)

    window.scrollTo(0, 0)
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

    return results
}

function selectLetter(e) {
    const button = e.target
    const pickedLetter = button.value

    button.removeEventListener('click', selectLetter, false)

    button.classList.add('button-letter-input-disabled')

    matchLetter(pickedLetter)
}

function matchLetter(letter) {
    const transformedTargetWord = targetWord.word.toUpperCase()
    let match = false

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

        presentModal(getCorrectWordModalContent())
        resetWord()
    } 
}

function incrementLives() {
    if (lives < DEFAULT_LIVES) {
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
        presentModal(getGameOverModalContent())
        
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
    const overlay = document.querySelector('.overlay')
    const modal = document.querySelector('.modal')
    const modalTitleComponent = document.querySelector('.modal-title')
    const modalBodyComponent = document.querySelector('.modal-body')
    const modalActionsComponent = document.querySelector('.modal-actions')

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

    overlay.classList.remove('hidden')
    modal.classList.remove('hidden')

    modal.scrollTop = 0
}

function dismissModal() {
    document.querySelector('.modal').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')
}

function getResetConfirmationModalContent() {
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

function getCorrectWordModalContent() {
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
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

function getGameOverModalContent() {
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
    button.innerText = 'Try Again'

    button.addEventListener('click', () => {
        dismissModal()
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

function getHintModalContent() {
    let modalTitle = 'HINT</br></br>'

    let modalBody = 
        '<div>' +
            `<div class="ri-question-mark mood-positive-text" style="font-size: 4rem;"></div></br>` +
            `<div>${targetWord.hint}</div></br></br>` +
        '</div>'

    let button = document.createElement('button')
    button.innerText = 'Okay'

    button.addEventListener('click', () => {
        dismissModal()
    })

    return {
        modalTitle: modalTitle,
        modalBody: modalBody,
        modalActions: [button]
    }
}

function getAboutModalContent() {
    let modalTitle = 'ABOUT</br></br>'

    let modalBody = 
        '<div>' +
            '<div><span class="mood-neutral-text">SpEwInGs</span> is a word guessing game loosely based on Hangman.</div></br>' +
            '<div>You suggest letters to fill in the missing letters of the unknown word.</div></br>' +
            '<div class="mood-neutral-text">VOIDWORKS<span class="blink">_</span></div></br></br>' +
        '</div>'

    let button = document.createElement('button')
    button.innerText = 'Okay'

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
