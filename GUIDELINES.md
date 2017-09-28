# flatgame

A web app to better organize a shared flat!

### Idea

This web app can be used to organize a shared flat. The basic concept is the following:
Instead of having an unflexible task todo list defining when who and what needs to be done by the members of a community, everyboday can simply choose, what he/she wants to do and then get points in order to honor the effort. This gameificaiton includes a leaderboard and quantafies the contribution to the shared flat by each member.

### Technical background

MEAN architecture: MongoDB, ExpressJS, Angular 4, NodeJS

## Activities

Each activity is simply a "task", which has a name, a description, a certain amount of points and a period of time (until it should be done again). Activities have more points, if the take more time to complete or if they are uncomfortable.
Example activities (amount of points in brackets):

Weekly:
* Bathroom (8)
* WC (6)
* Kitchenfloor (4)
* Corridor (2)

Monthly:
* Clean fridge (3) 
* stove (2)
* oven (3)
* rest of kitchen (4)
* terrace (3)

As needed:
* Dishwasher (1) 
* organic waste (2)
* (yellow) plastic bag (2)

## Pages

**Overview:** Contains the points of all members, the tasks to do and the last already done tasks
**Activities:** Here you can add activities, remove or modify activities and see the descriptions
**History:** Contains every single task, with timestamp and person
Additional pages like "Preferences" ...

## Functions

### Sign up 

The user can sign in on the web page (using Google Identity Platform).

### Set up

Then you have to join an existing flat. If the flat is not yet created, this needs to be done. The user can invited his room mates.

### Create activities

Afterwards you can create activities and modify them as you like. There will be some standard activities, which can be used.

### Start the game!

If everything is set up properly, the "game" starts. You can do an activity and get points for it. All points are summarized, which shows the current state of all members. 

## Special features

Reminder to people, which are a lot behind the other members. 
Give points to people which are not at home (e.g. every day 1 pt).
Integrate the web app in android in order to use it like a normal app.

