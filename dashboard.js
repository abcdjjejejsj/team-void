document.addEventListener('DOMContentLoaded', function() {
  // Load user information from local storage or mock data
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
      document.getElementById('userName').innerText = user.name;
      document.getElementById('userEmail').innerText = user.email;
      document.getElementById('userMobile').innerText = user.mobile;
      if (user.userType === 'shopkeeper') {
          document.getElementById('userShopName').style.display = 'block';
          document.getElementById('shopName').innerText = user.shopName;
      }
  } else {
      alert('No user found. Please log in first.');
      
  }

  // Handle add transaction
  document.getElementById('add-transaction').addEventListener('click', function() {
      const personName = document.getElementById('person-name').value;
      const transactionType = document.getElementById('transaction-type').value;
      const amount = document.getElementById('amount').value;
      const transactionDate = document.getElementById('transaction-date').value;

      if (personName && amount && transactionDate) {
          const transaction = {
              personName,
              transactionType,
              amount,
              transactionDate
          };

          const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
          transactions.push(transaction);
          localStorage.setItem('transactions', JSON.stringify(transactions));

          displayTransactions();
      } else {
          alert('Please fill in all fields');
      }
  });

  // Display transactions
  function displayTransactions() {
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const tableBody = document.querySelector('#transaction-table tbody');
      tableBody.innerHTML = '';

      transactions.forEach(transaction => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${transaction.personName}</td>
              <td>${transaction.transactionType}</td>
              <td>${transaction.amount}</td>
              <td>${transaction.transactionDate}</td>
          `;
          tableBody.appendChild(row);
      });
  }

  // Sign out logic
  document.getElementById('sign-out').addEventListener('click', function() {
      localStorage.removeItem('user');
      window.location.href = 'signin.html';
  });

  // Initial display of transactions
  displayTransactions();
});
