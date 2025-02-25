# CSV Image Processing API - README

## Project Overview
This is a Node.js and Express.js based REST API that allows users to upload a CSV file containing product information and image URLs. The API:
✅ Parses the CSV file.
✅ Downloads and compresses images.
✅ Stores data in MongoDB.
✅ Notifies a webhook when processing is complete.
✅ Provides an endpoint to check request status.

## Prerequisites
Before running this project, ensure you have:

- Node.js (v14 or later) installed - [Download Node.js](https://nodejs.org/)
- MongoDB Atlas (or a local MongoDB instance)

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/Sumedh-stack/csv-image-processing-api.git
cd csv-image-processing-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=3000
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/?retryWrites=true&w=majority
```
Replace `your-username` and `your-password` with your MongoDB credentials.

## Running the Project

### 1. Start the Server
```sh
npm start
```
The server will run on `http://localhost:3000`.

### 2. Run with Nodemon (for Development)
```sh
npm run dev
```
This will restart the server automatically on code changes.

## API Endpoints

### 1. Upload CSV File
**Endpoint:**
```http
POST /upload
```
**Description:**
Uploads a CSV file containing product details and image URLs for processing.

**Request Format:**
- Content-Type: `multipart/form-data`
- Body:
  - `file`: CSV file (must include `Product Name`, `Input Image Urls`)
  - `webhookUrl`: (Optional) URL to receive status updates

**Example Request:**
```sh
curl -X POST -F "file=@products.csv" -F "webhookUrl=https://your-webhook.com" http://localhost:3000/upload
```

**Response:**
```json
{
  "requestId": "e3f79c4a-8b6b-43db-80f9-7d47c7bdc54e"
}
```

### 2. Check Request Status
**Endpoint:**
```http
GET /status/:requestId
```
**Description:**
Returns the status and processed images for a given request.

**Example Request:**
```sh
curl http://localhost:3000/status/e3f79c4a-8b6b-43db-80f9-7d47c7bdc54e
```

**Response:**
```json
{
  "status": "completed",
  "products": [
    {
      "requestId": "e3f79c4a-8b6b-43db-80f9-7d47c7bdc54e",
      "productName": "Product A",
      "inputImages": ["https://example.com/image1.jpg"],
      "outputImages": ["http://localhost:3000/images/processed-image1.jpg"]
    }
  ]
}
```

## Technologies Used
- **Node.js** - Backend framework
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ORM for MongoDB
- **Multer** - File upload handling
- **csv-parser** - CSV file parsing
- **Axios** - HTTP requests for image downloads
- **Sharp** - Image compression
- **UUID** - Unique request IDs

## Troubleshooting

### 1. MongoDB Connection Error
- Ensure MongoDB URI in `.env` is correct.
- Check your MongoDB cluster is running in Atlas.

### 2. File Upload Issues
- Ensure your CSV file has `Product Name` and `Input Image Urls` columns.

### 3. Image Processing Errors
- Check if URLs in CSV are valid and accessible.

