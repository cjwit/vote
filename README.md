# Vote!

Next up:

* Chart transitions, reconfigure to work with React updates, add transitions
* Require login for creating poll
	* Add owner to schema, add login.status to form validation, add owner to addPoll
	* Handle duplicate poll names, usernames
* Set up individual user page
	* Edit username and password
	* Show my polls (after requiring login)

Potential future projects:

* Catch 401 error on failed login (instead of using alert)
* Move disable voting logic from sessionStorage to localStorage or require login for voting and keep an array of voted polls in the user info
