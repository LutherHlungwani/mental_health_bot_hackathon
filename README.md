
# MindCare Chatbot Documentation

## Overview
MindCare is a web-based mental health chatbot designed to provide empathetic, supportive responses to users seeking emotional well-being support. It leverages the Qwen 2.5 VL 7B model via an OpenAI-compatible API to deliver real-time, streamed responses. The app features a clean, user-friendly interface and ensures safe, kind interactions suitable for mental health contexts.

## Features
- **Real-Time Chat**: Users can send messages and receive streamed responses from the Qwen 2.5 VL 7B model, creating a dynamic, typewriter-like experience.
- **Empathetic Tone**: The chatbot is configured with a system prompt to provide supportive, non-judgmental responses, avoiding medical advice or harmful suggestions.
- **Simple UI**: A responsive interface with a chat window, input field, and send button, styled for accessibility and ease of use.
- **TypeScript Integration**: Built with TypeScript for type safety, reducing runtime errors in API and DOM interactions.
- **Cross-Platform**: Runs in any modern browser, with setup instructions for local or hosted environments.

## Tech Stack
- **Frontend**: HTML, CSS, TypeScript (compiled to JavaScript)
- **API**: Qwen 2.5 VL 7B model via OpenAI-compatible API (hosted at `https://api.inference.net/v1`)
- **Dependencies**: OpenAI JavaScript SDK (`openai@4.68.1`)
- **Tools**: TypeScript compiler (`tsc`), local server (e.g., `python -m http.server`)

## Setup Instructions
1. **Prerequisites**:
   - Node.js and npm for TypeScript compilation.
   - Access to the Qwen 2.5 VL 7B model API at `https://api.inference.net/v1` with the provided API key (`inference-10786646dd114d64b96f6173bb0d4300`).
   - A modern web browser (Chrome, Firefox, etc.).

2. **Install Dependencies**:
   ```bash
   npm install typescript
   ```

3. **Create `tsconfig.json`**:
   Save the following in the project root:
   ```json
   {
       "compilerOptions": {
           "target": "ES6",
           "module": "ESNext",
           "outDir": "./dist",
           "strict": true,
           "esModuleInterop": true,
           "moduleResolution": "node"
       },
       "include": ["script.ts"]
   }
   ```

4. **Save the App Code**:
   - Copy the `index.html` file from the provided artifact (ID: `9149831f-9704-44dc-8107-8eba9b0c22fe`).
   - Extract the `<script type="module">` content into a file named `script.ts`.

5. **Compile TypeScript**:
   ```bash
   npx tsc
   ```
   This generates `dist/script.js`.

6. **Update HTML**:
   Replace the `<script type="module">` section in `index.html` with:
   ```html
   <script src="dist/script.js"></script>
   ```

7. **Host the App**:
   - Run a local server to avoid CORS issues:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in a browser.

8. **Verify API Access**:
   Ensure the API endpoint (`https://api.inference.net/v1`) is accessible with the provided API key. For local testing, you can deploy the Qwen model using vLLM:
   ```bash
   python -m vllm.entrypoints.openai.api_server --model Qwen/Qwen2.5-VL-7B-Instruct
   ```
   Update `baseURL` in `script.ts` to `http://localhost:8000/v1` if using a local server.

## Usage
1. Open the app in a browser.
2. Type a message in the input field (e.g., “I’m feeling overwhelmed”).
3. Press “Send” or hit Enter to submit.
4. Watch MindCare stream a supportive response in real-time.
5. Continue the conversation as needed.

## Example Interaction
**User**: I’m feeling stressed about work.  
**MindCare**: I’m really sorry to hear you’re feeling stressed. Work can be tough sometimes. Would you like to share more? Maybe try taking a few deep breaths or stepping away for a short break. If you need resources, I can suggest some self-care ideas or professional support options.

## Technical Details
- **API Integration**:
  - Uses the OpenAI SDK to call the Qwen 2.5 VL 7B model with streaming enabled (`stream: true`).
  - Messages are sent with a system prompt ensuring empathetic, safe responses:
    ```typescript
    {
        role: "system",
        content: "You are a supportive mental health chatbot..."
    }
    ```
  - Streams responses using `for await...of` to append chunks to the UI in real-time.

- **TypeScript**:
  - Defines a `Message` interface for type-safe API calls:
    ```typescript
    interface Message {
        role: 'system' | 'user';
        content: string;
    }
    ```
  - Ensures DOM elements are typed (e.g., `HTMLElement`, `HTMLInputElement`).

- **UI**:
  - Responsive design with CSS flexbox and scrollable chat box.
  - Messages styled differently for user (blue, right-aligned) and bot (gray, left-aligned).
  - Auto-scrolls to the latest message.

- **Security Note**:
  - The API key is embedded in the client-side code for simplicity (`dangerouslyAllowBrowser: true`). For production, proxy API calls through a backend to secure the key.

## Limitations
- **API Dependency**: Requires a stable connection to the Qwen API. Test thoroughly to ensure uptime.
- **No Multimodal Features**: Currently text-only; image support (available in Qwen 2.5 VL) is not implemented.
- **Browser Compilation**: TypeScript must be compiled to JavaScript, adding a build step.
- **Error Handling**: Basic error messages are shown; enhance for production with user-friendly alerts.

## Future Enhancements
- **Multimodal Support**: Add image uploads for mood analysis using Qwen’s vision capabilities.
- **UI Polish**: Include a “typing...” indicator, message animations, or crisis hotline links.
- **Local Storage**: Save chat history in the browser for session persistence.
- **Accessibility**: Add ARIA attributes and keyboard navigation for better accessibility.
- **Backend Proxy**: Secure the API key by routing calls through a server.

## Safety Considerations
- The system prompt ensures safe, empathetic responses, but always test outputs to avoid inappropriate content, especially for mental health use cases.
- Include a disclaimer in the UI about not replacing professional help.
- Provide links to resources like crisis hotlines (e.g., National Suicide Prevention Lifeline: 1-800-273-8255).

## Hackathon Notes
- **Demo Tips**: Highlight the streaming response feature and empathetic tone. Show example interactions like handling stress or anxiety queries.
- **Extensibility**: Mention potential for image-based mood analysis or integration with mental health resources.
- **Setup Simplicity**: For quick setup, consider a JavaScript-only version (remove TypeScript types) if compilation is a barrier.

For support or feature additions, contact the development team or refer to the Qwen API documentation at `https://api.inference.net/v1`.

