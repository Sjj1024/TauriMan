const { invoke } = window.__TAURI__.core

function hideError() {
    // 隐藏logo
    if (document.querySelector('div.ydLogo')) {
        document.querySelector('div.ydLogo').style.display = 'none'
    }
    if (document.querySelector('div.logo')) {
        document.querySelector('div.logo').style.display = 'none'
    }
    // 隐藏barEntrance
    if (document.querySelector('.barEntrance')) {
        document.querySelectorAll('.barEntrance').forEach((element) => {
            if (
                element.innerHTML.includes('新手指导') ||
                element.innerHTML.includes('在线客服')
            ) {
                element.style.display = 'none'
            }
        })
    }
    // 隐藏查看按钮
    if (
        document.querySelector('tr > td > a') &&
        document.querySelector('tr > td > a').innerText.includes('查看')
    ) {
        const actionBtns = document.querySelectorAll('tr > td > a')
        console.log('actionBtns', actionBtns)
        actionBtns.forEach((element) => {
            if (element.innerText.includes('查看')) {
                element.style.display = 'none'
            }
        })
    } else {
        console.log('no actionBtns')
    }
    // 隐藏打印按钮
    if (
        document.querySelector('.hollowThemeButton') &&
        document.querySelector('.hollowThemeButton').innerText.includes('打印')
    ) {
        const printBtn = document.querySelectorAll('.hollowThemeButton')
        printBtn.forEach((element) => {
            if (element.innerText.includes('打印')) {
                element.style.display = 'none'
            }
        })
    }
    // replace logo
    if (
        document.querySelector('div.titleModel') &&
        document.querySelector('div.titleModel').innerHTML.includes('yundou')
    ) {
        var titleModel = document.querySelector('div.titleModel')
        var newElement = document.createElement('span')
        newElement.textContent = '导税智能记账软件'
        newElement.style.fontSize = '20px'
        titleModel.removeChild(titleModel.firstChild)
        titleModel.prepend(newElement)
        titleModel.style.display = 'flex'
        console.log('replace logo')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
    hideError()
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                hideError()
            }
        }
    })
    observer.observe(targetNode, config)
})

// 监听点击事件
const hookClick = (e) => {
    console.log('click a')
    const origin = e.target.closest('a')
    if (origin && origin.href && origin.target === '_blank') {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

document.addEventListener('click', hookClick, { capture: true })

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    // location.href = url
    if (url.includes('baiwang.com')) {
        invoke('open_url', { url: url })
    } else {
        location.href = url
    }
}
