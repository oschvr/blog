+++
path =  '/ipv6'
date = '2023-01-19'
title =  'IPv6 support'

cover = 'https://oschvr.s3.dualstack.us-west-2.amazonaws.com/ipv6-dig.png'
+++


Quick update after what I believe was my [most popular post ever](https://oschvr.com/posts/what-id-like-as-sre/).

I received an suggestion over an email message to enable **IPv6** in this blog. Given that I'm hosting the whole thing in AWS (Cloudfront, S3, Rote53), it really was trivial to do.

1. Enable IPv6 in my Cloudfront distribution
2. Set up AAAA record to the Cloudfront distribution
3. Update all my images to use dualstack endpoints.

So here it is. If you do:

```bash
host oschvr.com | grep IPv6
```

You will get the IPv6 addresses behind DNS -> Cloudfront Distribution

```
oschvr.com has IPv6 address 2600:9000:239f:ec00:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:ca00:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:2a00:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:a000:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:7600:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:2000:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:6200:f:c0d0:cfc0:93a1
oschvr.com has IPv6 address 2600:9000:239f:800:f:c0d0:cfc0:93a1
```

_Easy peazy_. 

Thanks to Raul Tambre <[raul@tambre.ee](raul@tambre.ee)> for the suggestion.

---
**References**

Cloudfront, Route53 & IPv6 https://aws.amazon.com/blogs/aws/ipv6-support-update-cloudfront-waf-and-s3-transfer-acceleration/

S3 & IPv6 https://docs.aws.amazon.com/AmazonS3/latest/userguide/dual-stack-endpoints.html