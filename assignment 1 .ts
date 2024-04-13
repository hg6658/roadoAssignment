class UserActivityTracker {
    loggedInUsers: Set<string>; // Set to store logged-in users
    userActivityMap: Map<string, Date>; // Map to store last seen timestamp for each user

    constructor() {
        this.loggedInUsers = new Set();
        this.userActivityMap = new Map();
    }

    // Method to add user to the Set and update activity map when logged in
    userLoggedIn(username: string, lastSeenAt: Date) {
        this.loggedInUsers.add(username);
        this.userActivityMap.set(username, lastSeenAt);
    }

    // Method to remove user from the Set and activity map when logged out
    userLoggedOut(username: string) {
        this.loggedInUsers.delete(username);
        this.userActivityMap.delete(username);
    }

    // Method to parse CSV file and update logged-in users and activity map
    parseCSV(csvData: string) {
        const lines = csvData.split('\n');
        for (let i = 1; i < lines.length; i++) { // Start from index 1 to skip header row
            const fields = lines[i].split(',');
            if(fields[0] == '')continue;
            const username = fields[0].trim();
            const loggedIn = new Date(fields[1].trim());
            const loggedOut = new Date(fields[2].trim());
            const lastSeenAt = new Date(fields[3].trim());
            
            // Check if user logged in or out based on the timestamps
            if (loggedIn <= new Date() && new Date() <= loggedOut) {
                this.userLoggedIn(username, lastSeenAt); // User is currently logged in
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
        this.userActivityMap.forEach((lastSeenAt, username) => {
            const userMonth = lastSeenAt.getMonth() + 1;
            const userYear = lastSeenAt.getFullYear();
            if (userMonth === month && userYear === year && this.loggedInUsers.has(username)) {
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
    user1,2024-04-01 08:00:00,2024-05-01 17:00:00,2024-04-01 16:30:00
    user2,2024-04-01 09:00:00,2024-05-01 18:00:00,2024-04-01 17:45:00
`;

// Parse CSV data and update logged-in users and activity map
tracker.parseCSV(csvData);

// Check the set of logged-in users
console.log("Logged-in users:", tracker.loggedInUsers.size);

// Count monthly logged users for April 2024
const monthlyLoggedUsers = tracker.countMonthlyLoggedUsers(new Date(2024, 3, 30));
console.log("Monthly logged users:", monthlyLoggedUsers);

// Find active users for April 2024
const activeUsers = tracker.findActiveUsersForMonth(4, 2024);
console.log("Active users for April 2024:", activeUsers);
