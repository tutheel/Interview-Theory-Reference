/*
Problem 21: Return Unique Elements from Sorted Array

Description:
Given a sorted array `nums`, return a new array containing only the unique elements.

Example 1:
Input: nums = [1, 1, 2, 2, 3]
Output: [1, 2, 3]

Example 2:
Input: nums = [0, 0, 0, 1, 1, 2]
Output: [0, 1, 2]
*/

function returnUniqueElements(nums) {
  // Write your solution here
  if (nums.length === 0) {
    return [];
  }

  const unique = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      unique.push(nums[i]);
    }
  }

  return unique;
}

const arr1 = [1, 1, 2, 2, 3];
const arr2 = [0, 0, 0, 1, 1, 2];

console.log(returnUniqueElements(arr1));
console.log(returnUniqueElements(arr2));
