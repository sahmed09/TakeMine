// controllers/adminController.js

const pool = require('../config/db'); 
const { completeBorrow } = require('./borrowController');
// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        // TODO: Write a query to retrieve all users
        const usersQuery = "SELECT TU_ID, UserStatus, TUEmail, Name, Address, Phone, DoB, Nickname FROM USER";

        // Assuming 'users' is the result from the database
        // const users = [usersQuery]; // Replace with actual data from the query
        const users = await pool.query(usersQuery);
        // console.log(users);

        // Return the list of users
        return res.status(200).json(users[0][0]);
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get Reports
exports.getReports = async (req, res) => {
    try {
        // Build the query to retrieve all reports
        const reportsQuery = `
        SELECT 
            r.ReportID, 
            r.Text, 
            r.ReportedUser, 
            (SELECT Name FROM USER WHERE TU_ID = r.ReportedUser) AS ReportedUserName,
            r.ReportingUser, 
            (SELECT Name FROM USER WHERE TU_ID = r.ReportingUser) AS ReportingUserName
        FROM REPORTS r`;
        const reports = await pool.query(reportsQuery);

        // Assuming 'reports' is the result from the database
        // const reports = []; // Replace with actual data from the query

        // Return the list of reports
        return res.status(200).json(reports[0][0]);
    } catch (error) {
        console.error("Error retrieving reports:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Remove User
exports.removeUser = async (req, res) => {
    const userId = req.params.id;

    // Validate input
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // Delete the user from the database
        // TODO: Write a query to delete the user
        const removeUserQuery = `
            DELETE FROM USER
            WHERE TU_ID = ?`;

        await pool.query(removeUserQuery, [userId]);

        // Provide feedback or confirmation
        return res.status(200).json({ message: "User removed successfully." });
    } catch (error) {
        console.error("Error removing user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Ban User
exports.banUser = async (req, res) => {
    const userId = req.params.id;

    // Validate input
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // TODO: Write a query to update the user's status to 'banned'
        const banUserQuery = `
            UPDATE USER
            SET UserStatus = 'Banned'
            WHERE TU_ID = ?`;
        await pool.query(banUserQuery, [userId]);

        // Provide feedback or confirmation
        return res.status(200).json({ message: "User banned successfully." });
    } catch (error) {
        console.error("Error banning user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get Borrow Stats
exports.getBorrowStats = async (req, res) => {
    try {
        // TODO: Write queries to gather borrow statistics
        // Total borrows
        const totalBorrowsQuery = `
            SELECT COUNT(*) AS TotalBorrows
            FROM BORROWS
        `;
        const totalBorrowsResult = await pool.query(totalBorrowsQuery);

        // Active borrows
        const activeBorrowsQuery = `
            SELECT COUNT(*) AS ActiveBorrows
            FROM BORROWS
            WHERE Status = 'In Progress'
        `;
        const activeBorrowsResult = await pool.query(activeBorrowsQuery);

        // Completed borrows
        const completedBorrowsQuery = `
            SELECT COUNT(*) AS CompletedBorrows
            FROM BORROWS
            WHERE Status = 'Returned'
        `;
        const completedBorrowsResult = await pool.query(completedBorrowsQuery);

        // Total Roar exchanged
        const totalRoarExchangedQuery = `
            SELECT SUM(
                (SELECT Cost FROM RESOURCE WHERE Res_ID = b.Res_ID)
            ) AS TotalRoarExchanged
            FROM BORROWS b
            WHERE b.Status = 'Returned'
        `;
        const totalRoarExchangedResult = await pool.query(totalRoarExchangedQuery);

        // console.log(totalBorrowsResult);
        // console.log(activeBorrowsResult);
        // console.log(completedBorrowsResult);
        // console.log(totalRoarExchangedResult);

        // Assuming you have executed the queries and have the results
        const totalBorrows = totalBorrowsResult[0][0]?.TotalBorrows || 0; // Replace with actual data from the query
        const activeBorrows = activeBorrowsResult[0][0]?.ActiveBorrows || 0; // Replace with actual data from the query
        const completedBorrows = completedBorrowsResult[0][0]?.CompletedBorrows || 0; // Replace with actual data from the query
        const totalRoarExchanged = totalRoarExchangedResult[0][0]?.TotalRoarExchanged || 0;; // Replace with actual data from the query
        
        // console.log(totalBorrows);
        // console.log(activeBorrows);
        // console.log(completedBorrows);
        // console.log(totalRoarExchanged);

        // Compile the statistics into an object
        const stats = {
            totalBorrows,
            activeBorrows,
            completedBorrows,
            totalRoarExchanged,
        };

        // Return the statistics
        return res.status(200).json(stats);
    } catch (error) {
        console.error("Error retrieving borrow stats:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
