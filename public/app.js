let customers = [];
let transactions = [];
let chart = null;

async function fetchData() {
  customers = await fetch(
    "https://jobfair-task-w6uv.vercel.app/customers"
  ).then((res) => res.json());

  transactions = await fetch(
    "https://jobfair-task-w6uv.vercel.app/transactions"
  ).then((res) => res.json());

  updateTable();
}

function updateTable() {
  const tableBody = document.getElementById("customerTableBody");
  tableBody.innerHTML = "";

  const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
  const amountFilter =
    parseFloat(document.getElementById("amountFilter").value) || 0;

  customers.forEach((customer) => {
    if (customer.name.toLowerCase().includes(nameFilter)) {
      const customerTransactions = transactions.filter(
        (t) => t.customer_id === customer.id
      );
      const totalAmount = customerTransactions.reduce(
        (sum, t) => sum + t.amount,
        0
      );

      if (totalAmount >= amountFilter) {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${customer.name}</td>
                    <td>${customerTransactions.length}</td>
                    <td>$${totalAmount.toFixed(2)}</td>
                `;
        row.addEventListener("click", () => showChart(customer));
      }
    }
  });
}

function showChart(customer) {
  const chartContainer = document.getElementById("chartContainer");
  chartContainer.style.display = "block";

  const chartTitle = document.getElementById("chartTitle");
  chartTitle.textContent = `Transaction History for ${customer.name}`;

  const customerTransactions = transactions.filter(
    (t) => t.customer_id === customer.id
  );
  const chartData = prepareChartData(customerTransactions);

  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById("transactionChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.map((d) => d.date),
      datasets: [
        {
          label: "Transaction Amount",
          data: chartData.map((d) => d.amount),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function prepareChartData(transactions) {
  const chartData = {};
  transactions.forEach((transaction) => {
    if (chartData[transaction.date]) {
      chartData[transaction.date] += transaction.amount;
    } else {
      chartData[transaction.date] = transaction.amount;
    }
  });
  return Object.entries(chartData).map(([date, amount]) => ({ date, amount }));
}

document.getElementById("nameFilter").addEventListener("input", updateTable);
document.getElementById("amountFilter").addEventListener("input", updateTable);

fetchData();
