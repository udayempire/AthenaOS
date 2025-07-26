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
};

export function executeCommand(cmd: string, history: { input: string; output: string }[]): string {
  const [command, ...args] = cmd.trim().split(/\s+/);
  if (commands[command]) {
    return commands[command].handler(args, history);
  }
  if (command === "") return "";
  return `Command not found: ${command}`;
}
