# Scoreboard Update Module

## Overview
The Scoreboard Update Module handles real-time updates to the top 10 user scores on our website. It ensures secure score updates and provides a live update mechanism for the scoreboard.

## Features
- Real-Time Score Updates
- Secure Score Increment
- Top 10 Scoreboard
- Score will automatically update when user update their information
- WebSocket Integration

## Installation:
For the installation, the same as the problem 5.

## For additional comments for improvement:

1. Rate Limiting: For preventing abuse of the score update endpoint.
2. Caching: Optimize retrieval of the top 10 scores.

## Flow of Execution:
1. User need to login first for the authentication.
2. User completes an specific action (Update information): Triggers an API call.
3. Top 10 scores: Updates and retrieves the top 10 scores.
4. WebSocket Notification: Sends the updated scores to the Websocket server.
5. Real-time Update: WebSocket server broadcasts the scores to clients.
### Diagram:
![Example Image](https://drive.google.com/uc?id=1QvT0ksmoFveu0b3sC45T3uLBJ6iwKTHi)
