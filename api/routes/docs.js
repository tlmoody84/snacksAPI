const docs = {
    message: "Welcome to the Snacks API!",
    endpoints: {
      getAllSnacks: {
        method: "GET",
        route: "/snacks",
        description: "Fetches all snacks from the database.",
        exampleResponse: {
          snacks: [
            {
              id: 1,
              name: "Oreo's",
              description: "Sweet and creamy",
              price: 4.5,
              category: "Cookie",
              inStock: true,
            },
            {
              id: 2,
              name: "Ice Cream",
              description: "Sweet and cold",
              price: 8.99,
              category: "Frozen",
              inStock: true,
            },
          ],
        },
      },
      getSnacksById: {
        method: "GET",
        route: "/snacks/:id",
        description: "Fetches a single snack by ID.",
        exampleResponse: {
          id: 1,
          name: "Oreo's",
          description: "Sweet and creamy",
          price: 4.5,
          category: "Cookie",
          inStock: true,
        },
      },
      addSnacks: {
        method: "POST",
        route: "/snacks",
        description: "Adds a new snack to the database.",
        requiredFields: ["name", "description", "price", "category", "inStock"],
        exampleRequestBody: {
          name: "Honey Bun",
          description: "Soft and sweet",
          price: 3.0,
          category: "Cakes",
          inStock: true,
        },
        exampleResponse: {
          id: 3,
          name: "Honey Bun",
          description: "Soft and sweet",
          price: 3.0,
          category: "Cakes",
          inStock: true,
        },
      },
      updateSnacksById: {
        method: "PUT",
        route: "/snacks/:id",
        description: "Updates an existing snack by ID.",
        requiredFields: ["name", "description", "price", "category", "inStock"],
        exampleRequestBody: {
          name: "Pistachio",
          description: "Sweet and salty",
          price: 14.99,
          category: "Nuts",
          inStock: true,
        },
        exampleResponse: {
          message: "Snack updated successfully.",
        },
      },
      deleteSnackById: { // Fixed the name here
        method: "DELETE",
        route: "/snacks/:id",
        description: "Deletes a snack by ID.",
        exampleResponse: {
          message: "Snack deleted successfully.",
        },
      },
    },
  };
  
  module.exports = docs;
  