#!/bin/bash

# Activate the virtual environment
source ./venv/bin/activate

# Run the application
exec gunicorn app:app --bind 0.0.0.0:50505 --workers 4
