# JoyRise Fitness — GitHub Pages version

This folder is a static conversion of the original ASP.NET MVC project so it can run directly on GitHub Pages.

## What still works
- Home page slider and demo occupancy
- Equipment search, muscle-group filter, difficulty sorting, pagination
- Equipment detail pages with exercise data and Bilibili embeds
- Workout Generator using the same filtering logic as the original `GeneratorController`
- My Training Plan using browser `localStorage` instead of ASP.NET `Session`
- Contact form validation/UI demo

## GitHub Pages deployment
1. Upload **the contents of this folder** to the root of the `main` branch of `JoyFitness`. `index.html` must be in the repository root.
2. GitHub repository → **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: **main**; Folder: **/(root)**; Save.
5. Wait for the Pages deployment to finish, then open `https://gujiaying1.github.io/JoyFitness/`.

## Important differences from ASP.NET version
- GitHub Pages cannot execute C#/Razor. The static version moves the in-memory workout data and filtering logic to JavaScript.
- Saved plans live only in the current browser (`localStorage`).
- The contact form does not actually send email because there is no server backend.
- The original C# project can stay in GitHub for source-code evidence; these static files are what GitHub Pages displays.
