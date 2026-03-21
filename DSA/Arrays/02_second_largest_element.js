/*
Problem 02: Second Largest Element in an Array

Description:
Given an array of integers `nums`, return the second largest distinct element in the array.
If it does not exist, return -1.

Example 1:
Input: nums = [10, 5, 8, 20, 20]
Output: 10

Example 2:
Input: nums = [7]
Output: -1
*/

function secondLargestElement(nums) {
  // Write your solution here
  let maxNum = Number.MIN_SAFE_INTEGER;
  let secondMaxNum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    if (maxNum < nums[i]) {
      secondMaxNum = maxNum;
      maxNum = nums[i];
    } else if (maxNum > nums[i] && secondMaxNum < nums[i]) {
      secondMaxNum = nums[i];
    }
  }
  return secondMaxNum === Number.MIN_SAFE_INTEGER ? -1 : secondMaxNum;
}

const arr = [7];
console.log(secondLargestElement(arr));
