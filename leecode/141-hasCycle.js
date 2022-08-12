/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// https://leetcode.cn/problems/linked-list-cycle/
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var hasCycle = function(head) {
  if (!head || !head.next) return false;
  
 let slow = head, fast = head.next
 while(slow !== fast) {
     if (!fast || !fast.next) return false;

     slow = slow.next;
     fast = fast.next.next;
 }
 return true;
}