/*
Problem 03: Check if Array is Sorted

Description:
Given an array `nums`, determine whether it is sorted in non-decreasing order.
Return true if sorted, otherwise false.

Example 1:
Input: nums = [1, 2, 2, 4, 5]
Output: true

Example 2:
Input: nums = [1, 3, 2, 4]
Output: false
*/

function isSorted(nums) {
  // Write your solution here
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      return false;
    }
  }
  return true;
}

const arr = [1, 2, 2, 4, 5];
console.log(isSorted(arr));
