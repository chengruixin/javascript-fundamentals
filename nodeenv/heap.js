const createHeap = (isMinHeap, initialArray) => {
    
    // console.log(Object.prototype.toString.call(initialArray))
    const heap =
        Object.prototype.toString.call(initialArray) === "[object Array]"
            ? initialArray
            : [];

    const comparator = (cur, compared) => {
        if (isMinHeap) {
            return heap[cur] < heap[compared];
        }
        return heap[cur] > heap[compared];
    };

    const swap = (idx1, idx2) => {
        const temp = heap[idx1];
        heap[idx1] = heap[idx2];
        heap[idx2] = temp;
    };

    const downTrade = (cur) => {
        while (true) {
            let [leftLeave, rightLeave] = getLeaves(cur);

            if (leftLeave >= heap.length) {
                break;
            } else if (rightLeave >= heap.length) {
                if (!comparator(cur, leftLeave)) {
                    //swap
                    swap(cur, leftLeave);

                    cur = leftLeave;
                } else {
                    break;
                }
            } else {
                const target = comparator(leftLeave, rightLeave)
                    ? leftLeave
                    : rightLeave;

                if (!comparator(cur, target)) {
                    swap(cur, target);

                    cur = target;
                } else {
                    break;
                }
            }
        }
    };
    // heapify
    if (heap.length > 0) {
        for (let i = heap.length - 1; i >= 0; i--) {
            const parent = getParent(i);

            if (comparator(i, parent)) {
                swap(i, parent);

                // down to the end
                downTrade(i);
            }
        }
    }

    return {
        add: (item) => {
            heap.push(item);
            let cur = heap.length - 1;
            let parent = getParent(cur);
            while (parent >= 0 && comparator(cur, parent)) {
                // swap
                swap(cur, parent);

                cur = parent;
                parent = getParent(cur);
            }
        },
        pop: () => {
            swap(0, heap.length - 1);
            const ans = heap.pop();
            downTrade(0);

            return ans;
        },
        length: () => {
            return heap.length;
        },
        show: () => {
            console.log(heap);
        },
    };
};

const getParent = (index) => {
    return Math.floor((index - 1) / 2);
};

const getLeaves = (index) => {
    return [index * 2 + 1, index * 2 + 2];
};

void (function () {
    // const arr = [3,2,3,1,2,4,5,5,6]
    // const heap = createHeap(false);

    // for(let item of arr) {
    //     heap.add(item);
    // }
    const heap = createHeap(
        false,
        [3,2,3,1,2,4,5,5,6]
    );
    
    
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
    heap.show();
    console.log(heap.pop());
})();
