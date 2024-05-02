import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage == 0) {
    return Number(product.price);
  }

  const newPrice = Number(product.price) * (1 - product.discountPercentage);
  return newPrice;
};

export const formatCurrency = (value: number): string => {
  return `R$ ${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)}`;
};
