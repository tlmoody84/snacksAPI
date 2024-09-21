# Testing, Modularizing, and securing the Snacks API

Utilizing Backend Server doing the following:
Routes:

GET /items: Retrieves the list of all snacks.
GET /items/:id: Retrieves a specific snack by its ID.
POST /items: Adds a new snack to the list.
PUT /items/:id: Updates an existing snack based on its ID.
DELETE /items/:id: Deletes a snack from the list by its ID.

Middleware:

CORS: Allows cross-origin requests.
Express JSON: Automatically parses incoming JSON requests.
Error Handling:

404 Not Found: Returns a 404 error if a route or snack is not found.
Centralized Error Handling: Catches and logs all errors, returning a generic 500 error message

Automated Testing with Jest and SuperTest:
    •    Install Jest and SuperTest
    •    Write basic tests for your Snacks API routes (GET, POST, PUT, DELETE).
    •    Ensure your tests check that the API responds correctly (status codes, data validation, etc.)
Modularizing Routes:
    •    Refactor your Beverages API to modularize your routes (e.g., create separate route files for each route).
    5.    Adding API Key Security:
    •    Add API key middleware to secure access.
    •    Ensure that requests to your API require a valid API key in the headers to be processed.
    
By: Tiffany Sharpe
