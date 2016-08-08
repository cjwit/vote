import React, { PropTypes, Component } from 'react';
import PollMini from './PollMini.jsx';

export default class PollList extends Component {
	static propTypes = {
		polls: PropTypes.array.isRequired,
		login: PropTypes.object.isRequired
	}

	state = {
		listings: 2,
		startIndex: 0
	}

	componentDidMount() {
		$("#previousPage").addClass("disabled");
	}

/*
	componentWillReceiveProps() {
		// this.setState({ startIndex: 0 }); SORTING DOES NOT MOVE BACK TO BEGINNING;
    }
*/

	previous = () => {
        const previous = $("#previousPage"),
            next = $("#nextPage");

        let startIndex = this.state.startIndex,
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
    }

	next = () => {
		const previous = $("#previousPage"),
			next = $("#nextPage");

		let startIndex = this.state.startIndex,
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
	}

	render() {
        const login = this.props.login,
			incomingPolls = this.props.polls,
            incomingLength = incomingPolls.length;

        let startIndex = this.state.startIndex,
            endIndex = startIndex + this.state.listings,
            currentPage = startIndex / this.state.listings + 1,
			totalPages;

		incomingLength % this.state.listings === 0 ?
			totalPages = incomingLength / this.state.listings :
			totalPages = Math.floor(incomingLength / this.state.listings) + 1;

        let polls = incomingPolls.slice(startIndex, endIndex);

        return (
            <div className = 'list'>
                { polls.map((poll) => { return <PollMini poll = { poll } key = { "poll" + poll._id } /> }) }
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
}
