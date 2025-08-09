// controllers/borrowController.js

const pool = require('../config/db'); 
// Request to Borrow
exports.requestBorrow = async (req, res) => {
    
    const { resourceId, startDate, endDate,borrower_id } = req.body;
    console.log(req.body)
    // Validate inputs
    if (!borrower_id || !resourceId || !startDate || !endDate) {
        return res.status(400).json({ message: "All parameters are required." });
    }
   
    

    try {
        // TODO: Write a query to insert the borrow request into the database
        const query = `
            INSERT INTO BORROWS (Res_ID, Status, StartTime, EndTime, Borrower_TUID)
            VALUES (
                ?, -- resourceId
                'Requested', -- Initial status
                ?, -- startTime
                ?, -- endTime
                ? -- borrower_id
            )
        `;
        await pool.query(query, [resourceId, startDate, endDate, borrower_id]);
         
        // Return success response
        return res.status(201).json({ message: "Borrow request submitted successfully." });
    } catch (error) {
        console.error("Error requesting borrow:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Approve Borrow Request
exports.approveBorrowRequest = async (req, res) => {
    const borrowId = req.params.id;

    // Validate input
    if (!borrowId) {
        return res.status(400).json({ message: "Borrow ID is required." });
    }

    try {
        // TODO: Write a query to update the borrow request status to 'approved'
        const query = `
            UPDATE BORROWS
            SET Status = 'Approved'
            WHERE Borrow_ID = ?
        `;
        await pool.query(query, [borrowId]);

        // Return success response
        return res.status(200).json({ message: "Borrow request approved successfully." });
    } catch (error) {
        console.error("Error approving borrow request:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

exports.getAllPendingBorrowsByTUID = async(req,res)=>{

    userId=req.params.userId
    console.error(userId)

   
    if (!userId) {
        return res.status(400).json({ message: "Resource ID is required." });
    }

    try {
        // TODO: Write a query to retrieve the borrow history of the resource
        const query = `
           SELECT BORROWS.*,RESOURCE.ResName,RESOURCE.Description,USER.Nickname,USER.Email 
FROM BORROWS,RESOURCE,USER 
WHERE BORROWS.Res_ID=RESOURCE.Res_ID 
	AND
      BORROWS.Borrower_TUID=USER.TU_ID
    AND RESOURCE.TU_ID = ?
    AND Status<>'Completed'
        `;
        

        // Assuming 'borrowHistory' is the result from the database
        const borrows = await pool.query(query, [userId]); // Replace with actual data from the query
       
        // Return the borrow history
        return res.status(200).json(borrows[0]);
    } catch (error) {
        console.error("Error retrieving borrow history:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
exports.startedBorrowRequest = async (req, res) => {
    const borrowId = req.params.id;

    // Validate input
    if (!borrowId) {
        return res.status(400).json({ message: "Borrow ID is required." });
    }

    try {
        // TODO: Write a query to update the borrow request status to 'approved'
        const query = `
            UPDATE BORROWS
            SET Status = 'Started'
            WHERE Borrow_ID = ?
        `;
        await pool.query(query, [borrowId]);

        // Return success response
        return res.status(200).json({ message: "Borrow request approved successfully." });
    } catch (error) {
        console.error("Error approving borrow request:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Complete Borrow
exports.completeBorrow = async (req, res) => {
    const borrowId = req.params.id;

    // Validate input
    if (!borrowId) {
        return res.status(400).json({ message: "Borrow ID is required." });
    }

    try {
        // TODO: Retrieve the borrow details, including user IDs, resource ID, start and end times, and agreed cost
        const query = `
            SELECT 
                BORROWS.Res_ID, BORROWS.StartTime, BORROWS.EndTime, 
                BORROWS.Borrower_TUID, RESOURCE.Cost, RESOURCE.ResourceType 
            FROM BORROWS,RESOURCE
            WHERE RESOURCE.Res_ID=BORROWS.Res_id BORROW_ID = ?
        `;

        // Assuming 'borrow' is the result from the database
        const [borrow] = await pool.query(query, [borrowId]); // Replace with actual data from the query

        if (!borrow) {
            return res.status(404).json({ message: "Borrow not found." });
        }

        // Calculate total hours/days
        const durationInMilliseconds = new Date(borrow.EndTime) - new Date(borrow.StartTime);
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
        const durationInDays = durationInHours / 24;

        let totalCost;
        if (borrow.cost_type === 'hour') {
            totalCost = durationInHours * borrow.cost;
        } else {
            totalCost = durationInDays * borrow.cost;
        }

        // Update the borrow record with the total cost and status
        // TODO: Update the borrow record
        const updateBorrowQuery = `
            UPDATE BORROWS
            SET ResRating = ?, Status = 'Completed'
            WHERE Borrow_ID = ?
        `;
        await pool.query(updateBorrowQuery, [totalCost, borrowId]);

        // Add Roars to the lender
        // TODO: Credit Roars to lender
        const updateRoarAccountQuery = `
            UPDATE ROAR_ACCOUNT
            SET Balance = Balance + ?
            WHERE TU_ID = (
                SELECT TU_ID 
                FROM RESOURCE 
                WHERE Res_ID = ?
            )
        `;
        await pool.query(updateRoarAccountQuery, [totalCost, borrow.Res_ID]);

        // Update resource availability
        // TODO: Update the resource status to 'available'
        const updateResourceQuery = `
            UPDATE RESOURCE
            SET Availability = TRUE
            WHERE Res_ID = ?
        `;
        await pool.query(updateResourceQuery, [borrow.Res_ID]);

        // Return success response
        return res.status(200).json({ message: "Borrow completed successfully." });
    } catch (error) {
        console.error("Error completing borrow:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get Borrow History
exports.getBorrowHistory = async (req, res) => {
    const resourceId = req.params.resourceId;

    // Validate input
    if (!resourceId) {
        return res.status(400).json({ message: "Resource ID is required." });
    }

    try {
        // TODO: Write a query to retrieve the borrow history of the resource
        const query = `
            SELECT Borrow_ID, Status, StartTime, EndTime, ResRating, Borrower_TUID
            FROM BORROWS
            WHERE Res_ID = ?
        `;
        

        // Assuming 'borrowHistory' is the result from the database
        const borrowHistory = await pool.query(query, [resourceId]); // Replace with actual data from the query

        // Return the borrow history
        return res.status(200).json(borrowHistory);
    } catch (error) {
        console.error("Error retrieving borrow history:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
