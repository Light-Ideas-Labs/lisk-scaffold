#! /usr/bin/env node
import { Command } from "commander";
import { createAsync } from "./create.js";
// import { deployToVercel } from "./deploy.js";

const program = new Command();

let stdin = {
  stdin: "",
};

program
.command("create")
.option("-t, --template <name>", "Specify a template to use for the project")
.option("-f, --force", "Force project creation even if the output directory is not empty")
.description("Generate a new custom ultimate dapp project")
.action(createAsync);

// program
//   .command("deploy")
//   .description("Deploy the Next.js app to Vercel")
//   .action(deployToVercel);

program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ ultimate-scaffold-dapp create");
  console.log("  $ ultimate-scaffold-dapp create --template my-template");
  console.log("  $ ultimate-scaffold-dapp deploy");
});

if (process.stdin.isTTY) {
  program.parse(process.argv);
} else {
  process.stdin.on("readable", function () {
    let chunk = this.read();
    if (chunk !== null) {
      stdin.stdin += chunk;
    }
  });
  process.stdin.on("end", () => program.parse(process.argv));
}

// Gracefully handle Ctrl+C
process.on("SIGINT", () => {
  console.log("\nProcess interrupted. Exiting...");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  if (err.code === "EADDRINUSE") {
    // console.log('Port already in use');
    return;
  } else if (err.message.includes("Timed out while waiting for handshake")) {
    // console.log('Ignoring timeout error');
    return;
  } else if (err.message.includes("Could not resolve")) {
    // console.log('Ignoring DNS Resolution error');
    return;
  } else {
    console.log("Unhandled exception. Shutting down", err);
  }
  process.exit(1);
});
