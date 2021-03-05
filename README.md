# Stay Tonight ATL

Stay Tonight ATL seeks to help answer the question: do you know where I can stay tonight? Now, you might be asking why there needs to be a site dedicated to homeless shelters - we have Google and everything has a website these days. Have you ever tried to help someone find a shelter for the night? Even if you know of a shelter in your city, do you know their address? Would you know what information to look for if you found a shelter's website? For example, who can stay there - men, women, LGBTQ+ community members, children? Does a guest need identification, or to arrive by a certain time? It can be a nightmare trying to navigate these resources to find out what someone needs to know, espeically on the fly. HomePage provides a convenient hub for the most important information about homeless shelters, helping you or someone you're with be one step closer to finding somewhere safe to stay tonight. I believe that the most effective work is the work you do in your community, which is why I chose to focus on Atlanta. However, this concept could easily scale to include larger areas of concern.

### Link for heroku deployment

Link for heroku deployment
[https://stay-tonight-atl.herokuapp.com/](https://stay-tonight-atl.herokuapp.com/)

### Getting Started

In the current version of the project, all users can view an overview of the sites, their locations on the map on the home page, and the site detail pages that list more thorough information. If a user would like to create, update, or delete a site, they can register or login if they are an existing user.

## Technologies Used

- DynamoDB, Express.js, React, Node, Axios
- Reactstrap for CSS
- Bcrypt and JWT for authentication
- Postman
- Google Maps API and Google Maps Geocoding API

## Preplanning

The first step of my preplanning was to find out if I was able to achieve what I was setting out to do. This meant that I needed to understand how geocoding worked, how I could use and store the data, and how I could interact with the API to display this information on a map.

## Version 2

For version two I would like to refactor my backend using AWS Lambdas, implement form validation, and add a boundary to the map to keep it localized to Atlanta.
