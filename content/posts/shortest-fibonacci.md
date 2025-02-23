+++
title = "Shortest Fibonacci"
date = "2019-05-15"
description = "An incredibly short Fibonacci function in JavaScript."
slug = "shortest-fibonacci"
draft = false
tags = ["fibonacci", "javascript"]
categories = ["technology"]
cover ='https://oschvr.s3.dualstack.us-west-2.amazonaws.com/9b6256d978ba410482966fba5e14604a.png'
+++

Here's an incredibly short anonymous fibonacci function in Js. It takes a parameter n to calculate the fibonacci number at position n

```javascript
((n) => (n <= 1 ? n : n - 1 + n - 2))(5);
```
