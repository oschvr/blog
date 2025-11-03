---
categories:
  - programming
cover:
  image: https://oschvr.s3.dualstack.us-west-2.amazonaws.com/prank.jpg
date: "2023-04-25"
description: A fun bash script prank using text-to-speech
draft: false
slug: bash-prank
tags:
  - bash
  - scripting
  - fun
title: Bash Prank
---

I remember of coming up with a random joke prank, so when I stumbled upon [this](https://www.reddit.com/r/bash/comments/j2135u/comment/g735r3o/?utm_source=share&utm_medium=web2x&context=3) comment in the [`/r/bash`](https://www.reddit.com/r/bash) subreddit, I absolutely had to try it.

I modified it slightly and used a `one-liner jokes` list I found in Github too. It works in macOS monterey 12.2.1

Here's what it does:

1. Sets the volume at maximum
2. Creates a temp dir in `~` (`$HOME`)
3. Downloads a list of jokes from Github
4. Select one randomly and say it out loud using the computer speakers
5. Remove the list of jokes

```bash
#! /bin/bash
# ░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░
# ░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░
# ░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░
# ░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░
# ░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░
# █░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█
# █░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█
# ░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░
# ░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░
# ░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░
# ░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░
# ░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░
# ░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░
# ░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░
# ░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░

# Get current volume
cur_vol=$(osascript -e 'output volume of (get volume settings)')

# To restore vol to current level
restore_vol=$(echo ${cur_vol}/14 | bc)

# Get bool if muted
mute_state=$(osascript -e 'output muted of (get volume settings)')

# If system doesn't have gshuf, not gonna work
if [ ! -f $(which gshuf) ] ; then
  exit ; exit
fi

# Set vol to max
osascript -e "set Volume 10"

# Create temp dir
if [ -d ~/temp ] ; then
  tempe=1
else
  tempe=0
  mkdir ~/temp
fi

# Create list of annoying things to say
curl -s https://raw.githubusercontent.com/jpf/dial-a-joke/master/jokes/www.textfiles.com/humor/JOKES/onelinrs.txt > ~/temp/jokes

# Use gshuf to generate radom permutations
# Use -n1 to get a phrase from list
# Pipe it to say to transform text to speech (macOS)
# Select a random voice that supports en_ (english)
gshuf -n1 ~/temp/jokes | say --voice $(say --voice '?' | grep en_ | gshuf -n1 | awk '{ print $1 }')

# Restore volume
osascript -e "set Volume ${restore_vol}"
if [[ ${mute_state} == "true" ]] ; then
  osascript -e 'set volume output muted true'
fi

# Cleanup
if [[ ${tempe} = 0 ]] ; then
  \rm -Rf ~/temp
else
  \rm -f ~/temp/jokes
fi
```

Put it somewhere hidden like `/usr/local/tmp` and change the mod to executable

```shell
vi /usr/local/tmp/bashprank.sh
chmod +x /usr/local/tmp/bashprank.sh
```

Install it using `crontab`

```shell
crontab -e

# I used this one, to run at 11am everyday :P
# 0 11 * * * bash /usr/local/tmp/bashprank.sh
```
