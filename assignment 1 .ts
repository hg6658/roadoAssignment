class UserActivityTracker {
    private loggedInUsers: Set<string>; // Set to store logged-in users

    constructor() {
        this.loggedInUsers = new Set();
    }

    // Method to add user to the Set when logged in
    userLoggedIn(username: string) {
        this.loggedInUsers.add(username);
    }

    // Method to remove user from the Set when logged out
    userLoggedOut(username: string) {
        this.loggedInUsers.delete(username);
    }

    // Method to parse CSV file and update logged-in users
    parseCSV(csvData: string) {
        const lines = csvData.split('\n');
        for (let i = 1; i < lines.length; i++) { // Start from index 1 to skip header row
            const fields = lines[i].split(',');
            const username = fields[0].trim();
            const loggedIn = new Date(fields[1].trim());
            const loggedOut = new Date(fields[2].trim());
            const lastSeenAt = new Date(fields[3].trim());
            
            // Check if user logged in or out based on the timestamps
            if (loggedIn <= new Date() && new Date() <= loggedOut) {
                this.userLoggedIn(username); // User is currently logged in
            } else {
                this.userLoggedOut(username); // User is logged out
            }
        }
    }

    // Method to count monthly logged users
    countMonthlyLoggedUsers(date: Date): number {
        // Get the end date of the month for the provided date
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        // Check if the provided date is the last day of the month
        if (date.getDate() === endOfMonth.getDate()) {
            return this.loggedInUsers.size; // Count the number of logged-in users
        } else {
            return -1; // Not the last day of the month
        }
    }

    // Method to find active users in a particular month
    findActiveUsersForMonth(month: number, year: number): string[] {
        const activeUsers: string[] = [];
        this.loggedInUsers.forEach(username => {
            // Here, you need to have a data structure containing user activity details
            // You would need to retrieve the last seen timestamp for the user and compare it with the specified month
            // If the last seen timestamp falls within the specified month, add the user to the list of active users
            // Also, check if the user is not in the Set, indicating they were active during that month
            if (/* User's last seen timestamp falls within the specified month */
                /* && User is not in the Set */) {
                activeUsers.push(username); // Add user to the list of active users
            }
        });
        return activeUsers;
    }
}

// Example usage:
const tracker = new UserActivityTracker();

// CSV data containing user activity information
const csvData = `
    Username,LoggedIn,LoggedOut,LastSeenAt
    user1,2024-04-01 08:00:00,2024-04-01 17:00:00,2024-04-01 16:30:00
    user2,2024-04-01 09:00:00,2024-04-01 18:00:00,2024-04-01 17:45:00
`;

// Parse CSV data and update logged-in users
tracker.parseCSV(csvData);

// Check the set of logged-in users
console.log("Logged-in users:", tracker.loggedInUsers);

// Count monthly logged users for April 2024
const monthlyLoggedUsers = tracker.countMonthlyLoggedUsers(new Date(2024, 3, 30));
console.log("Monthly logged users:", monthlyLoggedUsers);

// Find active users for April 2024
const activeUsers = tracker.findActiveUsersForMonth(4, 2024);
console.log("Active users for April 2024:", activeUsers);
