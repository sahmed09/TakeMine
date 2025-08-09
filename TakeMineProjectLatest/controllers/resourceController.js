// controllers/resourceController.js

const pool = require('../config/db'); // Assuming you have a db.js exporting a pool for database connections

// Add Resource
exports.addResource = async (req, res) => {
   // const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const resourceData = req.body;
    console.log(resourceData)
    
    // Validate input
    if ( !resourceData) {
        return res.status(400).json({ message: "User ID and resource data are required." });
    }
    
   
    // Validate required fields
    if (!resourceData.name || !resourceData.description || !resourceData.cost || !resourceData.type) {
        return res.status(400).json({ message: "Missing required resource fields." });
    }
   
    try {
        // TODO: Write a query to insert the new resource into the database
        const insertQuery = `
            INSERT INTO RESOURCE (ResName, Description, Location, Availability, Cost, ResourceType, TU_ID) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const [result] = await pool.query(insertQuery, [resourceData.name,
            resourceData.description,
            resourceData.location,
            resourceData.availability,
            resourceData.cost,
            resourceData.type,
            resourceData.TU_ID
        ]);

        const newResourceId = result.insertId;
        const insertCategories = `
            INSERT INTO TAGGEDAS (CNAME, RES_ID) VALUES (?, ?);
        `;
        resourceData.categories.forEach( async c=>
        await pool.query(insertCategories, [c,newResourceId]

        ));
        // Return success response
        return res.status(201).json({ message: "Resource added successfully.",newId: newResourceId });

    } catch (error) {
        console.error("Error adding resource:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Edit Resource
exports.editResource = async (req, res) => {
    const resourceId = req.params.id;
    const updates = req.body;

    // Validate input
    if (!resourceId || !updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "Resource ID and updates are required." });
    }

    try {
        // Build the fields to update
        const fields = [];
        const params = [];

        if (updates.name) {
            fields.push("name = ?");
            params.push(updates.name);
        }
        if (updates.description) {
            fields.push("description = ?");
            params.push(updates.description);
        }
        if (updates.cost) {
            fields.push("cost = ?");
            params.push(updates.cost);
        }
        if (updates.type) {
            fields.push("type = ?");
            params.push(updates.type);
        }
        if (updates.status) {
            fields.push("status = ?");
            params.push(updates.status);
        }
        if (updates.gpsLocation) {
            fields.push("gps_location = ?");
            params.push(updates.gpsLocation);
        }
        if (updates.photos) {
            fields.push("photos = ?");
            params.push(updates.photos);
        }
        if (updates.categories) {
            fields.push("categories = ?");
            params.push(updates.categories);
        }
        
        if (fields.length === 0) {
            return res.status(400).json({ message: "No valid fields to update." });
        }

        params.push(resourceId);
   
        // TODO: Write a query to update the resource in the database
        const updateQuery = `
            UPDATE RESOURCE
            SET ${fields.join(', ')}
            WHERE Res_ID = ?;
        `;
        await pool.query(updateQuery, params);

        // Return success response
        return res.status(200).json({ message: "Resource updated successfully." });

    } catch (error) {
        console.error("Error updating resource:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Delete Resource
exports.deleteResource = async (req, res) => {
    const resourceId = req.params.id;

    // Validate input
    if (!resourceId) {
        return res.status(400).json({ message: "Resource ID is required." });
    }

    try {
        // Delete the resource by updating its status
        // TODO: Write a query to update the resource status to 'disabled'
        const deleteQuery = `
            UPDATE RESOURCE
            SET Availability = FALSE
            WHERE Res_ID = ?;
        `;
        await pool.query(deleteQuery, [resourceId]);

        // Provide feedback or confirmation
        return res.status(200).json({ message: "Resource deleted successfully." });

    } catch (error) {
        console.error("Error deleting resource:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Search Resources
exports.searchResources = async (req, res) => {
    const query = req.query.query;
    const filters = req.query;

    
//SELECT resource.*,(SELECT Avg(BORROWS.ResRating) or 0 as rating  from borrows where borrows.Res_ID=resource.Res_ID) FROM resource;
    try {
        // Initialize the base query
        let searchQuery = `
            select resource.*, (SELECT Avg(BORROWS.ResRating) g from borrows where borrows.Res_ID=resource.Res_ID) as rating, taggedas.CNAME from resource,taggedas where resource.Res_ID=taggedas.Res_ID order by resource.Res_ID;
        `;
        const params = [];

        // Add search query if provided
        if (query) {
            searchQuery += ` AND (name LIKE ? OR description LIKE ?)`;
            const likeQuery = `%${query}%`;
            params.push(likeQuery, likeQuery);
        }

        // Apply filters if provided
        if (filters) {
            if (filters.category) {
                searchQuery += ` AND categories LIKE ?`;
                params.push(`%${filters.category}%`);
            }
            if (filters.type) {
                searchQuery += ` AND type = ?`;
                params.push(filters.type);
            }
            if (filters.maxCost) {
                searchQuery += ` AND cost <= ?`;
                params.push(filters.maxCost);
            }
        }
 
        // TODO: Execute the search query
        
        // Assuming 'resources' is the result from the database
        const [resources] = await pool.query(searchQuery, params); // Replace with actual data from the query

        // Return the search results
        return res.status(200).json(resources);

    } catch (error) {
        console.error("Error searching resources:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Search Resources
exports.searchResourcesByTUID = async (req, res) => {
    const query = req.query.query;
    const filters = req.query;
    const userId = req.params.id 
    
    try {
        // Initialize the base query
        let searchQuery = `
            SELECT * FROM RESOURCE
            WHERE TU_ID = ? AND AVAILABILITY=TRUE
        `;
        const params = [userId];

        // Add search query if provided
        if (query) {
            searchQuery += ` AND (name LIKE ? OR description LIKE ?)`;
            const likeQuery = `%${query}%`;
            params.push(likeQuery, likeQuery);
        }

        // Apply filters if provided
        if (filters) {
            if (filters.category) {
                searchQuery += ` AND categories LIKE ?`;
                params.push(`%${filters.category}%`);
            }
            if (filters.type) {
                searchQuery += ` AND type = ?`;
                params.push(filters.type);
            }
            if (filters.maxCost) {
                searchQuery += ` AND cost <= ?`;
                params.push(filters.maxCost);
            }
        }

        // TODO: Execute the search query
        
        // Assuming 'resources' is the result from the database
        const [resources] = await pool.query(searchQuery, params); // Replace with actual data from the query
        
        const result={}
        // Return the search results
        return res.status(200).json(resources);

    } catch (error) {
        console.error("Error searching resources:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get Resource Details
exports.getResourceDetails = async (req, res) => {
    const resourceId = req.params.id;

    // Validate input
    if (!resourceId) {
        return res.status(400).json({ message: "Resource ID is required." });
    }

    try {
        // TODO: Write a query to retrieve the resource details
        const resourceQuery = `
            SELECT * FROM RESOURCE WHERE Res_ID = ?;
        `;
        

        // Assuming 'resource' is the result from the database
        const [resource] = await pool.query(resourceQuery, [resourceId]); // Replace with actual data from the query

        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }

        // Return the resource details
        return res.status(200).json(resource);

    } catch (error) {
        console.error("Error retrieving resource details:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
