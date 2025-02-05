# syntax=docker/dockerfile:1

FROM python:3.10.0

WORKDIR /

COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0

RUN pip3 install -r requirements.txt

COPY . .

# Copy the startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 50505

# Use the startup script as the entry point
ENTRYPOINT ["/start.sh"]
