# hwcollection
A project to create a HOT WHEELS COLLECTION

The project is separated in three parts:

## Parser

This module has the responsability to parse the information to generate a database to cars, the parser is a web crawler and I used the 
[https://hotwheels.fandom.com/wiki/Hot_Wheels](https://hotwheels.fandom.com/wiki/Hot_Wheels) to get the information.

## Server

This module has the responsibility  to server the data from cars, he is developed with Spring-boot framework and all persistance is made on top of a mongoDB.

## Front

This module has the responsibility  to serve the users to navigate in the system, he is developed with React and use Firebase to authentication.
