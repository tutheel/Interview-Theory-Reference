/*
Problem 01: Largest Element in an Array

Description:
Given an array of integers `nums`, return the largest element present in the array.

Example 1:
Input: nums = [3, 8, 1, 12, 7]
Output: 12

Example 2:
Input: nums = [-5, -2, -9, -1]
Output: -1
*/

function largestElement(nums) {
  // Write your solution here
  let maxNum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    if (maxNum < nums[i]) {
      maxNum = nums[i];
    }
  }
  return maxNum;
}

const arr = [3, 8, 1, 12, 7];
console.log(largestElement(arr))