// Интернет-магазин одежды

// Good - класс для хранения данных о товаре
class Good {
  constructor(id, name, description, sizes, price, available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sizes = sizes;
    this.price = price;
    this.available = available;
  }

  /** Изменение признака доступности для продажи
   * @param {boolean} bool
   * */
  setAvailable(bool) {
    this.available = bool;
  }
}

// GoodsList - класс для хранения каталога товаров
class GoodsList {
  #goods;

  constructor(goods, filter, sortPrice, sortDir) {
    this.#goods = goods.slice(); // массив экземпляров объектов класса Good (приватное поле)
    this.filter = filter; // регулярное выражение используемое для фильтрации товаров по полю name
    this.sortPrice = sortPrice; // булево значение, признак включения сортировки по полю Price
    this.sortDir = sortDir; // булево значение, признак направления сортировки по полю Price (true - по возрастанию, false - по убыванию)
  }

  /** Возвращает массив доступных для продажи товаров в соответствии
   * с установленным фильтром и сортировкой по полю Price */
  get list() {
    let goods = this.#goods.filter(good => good.available)
      .filter(good => this.filter.test(good.name));
    if (this.sortPrice) {
      goods.sort((a, b) =>
        this.sortDir ? a.price - b.price : b.price - a.price,
      );
    }
    return goods;
  }

  /**
   * Добавление товара в каталог
   * @param {Good} good
   */
  add(good) {
    this.#goods.push(good);
  }

  /**
   * Удаление товара из каталога по его id
   * @param {number} id
   */
  remove(id) {
    this.#goods.forEach((good, index) => {
      if (good.id === id) {
        this.#goods.splice(index, 1);
      }
    });
  }
}

// BasketGood - класс дочерний от Good, для хранения данных о товаре в корзине
class BasketGood extends Good {
  constructor(good, amount) {
    super(
      good.id,
      good.name,
      good.description,
      good.sizes,
      good.price,
      good.available,
    );
    this.amount = amount; // количество товара в корзине
  }
}

// Basket - класс для хранения данных о корзине товаров
class Basket {
  constructor(goods) {
    this.goods = goods; // массив объектов класса BasketGood для хранения данных о товарах в корзине
    this.goodsIndex = {}; // индекс для удобного поиска по id
    this.goods.forEach((good, index) => (this.goodsIndex[good.id] = index));
  }

  /** Вычисление общего количества товаров в корзине */
  get totalAmount() {
    return this.goods
      .map(good => good.amount)
      .reduce((acc, val) => acc + val, 0);
  }

  /** Вычисление общей стоимости товаров в корзине */
  get totalSum() {
    return this.goods
      .map(good => good.amount * good.price)
      .reduce((acc, val) => acc + val, 0);
  }

  /**
   * Добавляет товар в корзину, если товар уже есть увеличивает количество
   * @param {Good} good
   * @param {number} amount
   */
  add(good, amount) {
    if (good.id in this.goodsIndex) {
      const index = this.goodsIndex[good.id];
      this.goods[index].amount += amount;
    } else {
      const basketGood = new BasketGood(good, amount);
      this.goodsIndex[basketGood.id] = this.goods.push(basketGood);
    }
  }

  /**
   * Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
   * @param {Good} good
   * @param {number} amount
   */
  remove(good, amount) {
    const index = this.goodsIndex[good.id];
    this.goods[index].amount -= amount;
    if (this.goods[index].amount === 0) {
      this.goods.splice(index, 1);
      delete this.goodsIndex[good.id]; // delete from Index
    }
  }

  /** Очищает содержимое корзины */
  clear() {
    this.goods = [];
    this.goodsIndex = {};
  }

  /** Удаляет из корзины товары, имеющие признак available === false */
  removeUnavailable() {
    const deletedIds = this.goods
      .filter(good => !good.available)
      .map(good => good.id);
    this.goods = this.goods.filter(good => good.available);
    deletedIds.forEach(id => delete this.goodsIndex[id]); // delete from Index
  }
}

// Goods
let goods = [
  new Good(1, "Брюки", "Обычные брюки для повседневной носки", ["S", "M", "L"], 2000, true),
  new Good(2, "Шорты", "Пляжные шорты", ["S", "M", "L"], 500, true),
  new Good(3, "Штаны", "Клёш", ["M", "L", "XL", "XXL"], 1500, true),
  new Good(4, "Лосины", "Конечно же леопардовые", ["XXS", "XS", "S", "M", "L", "XL", "XXL"], 300, true),
  new Good(5, "Колготки", "40 ден", ["XS", "S", "M"], 500, false),
];

// Проверки
let good, goodsList, result;

// Check Good.setAvailable()
good = goods[0];
good.setAvailable(false);
result = good.available === false ? "done" : "error";
console.log(`Check Good.setAvailable(): ${result}`);

// Check GoodsList.filter
goodsList = new GoodsList(goods, /.+ны/, false, false);
result = goodsList.list.length === 2 ? "done" : "error";
console.log(`Check GoodsList.filter: ${result}`);
console.log(goodsList.list);

// Check GoodsList.sortPrice ASC
console.log(`Check GoodsList.sortPrice ascending:`);
goodsList = new GoodsList(goods, /.+/, true, true);
console.log(goodsList.list);
// Check GoodsList.sortPrice DESC
console.log(`Check GoodsList.sortPrice ascending:`);
goodsList = new GoodsList(goods, /.+/, true, false);
console.log(goodsList.list);

// Check GoodsList.remove()
goodsList = new GoodsList(goods, /.+/, false, false);
goodsList.remove(2);
result = goodsList.list.length === 2 ? "done" : "error";
console.log(`Check GoodsList.remove(id=2): ${result}`);
console.log(goodsList.list);

// Check GoodsList.add()
goodsList.add(goods[1]);
result = goodsList.list.length === 3 ? "done" : "error";
console.log(`Check GoodsList.add(goods[1]): ${result}`);
console.log(goodsList.list);

// Check Basket
let basket = new Basket([
  new BasketGood(goods[0], 1),
  new BasketGood(goods[1], 2),
  new BasketGood(goods[2], 3),
]);
console.log("Basket:");
console.log(basket.goods);

// Check Basket.totalAmount
result = basket.totalAmount === 6 ? "done" : "error";
console.log(`Check Basket.totalAmount: ${result}`);

// Check Basket.totalSum
result = basket.totalSum === 2000 + 2 * 500 + 3 * 1500 ? "done" : "error";
console.log(`Check Basket.totalSum: ${result}`);

// Check Basket.add() existing item
basket.add(goods[2], 10);
result = basket.goods.length === 3 && basket.goods[2].amount === 13 ? "done" : "error";
console.log(`Check Basket.add() existing item: ${result}`);
console.log(basket.goods);

// Check Basket.add() new item
basket.add(goods[3], 4);
result = basket.goods.length === 4 ? "done" : "error";
console.log(`Check Basket.add() new item: ${result}`);
console.log(basket.goods);

// Check Basket.remove()
basket.remove(goods[2], 10);
result = basket.goods.length === 4 && basket.goods[2].amount === 3 ? "done" : "error";
console.log(`Check Basket.remove(): ${result}`);
console.log(basket.goods);

// Check Basket.remove() total amount
basket.remove(goods[2], 3);
result = basket.goods.length === 3 ? "done" : "error";
console.log(`Check Basket.remove() total amount: ${result}`);
console.log(basket.goods);

// Check Basket.removeUnavailable()
basket.removeUnavailable();
result = basket.goods.length === 2 ? "done" : "error";
console.log(`Check Basket.removeUnavailable(): ${result}`);
console.log(basket.goods);

// Check Basket.clear()
basket.clear();
result = basket.goods.length === 0 ? "done" : "error";
console.log(`Check Basket.clear(): ${result}`);
console.log(basket.goods);
