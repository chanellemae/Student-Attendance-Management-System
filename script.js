const users = []; // Store users in memory (for simplicity)
const attendanceRecords = []; // Store attendance records
let isLoggedIn = false; // Track login status

// Toggle between sections
function toggleSection(section) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('attendanceSection').style.display = 'none';
    document.getElementById('teacherRecordsSection').style.display = 'none';
    document.getElementById('message').textContent = ''; // Clear any existing messages

    document.getElementById(section).style.display = 'block';
}

// Login Logic
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value; // Get selected role

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        alert('Login successful! You are logged in as ' + role);
        isLoggedIn = true; // Set login status to true
        toggleSection(role === 'student' ? 'attendanceSection' : 'teacherRecordsSection'); // Show appropriate section
        document.getElementById('logoutButton').style.display = 'block'; // Show logout button
    } else {
        alert('Invalid email or password!');
    }
});

// Registration Logic
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    // Check if user already exists
    if (users.find(u => u.email === email)) {
        alert('User already exists!');
        return;
    }

    users.push({ email, username, password });
    alert('Registration successful! You can now log in.');
    toggleSection('loginSection');
});

// Attendance Submission Logic
document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const section = document.getElementById('section').value;
    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const attendanceEmail = document.getElementById('attendanceEmail').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    // Create attendance record object
    const attendanceRecord = {
        firstName,
        middleName,
        lastName,
        section,
        subject,
        date,
        time,
        attendanceEmail,
        attendance
    };

    // Store the record in the attendanceRecords array
    attendanceRecords.push(attendanceRecord);

    // Clear the form
    document.getElementById('attendanceForm').reset();

    // Display success message at the top
    const messageDisplay = document.getElementById('message');
    messageDisplay.textContent = 'Attendance Recorded Successfully. Confirmation email sent.';

    // If logged in as teacher, update the records list
    if (isLoggedIn && document.querySelector('input[name="role"]:checked').value === 'teacher') {
        displayRecords();
    }
});

// Function to display attendance records for teachers
function displayRecords() {
    const recordsList = document.getElementById('recordsList');
    recordsList.innerHTML = ''; // Clear existing records
    attendanceRecords.forEach(record => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${record.firstName} ${record.middleName} ${record.lastName}, Section: ${record.section}, Subject: ${record.subject}, Date: ${record.date}, Time: ${record.time}, Attendance: ${record.attendance}`;
        recordsList.appendChild(listItem);
    });
}

// Logout Logic
function logout() {
    isLoggedIn = false; // Reset login status
    toggleSection('loginSection'); // Show login section
    document.getElementById('logoutButton').style.display = 'none'; // Hide logout button
    document.getElementById('recordsList').innerHTML = ''; // Clear attendance records
}
