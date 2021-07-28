+++
path =  '/building-a-trading-system'
date = '2017-07-10'
title =  'Building a Trading System'

cover =''
+++

So, for the next and most ambitious project we've ever had at [VR3](http://vr3.io), I self-assigned to me the tremendous task of building a **Trading System** that includes some sort of **Trading Model** or **Trading Bot**, that can, but is not limited to do HFT(High Frecuency Trading).

All build in Node.js, Express and some other tools that I will explore on another post.

As I face a this big challenge, I've come to realize that it's crucial to read, investigate, learn the best practices and come up with some general considerations.

## Separate Modules

Let's consider the importance of separating the **trading models** _(the mathematical or algorithmic logic that analyzes data and decides how to trade)_ from the **trading system** _(the general framework which provides interfaces for receiving data and interacting with the market to the trading models)_

Lets assume that our **trading model** takes a chunk (tick) of market data and then procedes to decide whether to place or not an order. This is not a reasonably general model, although it sounds like it, and _the reason is that while the stream of market data is serial, the events the data represent are not_; some of these events are simultaneous. The correct version should allow the model to detect simultaneous events and delay trading decision until they have all been processed.

### Trading Model

The **trading model** establishes the behavioral patterns we want to control or modify. This model should be precisely defined and limited in order to be easily tested. To actually see how does a **trading model** looks like, got to [this repository](https://github.com/oschvr/zenbot) I forked in git hub.

### Trading System

Whereas the **trading system** is everything that remains static, such as _ Connectivity with the markets _ Databases _ Other Servers or Computers _ The Order Management System (OMS) \* Interfaces for the models to access these resources Note: The **trading system** should be developed using a [Representational State Transfer](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming) architecture in the form of an [API](https://stackoverflow.com/questions/7440379/what-exactly-is-the-meaning-of-an-api)

#### Order Management System

One of the most important parts, and where the most obvious implementations can lead to headaches down the road. This system are intended to execute the orders in an efficient and cost-effective manner. Note: The **Order Management Systems** commonly use the [FIX Protocol](https://en.wikipedia.org/wiki/Financial_Information_eXchange) to exchange real-time information of securities transactions and markets A common mistake is designing an OMS to do both _letting the user start his or her intention of placing an order, with actually placing the order_ at the same time.

According to the author of the [blog post](https://web.archive.org/web/20110219163418/http://howtohft.wordpress.com:80/2011/02/15/building-a-trading-system-general-considerations) the _best implementation of an OMS is separating the intentions of the trading model from the resulting actual positions_ This last recommendation, if well executed, can allow the **trading model** to self-amend it's intentions and change the positions before they are fulfilled.

### Conclusions

In order to allow the **trading models** to be driven, one must understand the capabilities and limitations of a given **trading system**.
