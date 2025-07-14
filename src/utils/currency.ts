export const formatPrice = (price: number): string => {
  return `NRS ${price.toLocaleString('en-NP')}`;
};

export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};