// //17 otober
// document.getElementById('signinForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('/api/users/signin', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();
//         if (response.ok) {
//             // Save user data to localStorage
//             localStorage.setItem('user', JSON.stringify(data.user));
//             // Redirect to the dashboard
//             window.location.href = 'dashboard.html';
//         } else {
//             alert(data.message || 'Login failed');
//         }
//     } catch (error) {
//         console.error('Error during sign-in:', error);
//         alert('An error occurred. Please try again.');
//     }
// });

//latest
const signInForm = document.getElementById('signinForm');

signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            localStorage.setItem('userId', response.userId); //17 october
            window.location.href = '/dashboard.html'; // Or any other page you want to redirect to
        } else {
            alert(result.message || "Sign-in failed");
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        alert("An error occurred. Please try again.");
    }
});



// Import jsonwebtoken at the top of the file
const jwt = require('jsonwebtoken');

// Define a secret key
const SECRET_KEY = 'your_secret_key_here'; // Replace with a strong secret key

// Example login function (where you authenticate the user)
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    // Perform user authentication (e.g., check if email and password are correct)
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
        { userId: user._id },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    // Send the token to the client
    res.json({ token });
});


//17 october 2024
// const signInForm = document.getElementById('signinForm');

// signInForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:5000/api/users/signin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const result = await response.json();

//         if (response.ok) {
//             // Store the user ID (or JWT token if using it) in localStorage
//             localStorage.setItem('userId', result.userId);
//             alert(result.message);
//             window.location.href = '/dashboard.html';
//         } else {
//             alert(result.message || "Sign-in failed");
//         }
//     } catch (error) {
//         console.error("Error during sign-in:", error);
//         alert("An error occurred. Please try again.");
//     }
// });


//17 october 2024
// signInForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     console.log('Form submission triggered');

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:5000/api/users/signin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const result = await response.json();

//         if (response.ok) {
//             console.log('Sign-in successful:', result);
//             localStorage.setItem('userId', result.userId); // Assuming result includes userId
//             alert(result.message);
//             window.location.href = '/dashboard.html'; // Redirect to dashboard
//         } else {
//             console.log('Sign-in failed:', result);
//             alert(result.message || "Sign-in failed");
//         }
//     } catch (error) {
//         console.error("Error during sign-in:", error);
//         alert("An error occurred. Please try again.");
//     }
// });
