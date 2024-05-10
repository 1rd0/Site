const CURRENCY_FORMATTER = new Intl.NumberFormat("ru-RU", {
  currency: "RUB",
  style: "currency",
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
