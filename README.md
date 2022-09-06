
# hide your text by random key

This tool use random numbers to hide your text from search engines finding your internet activity.

Imagine this scenario, that you left your contact information "my_special_name" on Reddit.com. While other people use Google search the string "my_special_name" and find it also on the web site of Greendit.com. This is because you leave the same string of your contact "my_special_name" there. So, you activity trace is uncovered.

This tool can hide the string "my_special_name" in many of random links, like these:
- https://hide-text.vercel.app/?c=1f1c6c1440352b5013096c09513d2d&k=re3g0PH9
- https://hide-text.vercel.app/?c=08161e470013065a04031e5a111b00&k=eoA4pve3
- https://hide-text.vercel.app/?c=064b064521270a100a5e0658302f0c&k=k2Y6QBiy

While click on this random string links, all of them shows the same string of "my_special_name". So in the future you can leave  this kind of different random string links on different places, and other people can not find your trace by searching for the string of "my_special_name" on Google.

The mechanism of this tool is very simple. In this random string links, after "k=", it is a random of 8 chars, used as a key. After "c=", until "&", there is a long string, as a ciphertext, which is the result of your plain text XOR with the key. When others click on this links, the page of "https://hide-text.vercel.app" will use the key to XOR the ciphertext. For a string XOR with a key twice will get the original string, this means the original plain text of you. That's all.

The page of "https://hide-text.vercel.app" is only a static page and contain only a XOR function, nothing else. No database, no Cookies or Sessions. It will record nothing, and you can use it safely.

Hope it's useful to you.

### screen:
![](https://raw.githubusercontent.com/maxyou/HideText/main/screen.png)
