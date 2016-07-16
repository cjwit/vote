var dispatcher = require('../dispatcher');

module.exports = {
    // called from the Thing component
    addThing: function(thing) {
        dispatcher.dispatch({
            object: thing,
            type: "thing:addThing"
        });
    },

	deleteThing: function(thing) {
		dispatcher.dispatch({
			object: thing,
			type: "event:deleteThing"
		});
	},

	editThing: function(thing) {
		dispatcher.dispatch({
			object: thing,
			type: "event:editThing"
		});
	}
}
