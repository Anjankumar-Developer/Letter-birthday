# For My Jaanu ❤️ - Birthday Surprise Website

A completely customizable, cinematic, and interactive birthday surprise website built with React, Next.js, and Framer Motion.

## 🌟 How it Works

The website is designed as an interactive journey, not just a static page. 
It follows this emotional progression:
1. **Intro & Hero:** Cinematic text reveal and music start.
2. **Our Story:** A beautifully animated timeline.
3. **Memory Gallery:** An interactive Polaroid-style photo layout.
4. **12 Reasons Why I Love You:** 3D flipping cards revealing messages.
5. **Secret Hunt:** Hidden interactive icons (hearts, stars, etc.) that reveal small notes when clicked.
6. **Secret Password:** A playful lock screen requiring your special word.
7. **The Big Gift:** A surprise gift box that opens with confetti, revealing a video or a final message.
8. **Love Letter:** A cinematic typewriter-effect personalized letter.
9. **Final Reveal:** A beautiful cinematic conclusion.

## 🛠️ Customization Guide

### 1. The Main Configuration File
Almost everything is controlled by a single file: `src/config/birthday.ts` (Wait, it is located at `config/birthday.ts` in this project).
Open `config/birthday.ts` to customize names, messages, memories, reasons, the password, and the love letter.

### 2. Assets (Photos, Music, Videos)
Add your files directly to the `public/assets/` folder:

* **Photos:** Place images in `public/assets/photos/`.
  * e.g., `timeline-01.jpg`, `photo-01.jpg`.
  * Make sure to update the filenames in `config/birthday.ts` if you rename them.
* **Music:** Place your background music file in `public/assets/music/` and name it `birthday-song.mp3` (or update the path in the config).
* **Video:** If you are using a video for the big gift, place it in `public/assets/video/` and name it `surprise.mp4`.

### 3. Modifying the "Big Gift"
In `config/birthday.ts`, look for the `gift` object:
- Set `type: "video"` to show a video player.
- Set `type: "message"` if you just want to show a final text message.

### 4. Changing the Secret Password
In `config/birthday.ts`, locate the `password` object:
```ts
  password: {
    secret: "jaanu", // Change this to your desired password
    hint: "Enter our special word..."
  },
```

### 5. Writing the Love Letter
In `config/birthday.ts`, edit the `letter` property. Put your heart into it! The text will be typed out dynamically on the screen.

## 🚀 Running the Project Locally

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment
This project is built with Next.js and can be easily deployed to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) by importing the GitHub repository.

---
*Made with ❤️ for Jaanu.*
