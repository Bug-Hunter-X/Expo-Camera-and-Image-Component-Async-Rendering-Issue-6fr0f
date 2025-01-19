## Expo Camera and Image Component Async Rendering Issue

This repository demonstrates a common issue encountered when using the Expo Camera and Image components together. The problem arises from the asynchronous nature of image capture and rendering.  The `Image` component attempts to render before the `Camera` component has finished processing the captured image, resulting in a blank screen or an error.

The `bug.js` file showcases the problematic code. The solution, provided in `bugSolution.js`, addresses this issue by ensuring the `Image` component only renders after the image data is fully available. The solution uses React's state management to track the image's loading status.