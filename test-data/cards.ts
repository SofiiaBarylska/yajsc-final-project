export type Card = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  holderName: string;
};

const expirationDate = new Date();
expirationDate.setMonth(expirationDate.getMonth() + 3);
const month = String(expirationDate.getMonth() + 1).padStart(2, "0");
const year = expirationDate.getFullYear();

export const card: Card = {
  cardNumber: "1111-1111-1111-1111",
  expirationDate: `${month}/${year}`,
  cvv: "111",
  holderName: "Jane Doe",
};
