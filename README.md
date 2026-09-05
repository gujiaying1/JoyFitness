# JoyRise Fitness

## Full-Stack Fitness Web Application

JoyRise Fitness is a fitness web application built with ASP.NET MVC. It helps users explore exercise equipment, review workout guidance, generate workouts from selected criteria, and maintain a personal training plan.

**Live Demo:** [https://gujiaying1.github.io/JoyFitness/](https://gujiaying1.github.io/JoyFitness/)

**Technologies:** C# · ASP.NET MVC · Razor · JavaScript · jQuery · AJAX · HTML · CSS

## Overview

The application provides an equipment library with filtering and pagination, exercise detail pages, and a workout generator that responds to user goals, experience level, and target muscle group. The static demo makes these core interactions available in a browser for portfolio viewing.

## Key Features

- **Equipment discovery** — Search equipment, filter by muscle group, sort by difficulty, and browse paginated results.
- **Workout details** — View exercise information, guidance, alternatives, training tips, and linked video content.
- **Personalized workout generator** — Generate exercise suggestions from fitness goals, experience level, and target muscle group.
- **Training plan management** — Add and remove selected exercises from a personal plan.
- **Interactive MVC frontend** — The original generator uses jQuery AJAX to request generated results and refresh plan content without a full page reload.

## Tech Stack

### Original ASP.NET MVC implementation

- C# with ASP.NET MVC (`System.Web.Mvc`)
- MVC controllers and C# models
- Razor views and partial views
- In-memory seeded collections for equipment, workouts, users, and reservations
- ASP.NET `Session` for login and training-plan state

### Frontend

- Razor, HTML, and CSS
- JavaScript and jQuery
- AJAX interactions in the workout generator

## Architecture

```text
Browser
  ↓
Razor Views + JavaScript/jQuery
  ↓
AJAX requests and form submissions
  ↓
ASP.NET MVC Controllers
  ↓
C# Models and workout-selection logic
  ↓
ASP.NET Session + in-memory seeded data
```

## Online Demo vs. Original Application

The original application is implemented with ASP.NET MVC and C#. GitHub Pages serves static files only, so it cannot execute the server-side Razor or C# code.

The included GitHub Pages demo adapts portfolio-facing interactions to browser-side JavaScript. In that version, workout data is represented in JavaScript and the training plan is stored in the browser with `localStorage`; the original C# / ASP.NET source remains in the repository as evidence of the full-stack implementation.

## Screenshots

<!-- Add repository-hosted screenshots here when available. Suggested views: home page, equipment library, workout generator, and equipment detail. -->

No repository-hosted screenshots are currently available. Screenshots can be added later under a dedicated directory (for example, `docs/screenshots/`) and linked here.

## Running the Original Project Locally

The repository contains the ASP.NET MVC source files, but it does not currently include a tracked Visual Studio solution (`.sln`), project file (`.csproj`), or NuGet package manifest. Because the build metadata is unavailable, a reproducible local setup cannot be verified from this repository alone.

To run the original application locally, restore the missing project/solution files from the original development workspace, open the solution in Visual Studio, restore its NuGet dependencies, and run it with IIS Express. The source uses the classic `System.Web.Mvc` stack rather than ASP.NET Core.

## GitHub Pages Deployment

The static demo is published from the root of the `main` branch. In **Settings → Pages**, select **Deploy from a branch**, then choose `main` and `/(root)`.

The static HTML files use relative paths so the demo works from the project-site URL: [https://gujiaying1.github.io/JoyFitness/](https://gujiaying1.github.io/JoyFitness/).

## Future Improvements

- Add persistent storage in place of in-memory application data.
- Add automated tests and a repeatable build configuration.
- Modernize the application to ASP.NET Core with a documented deployment workflow.

## Additional Documentation

See [README_GITHUB_PAGES.md](README_GITHUB_PAGES.md) for the detailed static-demo behavior and deployment notes.
