# Base image
FROM python:3.11-slim

# Install system dependencies (Tesseract + OpenCV deps)
RUN apt-get update && \
    apt-get install -y tesseract-ocr libtesseract-dev libleptonica-dev pkg-config \
    libglib2.0-0 libsm6 libxext6 libxrender-dev && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Expose FastAPI port
EXPOSE 10000

# Run server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
