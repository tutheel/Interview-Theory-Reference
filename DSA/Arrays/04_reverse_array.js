/*
Problem 04: Reverse an Array

Description:
Given an array `nums`, return the array after reversing its elements.

Example 1:
Input: nums = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]

Example 2:
Input: nums = [9, 8, 7]
Output: [7, 8, 9]
*/

function reverseArray(nums) {
  // Write your solution here
  let revString = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    revString.push(nums[i]);
  }
  return revString;
}

const arr = [9, 8, 7];
console.log(reverseArray(arr));
