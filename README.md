# Round-Robin Competition Tracker

## Project Overview

This web application is designed to facilitate the organization and tracking of round-robin competitions. Users can create and manage competitions, enter competitors, select scoring systems, and update results, with the application automatically generating schedules and standings.

## Features

- **Competition Creation**: Users can create a competition by specifying its name, a list of competitors (separated by semicolon), and choosing a scoring system (e.g., 3/1/0 for soccer, 1/0.5/0 for chess).
- **Automatic Schedule Generation**: The application generates a complete schedule for the competition, without the need for manual input.
- **Result Entry and Management**: The creator of the competition can enter and update results, which automatically recalculates the standings.
- **Public Access to Results**: Each competition has a unique, publicly accessible link for viewing current standings and results.
- **User Authentication**: User authentication is managed via OpenId Connect (OIDC) and Auth0 service.

## Current Progress

- **Implemented**: User login functionality and the ability to create competitions.
- **To-Do**: Further development on result management and public access features.

Available at [Competition Tracker](https://competition-app-wheat.vercel.app/)
