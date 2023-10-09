export type Account = {
  type: string | null;
  name: string;
  account_number: number;
  currency: string | null;
  balance: number | null;
  is_group: boolean | null;
  parent_account_name: string | null;
  is_frozen: boolean | null;
};

function getAccounts(): Array<Account> {
  return [
    {
      type: "Dr",
      name: "Services",
      account_number: 50103,
      currency: null,
      balance: null,
      is_group: false,
      parent_account_name: null,
      is_frozen: false,
    },
    {
      type: "Dr",
      name: "Rent, Depreciation, Amortization And Depletion",
      account_number: 50104,
      currency: null,
      balance: null,
      is_group: false,
      parent_account_name: null,
      is_frozen: false,
    },
  ];
}

export default getAccounts;
