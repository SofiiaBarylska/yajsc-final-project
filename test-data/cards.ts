export type Card = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  holderName: string;
};

export const card: Card = {
  cardNumber: "1111-1111-1111-1111",
  expirationDate: "12/2026",
  cvv: "111",
  holderName: "Jane Doe",
};
