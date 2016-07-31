var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		if (!this.props.pollPage) {
			this.renderChart();
		}
	},

	renderChart: function() {
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

		var tweenPie = function(finish) {
			var start = {
				startAngle: this._current.startAngle,
				endAngle: this._current.startAngle
			};
			var interpolator = d3.interpolate(start, finish);
			return function(d) { return arc(interpolator(d)); }
		}

		var chart = d3.select("#circle-chart-" + this.props.poll._id)
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var g = chart.selectAll(".arc")
			.data(pie(data))
		  .enter().append("g")
			.attr("class", "arc");

		g.append("path")
			.style("fill", function(d) { return colors(d.data.name); })
		  .transition().delay(function(d, i) { return i * 315; })
		    .duration(500)
			.each(function(d) { this._current = d; })
			.attrTween("d", tweenPie)

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
		this.renderChart();

        return (
                <div className = "poll-chart">
					<svg id = { "circle-chart-" + this.props.poll._id } className = "circleChart" />
				</div>
        )
    }
});
