# EnamelX Backend API Server

This repository contains a FastAPI server for serving YOLOv8 dental image analysis models in TorchScript format.

## Features

- **TorchScript Model Serving**: High-performance serving of optimized YOLOv8 models
- **Multiple Output Format Support**: Handles various YOLOv8 model output formats
- **Comprehensive Error Handling**: Robust error handling for model loading, inference, and detection processing
- **Performance Metrics**: Tracks and reports API performance metrics
- **Health Monitoring**: Health check endpoint for system monitoring
- **Interactive API Documentation**: Built-in Swagger UI and ReDoc documentation
- **Confidence Normalization**: Automatically normalizes model confidence values for consistent output
- **Unknown Class Handling**: Maps unknown class IDs to meaningful labels

## Recent Fixes

See [FIXES.md](FIXES.md) for details about recent bug fixes, including:
- Confidence value normalization for values >1.0
- Improved handling of unknown class IDs
- Fixed `UnboundLocalError` for the `boxes` variable
- TorchScript loading compatibility across PyTorch versions

## Requirements

- Python 3.8+
- PyTorch 1.8+
- FastAPI and its dependencies
- OpenCV for image processing

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/enamelx-backend.git
   cd enamelx-backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   pip install -r requirements_local.txt
   ```

3. Make sure you have a YOLOv8 model in TorchScript format (`best.torchscript`). If not, you can optimize an existing model:
   ```
   python optimize_model.py
   ```
   
   Alternatively, you can use the Google Colab notebook `optimize_yolo_colab.ipynb` for GPU-accelerated optimization.

4. Start the FastAPI server:
   ```
   ./run_fastapi_local.sh
   ```

5. Open the API documentation: http://localhost:8080/api/docs

## API Endpoints

- **GET /** - Root endpoint with HTML documentation
- **POST /predict** - Process a dental image and return predictions
  - Parameters:
    - `file`: Image file to analyze
    - `conf_threshold`: Confidence threshold (0-1)
- **GET /model-info** - Get information about the loaded model
- **GET /health** - Health check endpoint
- **GET /performance** - Get performance metrics

## Testing and Benchmarking

### Testing the API

You can test the API using the `test_api.py` script:

```
python test_api.py test-image.jpg --url http://localhost:8080
```

### Testing Model Loading

To test if the TorchScript model can be loaded correctly:

```
python test_torchscript_model.py
```

### Benchmarking Model Performance

Benchmark model inference performance using:

```
./run_benchmark.sh
```

Options:
- `-m, --model PATH` - Path to TorchScript model (default: best.torchscript)
- `-i, --image PATH` - Path to test image (default: test-image.jpg)
- `-n, --iterations NUM` - Number of iterations for benchmark (default: 50)
- `-t, --threshold NUM` - Confidence threshold (default: 0.25)
- `-s, --single` - Run a single inference instead of benchmark

## Debugging

For debugging model outputs, use:

```
python debug_model_output.py test-image.jpg --save
```

This will save the detection tensor to `detection_debug.npy` and a simplified version to `detection_simple.json`.

## Project Structure

- `fastapi_server.py` - Main FastAPI server implementation
- `optimize_model.py` - Script to optimize YOLOv8 models to TorchScript format
- `optimize_yolo_colab.ipynb` - Google Colab notebook for GPU-accelerated model optimization
- `test_api.py` - Script to test the API endpoints
- `test_torchscript_model.py` - Script to verify TorchScript model loading
- `benchmark_model.py` - Script to benchmark model inference performance
- `debug_model_output.py` - Script to debug model outputs
- `run_fastapi_local.sh` - Script to run the FastAPI server locally
- `run_benchmark.sh` - Script to run benchmark tests

## Performance Optimization

The server includes several performance optimizations:
- Model warmup during loading
- Preprocessing time tracking
- Inference time optimization
- Memory usage tracking
- GPU utilization tracking (when available)

## License

[MIT License](LICENSE)
