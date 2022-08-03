const MAX_COUNT = 10;
const MIN_COUNT = 1;

class ShoppingCartList {
  constructor($target, initialState) {
    this.$target = $target;
    this.$component = document.createElement('ul');
    this.$component.classList = 'divide-y divide-gray-200';
    this.state = initialState;
    this.$target.append(this.$component);
    this.$totalCount = document.getElementById('total-count');
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  increaseItem(id) {
    const itemIndex = this.state.findIndex((index) => index.id === id);
    if (this.state[itemIndex].count >= MAX_COUNT) {
      alert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
      return;
    }
    this.state[itemIndex].count += 1;
    this.render();
  }

  decreaseItem(id) {
    const itemIndex = this.state.findIndex((index) => index.id === id);
    if (this.state[itemIndex].count <= MIN_COUNT) {
      alert('장바구니에 담을 수 있는 최소 수량은 1개입니다.');
      return;
    }
    this.state[itemIndex].count -= 1;
    this.render();
  }

  addCartItem(item) {
    const itemIndex = this.state.findIndex((index) => index.id === item.id);
    if (itemIndex === -1) {
      const newState = [...this.state, { ...item, count: 1 }];
      this.setState(newState);
    } else {
      this.increaseItem(item.id);
    }
  }

  removeCartItem(id) {
    const newState = this.state.filter((item) => item.id !== id);
    this.setState(newState);
  }

  saveToLocalStorage() {
    localStorage.setItem('cartList', JSON.stringify(this.state));
  }
  render() {
    this.$totalCount.innerHTML =
      this.state
        .reduce((acc, cur) => acc + cur.price * cur.count, 0)
        .toLocaleString() + '원';
    this.$component.innerHTML = this.state
      .map(
        ({ id, imgSrc, name, price, count }) => `<li class="flex py-6" id=${id}>
        <div
          class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
        >
          <img
            src=${imgSrc}
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="ml-4 flex flex-1 flex-col">
          <div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <h3>${name}</h3>
              <p class="ml-4">${(price * count).toLocaleString()}원</p>
            </div>
          </div>
          <div class="flex flex-1 items-end justify-between">
            <div class="flex text-gray-500">
              <button class="decrease-btn">-</button>
              <div class="mx-2 font-bold">${count}개</div>
              <button class="increase-btn">+</button>
            </div>
            <button
              type="button"
              class="font-medium text-sky-400 hover:text-sky-500"
            >
              <p class="remove-btn">삭제하기</p>
            </button>
          </div>
        </div>
      </li>`
      )
      .join('');
  }
}

export default ShoppingCartList;
