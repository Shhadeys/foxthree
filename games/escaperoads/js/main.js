// 处理全屏功能
const gameFrame = document.querySelector('.game-frame');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const gameContainer = document.querySelector('.game-container');

if (fullscreenBtn && gameFrame) {
    fullscreenBtn.addEventListener('click', toggleFullScreen);

    // 添加退出全屏按钮
    const exitBtn = document.createElement('button');
    exitBtn.className = 'browser-exit-btn';
    exitBtn.innerHTML = `
        <span class="exit-icon">×</span>
        <span class="exit-text">Exit</span>
    `;
    gameContainer.appendChild(exitBtn);
    
    // 默认隐藏退出按钮
    exitBtn.style.display = 'none';
    
    // 添加退出按钮点击事件
    exitBtn.addEventListener('click', toggleFullScreen);
}

function toggleFullScreen() {
    // 简化为纯CSS方案，不再区分设备
    gameFrame.classList.toggle('browser-fullscreen');
    gameContainer.classList.toggle('fullscreen-mode');
    
    // 更新按钮显示状态
    const exitBtn = document.querySelector('.browser-exit-btn');
    const btnText = fullscreenBtn.querySelector('.btn-text');
    
    if (gameFrame.classList.contains('browser-fullscreen')) {
        exitBtn.style.display = 'flex';
        fullscreenBtn.style.display = 'none';
        document.body.style.overflow = 'hidden';
    } else {
        exitBtn.style.display = 'none';
        fullscreenBtn.style.display = 'flex';
        document.body.style.overflow = '';
        // 平滑滚动到游戏区域
        gameContainer.scrollIntoView({ behavior: 'smooth' });
    }
}
