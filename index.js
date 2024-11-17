// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

// // MongoDB connection
// const dbURI = 'mongodb+srv://vaibhavsalve645:FsbxDbYVNw3cB42p@cluster0.m4md1.mongodb.net/paykeeperData?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Initialize app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // For parsing application/json

// // User schema
// const userSchema = new mongoose.Schema({
//   userType: { type: String, required: true },
//   name: { type: String, required: true },
//   shopName: { type: String },
//   mobile: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   balance: { type: Number, default: 0 }, // Account balance
//   transactions: { type: Array, default: [] }, // Transaction history
//   pendingDebt: { type: Number, default: 0 } // Pending debt
// });

// const User = mongoose.model('User', userSchema);

// // Sign-up route
// app.post('/api/users/signup', async (req, res) => {
//   try {
//     const { userType, shopName, name, mobile, email, password } = req.body;
//     if (!userType || !name || !mobile || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newUser = new User({ userType, name, shopName, mobile, email, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during user signup:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Sign-in route
// app.post('/api/users/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({ message: "Sign in successful", userId: user._id }); // Include userId for frontend
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Dashboard routes

// // Route to fetch account balance
// app.get('/api/dashboard/balance/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ balance: user.balance });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching balance' });
//   }
// });

// // Route to fetch transaction history
// app.get('/api/dashboard/transactions/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ transactions: user.transactions });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching transactions' });
//   }
// });

// // Route to fetch pending debt
// app.get('/api/dashboard/pending-debt/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ pendingDebt: user.pendingDebt });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching pending debt' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//17 october 2024
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

// MongoDB connection
const dbURI = 'mongodb+srv://vaibhavsalve645:FsbxDbYVNw3cB42p@cluster0.m4md1.mongodb.net/paykeeperData?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// User schema
const userSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  name: { type: String, required: true },
  shopName: { type: String },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 }, // Account balance
  transactions: { type: Array, default: [] }, // Transaction history
  pendingDebt: { type: Number, default: 0 } // Pending debt
});

const User = mongoose.model('User', userSchema);

// Sign-in route
app.post('/api/users/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: "User not found" });
      }

      // Check if the provided password matches the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ message: "Sign in successful", userId: user._id }); // Include userId for frontend
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});


// Sign-in route
app.post('/api/users/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Sign in successful", userId: user._id }); // Include userId for frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Dashboard routes

// Route to fetch account balance
// Route to fetch dashboard data
app.get('/api/dashboard/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Combine all dashboard data into one response
    const dashboardData = {
      balance: user.balance,
      transactions: user.transactions,
      pendingDebt: user.pendingDebt,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

// Route to fetch transaction history
app.get('/api/dashboard/transactions/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ transactions: user.transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Route to fetch pending debt
app.get('/api/dashboard/pending-debt/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ pendingDebt: user.pendingDebt });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending debt' });
  }
});

// Route to fetch user profile data
app.get('/api/users/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userProfile = {
      name: user.name,
      email: user.email,
      mobile: user.mobile
    };
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
