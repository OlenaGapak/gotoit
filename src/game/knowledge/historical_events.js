import TimeIcon from "../../assets/images/time_event.png";

export const historical_events = {
    // year :: month :: day :: hour
    "1991 11 25 1": {
        name: "Dissolution of the Soviet Union",
        tick: 7251,
        description:
            "That evening at 7:32 p.m., the Soviet flag was lowered from the Kremlin for the last time and replaced with the pre-revolutionary Russian flag.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Dissolution of the Soviet Union");
            return data;
        }
    },
    "1991 8 17 1": {
        name: "Linux OS release",
        tick: 4874,
        description:
            "Linux operation system kernel was released. \nI’m doing a (free) operating system (just a hobby, won’t be big and professional like gnu) for 386(486) AT clones.  This has been brewing since april, and is starting to get ready.  I’d like any feedback on things people like/dislike in minix, as my OS resembles it somewhat (same physical layout of the file-system (due to practical reasons) among other things). \t- Linus Torvalds",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Linux OS release");
            return data;
        }
    },
    "1992 6 15 1": {
        name: "Virtual Fixtures release",
        tick: 12121,
        description:
            "It's the first immersive augmented reality system ever built. Virtual Fixtures uses two real physical robots, controlled by a full upper-body exoskeleton worn by the user.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Virtual Fixtures release");
            return data;
        }
    },
    "1992 5 2 1": {
        name: "European currency exchange rate crisis",
        tick: 11089,
        description:
            "European currency exchange rate crisis was started. A currency crisis is a situation in which serious doubt exists as to whether a country's central bank has sufficient foreign exchange reserves to maintain the country's fixed exchange rate.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "European currency exchange rate crisis");
            return data;
        }
    },
    "1992 5 30 1": {
        name: "OpenGL release",
        tick: 11761,
        description:
            "OpenGL was released. OpenGL is an open and reproducable alternative to Iris GL which has the proprietary graphics API on Silicon Graphics workstations.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "OpenGL release");
            return data;
        }
    },
    "1993 2 22 1": {
        name: "The Pentium microprocessor was introduced",
        tick: 18122,
        description:
            "It advances the use of graphics and music on PCs. The Pentium containes two processors on a single chip and about 3.3 million transistors.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Pentium microprocessor was introduced");
            return data;
        }
    },
    "1993 3 22 1": {
        name: "Mosaic web-browser release",
        tick: 18865,
        description: "Mosaic web-browser was released. \nBrowser platform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Mosaic web-browser release");
            data.projects_unlocked_platforms.push("browser");
        }
    },
    "1994 11 20 1": {
        name: "Mexican peso crisis",
        tick: 33434,
        description:
            "A sudden devaluation of the peso against the U.S. dollar. On December 20, 1994, newly inaugurated President Ernesto Zedillo announced the Mexican central bank's devaluation of the peso between 13% and 15%.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Mexican peso crisis");
            return data;
        }
    },
    "1994 6 5 1": {
        name: "Amazon was founded",
        tick: 29401,
        description:
            'Amazon.com is is an American electronic commerce. \nJeff Bezos (founder) selected the name Amazon by looking through the dictionary; he settled on "Amazon" because it was a place that was "exotic and different".\nFrom 1994 onward, build e-commerce websites are widely used.',
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Amazon was founded");
            return data;
        }
    },
    "1995 0 1 1": {
        name: "World Trade Organization was founded",
        tick: 33722,
        description:
            "WTO is an organization that regulates international trade. Its main function is to ensure that trade flows as smoothly, predictably and freely as possible.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "World Trade Organization was founded");
            return data;
        }
    },
    "1995 7 15 1": {
        name: "Microsoft introduces Windows 95",
        tick: 39145,
        description:
            "Windows 95 merged Microsoft's formerly separate MS-DOS and Windows products, and featured significant improvements over its predecessor, most notably in the GUI and in its simplified Plug-and-play features. There were also major changes made to the core components of the operating system, such as moving from a mainly co-operatively multitasked 16-bit architecture to a 32-bit preemptive multitasking architecture. It makes Windows the standard operating system for most PCs.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Microsoft introduces Windows 95");
            return data;
        }
    },
    "1995 4 23 1": {
        name: "JAVA release",
        tick: 37129,
        description:
            "Java programming language was released. Because of Java, we expect digital devices to be smarter, more functional, and way more entertaining.\nCrossplatform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "JAVA release");
            data.projects_unlocked_platforms.push("crossplatform");
        }
    },
    "1995 9 26 1": {
        name: "Fast Ethernet was introduced",
        tick: 40874,
        description:
            "It carries traffic at the nominal rate of 100 Mbit/s. Fast Ethernet provides both twisted-pair and fiber optic media systems, and it became widely adopted, for network backbones and for general computing.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Fast Ethernet was introduced");
            return data;
        }
    },
    "1995 9 10 1": {
        name: "Dotcoms boom",
        tick: 40490,
        description:
            "Dotcoms boom has come. It was was caused by the growth of Internet users and investors poured in money to finance start-up Internet based companies without any caution as to whether these companies can turn a profit or not. \nSome companies have started to trade their shares! (Go to 'Exchange' to check it out)",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Dotcoms boom");
            data.exchange_unlocked_shares.push("share0");
            data.exchange_unlocked_shares.push("share1");
            data.exchange_unlocked_shares.push("share2");
            data.share0_unlock = true;
            data.share1_unlock = true;
            data.share2_unlock = true;
        }
    },
    "1996 10 26 1": {
        name: "DVDs release",
        tick: 50402,
        description: "The first DVD disks and DVD players were sold in Japan.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "DVDs release");
            return data;
        }
    },
    "1997 5 30 1": {
        name: "Asian financial crisis",
        tick: 55585,
        description:
            "The financial crisis has gripped much of East Asia. The crisis started in Thailand with the financial collapse of the Thai baht (the official currency of Thailand).",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Asian financial crisis");
            return data;
        }
    },
    "1997 11 11 1": {
        name: "The Kyoto Protocol international treaty",
        tick: 59522,
        description:
            "The Kyoto Protocol is an international treaty that commits state parties to reduce greenhouse gas emissions.\nThe adoption of the Kyoto Protocol was a major achievement in the endeavour to tackle the problem of global climate change at the dawn of the 21st century.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Kyoto Protocol international treaty");
            return data;
        }
    },
    "1998 7 17 1": {
        name: "Russian financial crisis",
        tick: 65497,
        description:
            "It resulted in the Russian government and the Russian Central Bank devaluing the ruble and defaulting on its debt. The crisis had severe impacts on the economies of many neighboring countries.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Russian financial crisis");
            return data;
        }
    },
    "1998 4 20 1": {
        name: "Bluetooth specification",
        tick: 63361,
        description: "Bluetooth specification was developed. It's a wireless technology standard for exchanging data over short distances.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Bluetooth specification");
            return data;
        }
    },
    "1998 8 1 1": {
        name: "WiFi introduction",
        tick: 65857,
        description:
            "WiFi technology was introduced. WiFi is a technology that uses radio waves to provide network connectivity. A WiFi connection is established using a wireless adapter to create hotspots — areas in the vicinity of a wireless router that are connected to the network and allow users to access internet services.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "WiFi introduction");
            return data;
        }
    },
    "1999 1 22 1": {
        name: "The first Mobile Web Browser",
        tick: 70034,
        description: "The first commercial launch of a mobile browser web service. Now use the Internet any time!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The first Mobile Web Browser");
            return data;
        }
    },
    "1999 2 31 1": {
        name: "Matrix film",
        tick: 70921,
        description:
            "Matrix film was released. In the film people live in a software and have no idea of what they are going through, because Matrix is created to exist and operate beyond human perception.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Matrix film");
            return data;
        }
    },
    "2000 2 10 1": {
        name: "Dotcoms bubble burst",
        tick: 79202,
        description: "Happy Friday! Everything is terrible!\nThe value of equity markets is growing exponentially.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Dotcoms bubble burst");
            return data;
        }
    },
    "2000 3 1 1": {
        name: "USB becomes popular",
        tick: 79729,
        description: "USB is a wide-spread technology. USB was designed to standardize the connection of peripherals.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "USB becomes popular");
            return data;
        }
    },
    "2000 0 1 1": {
        name: "Cloud computing was appeared",
        tick: 77546,
        description:
            "Cloud computing has come into existence. Cloud computing boasts a lot of attractive benefits for businesses and end users.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Cloud computing was appeared");
            return data;
        }
    },
    "2000 2 4 1": {
        name: "PlayStation 2 release",
        tick: 79058,
        description: "Sony Playstation 2 was released. It's gonna dominate the market!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Playstation 2 release");
            return data;
        }
    },
    "2001 3 1 1": {
        name: "The Agile Manifesto was launched",
        tick: 88489,
        description:
            "The Agile Manifesto was launched and agile project management approaches such as Scrum grew in popularity. However, due to factors such as inflexibility in procurement processes, and lack of expertise among civil servants, government computing projects continued to fail with regularity.\nAgile project management approaches grow in popularity.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Agile Manifesto was launched");
            return data;
        }
    },
    "2001 2 1 1": {
        name: "President George W. Bush announce",
        tick: 87746,
        description:
            "The US would not implement the Kyoto Protocol because of George W. Bush decision. He said: “The Kyoto Treaty would affect our economy in a negative way”.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "President George W. Bush announce");
            return data;
        }
    },
    "2001 8 11 1": {
        name: "9/11 terroristic act",
        tick: 92401,
        description:
            "9/11 terroristic act has happened. \nThe economic effects arising from the September 11 attacks were initial shocks causing global stock markets to drop sharply.\nThe September 11 attacks themselves resulted in approximately $40 billion in insurance losses, making it one of the largest insured events ever.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "9/11 terroristic act");
            return data;
        }
    },
    "2002 0 1 1": {
        name: "Euro banknotes appearing",
        tick: 95090,
        description: "In 1999, the currency was born virtually. And now physical euro coins and banknotes entered into circulation.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Euro banknotes appearing");
            return data;
        }
    },
    "2003 5 3 1": {
        name: "3G network was launched",
        tick: 107521,
        description:
            "The first commercial 3G network was launched. \n3G has several times higher data speed than 2.5G and previous networks.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "3G network was launched");
            return data;
        }
    },
    "2003 7 29 1": {
        name: "Skype beta version release",
        tick: 109609,
        description:
            "The first public Skype beta version was released. Skype is a service provider that offers free calling. In addition to standard telephone calls, Skype enables file transfers, texting, video chat and videoconferencing.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Skype beta version release");
            return data;
        }
    },
    "2003 8 23 1": {
        name: "AMD's Athlon 64 release",
        tick: 110209,
        description:
            "The Athlon 64 is the first 64-bit processor. Despite being natively 64-bit, the AMD64 architecture is backward-compatible with 32-bit x86 instructions.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "AMDs Athlon 64 release");
            return data;
        }
    },
    "2003 9 7 1": {
        name: "Nokia N-Gage release",
        tick: 110545,
        description:
            "Gamers are increasingly carried both mobile phones and handheld game consoles. Nokia spotted an opportunity to combine these devices into one unit.\nN-Gage is the first mobile-game console on the mobile phone market.\nMobile platform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Nokia N-Gage release");
            data.projects_unlocked_platforms.push("mobile");
        }
    },
    "2004 9 20 1": {
        name: "Ubuntu release",
        tick: 119641,
        description:
            "The first release of the Ubuntu Linux distribution.\nUbuntu is named after the Southern African philosophy of ubuntu (literally, 'human-ness'), which Canonical suggests can be loosely translated as humanity to others' or 'am what I am because of who we all are'.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Ubuntu release");
            return data;
        }
    },
    "2005 1 14 1": {
        name: "Youtube was founded",
        tick: 122450,
        description:
            "It offers a wide variety of media videos.\nYouTube was founded by Chad Hurley, Steve Chen, and Jawed Karim, when they worked for PayPal.\nYouTube was founded by Chad Hurley, Steve Chen, and Jawed Karim, when they worked for PayPal.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Youtube was founded");
            return data;
        }
    },
    "2005 3 1 1": {
        name: "Anti-Spyware Coalition was formed",
        tick: 123553,
        description:
            "The ASC fights against controlling spyware.\nComposed of anti-spyware software companies, academics, and consumer groups, the ASC seeks to bring together a diverse array of perspective on the problem of controlling spyware and other potentially unwanted technologies.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Anti-Spyware Coalition was formed");
            return data;
        }
    },
    "2006 3 28 1": {
        name: "U.S. Economic Growth Rises Sharply",
        tick: 132961,
        description:
            "The U.S. economy has reached new heights, with the stock market increasing in value, home prices rising, and interest rates curbed. Gas prices lowered.\n“Clearly the economy still has plenty of momentum with a little hint of inflation risk in the background”\n\t- Ethan Harris, chief United States economist at Lehman Brothers",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "U.S. Economic Growth Rises Sharply");
            return data;
        }
    },
    "2007 3 11 1": {
        name: "iPhone release",
        tick: 141313,
        description:
            'iPhone was released.\nAccording to Steve Jobs, the "i" word in "iMac" (and therefore "iPod", "iPhone" and "iPad") stands for internet, individual, instruct, inform, and inspire.',
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "iPhone release");
            return data;
        }
    },
    "2006 3 27 1": {
        name: "Nintendo Wii release",
        tick: 132937,
        description:
            "The Wii is the first console to include motion sensors as standard, meaning that the console can detect how you move the controller around. Also it can connect to the internet through wifi to enable players to play games online, download games and connect to other services.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Nintendo Wii release");
            return data;
        }
    },
    "2007 7 15 1": {
        name: "Internet advertising market growth",
        tick: 144337,
        description: "Internet advertising market has reached 1,225 billion dollars. The fastest-growing Internet ad format is video.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Internet advertiseng market growth");
            return data;
        }
    },
    "2008 8 23 1": {
        name: "Android release",
        tick: 154057,
        description:
            "Android is the phone, with its pop-up 3.2-inch touchscreen combined with a QWERTY physical keyboard. It doesn't seem to have a design marvel. Maybe, next version will be better?..",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Android release");
            return data;
        }
    },
    "2007 9 9 1": {
        name: "Stock market collapse",
        tick: 145657,
        description:
            "Stock market is collapsing rapidly.\nThe Federal Reserve recognized that banks didn’t have enough liquidity to function.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Stock market collapse");
            return data;
        }
    },
    "2008 0 1 1": {
        name: "Global financial crisis",
        tick: 147674,
        description:
            "The global financial crisis has started.\nIt occurred despite Federal Reserve and Treasury Department efforts to prevent it.\nThe first sign that the economy was in trouble occurred in 2006. That's when housing prices started to fall. Realtors didn't realize there were too many homeowners with questionable credit.\nBanks panicked when they realized they would have to absorb the losses.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Global financial crisis");
            return data;
        }
    },
    "2008 9 15 1": {
        name: "The Internet continues to boom",
        tick: 154585,
        description:
            "Despite the ongoing financial crisis, the Internet continued to grow at a phenomenal pace. Google is about to process over 1,000,000,000,000 (one trillion) unique URLs, whilst the number of individual web pages was growing by several billion per day and the number of individual users had reached 1.5 billion. The Internet has 1,504 millions users, which is 22.5% of world population.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Internet contimues to boom");
            return data;
        }
    },
    "2009 0 3 1": {
        name: "BTC is launching",
        tick: 156506,
        description:
            "BTC cryptocurrency has released.\nBitcoins can be used to buy merchandise anonymously. In addition, international payments are easy and cheap because bitcoins are not tied to any country or subject to regulation.\nWanna buy some? Go to 'Exchange'!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "BTC is launching");
            data.exchange_unlocked_shares.push("btc");
            data.btc_unlock = true;
        }
    },
    "2011 1 13 1": {
        name: "Computer Wins on 'Jeopardy!'",
        tick: 175010,
        description:
            "Watson is a question-answering computer system capable of answering questions posed in natural language. The computer system was initially developed to answer questions on the quiz show Jeopardy! and, in 2011, the Watson computer system competed on Jeopardy! against legendary champions winning the first place prize of $1 million.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Computer Wins on 'Jeopardy!'");
            return data;
        }
    },
    "2010 3 23 1": {
        name: "Greek government-debt crisis",
        tick: 167905,
        description:
            "The income of many Greeks has declined, levels of unemployment have increased, elections and resignations of politicians have altered the country's political landscape radically. Thousands of well-educated Greeks are leaving the country.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Greek government-debt crisis");
            return data;
        }
    },
    "2010 8 15 1": {
        name: "Cloud-based project management",
        tick: 171385,
        description:
            "The most popular project management solutions are cloud-based, designed for the needs of virtual teams looking to access information from any location or device.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Cloud-based project management");
            return data;
        }
    },
    "2010 3 3 1": {
        name: "Apple debuts the iPad",
        tick: 167425,
        description:
            "The iPad was Apple's first tablet computer – a device category between a smartphone and laptop computer. The user interface is built around the device's multi-touch screen, including a virtual keyboard.\nAn iPad can shoot video, take photos, play music, and perform Internet functions such as web-browsing and emailing. Other functions – games, reference, GPS navigation, social networking, etc. – can be enabled by downloading and installing apps.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Apple debuts the iPad");
            return data;
        }
    },
    "2010 7 15 1": {
        name: "4G technology is spreading",
        tick: 170641,
        description:
            "A lot of countries use 4G. \n4G technology builds upon what 3G offers, but does everything at a much faster speed. It allows having calls with crystal clear voice.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "4G technology is spreading");
            return data;
        }
    },
    "2011 1 1 1": {
        name: "Silk Road creating",
        tick: 174722,
        description:
            "Silk Road was founded. \nSilk Road is an online black market and the first modern darknet market. It operates completely anonymously. It maintains the secrecy of its operators and location by combining two technologies: Tor and Bitcoin. Silk Road attracts people for many reasons. Some are simply interested in having a safe and easy place to buy and sell illegal items, of which drugs are by far the largest category. Others cite costs as a factor. For others, Silk Road is an ideological mission far more than it is about the goods. \nBTC course is increasing.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Silk Road creating");
            return data;
        }
    },
    "2011 0 10 1": {
        name: "Freak weather incidents growing",
        tick: 174194,
        description:
            "Since the year 2010, there has been a growing occurrence of freak weather incidents. Such as: \nBreaking snowfall records for mid-Atlantic cities; flooding in Nashville, Tennessee; record-breaking heat waves and droughts in Africa and the Middle East; the abnormal heat wave in Russia; U.S. summer heat waves; the floods in Pakistan; the 2010 minimum ice extent was the third-lowest recorded since 1979; the water level in Lake Mead fell lower than it ever has since it was filled 75 years ago; 2010 was the twelfth-coldest year in the 100-year series and the coldest since 1986.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Freak weather incidents growing");
            return data;
        }
    },
    "2011 1 11 1": {
        name: "Arab Revolutions",
        tick: 174962,
        description:
            "Young Arabs have taken to the streets in vast numbers, their disaffection for the dictators and autocrats that have continually oppressed them, no longer bearable. 180 million strong, they are protesting on common ground, demanding common values and speaking in one common language. They are clamouring for change, for free speech, for human rights and a solution to mass unemployment and poverty. But as the revolution evolves, it has become clear not all Arabs are singing to the same tune. \nA dramatic increase in oil prices.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Arab Revolutions");
            return data;
        }
    },
    "2011 9 13 1": {
        name: "Litecoin starting",
        tick: 180817,
        description:
            "As more and more people are embracing the world of cryptocurrency, people are looking for investment opportunities outside of Bitcoin and Ethereum. Litecoin clearly looks like a popular choice.\nIt's based on the Bitcoin protocol, but it differs in that it can still be efficiently mined using consumer-grade hardware. Another positive feature about litecoin is that transactions are confirmed faster than they are with bitcoin (around 2.5mins compared with around 8mins).",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Litecoin staring");
            return data;
        }
    },
    "2012 8 1 1": {
        name: "Bitcoin Foundation established",
        tick: 188593,
        description:
            "The Bitcoin Foundation is a nonprofit organization aiming to make Bitcoin a globally accepted method of exchanging and storing value without third parties.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Bitcoin Foundation established");
            return data;
        }
    },
    "2013 2 29 1": {
        name: "The Oculus Rift DK1 release",
        tick: 193609,
        description:
            "Oculus Rift DK1 is a large, black, goggle-like device that is strapped across your eyes. There are cushions lining the sides of the goggles to give you comfort. The display of DK1 is a RGB LCD screen with a resolution of 1280 x 800 or 640 x 800 per eye. It has a diagonal FOV of 110° and horizontal FOV of 90°. Oculus Rift DK1 tracks the rotational movement of your head with Gyroscope, Accelerometer and Magnetometer. It allows you to look around and become immersed in the virtual world. The overall latency is about 50 to 60ms.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Oculus Rift DK1 release");
            return data;
        }
    },
    "2013 8 1 1": {
        name: "Peak of popularity of Blackberry",
        tick: 197353,
        description:
            "BlackBerries are best known for their e-mail and collaboration capabilities. There are 85 million BlackBerry subscribers worldwide.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Peak of popularity of Blackberry");
            return data;
        }
    },
    "2013 10 15 1": {
        name: "Litecoin price is increasing",
        tick: 199153,
        description:
            'The aggregate value of Litecoin experienced massive growth.\n\t"Litecoin is two years behind bitcoin in terms of our adoption, so it\'s interesting to look into the future," - Charles Lee, Litecoin creator',
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Litecoin price is increasing");
            return data;
        }
    },
    "2013 3 15 1": {
        name: "Google Glass release",
        tick: 194017,
        description:
            "Google Glass is a brand of smart glasses – an optical head-mounted display designed in the shape of a pair of eyeglasses. \nAR/VR era has started. VR platform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Google Glass release");
            data.projects_unlocked_platforms.push("VR");
        }
    },
    "2014 5 25 1": {
        name: "Google Cardboard release",
        tick: 204481,
        description:
            "Google Cardboard is a VR platform developed by Google for use with a head mount for a smartphone. Users can either build their own viewer from simple, low-cost components using specifications published by Google, or purchase a pre-manufactured one. To use the platform, users run Cardboard-compatible applications on their phone, place the phone into the back of the viewer, and view content through the lenses.\nA low-cost system to encourage interest in VR applications.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Google Cardboard release");
            return data;
        }
    },
    "2014 4 20 1": {
        name: "Melting ice caps and rising sea waters",
        tick: 203617,
        description:
            "Droughts. Wildfires. Massive flooding.\n2014 year will likely go down as the year that melting polar ice caps graduated from being a geographic abstraction to a symbol of the irreversible ways we’ve warped the planet.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Melting ice caps and rising sea waters");
            return data;
        }
    },
    "2014 8 3 1": {
        name: "Samsung Gear VR release",
        tick: 206161,
        description:
            "The Samsung Gear VR is a mobile virtual reality headset. It offers an unreal real 360 degree VR experience that allows you a total immersion in the virtual environment. Cool.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Samsung Gear VR release");
            return data;
        }
    },
    "2015 11 12 1": {
        name: "The Paris Agreement was sealed",
        tick: 217322,
        description:
            "An agreement within the United Nations Framework Convention on Climate Change. The Agreement establishes a global warming goal of well below 2°C on pre-industrial averages. It requires countries to formulate progressively more ambitious climate targets which are consistent with this goal. To achieve this goal, all Parties to the Paris Agreement will need to make profound changes to their economies.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Paris Agreement was sealed");
            return data;
        }
    },
    "2016 7 1 1": {
        name: "The first reprogrammable quantum computer",
        tick: 222914,
        description:
            "Researchers have built the first quantum computer that can not only be programmed, but, just like a regular computer, can actually be reprogrammed, too. This latest device is only made from five atoms, but it's a huge step towards building scalable, functioning quantum computers that could change the way we process data forever.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The first reprogrammable quantum computer");
            return data;
        }
    },
    "2016 2 25 1": {
        name: "Oculus Rift consumer version",
        tick: 219818,
        description:
            "The consumer version is an improved Oculus Rift with a greater resolution than DK2, 360-degree positional tracking, integrated audio, a vastly increased positional tracking volume, and a heavy focus on consumer ergonomics and aesthetics.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Oculus Rift consumer version");
            return data;
        }
    },
    "2016 3 5 1": {
        name: "HTC Vive release",
        tick: 220082,
        description:
            'The HTC Vive is a virtual reality headset. The headset uses "room scale" tracking technology, allowing the user to move in 3D space and use motion-tracked handheld controllers to interact with the environment.\nModern head-mounted displays are being released with better graphics processing at lower price points than similar, earlier solutions. Still, in order for VR to achieve mainstream acceptance, many more problems must be solved, spanning from the technology used in product design to the methods applied to content creation.',
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "HTC Vive release");
            return data;
        }
    },
    "2016 9 1 1": {
        name: "Supercomputer has reached 100 petaflops",
        tick: 224378,
        description:
            "China has announced the Sunway TaihuLight – the world's fastest supercomputer, with a Linpack rating of 93 petaflops and peak performance of 125 petaflops. The Sunway TaihuLight is the first system in the world to reach a peak performance of over 100 petaflops (100,000,000,000,000,000 floating point operations per second).",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Supercomputer has reached 100 petaflops");
            return data;
        }
    },
    "2016 9 13 1": {
        name: "PlayStation VR release",
        tick: 224666,
        description:
            "It was designed to be functional with the PlayStation 4. The current PlayStation VR headset brings the world of virtual reality to your console in a big way. And what really sets it apart from the rest is that it does so without the cost most often associated with rival higher-end VR headsets, like the HTC Vive or Oculus Rift. ",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "PlayStation VR release");
            return data;
        }
    },
    "2017 11 1 1": {
        name: "Quantum computers are being sold",
        tick: 234602,
        description:
            "A 2000 qubit quantum computer is on the market. Analysts believe quantum computing technologies markets will reach $10.7 billion by 2024.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Quantum computers are being sold");
            return data;
        }
    },
    "2017 10 1 1": {
        name: "Cryptocurrency market boom",
        tick: 233882,
        description:
            "The virtual currency markets have been through booms and busts before — and recovered to boom again. 2017 is a breakthrough year for the crypto market for major coins such as Bitcoin, Ethereum, and Ripple, increasing awareness by the mainstream market, and innovative new applications of Blockchain technology drove impressive returns. More importantly, this blistering pace for the entire ecosystem is being driven by increasing appetite on the side of investors, with no sign of abating.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Cryptocurrency market boom");
            return data;
        }
    },
    "2017 5 1 1": {
        name: "Donald Trump announce",
        tick: 230210,
        description:
            "Donald Trump has confirmed that he will withdraw the US from the Paris climate agreement. The US will remove itself from the deal, joining Syria and Nicaragua as the only countries not party to the Paris agreement.\n\t“I was elected to represent the citizens of Pittsburgh, not Paris.” - Said Donald Trump\n The formal notice of withdrawal cannot be submitted until the agreement is in force for 3 years for the US, in 2019. In accordance with Article 28, as the agreement entered into force in the United States on 4 November 2016, the earliest possible effective withdrawal date for the United States is 4 November 2019.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Donald Trump announce");
            return data;
        }
    },
    "2017 0 18 1": {
        name: "U.S. scientists officially declare 2016 the hottest year on record",
        tick: 226994,
        description:
            "Sixteen of the seventeen warmest years on record have occurred since 2000. \nMany climate U.S. scientists, policy experts and environmentalists are concerned about the potential for the incoming administration to limit funding for climate science and roll back both national and international progress toward limiting the greenhouse gases that are warming the planet.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "U.S. scientists officially declare 2016 the hottest year on record");
            return data;
        }
    },
    "2018 1 4 1": {
        name: "Cryptocurrency market recession",
        tick: 236162,
        description:
            'As the saying goes, "What goes up, must come down," and nowhere is this idiom truer than in modern capital markets.\nThe first half of 2018 has been rather rough for the cryptocurrency market, to say the least. Cryptocurrencies continues to lower.',
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "Cryptocurrency market recession");
            return data;
        }
    },
    "2018 3 13 1": {
        name: "3-mode Fiber has reached new speed",
        tick: 237794,
        description:
            "The transmission capacity of 159 Tb/s over 1045 km with 3-mode Fiber was accomplished. Multimode fibers have different propagation delays between optical signals in different modes that makes it difficult to simultaneously satisfy large data-rates and long distance transmission. This achievement shows that such limitations may be overcome.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "3-mode Fiber has reached new speed");
            return data;
        }
    },
    "2018 8 15 1": {
        name: "The Paris Climate Agreement continues",
        tick: 241514,
        description:
            "194 states and the European Union have signed the Agreement. 179 states and the EU, representing more than 87% of global greenhouse gas emissions, have ratified or acceded to the Agreement, including China, the United States and India.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The Paris Climate Agreement continues");
            return data;
        }
    },
    "2019 0 1 1": {
        name: "AR/VR is flowering",
        tick: 244106,
        description:
            "AR/VR is getting more and more popular. The main reason the growth of Augmented Reality is the adoption of AR technologies across the popular platforms Snapchat and Facebook, with their respective products: Lenses and Stories.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "AR/VR is flowering");
            return data;
        }
    },
    "2020 10 1 1": {
        name: "5G technology release",
        tick: 260186,
        description:
            "Combining cutting-edge network technology and the very latest research, 5G should offer connections that are multitudes faster than current connections, with average download speeds of around 1GBps expected to soon be the norm.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "5G technology release");
            return data;
        }
    },
    "2020 8 1 1": {
        name: "The global surface temperature was increased",
        tick: 258722,
        description:
            "It's more than 0.5°C warmer than the 1986-2005 average.\nTo calculate a global average temperature, scientists begin with temperature measurements taken at locations around the globe. Because their goal is to track changes in temperature, measurements are converted from absolute temperature readings to temperature anomalies—the difference between the observed temperature and the long-term average temperature for each location and date. Multiple independent research groups across the world perform their own analysis of the surface temperature data, and they all show a similar upward trend. ",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The global surface temperature was increased");
            return data;
        }
    },
    "2020 11 1 1": {
        name: "The PlayStation 5 release",
        tick: 260906,
        description:
            "It includes support for virtual, augmented, mixed reality. Exponential improvements in graphical ability – tens of gigabytes of RAM and over 10 teraFLOPS of computing power,* pushing it close to the 40 teraFLOPS needed to render photo-realistic dynamic scenes.* It also includes major support for virtual, augmented and mixed reality, now that these technologies are becoming a lot cheaper and more widely adopted, along with 4K Ultra HD Blu-ray playback.",
        picture: TimeIcon,
        updateGameData: data => {
            console.log(data.date.tick, "The PlayStation 5 release");
            return data;
        }
    }
};
