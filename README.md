# Language Proficiency Evaluation Tool

This project is a web-based tool for evaluating language proficiency across four skills: Speaking, Listening, Reading, and Writing. It uses adaptive testing and AI-based evaluation to provide a personalized assessment experience.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Contributing](#contributing)
7. [License](#license)

## Prerequisites

Before you begin, ensure you have the following accounts:

- [Google Cloud](https://cloud.google.com/) (for Speech-to-Text API)
- [OpenAI](https://openai.com/) (for GPT-based text generation and evaluation)

## Development Environment Setup

Follow these steps to set up your development environment:

### 1. Install Visual Studio Code

1. Go to the [Visual Studio Code website](https://code.visualstudio.com/).
2. Download the appropriate version for your operating system.
3. Run the installer and follow the installation wizard.

### 2. Install Node.js and npm

1. Visit the [Node.js website](https://nodejs.org/).
2. Download the LTS (Long Term Support) version for your operating system.
3. Run the installer and follow the installation wizard.
4. Verify the installation by opening a terminal/command prompt and running:
   ```
   node --version
   npm --version
   ```

### 3. Install Python

1. Go to the [Python website](https://www.python.org/downloads/).
2. Download the latest version for your operating system.
3. Run the installer. Make sure to check the box that says "Add Python to PATH" during installation.
4. Verify the installation by opening a terminal/command prompt and running:
   ```
   python --version
   ```

### 4. Install Git

1. Visit the [Git website](https://git-scm.com/downloads).
2. Download the appropriate version for your operating system.
3. Run the installer and follow the installation wizard.
4. Verify the installation by opening a terminal/command prompt and running:
   ```
   git --version
   ```

## Project Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/language-proficiency-tool.git
   cd language-proficiency-tool
   ```

2. Set up the frontend:
   ```
   cd frontend
   npm install
   ```

3. Set up the backend:
   ```
   cd ../backend
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following content:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/google-credentials.json
   OPENAI_API_KEY=your_openai_api_key
   ```
   Replace the placeholder values with your actual Google Cloud credentials file path and OpenAI API key.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   python run.py
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
language-proficiency-tool/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
│   ├── config.py
│   ├── run.py
│   └── requirements.txt
├── .gitignore
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
