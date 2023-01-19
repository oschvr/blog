+++
path =  '/merge-sort-go-javascript'
date = '2019-05-26'
title =  'Merge Sort in Go and Javascript'

cover ='https://oschvr.s3.dualstack.us-west-2.amazonaws.com/aab2b0d5852e49a188717d019a5da5e8.png'
+++

Here's my implementation of the _Mergesort_ algorithm in **Golang**

```go
package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

func main() {
	start := time.Now()
        arr := randArr(20)
	// Merge sort array
	fmt.Println("\n Sorted \n", mergeSort(arr))
	fmt.Println("Sorted in: ", time.Since(start))
}

// Function to generate random array
func randArr(size int) []int {
	arr := make([]int, size, size)
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < size; i++ {
		arr[i] = rand.Intn(99)
	}
	return arr
}

// Merge sort accepts an array and recursively sorts it
func mergeSort(arr []int) []int {
	if len(arr) < 2 {
		return arr
	}
	middle := (len(arr)) / 2
	return merge(mergeSort(arr[:middle]), mergeSort(arr[middle:]))
}

// Merges two arrays into one
func merge(left, right []int) []int {
	var sortedArr []int
	// Check for inversions while array
	for len(left) > 0 && len(right) > 0 {
		if left[0] <= right[0] {
			sortedArr = append(sortedArr, left[0])
			left = left[1:] // Just like shift(), remove first and return slice
		} else {
			sortedArr = append(sortedArr, right[0])
			right = right[1:] // Just like shift(), remove first and return slice
		}
	}

	// Append to sortedArr if no inversions and
	for len(left) > 0 {
		sortedArr = append(sortedArr, left[0])
		left = left[1:] // Just like shift(), remove first and return slice
	}
	for len(right) > 0 {
		sortedArr = append(sortedArr, right[0])
		right = right[1:] // Just like shift(), remove first and return slice
	}
	return sortedArr
}
```

and here's in **Javascript**

```javascript
"use strict";
const fs = require("fs");
const filename = process.argv[2];

fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;
  const array = data.split("\n");
  console.log(mergeSort(array));
});

function mergeSort(arr) {
  // Base case
  let arrLength = arr.length;
  if (arrLength <= 1) {
    return arr;
  }
  // Split arrays in halves
  let middle = Math.floor(arrLength / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arrLength);

  // Sort two halves of split array
  let leftSorted = mergeSort(left);
  let rightSorted = mergeSort(right);
  return merge(leftSorted, rightSorted);
}

function merge(left, right) {
  let sortedArr = [];
  // In case of arrays not size of 1
  while (left.length && right.length) {
    if (parseInt(left[0]) <= parseInt(right[0])) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  // If array still has elements, we concatenate
  // them to the sorted array, since already sorted
  if (left.length) {
    sortedArr = sortedArr.concat(left);
  }
  if (right.length) {
    sortedArr = sortedArr.concat(right);
  }
  return sortedArr;
}
```
