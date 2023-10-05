let passwords = localStorage.getItem('cg: pws')
if (!passwords) passwords = {}

let emailAddress = localStorage.getItem('cg: em')
if (!emailAddress) emailAddress = ''

const copyPassword = (host) => {
    if ( (host in passwords) === false ) {
        alert("You have no password generated for this website")
        return false
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(passwords[host])
            .then(() => {
                alert(`The password for ${host} has been copied`)
            })
    } else {
        // Fallback for browsers that don't support the Clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = passwords[host]
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        alert(`The password for ${host} has been copied`)
      }
}

const handleEmailBtn = () => {
    if (!emailInput.value) return
    if ( (emailInput.value.includes('@') === false) ) {
        alert('Please enter a valid email address')
        return
    }

    const response = window.confirm(`Are you sure you want to set your email address to ${emailInput.value}`)

    if (!response) return

    localStorage.setItem('cg: em', emailInput.value)
    emailAddress = emailInput.value
    alert(`Email Address set.\nAll passwords will be set to this email address: ${emailInput.value}`)
    window.location.reload()
}

const emailInput = document.querySelector('.email-form-input')
const emailButton = document.querySelector('.email-form-button')

emailButton.addEventListener('click', handleEmailBtn)

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0].url
    const activeHost = activeTab.split('/')[2]

    const currentWebsiteEl = document.querySelector(".current-website")
    currentWebsiteEl.innerText = activeHost

    const copyPassBtn = document.querySelector(".copy-password")
    copyPassBtn.addEventListener("click", () => copyPassword(activeHost))

    if (emailAddress) {
        const passContainer = document.querySelector('.password-container')
        passContainer.classList.remove('hidden')

        const emailContainer = document.querySelector('.get-email')
        emailContainer.classList.add('hidden')
    }
})