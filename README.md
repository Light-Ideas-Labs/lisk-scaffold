<!-- Title -->
# Ultimate EVM Scaffold

## Version 0.0.5

### Overview

---

🧪 **Ultimate EVM Scaffold** is an open-source, robust framework designed to accelerate the development and deployment of decentralized applications (DApps) on any EVM platform. It equips developers with essential tools and frameworks, making the initial steps of building a DApp straightforward and efficient.

---

<!-- Getting Started -->

### Getting Started

#### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js (>= v10.x) or higher](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)  or [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/downloads)

<!-- Installation Guide -->

#### Installation

You can quickly set up a new project using the command below:

```bash
npx ultimate-scaffold-dapp@latest create

```

Or, for pnpm users:

```bash
pnpm dlx ultimate-scaffold-dapp@latest create

```

Or, with yarn:

```bash
yarn dlx ultimate-scaffold-dapp@latest create
```

<!-- Frameworks Available -->

## Key Components

The scaffold supports the following frameworks:

- **Frontend Framework:**
- Next.js
  - Wagmi  (for wallet connection)
  - Viem (for blockchain interactions)
  - RainbowKit  (for wallet UI)
  - Typescript (default)
- **Backend Framework:**
- Hardhat
  - Javascript  (default) or TypeScript

<!--  Usage Examples -->

## Usage

Follow these steps to create and configure your DApp project:

1. **Run the CLI Tool:** Use the create command to scaffold a project:

  ```bash
  npx ultimate-scaffold-dapp@latest create
  ```

2. **Select Front-End and Smart Contract Frameworks:** During the setup, you'll choose from available frameworks:
   - Frontend: Next.js (with TypeScript)
   - Smart Contracts: Hardhat (JavaScript/TypeScript)
  
3. **Project Configuration:** Provide a namefor your project, which will be used to set up the directory structure.

4. Install Dependencies: Navigate to the project directory and install dependencies using your preferred package manager:

```bash
pnpm install
```

```bash
yarn install
```

```bash
npm install
```

1. **Start the Project:** Run the following command to start the development server:
  
```bash
pnpm install
```

```bash
yarn install
```

```bash
npm install
```

- **Compile and deploy the smart contracts:**

```bash
pnpm hardhat copile
```

```bash
pnpm hardhat run scripts/deploy.js
```

<!-- Config  -->

## Advanced Configuration

Generated projects include a `package.json` file tailored for your project. You can modify the following as needed:

- Add more scripts for testing, building, or deploying.
- Customize configuration files like hardhat.config.js or tsconfig.json.

<!-- CLI Commands -->
## CLI Commands

The CLI offers the following commands:
  
```bash
npx ultimate-scaffold-dapp create
```
  
```bash
npx ultimate-scaffold-dapp deploy
```

```bash
npx ultimate-scaffold-dapp --help
```

<!-- Sample scripts for Your Project -->

## Sample scripts for Your Project

Here’s an example of scripts that will be included in your package.json:

```json
"scripts": {
  "frontend:dev": "yarn workspace @ultimate-scaffold/next-ts dev",
  "frontend:build": "yarn workspace @ultimate-scaffold/next-ts build",
  "frontend:start": "yarn workspace @ultimate-scaffold/next-ts start",
  "hardhat:compile": "yarn workspace @ultimate-scaffold/hardhat-ts compile",
  "hardhat:test": "yarn workspace @ultimate-scaffold/hardhat-ts test",
  "hardhat:deploy": "yarn workspace @ultimate-scaffold/hardhat-ts run scripts/deploy.js"
}
```

<!-- Support and Contribution -->

## Support and Contribution

For issues, suggestions, or contributions, please visit our GitHub repository.

👉 GitHub Repository

## Additional Notes

- If your project setup does not involve web development, modifications like `netlify.toml` might be unnecessary.
- Projects such as those developed with Flutter might not utilize a `package.json`.

## Maintainers

- @Jordan-type
- @Ronexlemon
- @anthonykimani

## License

This project is licensed under the MIT License.

<!-- Badges -->

## Using the CLI

- additionally you can scaffold a project easily by using the command
  `npx ultimate-scaffold-dapp@latest create`
  `npx ultimate-scaffold-dapp`

<!-- Happy Coding  -->

## Happy Coding! 🎉

---

### Key Updates

1. **Replaced `lisk` references with `ultimate`** to align with the scaffold's branding.
2. Updated CLI commands and sample `package.json` scripts.
3. Added support for multiple package managers (`pnpm`, `yarn`, `npm`).
4. Streamlined the sections for improved readability and usability.

Let me know if you'd like further modifications! 🚀
