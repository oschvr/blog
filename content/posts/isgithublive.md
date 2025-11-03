---
categories:
  - technology
cover:
  image: https://oschvr.s3.dualstack.us-west-2.amazonaws.com/gitonfire.jpg
date: "2023-05-11"
description: Reflections on Github outages and reliability.
draft: false
slug: is-github-alive
tags:
  - github
  - outage
  - SRE
title: Is Github Alive
---

It's been recently noticeable that me and my team have had to halt development or progress due to a Github outage. This has been much more visible since [Microsoft acquired Github](https://news.microsoft.com/announcement/microsoft-acquires-github/)

As an SRE myself, I can't help but wonder what is going on at Github/Microsoft...

Is it because Github moved to Azure and the real cause of unrelaiblity is that Azure can't cope? Is it because Github has a ton more features that are not well built?

At this point I really have to say how much I appreciate the clear communication and the resources Github publishes to be aware of their status.

- [Github Status page](https://www.githubstatus.com/)
- [Github Status API](https://www.githubstatus.com/api)

So here are some stats you can pull from the API of past incidents:

According to the github status incident API, and as of today (May 11th, 2023), Github has had 7 incidents

```shell
curl https://www.githubstatus.com/api/v2/incidents.json -s | jq -r '.incidents[].created_at' | grep "2023-05" | wc -l
7
```

of which, 2 have been major

```shell
curl https://www.githubstatus.com/api/v2/incidents.json -s | jq -r '.incidents[] | select(.impact == "major").created_at' | grep "2023-05" | wc -l
2
```

YTD, github.com has had 13 major incidents 🤯

---

To mock the situation I created this thing [isgithub.live](https://isgithub.live)

It will poll the status api for if any incident and update based on impact, every 10 seconds.

It took me 1 hour to do and the main goal is to have a tab with a color emoji (🟢🟡🟠🔴) so I can open it and visually get a cue.

Also to see how the HN crowd reacts. Welcome !
