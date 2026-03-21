/*
Problem 05: Remove Duplicates from Sorted Array

Description:
Given a sorted array `nums`, remove the duplicates in-place such that each unique
element appears only once. Return the number of unique elements.

Example 1:
Input: nums = [1, 1, 2, 2, 3]
Output: 3
Explanation: Unique elements are [1, 2, 3]

Example 2:
Input: nums = [0, 0, 0, 1, 1, 2]
Output: 3
Explanation: Unique elements are [0, 1, 2]
*/

function removeDuplicates(nums) {
  // Write your solution here
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

const arr = [1, 1, 2, 2, 3, 3, 3 ,4,5];
console.log(removeDuplicates(arr));
