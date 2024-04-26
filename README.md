# Swipe-Dine App

Swipe-Dine is a mobile app that helps users discover restaurants in their area and make dining decisions by swiping through restaurant options.

## Installation

Before running the app, make sure you have the following dependencies installed on your machine:

- Node.js (version 18.x.x)
- npm (Node Package Manager)
- Expo CLI

### Installing Node.js and npm

1. To install Node.js v18, you must install nvm:

* For macOS/Linux:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
* For Windows, use `nvm-windows`:
  ```bash
  Download and install from https://github.com/coreybutler/nvm-windows
  ```

2. Install Node.js v18 using nvm:

   ```bash
   nvm install 18
   nvm use 18
   ```
3. Verify the Node.js version:

   ```bash
    node -v
   ```
   This should output give `v18.x.x`.

### Installing Expo CLI

Expo CLI is required to run and manage React Native projects. Install Expo CLI globally by running the following command:

```bash
npm install -g expo-cli
```

## Running the App

To run the Swipe-Dine app on your local machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/SohnJustin/Swipe-Dine.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Swipe-Dine
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the Expo development server:

    ```bash
    npm start
    or
    npx expo start
    ```

5. Open the Expo Go app on your mobile device.

6. Scan the QR code displayed in the terminal or Expo DevTools with your phone's camera.

7. Wait for Expo Go to load the app. You should now be able to use Swipe-Dine on your mobile device.

