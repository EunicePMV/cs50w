# Capstone Project

## Introduction

Pandemic in year 2020 imposed a major lockdown world wide such as in the country of Philippines; people were forced to stay at home, education was postponed and delayed, many were out of jobs and some were able to work from home. Due to the protocols of the quarantine many Filipinos choose to entertain themselves through their social media; however, contrary to government’s belief, they were able to keep the public safe from the pandemic, but they are exposed with infodemic which refers to the huge number of information may it be the truth or not, and in between this – misinformation and disinformation happens.

## Statement of the Problem

Misinformation and disinformation are both fake news, the only main difference is that misinformation is incorrect understanding of fact; meanwhile disinformation is manipulated information intended to deceived the public. And this kind of fake news are threats to many democratic countries, such as the Philippines, most especially during election period.

Political disinformation is one of the great weapon for so long during election period, and due to the advancement in technology, it become more threatening to the extent that it could manipulate voters’ decision and would greatly affect the country’s future. And Filipinos would be forever deceived when they are not aware of the negative impact of disinformation in the society. Hence, one of the resolution that the creator of the project come up with is the best way to combat disinformation is via preventing the community to become one of the victim -- through producing media literate users. And for the creator to achieve this, individual should be equip with the knowledge how disinformation are created and spread, hence, the reason the project is built to expose some tactics of the perpetrator.

## Proposed Solution

The creator goal is to equip Filipinos with the knowledge about disinformation to prevent the spread of fake news that would negatively affect the credibility of many verified sources. To achieve the goal the proposed solution of the creator is a “choose-your-own-adventure” type of game in where the decision of the user will decide the course of event of the game but the end result will all be the same, which is exposing the tactics used to spread fake news. 

The web application developed is in a form of mini game, composed of three stages, each stage has one disinformation strategy, each has different scenario that the user will play in. The game revolves to the Chief Architect which will be the role of the user, a client will approach them and forced them to become their PR Manager in the campaign season. According to the research conducted by Jonathan Corpus Ong and Jason Vincent A. Cabañes, the PR Manager is paid to promote the branding of a political candidate, and one of their means to fulfill their role is authoring disinformation. Hence, the effective way to exposed someone’s tactics is through playing their role. Throughout the game the user will fulfill their job as a PR Manager of a political candidate, they will converse with their client; in each message they will be given options to choose for their response. Furthermore, there are few instructions that will guide the user when they are ask to do other things.

Overall, the main objective of the creator in this project is to expose disinformation techniques by letting the user themselves apply it, because the creator believes that – to learn is to do it – and once the user is done they will better understand how a disinformation strategy works, so that in the future, they will be able to prevent themselves from being a victim.

## Distinctiveness and Complexity

The web application developed using Django in the back-end and HTML, CSS, and JavaScript in the front-end are inspired to the Pokemon game setup, where users has options to choose for their response, whilst projects involved in the course are designing the front-end of search engine similar with google search engine, creating an encyclopedia web similar with Wikipedia, building auction site, email site, and lastly; creating a social networking site. 

Furthermore, the project developed is a “choose-your-own-adventure” type of game, which is still not yet done throughout the course. Scenarios from the three stages of the web application are scenarios  generated from the observation and reading materials, including in various research such as the study entitled “Architects of Networked Disinformation: Behind the Scenes of Troll Accounts and Fake News Production in the Philippines” by Jonathan Corpus Ong and Jason Vincent A. Cabañes.

Overall, the capstone project created is not a social network nor an e-commerce, but a “choose-your-own-adventure” mini game to produce media literate users via exposing disinformation strategies. Moreover, the project built is generated from various researching and studying about disinformation, the generated flow of the game comes from the step by step listing of the solution on how the disinformation was created and spread. Thus, the capstone project is distinct from the other projects of this course which has its own complexity due to the measured presentation in exposing a disinformation strategy in each stage. 

## Content of Each File

The project is composed of various HTML, CSS and JavaScript files that is located on the directory that has names specified what is it all about, and the following are:

	- index.html, style.css and index.js – Files are responsible to the index page, the web page that will welcome the user; which compose the start button and the other contents of the web application that store other relevant information about the project.

	- pr_manager.html, pr_manager.css and pr_manager.js – Files are responsible of the introductory message to the user, explaining disinformation, architecture of disinformation, and the role of the user.

	- layout.html – Serve as the template file of the index and pr_manager html file.

	- stages_layout.html, stages_layout.css and stage.js – Serve as the template file of the stages html files, including the style sheet and JavaScript file. 

	- first_stage.html, second_stage.html, third_stage.html – Each file represent the stage that has unique scenario of the game.

While in Django the project name is web_app, and the installed app name is disinformation_tecqs.

## Running the Application 

Create a virtual environment 
```
$ python -m venv venv
```

Activate the virtual environment in Linux
```
$ source venv/bin/activate 
```

***Note: if you have different OS then search or see the python documentation how to activate your virtual environment according to your operating system.***

Install what’s inside the requirements.txt 
```
$ pip install -r requirements.txt
```
And, do the following to fully setup the django application
```
$ python manage.py makemigrations
$ python manage.py migrate 
$ python manage.py runserver 
```

## Other Relevant Information

The topic of the project, which is the political disinformation is inspired to the previous election period 2022, where there are massive spread of political disinformation, and as the creator observed many were victimized of false information due to the lack of knowledge about the manipulation happening in social media.

## Reference

American Psychological Association. (n.d.). Misinformation and disinformation. Retrieved from:  https://www.apa.org/topics/journalism-facts/misinformation-disinformation

Asmarianki, M. (2017). Personal Branding by Politicians: Investigating The Effect Of Personalized Communication As A Personal Branding Strategy Used By Politicians To Influence Individuals ‘Intention To Vote. Retrieved from:  http://arno.uvt.nl/show.cgi?fid=143237

Kamarack, E. (2019). A short history of campaign dirty tricks before Twitter and Facebook. Retrieved from: https://www.brookings.edu/blog/fixgov/2019/07/11/a-short-history-of-campaign-dirty-tricks-before-twitter-and-facebook/

Kiran V. (2020). Personal Branding for Politician & Political Parties: How to Brand Yourself as a Politician. Retrieved from: https://politicalmarketer.com/personal-branding-for-politician-political-parties/

Kuo, R. & Alice, M. (2021). Critical disinformation studies: History, power, and politics. Retrieved from: https://misinforeview.hks.harvard.edu/article/critical-disinformation-studies-history-power-and-politics/

Labiste, D. (2022). Fact-checking in the Philippines: The Quest to End Disinformation in Elections. Retrieved from: https://fulcrum.sg/fact-checking-in-the-philippines-the-quest-to-end-disinformation-in-elections/

Ong, J & Cabañes, J. (2018). Architects of Networked Disinformation: Behind the Scenes of Troll Accounts and Fake News Production in the Philippines. Retrieved from:  https://scholarworks.umass.edu/cgi/viewcontent.cgi?article=1075&context=communication_faculty_pubs

Patrick, T. (2021). Dirty campaigning in 2022: using slander to attack opponents. Retrieved from: https://campaigninginfo.com/dirty-campaigning/

See, A. (2021). Rodrigo Duterte Is Using One of the World's Longest COVID-19 Lockdowns to Strengthen His Grip on the Philippines. Retrieved from: https://time.com/5945616/covid-philippines-pandemic-lockdown/

Spchua, M. (2022). Disinformation Poses a Grave Threat to Democracy in the Philippines. Retrieved from: https://thediplomat.com/2022/05/disinformation-poses-a-grave-threat-to-democracy-in-the-philippines/
