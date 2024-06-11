# KM-Recorder: Recorder for AutoMate

## Steps to run this program:

1. **Clone the repo:**
    ```sh
    git clone https://github.com/dev-kas/km-recorder.git
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start recording:**
    ```sh
    npm run record  # Press ^C to stop
    ```

4. **Fix key bindings (if needed):**
    If some keys aren't working, follow these steps to bind your keys:
    
    a. Run the key survey:
    ```sh
    node key_mappings/survey.js
    ```
    Press each key as prompted. If a key doesn't exist on your machine, click anywhere.

    b. Map your keys:
    ```sh
    node key_mappings/map.js
    ```

    c. Move the generated map:
    ```sh
    mv key_mappings/map.json map.json
    ```