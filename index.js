let passwords = localStorage.getItem('cg: pws')
if (!passwords) passwords = {}

const copyPassword = (host) => {
    if ( (host in passwords) === false ) {
        alert("You have no password generated for this website")
        return false
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(passwords[host])
            .then(() => {
                alert("Password has been copied")
            })
    } else {
        // Fallback for browsers that don't support the Clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = passwords[host]
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        alert("Password has been copied")
      }
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0].url
    const activeHost = activeTab.split('/')[2]

    const currentWebsiteEl = document.querySelector(".current-website")
    currentWebsiteEl.innerText = activeHost

    const copyPassBtn = document.querySelector(".copy-password")
    copyPassBtn.addEventListener("click", () => copyPassword(activeHost))
})