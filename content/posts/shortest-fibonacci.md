---
categories:
  - technology
cover:
  image: https://oschvr.s3.dualstack.us-west-2.amazonaws.com/9b6256d978ba410482966fba5e14604a.png
date: "2019-05-15"
description: An incredibly short Fibonacci function in JavaScript.
draft: false
slug: shortest-fibonacci
tags:
  - fibonacci
  - javascript
title: Shortest Fibonacci
---

Here's an incredibly short anonymous fibonacci function in Js. It takes a parameter n to calculate the fibonacci number at position n

```javascript
((n) => (n <= 1 ? n : n - 1 + n - 2))(5);
```
