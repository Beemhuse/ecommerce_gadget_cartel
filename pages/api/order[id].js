
// Import necessary modules
import { client } from "../../../lib/client";

// Handler function for the API route
export default async function handler(req, res) {
  // Extract the order ID from the request parameters
  const { id } = req.query;

  try {
    // Fetch the order details from the data source (e.g., Sanity CMS)
    const order = await client.fetch(`*[_type == "order" && _id == $id][0]`, { id });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Return the fetched order details as a response
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
