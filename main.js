const COMMANDS = {
    help: {
        description: "showCommands()",
        usage: "",
        execute: () => showHelp()
    },
    logo: {
        description: "addArtOutput('logo')",
        usage: "",
        execute: () => addArtOutput('logo')
    },
    meow: {
        description: "",
        usage: "",
        execute: () => addStyledOutput("meow", { color: "#FF00FF" }),
		hideFromHelp: true
    },
    color: {
        description: "showColorPalette()",
        usage: "",
        execute: () => showColorPalette()
    },
    clear: {
        description: "clearTerminal()",
        usage: "",
        execute: () => clearTerminal()
    },
    date: {
        description: "showDateTime()",
        usage: "",
        execute: () => showDateTime()
    },
    dir: {
        description: "redirectTo('dir')",
        usage: "",
        execute: () => redirectTo("dir.html")
    },
    exit: {
        description: "redirectTo('index')",
        usage: "",
        execute: () => redirectTo("https://mirajspalace.space")
    },
    retmmyt: {
        description: "",
        usage: "",
        execute: () => addArtOutput('retmmyt'),
        hideFromHelp: true
    },
    dunderhead: {
        description: "",
        usage: "",
        execute: () => addArtOutput('dunderhead'),
        hideFromHelp: true
    },
    
    sound: {
        description: "showSoundList() || playSound()",
        usage: "[sound]",
        execute: () => showSoundList()
    },
	
	stations: {
        description: "showStations()",
        usage: "",
        execute: () => showStations()
	},
    
    encode: {
        description: "Encode division to HEX",
        usage: "&lt;station&gt; [division]",
        execute: (args) => executeEncode(args)
    },
    decode: {
        description: "Decode HEX to division",
        usage: "&lt;station&gt; &lt;hex&gt;",
        execute: (args) => executeDecode(args)
    },
	
	symbol: {
    description: "showSymbolMap()",
    usage: "",
    execute: () => showSymbolMap()
	},
	
	check: {
        description: "lookupRecord()",
        usage: "&lt;id&gt;",
        execute: (args) => executeCheck(args)
	}
};

const SOUNDS = {
    startup: { file: "sound/system_startup.mp3", description: "System startup" },
    burnout_demo: { file: "sound/burnout demo.flac", description: "Burnout demo" },
    pc_att_demo: { file: "sound/pc_att_demo.flac", description: "P attack demo" },
    project_5_demo: { file: "sound/project_5_demo.mp3", description: "Project 5 demo" }
};

const ASCII_ARTS = {
    logo: `<span style="color: #00ff00">
___  ____           _ _     
|  \\/  (_)         (_| )    
| .  . |_ _ __ __ _ _|/ ___ 
| |\\/| | | '__/ _\` | | / __|
| |  | | | | | (_| | | \\__ \\
\\_|__|_/_|_|  \\__,_| | |___/
| ___ \\   | |     _/ |      
| |_/ /_ _| | __ |__/__ ___ 
|  __/ _\` | |/ _\` |/ __/ _ \\
| | | (_| | | (_| | (_|  __/
\\_|  \\__,_|_|\\__,_|\\___\\___|
Mainframe interface // [Version: v17.1.0012]</span><br><br><br>`,
    
    retmmyt: `<span style="color: #00ff00">
@@@        @@@@                  @@@@                                                @@@@      @@@   @@@            
@@@     @@@@@@@      @@@@        @@                            @@@                     @@@@  @@@@     @@            
@@    @@@        @@@@@  @@       @@        @@@@  @@@     @@    @@@   @@@@    @@@@@      @@@@  @@ @@@@@@@@@@@@@@@    
@@  @@@@        @@@     @@   @@@@@@@@@@@   @@@  @@@@@@ @@@@@   @@  @@@@@@@@@@@@@@         @@@@@@ @@@@@@@@@@@@@@@@   
@@@@@@@      @@@@@  @@@@@@       @@        @@@ @@@ @@@@@  @@@@ @@@ @@@   @@@    @@@         @@@       @@            
@@@@@        @@@@@@@@@@@@        @@        @@@@@@    @@@   @@@ @@@@@    @@@     @@@        @@        @@@            
@@@@         @@                  @@        @@@@      @@@@  @@@   @@@    @@@     @@@@      @@@        @@@            
@@@@         @@@                 @@        @@@@       @@@  @@@  @@@     @@@       @@     @@@         @@@            
@@@           @@@@@@@@@@@@@      @@          @@            @@@                          @@@          @@@            
                 @@@@@           @@@         @@                                         @@@                         
</span>`,
    
    dunderhead: `<span style="color: #FF0000">
                              ████                               
                              ████                               
                              ████#                              
                              ████#                              
                              ████#                              
                            ████████        █████                
                 ███#      ████# █████    █████##                
                  ##█████████##    █████████#                    
                     █████###  ██     ██████                     
                  ██████###    ███#      ████████                
          ███████████###        ███#         ███████████         
   ██████████████#             ███#               ████████████   
     ██████████##             ███#            █████████#######   
             ████████          ███#        ████████####          
                  ███████      ██##      ██████##                
                      ██████          █████##                    
                         ████#      █████#                       
                           ███#  █████##                         
                            ████████##                           
                             ████##                              
                               ####                              </span><br>`
};

const STYLES = {
    default: 'font-size: 28px; font-family: IBM',
    error: 'color: #FF0000',
    success: 'color: #00FF00',
    warning: 'color: #FF0000',
    info: 'color: #7F7F00'
};

const USAGE_LEGEND = {
    optional: '[optional]',
    required: '&lt;required&gt;',
    default: '{default}',
    misc: '(info)'
};

const SYMBOL_MAP = {
    '0': '-', 
	'1': '|', 
	'2': '\\', 
	'3': '(', 
	'4': '<', 
	'5': '{', 
	'6': '[', 
	'7': ']',
    '8': '}', 
	'9': '>', 
	'a': ')', 
	'b': '/', 
	'c': ':', 
	'd': '+', 
	'e': '~'
};

const SYMBOL_COLOR_MAP = {
	'-': 'D3B45D', 
	'|': 'D3A554', 
	'\\': 'D38647', 
	'(': 'CC475D', 
	'<': 'B53F93', 
	'{': '6C3E91', 
	'[': '2E2689', 
	']': '265389',
    '}': '336D8C', 
	'>': '4C97B5', 
	')': '23AFA4', 
	'/': '60A852', 
	':': '4B8938', 
	'+': 'AED123', 
	'~': '9F37D1'
};

const REVERSE_SYMBOL_MAP = Object.fromEntries(
    Object.entries(SYMBOL_MAP).map(([k, v]) => [v, k])
);

let input = document.querySelector('.txt-input');
let content = document.querySelector('.content');

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

$(document).ready(function() {
    const $input = $('.txt-input');
    const $selectableAreas = $('.content, .art');
    
    $input.focus();
    
    $(document).on('click', function(e) {
        if($(e.target).closest('.content, .art').length) {
            return;
        }
        $input.focus();
    });
    
    $(document).on('keydown', function(e) {
        if($(':focus').is('.txt-input')) return;
        if(e.ctrlKey || e.altKey || e.metaKey) return;
        
        $input.focus();
        
        if(e.key.length === 1 && !e.ctrlKey && !e.altKey) {
            const currentVal = $input.val();
            $input.val(currentVal + e.key);
            $input[0].setSelectionRange($input.val().length, $input.val().length);
        }
    });
    
    $selectableAreas.on('mousedown', function(e) {
        e.stopPropagation();
    });
});

input.addEventListener('keydown', handleCommand);

function handleCommand(event) {
    if(event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';
        addOutput(`@>  ${command}`, 'command-line');
        executeCommand(command);
        scrollToBottom();
    }
}

function executeCommand(command) {
    if(command.startsWith('sound ')) {
        const soundName = command.substring(6);
        if(soundName.trim() === "") {
            showSoundList();
        } else {
            executeSoundCommand(soundName);
        }
        return;
    }
    
    if(command === 'encode' || command.startsWith('encode ')) {
        const args = command === 'encode' ? '' : command.substring(7);
        executeEncode(args);
        return;
    }
    
    if(command === 'decode' || command.startsWith('decode ')) {
        const args = command === 'decode' ? '' : command.substring(7);
        executeDecode(args);
        return;
    }
	
	if(command.startsWith('check ')) {
        const args = command.substring(6);
        executeCheck(args);
        return;
    }
    
    if(COMMANDS[command]) {
        COMMANDS[command].execute();
    } else {
        addOutput(`Unknown command: ${command}, type "help" for command list.`, 'error');
    }
}

function addOutput(text, type = 'default', customStyle = '') {
    let style = STYLES[type] || STYLES.default;
    if(customStyle) style = customStyle;
    content.innerHTML += `<div style="${STYLES.default}; ${style}">${text}</div>`;
    scrollToBottom();
}

function addStyledOutput(text, styles = {}) {
    const styleString = Object.entries(styles)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
    content.innerHTML += `<div style="${STYLES.default}; ${styleString}">${text}</div>`;
    scrollToBottom();
}

function addArtOutput(artName) {
    const art = ASCII_ARTS[artName];
    if(art) {
        content.innerHTML += `<div class="art" style="${STYLES.default}"><span style="background: #000000;">${art}</span></div>`;
        scrollToBottom();
    }
}

function showHelp() {
    let helpText = '<div style="font-size: 28px; font-family: IBM">';
    
    helpText += '<span style="color: #FFFF00">Available commands:</span><br>';
    
    for(const [cmd, info] of Object.entries(COMMANDS)) {
        if(!info.hideFromHelp && info.description) {
            if(info.usage && info.usage !== "") {
                helpText += `<span style="color: #7F7F00">${cmd} ${info.usage}</span> - ${info.description}<br>`;
            } else {
                helpText += `<span style="color: #7F7F00">${cmd}</span> - ${info.description}<br>`;
            }
        }
    }
    
    helpText += '<br><span style="color: #FFFF00">Argument usage:</span><br>';
    helpText += `<span style="color: #7F7F00">${USAGE_LEGEND.optional}</span><br>`;
    helpText += `<span style="color: #7F7F00">${USAGE_LEGEND.required}</span><br>`;
    helpText += `<span style="color: #7F7F00">${USAGE_LEGEND.default}</span><br>`;
    helpText += `<span style="color: #7F7F00">${USAGE_LEGEND.misc}</span><br>`;
    
    helpText += '</div>';
    addOutput(helpText);
}

function showColorPalette() {
    const colors = [
        { code: "#FF0000", name: "red" },
        { code: "#7F0000", name: "dark red" },
        { code: "#FFFF00", name: "yellow" },
        { code: "#7F7F00", name: "dark yellow" },
        { code: "#FF00FF", name: "pink" },
        { code: "#7F007F", name: "dark pink" },
        { code: "#0000FF", name: "blue" },
        { code: "#00007F", name: "dark blue" },
        { code: "#00FFFF", name: "cyan" },
        { code: "#007F7F", name: "dark cyan" },
        { code: "#00FF00", name: "green" },
        { code: "#007F00", name: "dark green" },
        { code: "#FFFFFF", name: "white" },
        { code: "#C0C0C0", name: "gray" },
        { code: "#808080", name: "dark gray" },
        { code: "#000000", name: "black" }
    ];
    
    colors.forEach(color => {
        const bgStyle = color.code === "#000000" ? 'background-color: #C0C0C0;' : '';
        addOutput(`&nbsp;${color.code} ${color.name}&nbsp;`, 'default', `color: ${color.code}; ${bgStyle}`);
    });
}

function showStations() {
    let stationsList = '<div style="font-family: IBM; font-size: 28px; color: #7F7F00">';
    stationsList += '<span style="color: #FFFF00">Available stations:</span><br><br>';
    
    for (const [code, name] of Object.entries(GREEK_LETTERS)) {
        let codeDisplay = code;
        if (code.length === 1) {
            codeDisplay = `&nbsp;${code}&nbsp;<span style="color: #C0C0C0;">||</span>`;
        } else if (code.length === 2) {
            codeDisplay = `${code}&nbsp;<span style="color: #C0C0C0;">||</span>`;
        }
        
        stationsList += `${codeDisplay} "${name}"<br>`;
    }
    
    stationsList += '</div>';
    addOutput(stationsList);
}

function showSymbolMap() {
    let symbolList = '<div style="font-family: IBM; font-size: 28px; color: #7F7F00">';
    symbolList += '<span style="color: #FFFF00">Symbol Map:</span><br><br>';

    const sortedEntries = Object.entries(SYMBOL_MAP).sort((a, b) => a[0].localeCompare(b[0]));

    for (const [code, symbol] of sortedEntries) {
        const colorCode = SYMBOL_COLOR_MAP[symbol] || '000000';
        const backgroundColor = `#${colorCode}`;
        
        symbolList += `<span style="color: #C0C0C0;">${code}</span> -> <span style="background-color: ${backgroundColor}; color: #FFFFFF; padding: 0 6px;">${symbol}</span><span style="color: ${backgroundColor}"> ${backgroundColor}</span><br>`;
    }

    symbolList += '</div>';
    addOutput(symbolList);
}

function clearTerminal() {
    content.innerHTML = '&nbsp;';
    scrollToBottom();
}

function showDateTime() {
    const date = new Date();
    const dateTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    addOutput(`Date // time:<div style="color: #007F7F">${dateTime}</div>`);
}

function redirectTo(url) {
    window.location.replace(url);
}

function showSoundList() {
    let soundList = '<div><span style="color: #ff0000">Volume warning!</span><br>';
    soundList += '<span style="color: #ffff00">Available sounds:</span><br>';
    for(const [sound, info] of Object.entries(SOUNDS)) {
        soundList += `<span style="color: #7F7F00">${sound}</span><br>`;
    }
    soundList += '</div>';
    addOutput(soundList);
		addOutput(`<br>Usage: sound [sound]`, 'info');
}

function executeSoundCommand(soundName) {
    const sound = SOUNDS[soundName];
    if(sound) {
        const audio = new Audio(sound.file);
        audio.play().catch(error => {
            console.error("Error playing sound:", error);
            addOutput(`Failed to play sound: ${soundName}. Browser may block autoplay.`, 'error');
        });
        addOutput(`Playing: ${soundName}...`, 'success');
    } else {
        addOutput(`Unknown sound: ${soundName}.`, 'error');
    }
}

function executeCheck(args) {
    if (!args || args.trim() === "") {
        addOutput("Usage: check &lt;id&gt;", 'error');
        addOutput("Example: check A0011000000NF000000000", 'info');
        return;
    }
    
    const fullId = args.trim().toUpperCase();
    
    if (fullId.length !== 22) {
        addOutput(`Invalid ID length: ${fullId.length} characters (expected 22)`, 'error');
        return;
    }
    
    let pos = 0;
    const stationCode = fullId.charAt(pos); pos++;
    const areaCode = fullId.substring(pos, pos + 2); pos += 2;
    const rankCode = fullId.substring(pos, pos + 2); pos += 2;
    const hexColor1 = fullId.substring(pos, pos + 6); pos += 6;
    const nameCode = fullId.substring(pos, pos + 2); pos += 2;
    const hexColor2 = fullId.substring(pos, pos + 6); pos += 6;
    const serialCode = fullId.substring(pos, pos + 3);
    
	const formattedId = `${stationCode}-${areaCode}-${rankCode}-${hexColor1}-${nameCode}-${hexColor2}-${serialCode}`;
	
    if (!isValidStation(stationCode)) {
        addOutput(`Invalid station: "${stationCode}"`, 'error');
        return;
    }
    
    const stationFullName = getGreekName(stationCode);
    
    if (!/^[0-9A-F]{6}$/.test(hexColor1)) {
        addOutput(`Invalid hex color 1: "${hexColor1}"`, 'error');
        return;
    }
    if (!/^[0-9A-F]{6}$/.test(hexColor2)) {
        addOutput(`Invalid hex color 2: "${hexColor2}"`, 'error');
        return;
    }
    
    const validRankChars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    for (let i = 0; i < rankCode.length; i++) {
        if (!validRankChars.includes(rankCode[i].toLowerCase())) {
            addOutput(`Invalid rank character: "${rankCode[i]}" (must be 0-9 or a-e)`, 'error');
            return;
        }
    }
    
    for (let i = 0; i < serialCode.length; i++) {
        if (!validRankChars.includes(serialCode[i].toLowerCase())) {
            addOutput(`Invalid serial character: "${serialCode[i]}" (must be 0-9 or a-e)`, 'error');
            return;
        }
    }
    
    let designation = "UNKNOWN";
    let recordFound = false;
    
    if (window.lookupRecord) {
        const record = window.lookupRecord(fullId);
        if (record.found) {
            recordFound = true;
            designation = record.designation;
        }
    }
    
    if (!recordFound) {
        addOutput(`Record ${formattedId} not found in database`, 'error');
        return;
    }
    
    let rankSymbols = '';
    for (let i = 0; i < rankCode.length; i++) {
        rankSymbols += SYMBOL_MAP[rankCode[i].toLowerCase()];
    }
    
    let serialSymbols = '';
    for (let i = 0; i < serialCode.length; i++) {
        serialSymbols += SYMBOL_MAP[serialCode[i].toLowerCase()];
    }
    
    let division = "???";
    if (window.HexConv) {
        try {
            const decodedDiv = window.HexConv.decode(stationCode, hexColor2);
            division = window.HexConv.formatDiv(decodedDiv);
        } catch(e) {
            division = "ERR";
        }
    }
    
    function getContrastColor(hexColor) {
        if (!window.HexConv || !window.HexConv.getLuminance) {
            return '#C0C0C0';
        }
        const luminance = window.HexConv.getLuminance(hexColor);
        return luminance > 128 ? '#000000' : '#FFFFFF';
    }
    
    let output = `
<div style="font-family: IBM; font-size: 28px;">
    <hr style="border-color: #7F7F00;">
    <div style="color: #FFFF00;">RECORD ${formattedId} FOUND</div>
    <hr style="border-color: #7F7F00;">
    <div><span style="color: #C0C0C0;">> STATION:........</span> <span style="color: #C0C0C0;">${stationFullName}</span></div>
    <div><span style="color: #C0C0C0;">> AREA:...........</span> <span style="color: #FFFFFF;">${areaCode}</span></div>
    <div><span style="color: #C0C0C0;">> RANK:...........</span> <span style="background: #${hexColor1}; color: ${getContrastColor(hexColor1)}; padding: 0 4px;">${rankSymbols}</span></div>
    <div><span style="color: #C0C0C0;">> DESIGNATION:....</span> <span style="color: #FFFFFF;">${designation}</span></div>
    <div><span style="color: #C0C0C0;">> DIVISION:.......</span> <span style="color: #C0C0C0;">${division}</span></div>
    <div><span style="color: #C0C0C0;">> SERIAL:.........</span> <span style="background: #${hexColor2}; color: ${getContrastColor(hexColor2)}; padding: 0 4px;">${serialSymbols}</span></div>
    <hr style="border-color: #7F7F00;">
</div>`;
    
    addOutput(output);
}

const GREEK_LETTERS = {
    'A': 'Alpha',
    'B': 'Beta',
    'G': 'Gamma',
    'D': 'Delta',
    'E': 'Epsilon',
    'Z': 'Zeta',
    'H': 'Eta',
    'TH': 'Theta',
    'I': 'Iota',
    'K': 'Kappa',
    'L': 'Lambda',
    'M': 'Mu',
    'N': 'Nu',
    'X': 'Xi',
    'O': 'Omega',
    'OM': 'Omicron',
    'P': 'Pi',
    'R': 'Rho',
    'S': 'Sigma',
    'T': 'Tau',
    'U': 'Upsilon',
    'PH': 'Phi',
    'CH': 'Chi',
    'PS': 'Psi'
};

const GREEK_NAMES = {};
for (const [code, name] of Object.entries(GREEK_LETTERS)) {
    GREEK_NAMES[name.toUpperCase()] = code;
}

function getGreekName(station) {
    const upperStation = station.toUpperCase();
    
    if (GREEK_LETTERS[upperStation]) {
        return GREEK_LETTERS[upperStation];
    }
    
    if (GREEK_NAMES[upperStation]) {
        return GREEK_LETTERS[GREEK_NAMES[upperStation]];
    }
    
    return null;
}

function getStationCode(station) {
    const upperStation = station.toUpperCase();
    
    if (GREEK_LETTERS[upperStation]) {
        return upperStation;
    }
    
    if (GREEK_NAMES[upperStation]) {
        return GREEK_NAMES[upperStation];
    }
    
    return null;
}

function isValidStation(station) {
    const upperStation = station.toUpperCase();
    
    if (GREEK_LETTERS[upperStation]) {
        return true;
    }
    
    if (GREEK_NAMES[upperStation]) {
        return true;
    }
    
    return false;
}

function deriveStatusFromHex(hexColor, division) {
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    
    const divisionFactor = division + 1;
    
    const connSum = ((r + g + b) * divisionFactor) % 100;
    let connStatus = "OK";
    let isError = false;
    
    if (connSum <= 10) {
        connStatus = "ERROR";
        isError = true;
    } else if (connSum <= 30) {
        connStatus = "WARN";
    }
    
    let connDisplay = connStatus;
    if (connStatus === "OK") connDisplay = "OK&nbsp;&nbsp;&nbsp;";
    else if (connStatus === "WARN") connDisplay = "WARN&nbsp;";
    
    const pValue = isError ? "00" : ((division + r) * divisionFactor) % 25;
    
    let secStatus = "UNSUP";
    if (isError) {
        secStatus = "ERROR";
    } else {
        const secValue = (g * divisionFactor) % 255;
        if (secValue > 100) {
            secStatus = "OK";
        } else if (secValue > 70) {
            secStatus = "WARN";
        }
    }
    
    let secDisplay = secStatus;
    if (secStatus === "OK") secDisplay = "OK&nbsp;&nbsp;&nbsp;";
    else if (secStatus === "WARN") secDisplay = "DOWN&nbsp;";
    
    const ping = isError ? "NaN" : ((b * division * divisionFactor) % 1000);
    
    return { connStatus: connDisplay, pValue, secStatus: secDisplay, ping, isError };
}

function executeEncode(commandArgs) {
	const parts = commandArgs.trim().split(/\s+/).filter(arg => arg.length > 0);
    if (parts.length < 1) {
        addOutput("Usage: encode &lt;station&gt; [division]", 'error');
		addOutput("Example: encode A 0", 'info');
		addOutput("Example: encode A", 'info');
        return;
    }
	
	const DIVISION_RANGE = { min: 0, max: 99 };
    const STATUS_COLORS = {
        OK: '#00FF00',
        WARN: '#FFFF00',
        ERROR: '#FF0000',
        UNSUP: '#7F7F00',
        DOWN: '#808080',
        DEFAULT: '#7F7F00'
    };
    
    const getStatusBase = (status) => status.replace(/&nbsp;/g, '');
    const isValidDivision = (div) => div >= DIVISION_RANGE.min && div <= DIVISION_RANGE.max;
    
    const getStatusColor = (status, type = 'conn') => {
        const base = getStatusBase(status);
        if (type === 'conn') {
            return STATUS_COLORS[base] || STATUS_COLORS.DEFAULT;
        }
        if (base === 'WARN') return STATUS_COLORS.DOWN;
        return STATUS_COLORS[base] || STATUS_COLORS.UNSUP;
    };
    
    const updateStats = (stats, connStatus, secStatus, pValue, ping) => {
        const connBase = getStatusBase(connStatus);
        const secBase = getStatusBase(secStatus);
        
        if (connBase !== 'UNSUP') stats.conn[connBase]++;
        
        if (secBase === 'WARN') {
            stats.sec.DOWN++;
            stats.sec.WARN++;
        } else if (secBase !== 'UNSUP') {
            stats.sec[secBase]++;
        } else {
            stats.sec.UNSUP++;
        }
        
        if (typeof pValue === 'number' && !isNaN(pValue)) {
            stats.totalP += pValue;
            stats.validPCount++;
        }
        
        if (typeof ping === 'number' && !isNaN(ping)) {
            stats.totalPing += ping;
            stats.validPingCount++;
        }
    };
    
    const formatOutputLine = (divFormatted, hexColor, textColor, connStatus, pValue, secStatus, ping) => {
        const pDisplay = typeof pValue === 'number' ? pValue.toString().padStart(2, '0') : pValue;
        return `${divFormatted} ` +
               `<span style="background: #${hexColor}; color: ${textColor}; padding: 0 2px;">#${hexColor}</span> ` +
               `<span style="color: ${getStatusColor(connStatus)}">CONN:${connStatus}</span> ` +
               `P:${pDisplay} ` +
               `<span style="color: ${getStatusColor(secStatus, 'sec')}">SEC1.2:${secStatus}</span> ` +
               `| Ping:<span style="color:cyan"> ${ping} ms</span><br>`;
    };
    
    const renderSummary = (stats) => {
        const avgPing = stats.validPingCount > 0 
            ? (stats.totalPing / stats.validPingCount).toFixed(2) 
            : "N/A";
        
        content.innerHTML += `
            <span style="color: #C0C0C0;">CONN:</span>
            <span style="color: ${STATUS_COLORS.OK};"> OK: ${stats.conn.OK}</span>
            <span style="color: ${STATUS_COLORS.WARN};"> WARN: ${stats.conn.WARN}</span>
            <span style="color: ${STATUS_COLORS.ERROR};"> ERROR: ${stats.conn.ERROR}</span>
            <span style="color: #C0C0C0;"> SEC1.2:</span>
            <span style="color: ${STATUS_COLORS.OK};"> OK: ${stats.sec.OK}</span>
            <span style="color: ${STATUS_COLORS.DOWN};"> DOWN: ${stats.sec.DOWN}</span>
            <span style="color: ${STATUS_COLORS.UNSUP};"> UNSUP: ${stats.sec.UNSUP}</span>
            <span style="color: #C0C0C0;"><br>Total_P: ${stats.totalP}</span>
            <span style="color: #C0C0C0;"> Avg_Ping:<span style="color:cyan"> ${avgPing}ms</span></span>
        `;
    };
    
    const station = parts[0];
    const division = parts[1] !== undefined ? parseInt(parts[1]) : null;
    
    if (!isValidStation(station)) {
        addOutput(`Invalid station: "${station}"`, 'error');
        return;
    }
    
    const stationDisplay = getGreekName(station);
    const stationCode = getStationCode(station);
    
    if (!window.HexConv) {
        addOutput("Hex conversion module not loaded!", 'error');
        return;
    }
    
    if (division === null || isNaN(division)) {
        addOutput(`Station: "${stationDisplay}" Division "all"`, 'info');
        
        const stats = {
            conn: { OK: 0, WARN: 0, ERROR: 0 },
            sec: { OK: 0, WARN: 0, ERROR: 0, UNSUP: 0, DOWN: 0 },
            totalP: 0,
            validPCount: 0,
            totalPing: 0,
            validPingCount: 0
        };
        
        for (let d = DIVISION_RANGE.min; d <= DIVISION_RANGE.max; d++) {
            const hexColor = window.HexConv.encode(stationCode, d);
            const luminance = window.HexConv.getLuminance(hexColor);
            const textColor = luminance > 128 ? '#000000' : '#FFFFFF';
            const divFormatted = window.HexConv.formatDiv(d);
            const { connStatus, pValue, secStatus, ping } = deriveStatusFromHex(hexColor, d);
            
            updateStats(stats, connStatus, secStatus, pValue, ping);
            content.innerHTML += formatOutputLine(divFormatted, hexColor, textColor, connStatus, pValue, secStatus, ping);
        }
        
        renderSummary(stats);
        scrollToBottom();
        return;
    }
    
    if (isValidDivision(division)) {
        const hexColor = window.HexConv.encode(stationCode, division);
        const luminance = window.HexConv.getLuminance(hexColor);
        const textColor = luminance > 128 ? '#000000' : '#FFFFFF';
        const divFormatted = window.HexConv.formatDiv(division);
        const { connStatus, pValue, secStatus, ping } = deriveStatusFromHex(hexColor, division);
        
        addOutput(`Station "${stationDisplay}" division ${divFormatted}:`, 'info');
        content.innerHTML += formatOutputLine(divFormatted, hexColor, textColor, connStatus, pValue, secStatus, ping);
        scrollToBottom();
        return;
    }
    
    addOutput(`Division must be between ${DIVISION_RANGE.min} and ${DIVISION_RANGE.max}`, 'error');
}

function executeDecode(commandArgs) {
    const parts = commandArgs.trim().split(/\s+/).filter(arg => arg.length > 0);
    if(parts.length < 2) {
        addOutput("Usage: decode &lt;station&gt; &lt;hex&gt;", 'error');
        addOutput("Example: decode A 3E479A", 'info');
        return;
    }
    
    const station = parts[0];
    const hexCode = parts[1].replace(/^#/, '').toUpperCase();
    
    if (!isValidStation(station)) {
        addOutput(`Invalid station: "${station}"`, 'error');
        return;
    }
    
    const stationDisplay = getGreekName(station);
    const stationCode = getStationCode(station);
    
    if(!window.HexConv) {
        addOutput("Hex conversion module not loaded!", 'error');
        return;
    }
    
    if(!/^[0-9A-F]{6}$/.test(hexCode)) {
        addOutput("Invalid hex code! Must be 6 characters (0-9, A-F)", 'error');
        return;
    }
    
    try {
        const division = window.HexConv.decode(stationCode, hexCode);
        const divFormatted = window.HexConv.formatDiv(division);
        const luminance = window.HexConv.getLuminance(hexCode);
        const textColor = luminance > 128 ? '#000000' : '#FFFFFF';
        const { connStatus, pValue, secStatus, ping } = deriveStatusFromHex(hexCode, division);
        
        let connBase = connStatus.replace(/&nbsp;/g, '');
        let connColor = "#7F7F00";
        if (connBase === "OK") connColor = "#00FF00";
        else if (connBase === "ERROR") connColor = "#FF0000";
        else if (connBase === "WARN") connColor = "#FFFF00";
        
        let secBase = secStatus.replace(/&nbsp;/g, '');
        let secColor = "#7F7F00";
        if (secBase === "OK") secColor = "#00FF00";
        else if (secBase === "ERROR") secColor = "#FF0000";
        else if (secBase === "WARN") secColor = "#FFFF00";
        else if (secBase === "UNSUP") secColor = "#7F7F00";
        
        const pDisplay = typeof pValue === 'number' ? pValue.toString().padStart(2, '0') : pValue;
        
        addOutput(`Decoding hex #${hexCode} for station "${stationDisplay}":`, 'info');
        content.innerHTML += `${divFormatted} <span style="background: #${hexCode}; color: ${textColor}; padding: 0 2px;">#${hexCode}</span> <span style="color: ${connColor}">CONN:${connStatus}</span> P:${pDisplay} <span style="color: ${secColor}">SEC1.2:${secStatus}</span> | Ping:${ping}<br>`;
        scrollToBottom();
    } catch(e) {
        addOutput(`Error decoding: ${e.message}`, 'error');
    }
}

for(const [soundName, soundInfo] of Object.entries(SOUNDS)) {
    COMMANDS[`sound ${soundName}`] = {
        description: `Play ${soundInfo.description}`,
        usage: "",
        execute: () => executeSoundCommand(soundName),
        hideFromHelp: true
    };
}
