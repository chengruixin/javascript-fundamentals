/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
// 默认的比较方法, 默认大顶堆
const defaultCmp = (a, b) => a > b;

// 交换数组中元素
const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

class Heap {
  constructor(cmp = defaultCmp) {
    this.container = [];
    this.cmp = cmp;
    this.cnt = 0;
  }
  // 增加元素
  push(x) {
    const { container, cmp } = this;
    container.push(x);
    
    let index = container.length - 1,
        exchange = Math.floor((index - 1) / 2);
    // 向上调整
    while (index && !cmp(container[exchange], container[index])) {
      // 交换元素
      swap(container, index, exchange);
      // 重新赋值
      index = exchange;
      exchange = Math.floor((index - 1) / 2);
    }
  }
  // 删除堆顶元素
  // 返回被删除的元素
  pop() {
    const { container, cmp } = this;
    if (!container.length) {
      return null;
    }
    swap(container, 0, container.length - 1);
    const res = container.pop();
    const length = container.length;
    if (length > 1) {
      let index = 0,
          exchange = 2 * index + 1;

      while (exchange < length) {
        let right = 2 * index + 2;
        // 以最大堆的情况来说：如果有右节点，并且右节点大于左节点
        if (right < length && cmp(container[right], container[exchange])) {
          exchange = right
        }
        // 以最大堆的情况来说：如果子节点不大于父节点，继续循环
        if (!cmp(container[exchange], container[index])) {
          break;
        }
        swap(container, index, exchange);
        index = exchange;
        exchange = 2 * index + 1;
      }
    }
    return res;
  }
  // 获取堆顶元素
  top() {
    return this.container.length ? this.container[0] : null;
  }
  // 获取堆的大小
  size() {
    return this.container.length;
  }
}
var nthSuperUglyNumber = function(n, primes) {
    let sortPrimes = primes.sort((a, b) => b - a);
    let heap = new Heap((x, y) => x < y), ans = 0;
    heap.push(1);
    while(n--) {
        ans = heap.pop();
        if (ans === 1) {
            for (let i = 0; i < sortPrimes.length; i++) {
                heap.push(sortPrimes[i]);
            }
        } else {
            for (let i = 0; i < sortPrimes.length; i++) {
                if (ans % sortPrimes[i] === 0) {
                    j = i;
                    while (j >= 0) {
                        heap.push(ans * sortPrimes[j])
                        j--;
                    }
                    break;
                }
            }
        }
    }
    return ans;
};

















