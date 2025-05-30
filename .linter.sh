#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-36704-6ddd7116/tic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

