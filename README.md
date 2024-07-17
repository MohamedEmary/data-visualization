# Customer Transaction Data Visaulization

This project uses `json-server` to create an API from the JSON file that holds the customer transaction data. It also uses the template repository [`kitloong/json-server-vercel`](https://github.com/kitloong/json-server-vercel) that deploys the API to Vercel.

> [!TIP]
> ***To show the graph of a user just click on the user row on the table***

## API Endpoints

1. For Customers: <https://jobfair-task-w6uv.vercel.app/customers>
2. For Transactions: <https://jobfair-task-w6uv.vercel.app/transactions>

## Data Visualization

The project also uses chart.js library to plot and visaulize the data.

## How To Run Locally

To run the project locally:

1. **Prerequisites**: Ensure that [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads) are installed on your machine.

2. **Clone the Repository**: Open your terminal or command prompt and run the following command:

```bash
git clone https://github.com/MohamedEmary/jobfair-task.git
```

3. **Install Dependencies**: Change to the project directory and install the dependencies:

```bash
cd jobfair-task
npm install
```

4. **Run the JSON Server**:

```bash
json-server --port 3000 db.json
```

1. **Update API Endpoints**: In the `public/app.js` file, update the API endpoints as follows:

```js
fetch("http://localhost:3000/customers")
fetch("http://localhost:3000/transactions")
```

6. **Open the Application**: Finally, open the `public/index.html` file in your browser.
