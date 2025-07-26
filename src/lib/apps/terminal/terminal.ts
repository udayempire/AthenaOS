type CommandHandler = (args: string[], history: { input: string; output: string }[]) => string;

const commands: Record<string, { description: string; handler: CommandHandler }> = {
  help: {
    description: "Show this help message",
    handler: () => {
      const header = `COMMAND      | DESCRIPTION\n-------------------------------`;
      const body = Object.entries(commands)
        .map(([cmd, { description }]) => `${cmd.padEnd(12)}| ${description}`)
        .join("\n");
      return `${header}\n${body}`;
    },
  },
  echo: {
    description: "Print text to the terminal",
    handler: (args) => args.join(" "),
  },
  clear: {
    description: "Clear the terminal",
    handler: () => "",
  },
  date: {
    description: "Show the current date and time",
    handler: () => new Date().toString(),
  },
  whoami: {
    description: "Show your user name",
    handler: () => "guest",
  },
  about: {
    description: "About this OS",
    handler: () => "AthenaOS Terminal — a web desktop experience!",
  },
  history: {
    description: "Show command history",
    handler: (_args, history) => history.map((entry) => entry.input).join("\n"),
  },
  exit: {
    description: "Close the terminal",
    handler: () => "__EXIT__",
  },
  banner: {
    description: "Show welcome banner",
    handler: () => `
    _  _____ _   _ _____ _   _    _      _____ ___  ____ ____  
   / \\|_   _| | | | ____| \\ | |  / \\    |  ___/ _ \\/ ___/ ___| 
  / _ \\ | | | |_| |  _| |  \\| | / _ \\   | |_ | | | \\___ \\___ \\ 
 / ___ \\| | |  _  | |___| |\\  |/ ___ \\  |  _|| |_| |___) |__) |
/_/   \\_\\_| |_| |_|_____|_| \\_/_/   \\_\\ |_|   \\___/|____/____/ 

Welcome to AthenaOS Terminal
Type 'help' to see available commands.`,
  },
  join: {
    description: "Open invite link in a new tab",
    handler: () => {
      window.open("https://cosmic-tractor-712.notion.site/179c4091f4dc802495bcd3510df919ad", "_blank"); 
      return "Opening invite link in new tab...";
    },
  },
};

export function executeCommand(
  cmd: string,
  history: { input: string; output: string }[]
): string {
  const [command, ...args] = cmd.trim().split(/\s+/);
  let output: string;

  if (commands[command]) {
    output = commands[command].handler(args, history);
  } else if (command === "") {
    output = "";
  } else {
    output = `Command not found: ${command}`;
  }

  return output;
}
