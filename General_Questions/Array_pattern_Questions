<a id="top"></a>

# Basic Array Patterns for Interviews (1-Day Prep) + LeetCode Practice Links (EY-style)

> Note: Company-specific question lists change a lot. Use the **EY company page** (may require Premium) and practice these **core array patterns**.

---

## The 10 “must-know” Array Patterns (covers most questions)

### 1) Single Pass Scan (running best)
**Use when:** “find max/min/best/peak” in one go  
**Examples:** max element, max profit, best score, longest streak  
**Key idea:** keep a variable like `best`, `cur`, update while looping.

**Practice (easy → medium)**
- Best Time to Buy and Sell Stock (121): https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ — **[Solution ⬇️](#sol-121)**
- Maximum Subarray (53): https://leetcode.com/problems/maximum-subarray/ — **[Solution ⬇️](#sol-53)**
- Majority Element (169): https://leetcode.com/problems/majority-element/ — **[Solution ⬇️](#sol-169)**
- Max Consecutive Ones (485): https://leetcode.com/problems/max-consecutive-ones/ — **[Solution ⬇️](#sol-485)**
---

### 2) Two Pointers (Opposite Ends)
**Use when:** array is **sorted** + need pair/triplet condition  
**Examples:** pair sum equals target, pair <= limit, check pairs  
**Key idea:** `L` start, `R` end → move based on condition.

**Practice (easy → medium)**
- Two Sum II - Input Array Is Sorted (167): https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/ — **[Solution ⬇️](#sol-167)**
- Container With Most Water (11): https://leetcode.com/problems/container-with-most-water/ — **[Solution ⬇️](#sol-11)**
- Squares of a Sorted Array (977): https://leetcode.com/problems/squares-of-a-sorted-array/ — **[Solution ⬇️](#sol-977)**
- 3Sum (15): https://leetcode.com/problems/3sum/ — **[Solution ⬇️](#sol-15)**
---

### 3) Sliding Window (Fixed Size)
**Use when:** “subarray of size k”  
**Examples:** max sum/avg of k elements  
**Key idea:** add new element, remove old element.

**Practice (easy → medium)**
- Maximum Average Subarray I (643): https://leetcode.com/problems/maximum-average-subarray-i/ — **[Solution ⬇️](#sol-643)**
- Number of Sub-arrays of Size K and Average >= Threshold (1343): https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/ — **[Solution ⬇️](#sol-1343)**
---

### 4) Sliding Window (Variable Size)
**Use when:** “smallest/longest subarray where condition is true”  
**Examples:** smallest subarray sum ≥ X, longest window with condition  
**Key idea:** expand `R`, while condition breaks shrink `L`.

**Practice (easy → medium)**
- Minimum Size Subarray Sum (209): https://leetcode.com/problems/minimum-size-subarray-sum/ — **[Solution ⬇️](#sol-209)**
- Subarray Product Less Than K (713): https://leetcode.com/problems/subarray-product-less-than-k/ — **[Solution ⬇️](#sol-713)**
- Fruit Into Baskets (904): https://leetcode.com/problems/fruit-into-baskets/ — **[Solution ⬇️](#sol-904)**
- Max Consecutive Ones III (1004): https://leetcode.com/problems/max-consecutive-ones-iii/ — **[Solution ⬇️](#sol-1004)**
---

### 5) Hash Map / Hash Set (Seen + Frequency)
**Use when:** duplicates, counts, pair existence  
**Examples:** two sum unsorted, frequency count, first unique logic  
**Key idea:** `Map<number, count>` or `Set<number>`.

**Practice (easy → medium)**
- Two Sum (1): https://leetcode.com/problems/two-sum/ — **[Solution ⬇️](#sol-1)**
- Contains Duplicate (217): https://leetcode.com/problems/contains-duplicate/ — **[Solution ⬇️](#sol-217)**
- Contains Duplicate II (219): https://leetcode.com/problems/contains-duplicate-ii/ — **[Solution ⬇️](#sol-219)**
- Top K Frequent Elements (347): https://leetcode.com/problems/top-k-frequent-elements/ — **[Solution ⬇️](#sol-347)**
---

### 6) Prefix Sum (basic)
**Use when:** range sum queries, running totals, pivot-like logic  
**Key idea:** `prefix[i] = prefix[i-1] + arr[i]`

**Practice (easy)**
- Running Sum of 1d Array (1480): https://leetcode.com/problems/running-sum-of-1d-array/ — **[Solution ⬇️](#sol-1480)**
- Find Pivot Index (724): https://leetcode.com/problems/find-pivot-index/ — **[Solution ⬇️](#sol-724)**
- Range Sum Query - Immutable (303): https://leetcode.com/problems/range-sum-query-immutable/ — **[Solution ⬇️](#sol-303)**
---

### 7) Prefix Sum + Hash Map (Count Subarrays)
**Use when:** “count subarrays with sum = k / divisible by k / balance”  
**Key idea:** if `pref - k` seen before → add its count.

**Practice (medium but important)**
- Subarray Sum Equals K (560): https://leetcode.com/problems/subarray-sum-equals-k/ — **[Solution ⬇️](#sol-560)**
- Subarray Sums Divisible by K (974): https://leetcode.com/problems/subarray-sums-divisible-by-k/ — **[Solution ⬇️](#sol-974)**
- Contiguous Array (525): https://leetcode.com/problems/contiguous-array/ — **[Solution ⬇️](#sol-525)**
- Binary Subarrays With Sum (930): https://leetcode.com/problems/binary-subarrays-with-sum/ — **[Solution ⬇️](#sol-930)**
---

### 8) Sorting + Scan
**Use when:** merge/overlap/closest/minimize after sorting  
**Key idea:** sort then do linear scan.

**Practice (easy → medium)**
- Merge Sorted Array (88): https://leetcode.com/problems/merge-sorted-array/ — **[Solution ⬇️](#sol-88)**

- Merge Intervals (56): https://leetcode.com/problems/merge-intervals/ — **[Solution ⬇️](#sol-56)**
- Insert Interval (57): https://leetcode.com/problems/insert-interval/ — **[Solution ⬇️](#sol-57)**
- Non-overlapping Intervals (435): https://leetcode.com/problems/non-overlapping-intervals/ — **[Solution ⬇️](#sol-435)**
---

### 9) Monotonic Stack
**Use when:** next greater/smaller, span, histogram  
**Key idea:** stack maintains increasing/decreasing order of values/indices.

**Practice (medium, very common)**
- Daily Temperatures (739): https://leetcode.com/problems/daily-temperatures/ — **[Solution ⬇️](#sol-739)**
- Next Greater Element I (496): https://leetcode.com/problems/next-greater-element-i/ — **[Solution ⬇️](#sol-496)**
- Next Greater Element II (503): https://leetcode.com/problems/next-greater-element-ii/ — **[Solution ⬇️](#sol-503)**
- Largest Rectangle in Histogram (84): https://leetcode.com/problems/largest-rectangle-in-histogram/ — **[Solution ⬇️](#sol-84)**
---

### 10) Binary Search (sorted array)
**Use when:** find element / first-last / insert position  
**Key idea:** `lo, hi, mid` → shrink range.

**Practice (easy → medium)**
- Binary Search (704): https://leetcode.com/problems/binary-search/ — **[Solution ⬇️](#sol-704)**
- Search Insert Position (35): https://leetcode.com/problems/search-insert-position/ — **[Solution ⬇️](#sol-35)**
- Find First and Last Position of Element in Sorted Array (34): https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/ — **[Solution ⬇️](#sol-34)**
- Find Minimum in Rotated Sorted Array (153): https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ — **[Solution ⬇️](#sol-153)**
---

## Super-fast “How to choose pattern” (interview cheat)

- **“subarray + size k”** → Sliding Window (fixed)  
- **“subarray + min/max length + condition”** → Sliding Window (variable)  
- **“pair + sorted”** → Two Pointers  
- **“pair + unsorted”** → Hash Map  
- **“count subarrays sum = k”** → Prefix Sum + Hash Map  
- **“next greater/smaller”** → Monotonic Stack  
- **“range sum many queries”** → Prefix Sum  
- **“first/last occurrence in sorted”** → Binary Search  
- **“merge/overlap”** → Sort + Scan  
- **“max/min/best in one pass”** → Single Scan  

---

## Basic Array Problems (Quick Warm-up Set)
Do these first to build speed:

- Running Sum of 1d Array (1480): https://leetcode.com/problems/running-sum-of-1d-array/ — **[Solution ⬇️](#sol-1480)**
- Find Pivot Index (724): https://leetcode.com/problems/find-pivot-index/ — **[Solution ⬇️](#sol-724)**
- Plus One (66): https://leetcode.com/problems/plus-one/ — **[Solution ⬇️](#sol-66)**
- Move Zeroes (283): https://leetcode.com/problems/move-zeroes/ — **[Solution ⬇️](#sol-283)**
- Remove Duplicates from Sorted Array (26): https://leetcode.com/problems/remove-duplicates-from-sorted-array/ — **[Solution ⬇️](#sol-26)**
- Rotate Array (189): https://leetcode.com/problems/rotate-array/ — **[Solution ⬇️](#sol-189)**
- Contains Duplicate (217): https://leetcode.com/problems/contains-duplicate/ — **[Solution ⬇️](#sol-217)**
- Product of Array Except Self (238): https://leetcode.com/problems/product-of-array-except-self/ — **[Solution ⬇️](#sol-238)**
- Merge Sorted Array (88): https://leetcode.com/problems/merge-sorted-array/ — **[Solution ⬇️](#sol-88)**

---

# Solutions (JavaScript)

<a id="sol-121"></a>
## Best Time to Buy and Sell Stock (121)

### Brute Force
Try every buy day with every later sell day and keep the best profit.
This is simple but compares many pairs.

```javascript
function maxProfit(prices) {
  let best = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      best = Math.max(best, prices[j] - prices[i]);
    }
  }
  return best;
}
```

### Optimized
Track the lowest price seen so far in one pass.
At each day, compute profit if you sell today.

```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-53"></a>
## Maximum Subarray (53)

### Brute Force
Start at every index and sum all possible subarrays from there.
Keep the largest sum found.

```javascript
function maxSubArray(nums) {
  let best = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      best = Math.max(best, sum);
    }
  }

  return best;
}
```

### Optimized
If the running sum becomes negative, start a new subarray at the current number.
Keep the best running sum.

```javascript
function maxSubArray(nums) {
  let best = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-169"></a>
## Majority Element (169)

### Brute Force
Count how many times each value appears using nested loops.
Return the value that appears more than half the time.

```javascript
function majorityElement(nums) {
  const needed = Math.floor(nums.length / 2);

  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === nums[i]) {
        count++;
      }
    }
    if (count > needed) {
      return nums[i];
    }
  }

  return -1;
}
```

### Optimized
Use a vote counter where same values add and different values subtract.
The final candidate is the majority value.

```javascript
function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-485"></a>
## Max Consecutive Ones (485)

### Brute Force
From each index, count how long a streak of ones continues.
Track the maximum streak length.

```javascript
function findMaxConsecutiveOnes(nums) {
  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = i; j < nums.length && nums[j] === 1; j++) {
      count++;
    }
    best = Math.max(best, count);
  }

  return best;
}
```

### Optimized
Scan once and keep a running count of current ones.
Reset the count when you see zero.

```javascript
function findMaxConsecutiveOnes(nums) {
  let best = 0;
  let count = 0;

  for (const num of nums) {
    if (num === 1) {
      count++;
      best = Math.max(best, count);
    } else {
      count = 0;
    }
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-167"></a>
## Two Sum II - Input Array Is Sorted (167)

### Brute Force
Try every pair of indices and check whether their sum matches the target.
Return the 1-based indices.

```javascript
function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1];
      }
    }
  }

  return [];
}
```

### Optimized
Use two pointers on the sorted array.
Move left up if sum is small, right down if sum is large.

```javascript
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    }
    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-11"></a>
## Container With Most Water (11)

### Brute Force
Check all pairs of lines, compute each area, and keep the largest one.

```javascript
function maxArea(height) {
  let best = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = j - i;
      const h = Math.min(height[i], height[j]);
      best = Math.max(best, width * h);
    }
  }

  return best;
}
```

### Optimized
Start with both ends and compute area.
Move the shorter line inward to try a taller boundary.

```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, width * h);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-977"></a>
## Squares of a Sorted Array (977)

### Brute Force
Square every number first, then sort the squared values.

```javascript
function sortedSquares(nums) {
  return nums.map((num) => num * num).sort((a, b) => a - b);
}
```

### Optimized
The largest square comes from the largest absolute value at either end.
Use two pointers and fill the result from the back.

```javascript
function sortedSquares(nums) {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;
  let write = nums.length - 1;

  while (left <= right) {
    const leftSq = nums[left] * nums[left];
    const rightSq = nums[right] * nums[right];

    if (leftSq > rightSq) {
      result[write] = leftSq;
      left++;
    } else {
      result[write] = rightSq;
      right--;
    }

    write--;
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-15"></a>
## 3Sum (15)

### Brute Force
Try all triplets and keep only unique ones whose sum is zero.
A set helps remove duplicate triplets.

```javascript
function threeSum(nums) {
  const result = [];
  const seen = new Set();

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = triplet.join(",");
          if (!seen.has(key)) {
            seen.add(key);
            result.push(triplet);
          }
        }
      }
    }
  }

  return result;
}
```

### Optimized
Sort first, fix one number, then use two pointers for the remaining range.
Skip duplicate values to avoid duplicate answers.

```javascript
function threeSum(nums) {
  const result = [];
  const arr = nums.slice().sort((a, b) => a - b);

  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === 0) {
        result.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;

        while (left < right && arr[left] === arr[left - 1]) {
          left++;
        }
        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-643"></a>
## Maximum Average Subarray I (643)

### Brute Force
Compute every subarray sum of size `k` from scratch.
Track the largest sum and divide by `k`.

```javascript
function findMaxAverage(nums, k) {
  let best = -Infinity;

  for (let i = 0; i <= nums.length - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += nums[j];
    }
    best = Math.max(best, sum);
  }

  return best / k;
}
```

### Optimized
Use a fixed-size sliding window.
Add the new value and remove the old value as the window moves.

```javascript
function findMaxAverage(nums, k) {
  let sum = 0;

  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let best = sum;

  for (let right = k; right < nums.length; right++) {
    sum += nums[right] - nums[right - k];
    best = Math.max(best, sum);
  }

  return best / k;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-1343"></a>
## Number of Sub-arrays of Size K and Average >= Threshold (1343)

### Brute Force
For each start index, sum the next `k` elements and check the average.

```javascript
function numOfSubarrays(arr, k, threshold) {
  let count = 0;

  for (let i = 0; i <= arr.length - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }
    if (sum / k >= threshold) {
      count++;
    }
  }

  return count;
}
```

### Optimized
Use a sliding window sum and compare with `threshold * k`.
This avoids recalculating full window sums.

```javascript
function numOfSubarrays(arr, k, threshold) {
  const needed = threshold * k;
  let sum = 0;

  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }

  let count = sum >= needed ? 1 : 0;

  for (let right = k; right < arr.length; right++) {
    sum += arr[right] - arr[right - k];
    if (sum >= needed) {
      count++;
    }
  }

  return count;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-209"></a>
## Minimum Size Subarray Sum (209)

### Brute Force
From each start index, keep adding numbers until the sum reaches target.
Track the shortest valid length.

```javascript
function minSubArrayLen(target, nums) {
  let best = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        best = Math.min(best, j - i + 1);
        break;
      }
    }
  }

  return best === Infinity ? 0 : best;
}
```

### Optimized
Use a sliding window.
Expand right to reach target, then shrink left to make the window as short as possible.

```javascript
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let best = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return best === Infinity ? 0 : best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-713"></a>
## Subarray Product Less Than K (713)

### Brute Force
Multiply every possible subarray and count those with product less than `k`.
Stop early for a start index once product becomes too large.

```javascript
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) {
    return 0;
  }

  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = i; j < nums.length; j++) {
      product *= nums[j];
      if (product < k) {
        count++;
      } else {
        break;
      }
    }
  }

  return count;
}
```

### Optimized
Keep a sliding window whose product is always less than `k`.
For each right index, all starts inside the window are valid.

```javascript
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) {
    return 0;
  }

  let product = 1;
  let left = 0;
  let count = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k) {
      product /= nums[left];
      left++;
    }

    count += right - left + 1;
  }

  return count;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-904"></a>
## Fruit Into Baskets (904)

### Brute Force
Try every starting point and extend until more than two fruit types appear.
Keep the longest valid segment.

```javascript
function totalFruit(fruits) {
  let best = 0;

  for (let i = 0; i < fruits.length; i++) {
    const counts = new Map();

    for (let j = i; j < fruits.length; j++) {
      counts.set(fruits[j], (counts.get(fruits[j]) || 0) + 1);

      if (counts.size > 2) {
        break;
      }

      best = Math.max(best, j - i + 1);
    }
  }

  return best;
}
```

### Optimized
Use a sliding window with a map of fruit counts.
Shrink from the left whenever the window has more than two types.

```javascript
function totalFruit(fruits) {
  const counts = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < fruits.length; right++) {
    counts.set(fruits[right], (counts.get(fruits[right]) || 0) + 1);

    while (counts.size > 2) {
      const leftFruit = fruits[left];
      counts.set(leftFruit, counts.get(leftFruit) - 1);
      if (counts.get(leftFruit) === 0) {
        counts.delete(leftFruit);
      }
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-1004"></a>
## Max Consecutive Ones III (1004)

### Brute Force
From each start, allow at most `k` zeros while extending the window.
Track the longest valid length.

```javascript
function longestOnes(nums, k) {
  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;

    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) {
        zeros++;
      }

      if (zeros > k) {
        break;
      }

      best = Math.max(best, j - i + 1);
    }
  }

  return best;
}
```

### Optimized
Expand right and count zeros.
If zeros exceed `k`, move left until the window becomes valid again.

```javascript
function longestOnes(nums, k) {
  let left = 0;
  let zeros = 0;
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros++;
    }

    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-1"></a>
## Two Sum (1)

### Brute Force
Check every pair of indices and return the pair that adds to target.

```javascript
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}
```

### Optimized
Store seen numbers in a map.
For each value, check whether its needed pair value already exists.

```javascript
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-217"></a>
## Contains Duplicate (217)

### Brute Force
Compare each value with all later values.
If any pair is equal, a duplicate exists.

```javascript
function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }

  return false;
}
```

### Optimized
Use a set to track seen values.
If a value is already in the set, return `true`.

```javascript
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-219"></a>
## Contains Duplicate II (219)

### Brute Force
For each index, only check nearby indices up to distance `k`.
Return `true` when matching values are found.

```javascript
function containsNearbyDuplicate(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length && j <= i + k; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }

  return false;
}
```

### Optimized
Store the latest index of each number.
If a number appears again within `k` distance, return `true`.

```javascript
function containsNearbyDuplicate(nums, k) {
  const lastSeen = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (lastSeen.has(nums[i]) && i - lastSeen.get(nums[i]) <= k) {
      return true;
    }
    lastSeen.set(nums[i], i);
  }

  return false;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-347"></a>
## Top K Frequent Elements (347)

### Brute Force
Count frequencies, sort by count descending, then take the first `k` values.

```javascript
function topKFrequent(nums, k) {
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((entry) => entry[0]);
}
```

### Optimized
Place numbers into buckets by frequency.
Read buckets from high to low until `k` numbers are collected.

```javascript
function topKFrequent(nums, k) {
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq.entries()) {
    buckets[count].push(num);
  }

  const result = [];
  for (let count = buckets.length - 1; count >= 0 && result.length < k; count--) {
    for (const num of buckets[count]) {
      result.push(num);
      if (result.length === k) {
        break;
      }
    }
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-1480"></a>
## Running Sum of 1d Array (1480)

### Brute Force
For each position, sum all elements from the start up to that position.

```javascript
function runningSum(nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      sum += nums[j];
    }
    result.push(sum);
  }

  return result;
}
```

### Optimized
Keep one running total while scanning from left to right.

```javascript
function runningSum(nums) {
  const result = [];
  let sum = 0;

  for (const num of nums) {
    sum += num;
    result.push(sum);
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-724"></a>
## Find Pivot Index (724)

### Brute Force
For each index, calculate left sum and right sum using separate loops.

```javascript
function pivotIndex(nums) {
  for (let i = 0; i < nums.length; i++) {
    let leftSum = 0;
    let rightSum = 0;

    for (let l = 0; l < i; l++) {
      leftSum += nums[l];
    }
    for (let r = i + 1; r < nums.length; r++) {
      rightSum += nums[r];
    }

    if (leftSum === rightSum) {
      return i;
    }
  }

  return -1;
}
```

### Optimized
Compute total sum once.
During the scan, derive right sum from total and current left sum.

```javascript
function pivotIndex(nums) {
  const total = nums.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = total - leftSum - nums[i];
    if (leftSum === rightSum) {
      return i;
    }
    leftSum += nums[i];
  }

  return -1;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-303"></a>
## Range Sum Query - Immutable (303)

### Brute Force
Store the array directly.
For each query, loop from `left` to `right` and add numbers.

```javascript
class NumArray {
  constructor(nums) {
    this.nums = nums;
  }

  sumRange(left, right) {
    let sum = 0;
    for (let i = left; i <= right; i++) {
      sum += this.nums[i];
    }
    return sum;
  }
}
```

### Optimized
Build prefix sums once in the constructor.
Each range sum is then one subtraction.

```javascript
class NumArray {
  constructor(nums) {
    this.prefix = [0];
    for (const num of nums) {
      this.prefix.push(this.prefix[this.prefix.length - 1] + num);
    }
  }

  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-560"></a>
## Subarray Sum Equals K (560)

### Brute Force
Try every start index and keep adding numbers to build each subarray sum.
Count sums equal to `k`.

```javascript
function subarraySum(nums, k) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }

  return count;
}
```

### Optimized
Use prefix sums with a map of seen prefix counts.
If `prefix - k` exists, those previous prefixes form valid subarrays.

```javascript
function subarraySum(nums, k) {
  const countByPrefix = new Map();
  countByPrefix.set(0, 1);

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;
    count += countByPrefix.get(prefix - k) || 0;
    countByPrefix.set(prefix, (countByPrefix.get(prefix) || 0) + 1);
  }

  return count;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-974"></a>
## Subarray Sums Divisible by K (974)

### Brute Force
Compute every subarray sum and check if it is divisible by `k`.

```javascript
function subarraysDivByK(nums, k) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum % k === 0) {
        count++;
      }
    }
  }

  return count;
}
```

### Optimized
Track counts of prefix-sum remainders.
Equal remainders mean the subarray between them has sum divisible by `k`.

```javascript
function subarraysDivByK(nums, k) {
  const countByRemainder = new Map();
  countByRemainder.set(0, 1);

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;
    let rem = prefix % k;
    if (rem < 0) {
      rem += k;
    }

    count += countByRemainder.get(rem) || 0;
    countByRemainder.set(rem, (countByRemainder.get(rem) || 0) + 1);
  }

  return count;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-525"></a>
## Contiguous Array (525)

### Brute Force
Check every subarray and count zeros and ones inside it.
Update the longest length when counts are equal.

```javascript
function findMaxLength(nums) {
  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;
    let ones = 0;

    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) {
        zeros++;
      } else {
        ones++;
      }

      if (zeros === ones) {
        best = Math.max(best, j - i + 1);
      }
    }
  }

  return best;
}
```

### Optimized
Use a balance value where `0` is `-1` and `1` is `+1`.
If the same balance appears again, the range between them is balanced.

```javascript
function findMaxLength(nums) {
  const firstIndex = new Map();
  firstIndex.set(0, -1);

  let balance = 0;
  let best = 0;

  for (let i = 0; i < nums.length; i++) {
    balance += nums[i] === 1 ? 1 : -1;

    if (firstIndex.has(balance)) {
      best = Math.max(best, i - firstIndex.get(balance));
    } else {
      firstIndex.set(balance, i);
    }
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-930"></a>
## Binary Subarrays With Sum (930)

### Brute Force
Build every subarray sum and count how many equal `goal`.

```javascript
function numSubarraysWithSum(nums, goal) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === goal) {
        count++;
      }
    }
  }

  return count;
}
```

### Optimized
Use prefix-sum frequencies.
If `prefix - goal` was seen before, those prefixes form valid subarrays ending here.

```javascript
function numSubarraysWithSum(nums, goal) {
  const countByPrefix = new Map();
  countByPrefix.set(0, 1);

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;
    count += countByPrefix.get(prefix - goal) || 0;
    countByPrefix.set(prefix, (countByPrefix.get(prefix) || 0) + 1);
  }

  return count;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-88"></a>
## Merge Sorted Array (88)

### Brute Force
Copy `nums2` into `nums1`, then sort everything.

```javascript
function merge(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  nums1.sort((a, b) => a - b);
}
```

### Optimized
Fill from the end with three pointers.
Compare the largest remaining values first.

```javascript
function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let write = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[write] = nums1[i];
      i--;
    } else {
      nums1[write] = nums2[j];
      j--;
    }
    write--;
  }
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-56"></a>
## Merge Intervals (56)

### Brute Force
Keep scanning and merging one overlapping pair at a time.
Repeat until no overlaps are left.

```javascript
function merge(intervals) {
  const arr = intervals.map((interval) => [interval[0], interval[1]]);
  let changed = true;

  while (changed) {
    changed = false;
    arr.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][1] >= arr[i + 1][0]) {
        arr[i][1] = Math.max(arr[i][1], arr[i + 1][1]);
        arr.splice(i + 1, 1);
        changed = true;
        break;
      }
    }
  }

  return arr;
}
```

### Optimized
Sort once by start time, then merge in a single pass.
Compare each interval with the last merged interval.

```javascript
function merge(intervals) {
  if (intervals.length === 0) {
    return [];
  }

  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
  const result = [sorted[0].slice()];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current.slice());
    }
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-57"></a>
## Insert Interval (57)

### Brute Force
Add the new interval, sort all intervals, then merge.

```javascript
function insert(intervals, newInterval) {
  const all = intervals.map((interval) => interval.slice());
  all.push(newInterval.slice());
  all.sort((a, b) => a[0] - b[0]);

  const result = [];

  for (const current of all) {
    if (result.length === 0 || result[result.length - 1][1] < current[0]) {
      result.push(current.slice());
    } else {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], current[1]);
    }
  }

  return result;
}
```

### Optimized
Use one pass: push non-overlapping left intervals, merge overlaps, then push the right part.

```javascript
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  let [start, end] = newInterval;
  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  result.push([start, end]);

  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-435"></a>
## Non-overlapping Intervals (435)

### Brute Force
Use dynamic programming to keep the maximum count of non-overlapping intervals.
The answer is total intervals minus that count.

```javascript
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
  const n = sorted.length;
  const dp = new Array(n).fill(1);
  let maxKeep = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (sorted[j][1] <= sorted[i][0]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxKeep = Math.max(maxKeep, dp[i]);
  }

  return n - maxKeep;
}
```

### Optimized
Greedy works if you sort by end time.
Keep intervals that end earliest and remove overlaps.

```javascript
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  const sorted = intervals.slice().sort((a, b) => a[1] - b[1]);
  let removals = 0;
  let end = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] < end) {
      removals++;
    } else {
      end = sorted[i][1];
    }
  }

  return removals;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-739"></a>
## Daily Temperatures (739)

### Brute Force
For each day, scan forward until a warmer day appears.

```javascript
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break;
      }
    }
  }

  return result;
}
```

### Optimized
Use a decreasing stack of indices.
When a warmer day appears, resolve previous colder days.

```javascript
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      result[prev] = i - prev;
    }
    stack.push(i);
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-496"></a>
## Next Greater Element I (496)

### Brute Force
For each value in `nums1`, find its index in `nums2` and scan right.
Return the first greater value, or `-1`.

```javascript
function nextGreaterElement(nums1, nums2) {
  const result = [];

  for (const num of nums1) {
    let index = 0;
    while (nums2[index] !== num) {
      index++;
    }

    let next = -1;
    for (let j = index + 1; j < nums2.length; j++) {
      if (nums2[j] > num) {
        next = nums2[j];
        break;
      }
    }

    result.push(next);
  }

  return result;
}
```

### Optimized
Build next-greater values for `nums2` using a monotonic stack.
Then answer each value from `nums1` using a map lookup.

```javascript
function nextGreaterElement(nums1, nums2) {
  const nextMap = new Map();
  const stack = [];

  for (const num of nums2) {
    while (stack.length > 0 && num > stack[stack.length - 1]) {
      nextMap.set(stack.pop(), num);
    }
    stack.push(num);
  }

  while (stack.length > 0) {
    nextMap.set(stack.pop(), -1);
  }

  return nums1.map((num) => nextMap.get(num));
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-503"></a>
## Next Greater Element II (503)

### Brute Force
For each index, scan up to `n - 1` steps in circular order.
Return the first greater value, or `-1`.

```javascript
function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    for (let step = 1; step < n; step++) {
      const j = (i + step) % n;
      if (nums[j] > nums[i]) {
        result[i] = nums[j];
        break;
      }
    }
  }

  return result;
}
```

### Optimized
Use a decreasing stack of indices and loop `2 * n` times.
This simulates circular traversal in linear time.

```javascript
function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  for (let i = 0; i < 2 * n; i++) {
    const index = i % n;

    while (stack.length > 0 && nums[index] > nums[stack[stack.length - 1]]) {
      const prev = stack.pop();
      result[prev] = nums[index];
    }

    if (i < n) {
      stack.push(index);
    }
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-84"></a>
## Largest Rectangle in Histogram (84)

### Brute Force
For each start index, extend right while tracking the minimum bar height.
Compute area for every range and keep the maximum.

```javascript
function largestRectangleArea(heights) {
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    let minHeight = Infinity;
    for (let j = i; j < heights.length; j++) {
      minHeight = Math.min(minHeight, heights[j]);
      best = Math.max(best, minHeight * (j - i + 1));
    }
  }

  return best;
}
```

### Optimized
Use a monotonic increasing stack of indices.
When height drops, pop bars and compute rectangles where they are the smallest bar.

```javascript
function largestRectangleArea(heights) {
  const arr = [0, ...heights, 0];
  const stack = [];
  let best = 0;

  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[i] < arr[stack[stack.length - 1]]) {
      const h = arr[stack.pop()];
      const w = i - stack[stack.length - 1] - 1;
      best = Math.max(best, h * w);
    }
    stack.push(i);
  }

  return best;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-704"></a>
## Binary Search (704)

### Brute Force
Scan the array from left to right until target is found.

```javascript
function search(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }

  return -1;
}
```

### Optimized
Use binary search on the sorted array.
Cut the search range in half each step.

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-35"></a>
## Search Insert Position (35)

### Brute Force
Move left to right until you find the first value that is not smaller than target.

```javascript
function searchInsert(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }

  return nums.length;
}
```

### Optimized
Use binary search to find the lower bound position of target.

```javascript
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-34"></a>
## Find First and Last Position of Element in Sorted Array (34)

### Brute Force
Scan once and remember the first and last index where target appears.

```javascript
function searchRange(nums, target) {
  let first = -1;
  let last = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) {
        first = i;
      }
      last = i;
    }
  }

  return [first, last];
}
```

### Optimized
Use two binary searches: one for the first valid position and one for the position after the last.

```javascript
function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function searchRange(nums, target) {
  const first = lowerBound(nums, target);

  if (first === nums.length || nums[first] !== target) {
    return [-1, -1];
  }

  const last = lowerBound(nums, target + 1) - 1;
  return [first, last];
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-153"></a>
## Find Minimum in Rotated Sorted Array (153)

### Brute Force
Scan all values and keep the minimum value seen.

```javascript
function findMin(nums) {
  let minimum = nums[0];

  for (const num of nums) {
    minimum = Math.min(minimum, num);
  }

  return minimum;
}
```

### Optimized
Use binary search with the right boundary.
The minimum is in the unsorted half.

```javascript
function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-66"></a>
## Plus One (66)

### Brute Force
Convert the digits to one large number, add one, then split back to digits.

```javascript
function plusOne(digits) {
  const value = BigInt(digits.join("")) + 1n;
  return value.toString().split("").map(Number);
}
```

### Optimized
Add one from the end with carry handling.
Stop early when no carry remains.

```javascript
function plusOne(digits) {
  const result = digits.slice();

  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] < 9) {
      result[i]++;
      return result;
    }
    result[i] = 0;
  }

  result.unshift(1);
  return result;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-283"></a>
## Move Zeroes (283)

### Brute Force
When a zero is found, remove it and push a zero to the end.
Repeat until the scan completes.

```javascript
function moveZeroes(nums) {
  let i = 0;

  while (i < nums.length) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
    } else {
      i++;
    }
  }
}
```

### Optimized
Use a write pointer for non-zero values.
Swap values forward to keep order and move zeros to the right.

```javascript
function moveZeroes(nums) {
  let write = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[write], nums[i]] = [nums[i], nums[write]];
      write++;
    }
  }
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-26"></a>
## Remove Duplicates from Sorted Array (26)

### Brute Force
Create a unique list with a set, write it back to `nums`, and return its length.

```javascript
function removeDuplicates(nums) {
  const unique = [...new Set(nums)];

  for (let i = 0; i < unique.length; i++) {
    nums[i] = unique[i];
  }

  return unique.length;
}
```

### Optimized
Use two pointers on the sorted array.
One pointer reads values and one pointer writes unique values.

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let write = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[write] = nums[i];
      write++;
    }
  }

  return write;
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-189"></a>
## Rotate Array (189)

### Brute Force
Rotate one step at a time by moving the last element to the front.
Repeat this `k` times.

```javascript
function rotate(nums, k) {
  const n = nums.length;
  if (n === 0) {
    return;
  }

  k %= n;

  for (let step = 0; step < k; step++) {
    nums.unshift(nums.pop());
  }
}
```

### Optimized
Reverse the full array, then reverse the first `k` elements and the rest.

```javascript
function rotate(nums, k) {
  const n = nums.length;
  if (n === 0) {
    return;
  }

  k %= n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
```

**[Back to Top ⬆️](#top)**

---

<a id="sol-238"></a>
## Product of Array Except Self (238)

### Brute Force
For each index, multiply all numbers except the one at that index.

```javascript
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        product *= nums[j];
      }
    }
    result[i] = product;
  }

  return result;
}
```

### Optimized
Build prefix products from left and suffix products from right.
Multiply them to get each answer.

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}
```

**[Back to Top ⬆️](#top)**
