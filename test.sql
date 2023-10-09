-- Insert Assets and sub-accounts
INSERT INTO Account (
        type,
        name,
        account_number,
        currency,
        balance,
        is_group,
        parent_account_id,
        updatedAt
    )
VALUES ('Dr', 'Assets', 1, NULL, NULL, 1, NULL,'2023-10-09 15:30:00'),
    (
        'Dr',
        'Cash And Financial Assets',
        101,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Cash and Cash Equivalents',
        10101,
        NULL,
        NULL,
        0,
        2,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Financial Assets (Investments)',
        10102,
        NULL,
        NULL,
        0,
        2,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Restricted Cash and Financial Assets',
        10103,
        NULL,
        NULL,
        0,
        2,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Additional Financial Assets and Investments',
        10104,
        NULL,
        NULL,
        0,
        2,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Receivables And Contracts',
        102,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Accounts, Notes And Loans Receivable',
        10201,
        NULL,
        NULL,
        0,
        7,
        '2023-10-09 15:30:00'
    ),
    ('Dr', 'Contracts', 10202, NULL, NULL, 0, 7, '2023-10-09 15:30:00'),
    (
        'Dr',
        'Nontrade And Other Receivables',
        10203,
        NULL,
        NULL,
        0,
        7,
        '2023-10-09 15:30:00'
    ),
    ('Dr', 'Inventory', 103, NULL, NULL, 1, 1, '2023-10-09 15:30:00'),
    (
        'Dr',
        'Merchandise',
        10301,
        NULL,
        NULL,
        0,
        12,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Raw Material, Parts And Supplies',
        10302,
        NULL,
        NULL,
        0,
        12,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Work In Process',
        10303,
        NULL,
        NULL,
        0,
        12,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Finished Goods',
        10304,
        NULL,
        NULL,
        0,
        12,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Other Inventory',
        10305,
        NULL,
        NULL,
        0,
        12,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Accruals And Additional Assets',
        104,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Prepaid Expense',
        10401,
        NULL,
        NULL,
        0,
        19,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Accrued Income',
        10402,
        NULL,
        NULL,
        0,
        19,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Additional Assets',
        10403,
        NULL,
        NULL,
        0,
        19,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Property, Plant And Equipment',
        105,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Land And Land Improvements',
        10501,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Buildings, Structures And Improvements',
        10502,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Machinery And Equipment',
        10503,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Furniture And Fixtures',
        10504,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Right Of Use Assets (Classified As PP&E)',
        10505,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Other Property, Plant And Equipment',
        10506,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Construction In Progress',
        10507,
        NULL,
        NULL,
        0,
        24,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Property, Plant And Equipment Accumulated Depreciation And Depletion',
        106,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Accumulated Depletion',
        10601,
        NULL,
        NULL,
        0,
        32,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Accumulated Depreciation',
        10602,
        NULL,
        NULL,
        0,
        32,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Intangible Assets (Excluding Goodwill)',
        107,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Intellectual Property',
        10701,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Computer Software',
        10702,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Trade And Distribution Assets',
        10703,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Contracts And Rights',
        10704,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Right Of Use Assets',
        10705,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Other Intangible Assets',
        10706,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Acquisition In Progress',
        10707,
        NULL,
        NULL,
        0,
        38,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Intangible Assets Accumulated Amortization',
        108,
        NULL,
        NULL,
        1,
        1,
        '2023-10-09 15:30:00'
    ),
    ('Dr', 'Goodwill', 109, NULL, NULL, 0, 45, '2023-10-09 15:30:00');
-- Continue inserting Liabilities, Equity, Revenue, and Expenses...
-- Continue inserting Liabilities
INSERT INTO Account (
        type,
        name,
        account_number,
        currency,
        balance,
        is_group,
        parent_account_id,
        updatedAt
    )
VALUES (
        'Cr',
        'Liabilities',
        2,
        NULL,
        NULL,
        1,
        NULL,
        '2023-10-09 15:30:00'
    ),
    ('Cr', 'Payables', 201, NULL, NULL, 1, 57, '2023-10-09 15:30:00'),
    (
        'Cr',
        'Trade Payables',
        20101,
        NULL,
        NULL,
        0,
        58,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Dividends Payable',
        20102,
        NULL,
        NULL,
        0,
        58,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Interest Payable',
        20103,
        NULL,
        NULL,
        0,
        58,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Other Payables',
        20104,
        NULL,
        NULL,
        0,
        58,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Accruals And Other Liabilities',
        202,
        NULL,
        NULL,
        1,
        57,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Accrued Expenses (Including Payroll)',
        20201,
        NULL,
        NULL,
        0,
        65,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Deferred Income (Unearned Revenue)',
        20202,
        NULL,
        NULL,
        0,
        65,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Accrued Taxes (Other Than Payroll)',
        20203,
        NULL,
        NULL,
        0,
        65,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Other (Non-Financial) Liabilities',
        20204,
        NULL,
        NULL,
        0,
        65,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Financial Liabilities',
        203,
        NULL,
        NULL,
        1,
        57,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Notes Payable',
        20301,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Loans Payable',
        20302,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Bonds (Debentures)',
        20303,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Other Debts And Borrowings',
        20304,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Lease Obligations',
        20305,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Derivative Financial Liabilities',
        20306,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Other Financial Liabilities',
        20307,
        NULL,
        NULL,
        0,
        74,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Provisions (Contingencies)',
        204,
        NULL,
        NULL,
        1,
        57,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Customer Related Provisions',
        20401,
        NULL,
        NULL,
        0,
        82,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Ligation And Regulatory Provisions',
        20402,
        NULL,
        NULL,
        0,
        82,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Other Provisions',
        20403,
        NULL,
        NULL,
        0,
        82,
        '2023-10-09 15:30:00'
    );
-- Continue inserting Equity
INSERT INTO Account (
        type,
        name,
        account_number,
        currency,
        balance,
        is_group,
        parent_account_id,
        updatedAt
    )
VALUES ('Cr', 'Equity', 3, NULL, NULL, 1, NULL, '2023-10-09 15:30:00'),
    (
        'Cr',
        'Owners Equity (Attributable To Owners Of Parent)',
        301,
        NULL,
        NULL,
        1,
        90,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Equity At par (Issued Capital)',
        30101,
        NULL,
        NULL,
        0,
        91,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Additional Paid-in Capital',
        30102,
        NULL,
        NULL,
        0,
        91,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Retained Earnings',
        302,
        NULL,
        NULL,
        1,
        90,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Appropriated',
        30201,
        NULL,
        NULL,
        0,
        96,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Unappropriated',
        30202,
        NULL,
        NULL,
        0,
        96,
        '2023-10-09 15:30:00'
    ),
    ('Dr', 'Deficit', 30203, NULL, NULL, 0, 96, '2023-10-09 15:30:00'),
    (
        'Dr',
        'In Suspense',
        303,
        NULL,
        NULL,
        0,
        90,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Accumulated OCI',
        304,
        NULL,
        NULL,
        1,
        90,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Exchange Differences On Translation',
        30401,
        NULL,
        NULL,
        0,
        102,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Cash Flow Hedges',
        30402,
        NULL,
        NULL,
        0,
        102,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Gains And Losses On Remeasuring Available-For-Sale Investments',
        30403,
        NULL,
        NULL,
        0,
        102,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Remeasurements Of Defined Benefit Plans',
        30404,
        NULL,
        NULL,
        0,
        102,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Revaluation Surplus (IFRS only)',
        30405,
        NULL,
        NULL,
        0,
        102,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Other Equity Items',
        305,
        NULL,
        NULL,
        1,
        90,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'ESOP Related Items',
        30501,
        NULL,
        NULL,
        0,
        108,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Subscribed Stock Receivables',
        30502,
        NULL,
        NULL,
        0,
        108,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Treasury Stock (Not Extinguished)',
        30503,
        NULL,
        NULL,
        0,
        108,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Miscellaneous Equity',
        30504,
        NULL,
        NULL,
        0,
        108,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Noncontrolling (Minority) Interest',
        306,
        NULL,
        NULL,
        0,
        90,
        '2023-10-09 15:30:00'
    );
-- Continue inserting Revenue
INSERT INTO Account (
        type,
        name,
        account_number,
        currency,
        balance,
        is_group,
        parent_account_id,
        updatedAt
    )
VALUES ('Cr', 'Revenue', 4, NULL, NULL, 1, NULL, '2023-10-09 15:30:00'),
    (
        'Cr',
        'Recognized Point Of Time',
        401,
        NULL,
        NULL,
        1,
        120,
        '2023-10-09 15:30:00'
    ),
    ('Cr', 'Goods', 40101, NULL, NULL, 0, 121, '2023-10-09 15:30:00'),
    (
        'Cr',
        'Services',
        40102,
        NULL,
        NULL,
        0,
        121,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Recognized Over Time',
        402,
        NULL,
        NULL,
        1,
        120,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Products',
        40201,
        NULL,
        NULL,
        0,
        126,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Services',
        40202,
        NULL,
        NULL,
        0,
        126,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Adjustments',
        403,
        NULL,
        NULL,
        1,
        120,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Variable Consideration',
        40301,
        NULL,
        NULL,
        0,
        129,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Consideration Paid (Payable) To Customers',
        40302,
        NULL,
        NULL,
        0,
        129,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Other Adjustments',
        40303,
        NULL,
        NULL,
        0,
        129,
        '2023-10-09 15:30:00'
    );
-- Continue inserting Expenses
INSERT INTO Account (
        type,
        name,
        account_number,
        currency,
        balance,
        is_group,
        parent_account_id,
        updatedAt
    )
VALUES ('Dr', 'Expenses', 5, NULL, NULL, 1, NULL, '2023-10-09 15:30:00'),
    (
        'Dr',
        'Expenses Classified By Nature',
        501,
        NULL,
        NULL,
        1,
        138,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Merchandise, Material, Parts And Supplies',
        50101,
        NULL,
        NULL,
        0,
        139,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Employee Benefits',
        50102,
        NULL,
        NULL,
        0,
        139,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Services',
        50103,
        NULL,
        NULL,
        0,
        139,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Rent, Depreciation, Amortization And Depletion',
        50104,
        NULL,
        NULL,
        0,
        139,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Increase (Decrease) In Inventories Of Finished Goods And Work In Progress',
        50105,
        NULL,
        NULL,
        0,
        139,
        '2023-10-09 15:30:00'
    ),
    (
        'Cr',
        'Other Work Performed By Entity And Capitalized',
        50106,
        NULL,
        NULL,
        0,
        139,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Expenses Classified By Function',
        502,
        NULL,
        NULL,
        1,
        138,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Cost Of Sales',
        50201,
        NULL,
        NULL,
        0,
        146,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Selling, General And Administrative',
        50202,
        NULL,
        NULL,
        0,
        146,
        '2023-10-09 15:30:00'
    ),
    (
        'Dr',
        'Credit Loss (Reversal) On Receivables',
        50203,
        NULL,
        NULL,
        0,
        146,
        '2023-10-09 15:30:00'
    );
-- Continue inserting any additional sub-accounts...