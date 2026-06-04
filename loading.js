let originalTxtElement = null;
let loadingSequenceExecuted = false;
let skipSequence = false;
let currentSequencePromise = null;
let sequenceAborted = false;
let pendingUrlId = null;

function hideInputLine() {
    const txtDiv = document.getElementById('txt');
    if (txtDiv && originalTxtElement === null) {
        originalTxtElement = txtDiv.cloneNode(true);
        txtDiv.style.display = 'none';
    }
}

function restoreInputLine() {
    const txtDiv = document.getElementById('txt');
    if (txtDiv && originalTxtElement) {
        txtDiv.style.display = 'flex';
        const input = document.querySelector('.txt-input');
        if (input) input.focus();
    }
}

function clearForLoading() {
    const content = document.querySelector('.content');
    if (content) {
        content.innerHTML = '';
    }
}

function clearScreen() {
    const content = document.querySelector('.content');
    if (content) {
        content.innerHTML = '';
    }
    scrollToBottomLoading();
}

function scrollToBottomLoading() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function addHTML(container, html) {
    if (sequenceAborted) return null;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    container.appendChild(wrapper);
    scrollToBottomLoading();
    return wrapper;
}

async function wait(ms) {
    if (sequenceAborted) return;
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayProgressCheck(container, checkName, result, statusColor = '#00FF00') {
    if (sequenceAborted) return;
    
    return new Promise(async (resolve) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.fontFamily = 'IBM';
        lineDiv.style.fontSize = '28px';
        lineDiv.style.color = '#C0C0C0';
        container.appendChild(lineDiv);
        
        const targetWidth = 55;
        const nameLength = checkName.length;
        const dotsNeeded = Math.max(3, targetWidth - nameLength);
        
        let dots = '';
        for (let i = 0; i < dotsNeeded; i++) {
            if (sequenceAborted) break;
            await wait(30);
            dots += '.';
            lineDiv.innerHTML = checkName + dots;
            scrollToBottomLoading();
        }
        
        if (!sequenceAborted) {
            await wait(50);
            lineDiv.innerHTML = checkName + dots + `<span style="color: ${statusColor}">[${result}]</span>`;
            scrollToBottomLoading();
        }
        resolve();
    });
}

//check url param
function checkUrlParamAndSkip() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    
    if (idParam && idParam.trim() !== '') {
        pendingUrlId = idParam.trim().toUpperCase();
        skipSequence = true;
        return true;
    }
    return false;
}

async function skipToLogo() {
    if (sequenceAborted) return;
    sequenceAborted = true;
    
    clearScreen();
    
    if (typeof executeCommand === 'function') {
        executeCommand('logo');
    }
    
    restoreInputLine();
    
    const input = document.querySelector('.txt-input');
    if (input) input.focus();
    
    if (pendingUrlId) {
        setTimeout(() => {
            if (typeof addOutput === 'function') {
                addOutput(`@>  check ${pendingUrlId}`, 'command-line');
            }
            if (typeof executeCommand === 'function') {
                executeCommand(`check ${pendingUrlId}`);
            }
        }, 500);
    }
}

function setupSkipListener() {
    const handleSkip = (event) => {
        if (event.key === 'Enter' && !sequenceAborted && !skipSequence) {
            skipSequence = true;
            skipToLogo();
        }
    };
    
    document.addEventListener('keydown', handleSkip);
    return () => document.removeEventListener('keydown', handleSkip);
}

//

const BOOT_SEQUENCE = {
    screen1: {
        lines: [
            { html: '<br><br>FCORES Modular Boot Loader v11.4.4, <span style="color: #FFFF00">Energy Star ally</span>' },
            { html: '<span style="color: #808080">Copyright (C) CORE Systems, Inc.<br>Copyright (C) Ferric D&D</span>' },
            { html: '<br><br>' },
            { html: '(55XWUQ0E) Intel i430VX PCIset(TM)<br>' },
            { html: 'PENTIUM-S CPU at 75MHz' },
            { html: '<br>' }
        ],
        delays: [0, 0, 0, 100, 100, 0],
        postDelay: 1500
    },
    
    screen2: {
        lines: [
            { html: '<br><br><span style="color: #FFFF00">SENTRI SEBIOS (C)SENTRI Inc.,</span>' },
            { html: 'Release 10/03/30XX<br><br>' }
        ],
        delays: [0, 0],
        postDelay: 500
    },
    
    initialBlankLines: 20,
    
    middleContent: {
        lines: [
            { html: 'CPU : Intel i430VX @ 75MHz' },
            { html: 'FPU : Integrated' },
            { html: 'RAM_COUNTER' },
            { html: '<br>' },
            { html: 'Primary Floppy Drive A: 10.21F00 FLP MagTFDD01992A001 <span style="color: #00FF00">OK</span>' },
            { html: 'Primary Hard Disk 03.01D81 WDC FerrHDD0064MB <span style="color: #00FF00">OK</span>' },
            { html: 'C: 21.9MB <span style="color: #00FF00">OK</span>' },
            { html: 'D: 42.1MB <span style="color: #00FF00">OK</span>' },
			{ html: '<br>' }
        ],
        delays: [200, 200, 200, 0, 0, 1000, 1500, 100, 200, 200]
    },
    
    postChecks: [
        { name: 'IDE Controller', result: 'OK', color: '#00FF00' },
        { name: 'PS/2 Controller', result: 'OK', color: '#00FF00' },
        { name: 'ACPI BIOS', result: 'OK', color: '#00FF00' },
        { name: 'SMBIOS v2.5', result: 'OK', color: '#00FF00' },
        { name: 'PnP Resources', result: 'OK', color: '#00FF00' },
        { name: 'DMI Pool Data', result: 'OK', color: '#00FF00' },
        { name: 'ISA Devices', result: '05', color: '#FFFF00' },
        { name: 'Keyboard Controller', result: 'OK', color: '#00FF00' },
        { name: 'Serial Controllers(s) (COM1 .. COM5)', result: 'OK', color: '#00FF00' },
        { name: 'Parallel Controllers(s) (LPT1 .. LPT3)', result: 'OK', color: '#00FF00' },
        { name: 'Network Adapter', result: 'OK', color: '#00FF00' }
    ],
    
    bottomLines: [
        { html: '<br>' },
        { html: '(C)SENTRI Inc.,' },
        { html: '49-PA56-001437-00101111-026391-PURPLE-C' },
		{ html: '<div style="background-color: #C0C0C0; color: #000000">&nbsp;Press<span style="color: #0000FF; cursor: pointer;" onclick="skipToLogo()"> [Enter]</span> to skip</div>' }
    ],
    
    finalMessages: [
        { html: '<br><br><span style="color: #FFFF00">OS Loader: MIRAJ\'S PALACE BOOT v17.1.0012</span>' },
        { html: '<br>' },
        { html: '<span style="color: #00FF00">System ready. Booting Miraj\'s Palace...</span>' }
    ],
    
    timing: {
        screen1PostDelay: 1500,
        screen2PostDelay: 500,
        middleLineDelay: 200,
        postCheckDelay: 10,
        bottomLinesDelay: 800,
        finalDelay: 600,
        finalPostDelay: 1200
    }
};

//

async function displayRAMCounter(container, blankIndex, blankLineElements, replaceCallback) {
    if (sequenceAborted) return;
    
    const totalRAM = 65536;
    const steps = 50;
    const delayPerStep = 30;
    
    let targetElement;
    if (blankIndex < blankLineElements.length && blankLineElements[blankIndex]) {
        targetElement = blankLineElements[blankIndex];
    } else {
        targetElement = document.createElement('div');
        targetElement.style.fontFamily = 'IBM';
        targetElement.style.fontSize = '28px';
        targetElement.style.color = '#C0C0C0';
        container.appendChild(targetElement);
        scrollToBottomLoading();
    }
    
    for (let i = 0; i <= steps; i++) {
        if (sequenceAborted) break;
        
        const currentKB = Math.floor((i / steps) * totalRAM);
        const currentMB = (currentKB / 1024).toFixed(1);
        
        targetElement.innerHTML = `RAM : ${currentMB}MB (${currentKB.toLocaleString()}KB) `;
        scrollToBottomLoading();
        await wait(delayPerStep);
    }
    
    if (!sequenceAborted) {
        targetElement.innerHTML = `RAM : 64.0MB (65,536KB) <span style="color: #00FF00">OK</span>`;
        scrollToBottomLoading();
    }
}

async function executeBootSequence() {
    if (checkUrlParamAndSkip()) {
        await skipToLogo();
        return;
    }
    
    const removeSkipListener = setupSkipListener();
    
    hideInputLine();
    clearForLoading();
    
    const container = document.createElement('div');
    container.style.fontFamily = 'IBM';
    container.style.fontSize = '28px';
    const content = document.querySelector('.content');
    if (content) content.appendChild(container);
    
    for (let i = 0; i < BOOT_SEQUENCE.screen1.lines.length; i++) {
        if (sequenceAborted) break;
        const line = BOOT_SEQUENCE.screen1.lines[i];
        const delay = BOOT_SEQUENCE.screen1.delays[i] || 0;
        if (delay > 0) await wait(delay);
        if (!sequenceAborted) addHTML(container, line.html);
    }
    if (!sequenceAborted) await wait(BOOT_SEQUENCE.timing.screen1PostDelay);
    
    if (sequenceAborted) {
        removeSkipListener();
        return;
    }
    
    clearScreen();
    
    const biosContainer = document.createElement('div');
    biosContainer.style.fontFamily = 'IBM';
    biosContainer.style.fontSize = '28px';
    if (content) content.appendChild(biosContainer);
    
    for (let i = 0; i < BOOT_SEQUENCE.screen2.lines.length; i++) {
        if (sequenceAborted) break;
        const line = BOOT_SEQUENCE.screen2.lines[i];
        const delay = BOOT_SEQUENCE.screen2.delays[i] || 0;
        if (delay > 0) await wait(delay);
        if (!sequenceAborted) addHTML(biosContainer, line.html);
    }
    if (!sequenceAborted) await wait(BOOT_SEQUENCE.timing.screen2PostDelay);
    
    if (sequenceAborted) {
        removeSkipListener();
        return;
    }
    
    const blankLineElements = [];
    for (let i = 0; i < BOOT_SEQUENCE.initialBlankLines; i++) {
        if (sequenceAborted) break;
        const blankDiv = document.createElement('div');
        blankDiv.innerHTML = '<br>';
        blankDiv.style.fontFamily = 'IBM';
        blankDiv.style.fontSize = '28px';
        blankDiv.style.color = '#C0C0C0';
        blankDiv.className = 'dynamic-blank';
        biosContainer.appendChild(blankDiv);
        blankLineElements.push(blankDiv);
        scrollToBottomLoading();
    }
    
    if (sequenceAborted) {
        removeSkipListener();
        return;
    }
    
    for (const line of BOOT_SEQUENCE.bottomLines) {
        if (sequenceAborted) break;
        addHTML(biosContainer, line.html);
    }
    
    let blankIndex = 0;
    
    function replaceNextBlankWithContent(html) {
        if (blankIndex < blankLineElements.length && blankLineElements[blankIndex]) {
            blankLineElements[blankIndex].innerHTML = html;
            blankLineElements[blankIndex].style.color = '#C0C0C0';
            blankIndex++;
            scrollToBottomLoading();
        } else {
            addHTML(biosContainer, html);
        }
    }
    
    for (let i = 0; i < BOOT_SEQUENCE.middleContent.lines.length; i++) {
    if (sequenceAborted) break;
    const line = BOOT_SEQUENCE.middleContent.lines[i];
    const delay = BOOT_SEQUENCE.middleContent.delays[i] || BOOT_SEQUENCE.timing.middleLineDelay;
    await wait(delay);
    if (!sequenceAborted) {
        if (line.html === 'RAM_COUNTER') {
            await displayRAMCounter(biosContainer, blankIndex, blankLineElements, replaceNextBlankWithContent);
            if (blankIndex < blankLineElements.length) {
                blankIndex++;
            }
        } else {
            replaceNextBlankWithContent(line.html);
        }
    }
}
    
    if (sequenceAborted) {
        removeSkipListener();
        return;
    }
    
    for (const check of BOOT_SEQUENCE.postChecks) {
        if (sequenceAborted) break;
        
        const targetWidth = 41;
        const nameLength = check.name.length;
        const dotsNeeded = Math.max(3, targetWidth - nameLength);
        
        if (blankIndex < blankLineElements.length && blankLineElements[blankIndex]) {
            const targetBlank = blankLineElements[blankIndex];
            
            let dots = '';
            for (let i = 0; i < dotsNeeded; i++) {
                if (sequenceAborted) break;
                await wait(30);
                dots += '.';
                targetBlank.innerHTML = check.name + dots;
                scrollToBottomLoading();
            }
            
            if (!sequenceAborted) {
                await wait(50);
                targetBlank.innerHTML = check.name + dots + `<span style="color: ${check.color}">[${check.result}]</span>`;
                blankIndex++;
                scrollToBottomLoading();
            }
        } else {
            if (!sequenceAborted) {
                await displayProgressCheck(biosContainer, check.name, check.result, check.color);
            }
        }
        
        if (!sequenceAborted) await wait(BOOT_SEQUENCE.timing.postCheckDelay);
    }
    
    if (sequenceAborted) {
        removeSkipListener();
        return;
    }
    
    await wait(BOOT_SEQUENCE.timing.bottomLinesDelay);
    await wait(BOOT_SEQUENCE.timing.finalDelay);
    
    clearScreen();
    
    const finalContainer = document.createElement('div');
    finalContainer.style.fontFamily = 'IBM';
    finalContainer.style.fontSize = '28px';
    if (content) content.appendChild(finalContainer);
    
    for (const line of BOOT_SEQUENCE.finalMessages) {
        if (sequenceAborted) break;
        addHTML(finalContainer, line.html);
        await wait(300);
    }
    
    if (sequenceAborted) {
        removeSkipListener();
        return;
    }
    
    await wait(BOOT_SEQUENCE.timing.finalPostDelay);
    
    if (typeof executeCommand === 'function') {
        clearScreen();
        executeCommand('logo');
    }
    
    restoreInputLine();
    
    const input = document.querySelector('.txt-input');
    if (input) input.focus();
    
    removeSkipListener();
}

sequenceAborted = false;
skipSequence = false;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(executeBootSequence, 100);
    });
} else {
    setTimeout(executeBootSequence, 100);
}