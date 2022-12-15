+++
path =  '/what-id-like-as-sre-devops'
date = '2022-12-15'
title =  'Things I want as SRE/DevOps from Devs'

cover = 'https://oschvr.s3.us-west-2.amazonaws.com/oldstreet.jpeg'
+++

It has been a while since I've been working as **SRE/Platform/Cloud Engineer**, and lately and I realize I've been repeating some **questions** to developers that I rarely get an answer for straight away.

These are not meant to make anyone's life harder, _au contraire_, the whole pourpose of having a solid answer to this list of questions, is to make everyone less worried about the probabilty of some **high stakes, overnight failure** or a **data handling missuse** that could potentially cause big losses, and of course a lot of unnecessary stress.

> If you're a Software Engineer/Developer, then consider that a **`service`** (at least, for me), is a piece of code running in a _live production system_, that **YOU** wrote, only **YOU** know how it works, thus **YOU** own.

---
**List of questions I'd like to get an answer from devs on any new service deployment request:**

- How can I check the health of the **`service`** ?
    - Did you securely configured endpoints that I can ping periodically?
    - Is it going to use the same port as the **`service`** ? 
- How can I safely and gracefully restart the **`service`** ?
    - Does graceful shutdowns wait for _inflight requests_ to finish?
    - If I restart the **`service`**, will there be any disruption or performance degradation?
- How and why would the **`service`** fail ?
    - Does it has any external dependencies ?
    - And what happens if it does ? 
    - Do you have a playbook, or sequence of steps, to bring the **`service`** back up?
- Do you use appropriate logging levels depending on the environments ? _i.e. (TRACE & DEBUG should not go to production)_
    - Are you logging to `stdout` ? 
    - What format of logs are you using, (JSON, PLAINTEXT)?
- What kind of metrics are you exposing ?
    -  Are you measuring the [RED signals](https://www.infoworld.com/article/3638693/the-red-method-a-new-strategy-for-monitoring-microservices.html#:~:text=RED%20method%20explained,of%20failed%20requests%20per%20second)?
        -   Rate (# of requests per second)
        -   Errors (# of errors per second) and 
        -   Duration (time each request takes)

- Is there any documentation/design specification for the **`service`** ? 
    - Are you using gRPC or REST ? 
    - How can I see the API contract? 
    - Do you have a OpenAPI/Swagger spec
- How does the data flow through the **`service`** ? 
    - Do you have any **PII/Sensitive** data flowing through the service?
    - Is any part of the data captured in the **`service`** logs?

- What is the testing coverage for this **`service`** ?
    - Do you wrote unit, integration tests for it?
    - Is there a end to end test that I can run discard issues?

---

My **conundrum** lies on the following:

- Luckily, much of this overhead can be alleviated with a **`service`** template that I can control and upgrade overtime.

- But... that same template can abstract and hide away these answers from devs, causing them to ignore issues and fail to react when their services fail.

