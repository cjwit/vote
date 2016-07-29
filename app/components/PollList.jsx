var React = require('react');
var PollMini = require('./PollMini.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            listings: 2,
            startIndex: 0
        })
    },

    componentDidMount: function() {
        $("#previousPage").addClass("disabled");
    },

    componentWillReceiveProps: function() {
		this.setState({ startIndex: 0 });
    },

    previous: function() {
        var previous = $("#previousPage"),
            next = $("#nextPage"),
            startIndex = this.state.startIndex,
            listings = this.state.listings;

        startIndex -= listings;
        if (startIndex < 0) { startIndex = 0; }
        this.setState({ startIndex: startIndex })

        next.removeClass("disabled")
        if (startIndex === 0) {
            previous.addClass("disabled");
        } else {
            next.removeClass("disabled");
        }
    },

    next: function() {
        var previous = $("#previousPage"),
            next = $("#nextPage"),
            startIndex = this.state.startIndex,
            listings = this.state.listings;

        if (startIndex + listings < this.props.polls.length) {
            startIndex += listings
            this.setState({ startIndex: startIndex })
        };

        previous.removeClass("disabled")
        if (startIndex + listings >= this.props.polls.length) {
            next.addClass("disabled");
        } else {
            next.removeClass("disabled");
        }
    },

    render: function() {
        var incomingPolls = this.props.polls,
            incomingLength = incomingPolls.length,
            startIndex = this.state.startIndex,
            endIndex = startIndex + this.state.listings,
            currentPage = startIndex / this.state.listings + 1,
            login = this.props.login,
			totalPages;

		incomingLength % this.state.listings === 0 ?
			totalPages = incomingLength / this.state.listings :
			totalPages = Math.floor(incomingLength / this.state.listings) + 1;

        var polls = incomingPolls.slice(startIndex, endIndex);

		var PollMinis = [];
		polls.forEach(function(poll, index) {
			PollMinis.push(<PollMini poll = { poll } key = { "poll" + index } />)
		});

        return (
            <div className = 'list'>
                { PollMinis }
                {
                    incomingLength > this.state.listings ?
                    <nav>
                      <ul className="pager">
                        <li className = "disabled" id = "previousPage"><a onClick = { this.previous }>&larr;</a></li>
                        <span className = "currentPage">Page { currentPage } of { totalPages }</span>
                        <li id = "nextPage"><a onClick = { this.next }>&rarr;</a></li>
                      </ul>
                    </nav>
                    : null
                }
            </div>
        )
    }
})