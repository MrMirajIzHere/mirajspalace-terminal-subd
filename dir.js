let input = document.querySelector('.txt-input');
let content = document.querySelector('.content');
let clear = document.getElementsByClassName('.clear');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

let result;

input.addEventListener('keydown', handleCommand);

function handleCommand(event) {
    if(event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';
        content.innerHTML += `@>  ${command}<br>`;
        executeCommand(command);
    }
}

function executeCommand(command) {
    switch (command) {
		            //list of commands
        case "help":
            content.innerHTML += `<p style="font-size: 28px; font-family: IBM" >Available commands: <br></p>
			<p style="color: #7F7F00">help, back</p>`;
            break;
					//redirect
			case "back":
            content.innerHTML += 
            window.location.replace("index.html");
			;
            break;
        default:
            content.innerHTML += `<p style="color: #FF0000">Unknown command: <span style="text-decoration: underline;">${command}</span>, type "help" for command list.<br>`;
    }
}

