import React, { Component, PropTypes } from 'react';

export default class CircleChart extends Component {
	static propTypes = {
		poll: PropTypes.object.isRequired,
		pollPage: PropTypes.bool.isRequired
	}

	componentDidMount() {
		// For some reason, this is required to render the Poll version of the chart
		// but does not work to render the PollMini version.
		if (!this.props.pollPage) {
			this.renderChart();
		}
	}

	renderChart() {
		let data = this.props.poll.options;
		let pollPage = this.props.pollPage;
		let totalVotes = 0;
		if (data.length > 0) {
			totalVotes = data.map( (a) => a.votes )
				.reduce( (a, b) => a + b );
		}

		const colors = d3.scale.category10()
		let width = pollPage ? 200 : 100,
			height = pollPage ? 200 : 100,
			radius = pollPage ? 100 : 50,
			outerRadius = pollPage ? radius - 10 : radius - 0,
			innerRadius = pollPage ? radius - 40 : radius - 30;

		const arc = d3.svg.arc()
			.outerRadius(outerRadius)
			.innerRadius(innerRadius);

		const pie = d3.layout.pie()
			.sort(null)
			.value( (d) => d.votes );

		let chart = d3.select("#poll-chart-" + this.props.poll._id)
			.append("svg")
			.attr("class", "circleChart")
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("transform", `translate(${width / 2}, ${height / 2})`);

		let g = chart.selectAll(".arc")
			.data(pie(data))
		  .enter().append("g")
			.attr("class", "arc")

		g.append("path")
			.style("fill", (d) => colors(d.data.name) )
			.attr("d", arc)

		if (pollPage) {
			g.append("text")
				.attr("transform", (d) => `translate(${arc.centroid(d)})` )
				.attr("dy", ".35em")
				.text((d) => {
					if (d.data.votes > 0) {
						return Math.ceil(d.data.votes / totalVotes * 100) + "%";
					}
				});
		}
	}

	render() {
		let pollChartIdentifier = "#poll-chart-" + this.props.poll._id;
		$("#poll-chart-" + this.props.poll._id).empty();

		if (this.props.poll.options.length > 0) {
			this.renderChart();
		}

        return (
                <div id = { "poll-chart-" + this.props.poll._id } className = "poll-chart" />
        )
    }
}
