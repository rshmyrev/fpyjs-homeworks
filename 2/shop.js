// Интернет-магазин одежды

// Каталог товаров
let goods = [
  {
    id: 1,
    name: "Брюки",
    description: "Обычные брюки для повседневной носки",
    sizes: ["S", "M", "L"],
    price: 2000,
    available: true,
  },
  {
    id: 2,
    name: "Шорты",
    description: "Пляжные шорты",
    sizes: ["S", "M", "L"],
    price: 500,
    available: true,
  },
  {
    id: 3,
    name: "Штаны",
    description: "Клёш",
    sizes: ["M", "L", "XL", "XXL"],
    price: 1500,
    available: true,
  },
  {
    id: 4,
    name: "Лосины",
    description: "Конечно же леопардовые",
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    price: 300,
    available: true,
  },
  {
    id: 5,
    name: "Колготки",
    description: "40 ден",
    sizes: ["XS", "S", "M"],
    price: 500,
    available: false,
  },
];

// Индекс для удобного поиска
let goodsIndex = {};
for (const good of goods) {
  goodsIndex[good.id] = good;
}

/**
 * Добавление товара в корзину
 * @param {object[]} cart
 * @param {number} id
 * @param {number} amount
 */
function addPositionToCart(cart, id, amount) {
  const good = goodsIndex[id];
  if (good.available) {
    cart.push({ good, amount });
  }
}

/**
 * Удаление товара из корзины
 * @param {object[]} cart
 * @param {number} id
 */
function removePositionFromCart(cart, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].good.id === id) {
      cart.splice(i, 1);
    }
  }
}

/**
 * Полная очистка корзины
 * @param {object[]} cart
 */
function clearCart(cart) {
  cart.splice(0);
}

/**
 * Вычисление общего количества и стоимости товаров в корзине
 * @param {object[]} cart
 */
function calcCart(cart) {
  let totalAmount = 0;
  let totalSumm = 0;
  for (const position of cart) {
    let positionSum = position.amount * position.good.price;
    totalAmount += position.amount;
    totalSumm += positionSum;
  }
  return { totalAmount, totalSumm };
}

// Начальная корзина
let cart = [
  {
    good: goodsIndex[1],
    amount: 1,
  },
  {
    good: goodsIndex[2],
    amount: 2,
  },
];

console.log(`Init cart size: ${cart.length}`);

// Удаление
let id = 2;
removePositionFromCart(cart, id);
console.log(
  `Cart size after delete good with id=${id}: ${cart.length} (must be 1)`
);
console.log(cart);

// Добавление
id = 3;
addPositionToCart(cart, id, 10);
console.log(
  `Cart size after add good with id=${id}: ${cart.length} (must be 2)`
);
console.log(cart);

// Добавление недоступного товара
id = 5;
addPositionToCart(cart, id, 10);
console.log(
  `Cart size after add unavailable good with id=${id}: ${cart.length} (must be 2)`
);
console.log(cart);

// Очистка
clearCart(cart);
console.log(`Cart size after clear: ${cart.length} (must be 0)`);
console.log(cart);

// Подсчет количества и стоимости товаров в корзине
addPositionToCart(cart, 1, 1);
addPositionToCart(cart, 2, 5);
addPositionToCart(cart, 3, 10);
addPositionToCart(cart, 4, 1);
console.log("Подсчет количества и стоимости товаров в корзине");
console.log("Cart:");
console.log(cart);
const { totalAmount, totalSumm } = calcCart(cart);
console.log(
  `Cart have ${cart.length} positions.
  Total items: ${totalAmount} (must be 17).
  Total sum: ${totalSumm} (must be 19800)`
);
