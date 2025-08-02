const { invoke } = window.__TAURI__.core

function hideError() {
    // 隐藏备案等
    if (document.querySelector('footer')) {
        document.querySelector('footer').style.display = 'none'
    }
    // 替换名称
    if (document.querySelector('#loginform > div > img')) {
        var titleModel = document.querySelector('#loginform > div')
        document.querySelector('#loginform > div > img').style.display = 'none'
        var newTitle = document.createElement('div')
        newTitle.textContent = '导税智能记账软件'
        newTitle.style.fontSize = '40px'
        newTitle.style.color = '#fff'
        newTitle.style.fontWeight = 'bold'
        newTitle.style.textAlign = 'center'
        titleModel.prepend(newTitle)
    }
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

document.addEventListener('contextmenu', function (e) {
    // e.preventDefault()
    // 移除已存在的菜单（防止重复）
    const existingMenu = document.querySelector('.custom-context-menu')
    if (existingMenu) {
        document.body.removeChild(existingMenu)
    }
    // 创建自定义菜单
    const menu = document.createElement('div')
    menu.className = 'custom-context-menu'
    menu.style.left = e.clientX + 'px'
    menu.style.top = e.clientY + 'px'

    // 添加返回按钮
    const backBtn = document.createElement('div')
    backBtn.className = 'menu-item'
    backBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      <span>返回</span>
    `
    backBtn.addEventListener('click', function () {
        window.history.back()
        menu.classList.add('fade-out')
        setTimeout(() => document.body.removeChild(menu), 200)
    })

    // 添加刷新按钮
    const refreshBtn = document.createElement('div')
    refreshBtn.className = 'menu-item'
    refreshBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      <span>刷新</span>
    `
    refreshBtn.addEventListener('click', function () {
        window.location.reload()
        menu.classList.add('fade-out')
        setTimeout(() => document.body.removeChild(menu), 200)
    })

    // 添加分隔线
    const separator = document.createElement('div')
    separator.className = 'menu-separator'

    menu.appendChild(backBtn)
    menu.appendChild(separator)
    menu.appendChild(refreshBtn)

    document.body.appendChild(menu)

    // 点击其他地方关闭菜单
    const closeMenu = function () {
        menu.classList.add('fade-out')
        setTimeout(() => {
            if (document.body.contains(menu)) {
                document.body.removeChild(menu)
            }
            document.removeEventListener('click', closeMenu)
        }, 200)
    }

    setTimeout(() => {
        document.addEventListener('click', closeMenu)
    }, 10)
})

// 添加CSS样式
const style = document.createElement('style')
style.textContent = `
  .custom-context-menu {
    position: fixed;
    background: white;
    border-radius: 8px;
    padding: 6px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    z-index: 1000;
    transform-origin: top left;
    animation: fadeIn 0.15s ease-out;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  
  .custom-context-menu.fade-out {
    animation: fadeOut 0.15s ease-in;
    opacity: 0;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: all 0.2s;
  }
  
  .menu-item svg {
    margin-right: 10px;
    color: #555;
  }
  
  .menu-item:hover {
    background: #f5f5f5;
    color: #000;
  }
  
  .menu-item:hover svg {
    color: #000;
  }
  
  .menu-separator {
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 6px 0;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  `
document.head.appendChild(style)
