var React = require('react');

module.exports = React.createClass({
	/*componentDidMount: function() {
		if (!this.props.pollPage) {
			this.renderChart();
		}
	},
*/
	renderChart: function() {
		console.log(" -- renderChart called for", this.props.poll.name);
		var data = this.props.poll.options;
		var pollPage = this.props.pollPage;
		var totalVotes = 0;
		if (data.length > 0) {
			totalVotes = data.map(function(a) {
				return a.votes;
			}).reduce(function(a, b) {
				return a + b;
			});
		}

		var colors = d3.scale.category10()
		var width = pollPage ? 200 : 100,
			height = pollPage ? 200 : 100,
			radius = pollPage ? 100 : 50,
			outerRadius = pollPage ? radius - 10 : radius - 0,
			innerRadius = pollPage ? radius - 40 : radius - 30;

		var arc = d3.svg.arc()
			.outerRadius(outerRadius)
			.innerRadius(innerRadius);

		var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) { return d.votes; });

			// TRIED APPENDING
		var chart = d3.select("#poll-chart-" + this.props.poll._id)
			.append("svg")
			.attr("class", "circleChart")
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var g = chart.selectAll(".arc")
			.data(pie(data))
		  .enter().append("g")
			.attr("class", "arc")

		g.append("path")
			.style("fill", function(d) { return colors(d.data.name); })
			.attr("d", arc)

		if (pollPage) {
			g.append("text")
				.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
				.attr("dy", ".35em")
				.text(function (d) {
					if (d.data.votes > 0) {
						return Math.ceil(d.data.votes / totalVotes * 100) + "%";
					}
				});
		}
	},

	render: function() {
		console.log("### RENDERING", this.props.poll.name);
		if (this.props.poll.options.length > 0) {
			this.renderChart();
		}

        return (
                <div id = { "poll-chart-" + this.props.poll._id } className = "poll-chart" />
        )
    }
});
