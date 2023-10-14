# Tadwinuh Backend: RESTful API

# Built using Express and Prisma


In a multi-currency accounting scenario, you'll need to create GL entries that reflect the transaction in both the transaction currency (USD in this case) and your company's functional currency (IQD). This ensures that your accounting records accurately represent the value of foreign currency transactions in your own currency, taking into account any gains or losses due to exchange rate fluctuations.

Let's assume a scenario where you are buying USD 100 with an exchange rate of 0.8, meaning it will cost you IQD 80. Here's how you might create GL entries for this transaction:

**Sell Buy Currency Example**:

| id | posting_date | currency | exchange_rate | amount | written_amount      | amount_company_currency | written_amount_company_currency | remarks |
|----|--------------|----------|---------------|--------|---------------------|-------------------------|--------------------------------|---------|
| 1  | 2023-10-10   | USD      | 0.8           | 100.00 | One Hundred Dollars | 80.00                    | Eighty                         | Buy USD |

**GL Entries Example**:

| id | transaction_date | account   | debit_amount | credit_amount | account_currency |
|----|------------------|-----------|--------------|---------------|------------------|
| 1  | 2023-10-10       | CASH 181  | 100.00       | 0.00          | USD              |
| 2  | 2023-10-10       | CASH 181  | 0.00         | 80.00         | IQD              |

Explanation:

- **Entry 1**: Debit the CASH 181 account in USD because you are increasing your USD assets by 100.
- **Entry 2**: Credit the CASH 181 account in IQD because you are decreasing your IQD assets by 80.

This is a basic example and might need to be adjusted based on your specific accounting policies and any applicable accounting standards. For instance, if there are transaction fees, those would typically be recorded in a separate expense account. Similarly, if the exchange rate changes between the date of the transaction and the date of payment, you might need to record a foreign exchange gain or loss.

Always ensure to consult with an accountant or a financial advisor to ensure that your accounting entries comply with applicable standards and accurately reflect your financial transactions.