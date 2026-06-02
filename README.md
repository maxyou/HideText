
# Hide your text by random key

This tool use random numbers to hide your text from search engines finding your internet activity. It has been deployed online: 

- https://hide-text.com/

### Scenario

Imagine this scenario, that you left your contact information "my_special_name" on Reddit.com. While other people use Google search the string "my_special_name" and find it also on the web site of Greendit.com. This is because you leave the same string of your contact "my_special_name" there. So, you activity trace is uncovered.

This tool can hide the string "my_special_name" in many of random links, like these:

- https://hide-text.com/?c=Ki41SzsxGiUmOzVWKjkc&k=GWj8KTyL
- https://hide-text.com/?c=FQsbJBdWGSsZHhs5Bl4f&k=xrDWg3zB
- https://hide-text.com/?c=PjsGQiYwGyYyLgZfNzgd&k=SBY1VUxO

While click on this random string links, all of them shows the same string of "my_special_name". So in the future you can leave  this kind of different random string links on different places, and other people can not find your trace by searching for the string of "my_special_name" on Google.

### How it works

The mechanism of this tool is very simple. In this random string links, after "k=", it is a random of 8 chars, used as a key. After "c=", until "&", there is a long string, as a ciphertext, which is the result of your plain text XOR with the key. When others click on this links, the page of "https://hide-text.com" will use the key to XOR the ciphertext. For a string XOR with a key twice will get the original string, this means the original plain text of you. That's all.

The page of "https://hide-text.com" is only a static page and contain only a XOR function, nothing else. No database, no Cookies or Sessions. It will record nothing, and you can use it safely.

Hope it's useful to you.

### Update 2025-04-04

Using base64 format, the ciphertext is shortened by 1/3.

### Update 2026-06-03

- Registered domain `https://hide-text.com` and pointed it to the deployed site (previously on Vercel). All generated links will use the new domain.
- Added backward compatibility: the site now accepts older hex-format `c` parameters as well as the newer URL-safe Base64 format (so previously shared links continue to work).
- Planned: will add lightweight analytics (GA4) and register the site in Google Search Console to monitor search exposure.

### Screenshot
![](https://raw.githubusercontent.com/maxyou/HideText/main/screen.png)
