// controllers/ratingController.js

const pool = require('../config/db'); 
// Rate Borrow
exports.rateBorrow = async (req, res) => {
    const { borrowId, rating, type } = req.body;
    const userId = req.user.id; // Assuming user ID is available from authentication middleware

    // Validate inputs
    if (!borrowId || typeof rating !== 'number' || !type) {
        return res.status(400).json({ message: "Borrow ID, rating, and type are required." });
    }

    // Validate rating value (e.g., between 1 and 5)
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Validate type (e.g., 'borrower', 'lender', 'resource')
    const validTypes = ['borrower', 'lender', 'resource'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid rating type." });
    }

    try {
        // TODO: Retrieve the borrow details to get user IDs and resource ID
        const query = `
            SELECT 
                Borrow_ID AS borrowId,
                Res_ID AS resource_id,
                Borrower_TUID AS borrower_id,
                (SELECT TU_ID FROM RESOURCE WHERE Res_ID = BORROWS.Res_ID) AS lender_id,
                Status AS status
            FROM BORROWS
            WHERE Borrow_ID = ?;
        `;
        const [result] = await pool.query(query, [borrowId]);

        // Assuming 'borrow' is the result from the database
        const borrow = result[0]; // Replace with actual data from the query

        if (!borrow) {
            return res.status(404).json({ message: "Borrow not found." });
        }

        // Ensure the borrow is completed
        if (borrow.status !== 'completed') {
            return res.status(400).json({ message: "Cannot rate a borrow that is not completed." });
        }

        // Prepare the rating data
        let ratingData = {};
        if (type === 'borrower') {
            ratingData = {
                borrowId,
                ratedUserId: borrow.borrower_id,
                raterUserId: userId, // Assuming the lender is rating
                rating,
                type: 'user'
            };
        } else if (type === 'lender') {
            ratingData = {
                borrowId,
                ratedUserId: borrow.lender_id,
                raterUserId: userId, // Assuming the borrower is rating
                rating,
                type: 'user'
            };
        } else if (type === 'resource') {
            ratingData = {
                borrowId,
                raterUserId: userId, // Assuming the borrower is rating
                resourceId: borrow.resource_id,
                rating,
                type: 'resource'
            };
        }

        // TODO: Insert the rating into the database
        const insertQuery = `
            INSERT INTO RATINGS (Borrow_ID, RatedUserID, RaterUserID, ResourceID, Rating, Type)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        await pool.query(insertQuery, [borrowId, ratedUserId, userId, resource_id, rating, type]);

        // Provide feedback or confirmation
        return res.status(200).json({ message: "Rating submitted successfully." });

    } catch (error) {
        console.error("Error submitting rating:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Report Issue
exports.reportIssue = async (req, res) => {
    const { borrowId, reportType, details } = req.body;
    const userId = req.user.id; // Assuming user ID is available from authentication middleware

    // Validate inputs
    if (!borrowId || !reportType || !details) {
        return res.status(400).json({ message: "Borrow ID, report type, and details are required." });
    }

    // Validate report type (e.g., 'damage', 'misconduct', 'late return', 'other')
    const validReportTypes = ['damage', 'misconduct', 'late return', 'other'];
    if (!validReportTypes.includes(reportType)) {
        return res.status(400).json({ message: "Invalid report type." });
    }

    try {
        // TODO: Retrieve the borrow details to get involved user IDs and resource ID
        const query = `
            SELECT 
                Res_ID AS resource_id,
                Borrower_TUID AS borrower_id,
                (SELECT TU_ID FROM RESOURCE WHERE Res_ID = BORROWS.Res_ID) AS lender_id
            FROM BORROWS
            WHERE Borrow_ID = ?;
        `;
        const [result] = await pool.query(query, [borrowId]);

        const borrow = result[0]; // Replace with actual data from the query

        if (!borrow) {
            return res.status(404).json({ message: "Borrow not found." });
        }

        // Prepare the report data
        const reportData = {
            borrowId,
            reporterId: userId,
            borrowerId: borrow.borrower_id,
            lenderId: borrow.lender_id,
            resourceId: borrow.resource_id,
            reportType,
            details,
            status: 'pending', // Initial status for the report
            createdAt: new Date()
        };

        // TODO: Insert the report into the database
        const insertQuery = `
            INSERT INTO REPORTS (Text, ReportedUser, ReportingUser)
            VALUES (?, ?, ?);
        `;
        await pool.query(insertQuery, [details, borrow.borrower_id, userId]);

        // Provide feedback or confirmation
        return res.status(201).json({ message: "Issue reported successfully." });

    } catch (error) {
        console.error("Error reporting issue:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get Resource Ratings
exports.getResourceRatings = async (req, res) => {
    const resourceId = req.params.resourceId || req.params.id;

    // Validate input
    if (!resourceId) {
        return res.status(400).json({ message: "Resource ID is required." });
    }

    try {
        // TODO: Retrieve the resource ratings from the database
        const query = `
            SELECT 
                r.Rating_ID,
                r.Borrow_ID,
                r.RatedUserID,
                r.RaterUserID,
                r.ResourceID,
                r.Rating,
                r.Type,
                (SELECT Name FROM USER WHERE TU_ID = r.RatedUserID) AS RatedUserName,
                (SELECT Name FROM USER WHERE TU_ID = r.RaterUserID) AS RaterUserName
            FROM RATINGS r
            WHERE r.ResourceID = ? AND r.Type = 'resource';
        `;
        const [ratings] = await pool.query(query, [resourceId]);  // Replace with actual data from the query

        // Return the ratings
        return res.status(200).json(ratings);

    } catch (error) {
        console.error("Error retrieving resource ratings:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get Resource Ratings
exports.getRatingsByResource = async (req, res) => {
    const resourceId = req.params.resourceId || req.params.id;

    // Validate input
    if (!resourceId) {
        return res.status(400).json({ message: "Resource ID is required." });
    }

    try {
        // TODO: Retrieve the resource ratings from the database
        const query = `
              SELECT AVG(ResRating) as avg FROM BORROWS WHERE Res_ID=?
        `;
        const [ratings] = await pool.query(query, [resourceId]);  // Replace with actual data from the query
       
               return res.status(200).send(ratings[0].avg);
        

    } catch (error) {
        console.error("Error retrieving resource ratings:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
