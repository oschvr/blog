hugo --minify
aws s3 sync public s3://oschvr.com --acl public-read
aws cloudfront create-invalidation --distribution-id EQPI1I5HGX0Y --paths "/*"