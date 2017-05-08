# Me-Lance
A responsive MEAN stack app for freelancers to manage clients, projects, and invoices. View the demo here: https://me-lance.herokuapp.com/

## Use Case
Why is this app useful? People who choose to work freelance jobs have a number of responsibilities that people who are employed by a company do not face. They must keep track of their time and tasks, send invoices, look for their next job, manage their books, and more. It is tedious to sit down and remember the tasks and hours worked throughout the billing cycle and generate an invoice for a client. Even if one were to keep track of their tasks daily, it still adds time to the work day. This app aims to solve that problem. With two clicks of a button, an invoice is updated or created with time worked, a description of the task, and the date. With this app, when the work day is over, it is really over. No more additional, unpaid time updating invoices at the end of the day!

## UX
[![Screen Shot 2017-05-08 at 3.41.50 PM.png](https://s13.postimg.org/jrwbyyonb/Screen_Shot_2017-05-08_at_3.41.50_PM.png)](https://postimg.org/image/6nqrm9wlf/)
[![Screen Shot 2017-05-08 at 3.42.14 PM.png](https://s13.postimg.org/so742wf9j/Screen_Shot_2017-05-08_at_3.42.14_PM.png)](https://postimg.org/image/5zhx3bxvn/)
[![Screen Shot 2017-05-08 at 3.42.42 PM.png](https://s1.postimg.org/4pcmrgt4v/Screen_Shot_2017-05-08_at_3.42.42_PM.png)](https://postimg.org/image/8yhctmwe3/)

Me-Lance was designed from the beginning to work on all devices. It is built using React and Redux and utilizes the material-ui library for a modern look and snappy performance. A strong emphasis was put on simplicity and efficiency. The time tracker is the heart of this app, allowing users to add their day's work to an invoice immediately, instead of trying to add it all up at the end of the billing cycle. Client contact info, project and invoice history, and more, is always in view and easily accessible from the main menu.

## Prototype
You can find a working prototype here: https://me-lance.herokuapp.com/


## Technical
This app is built using the MEAN stack. With ReactJS, HTML5, and CSS3 on the front-end, forms are validated with formsy-material-ui. The back-end uses NodeJS with ExpressJS as the web server and MongoDB as the database, hosted on mLab.
Application state is managed with Redux.
Charts are drawn using google-charts

## To Do's
  * Add pause button to the time-tracker
  * Add more charts. Switch to chart.js
