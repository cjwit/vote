var React = require('react');

module.exports = React.createClass({
	render: function() {

		// https://bl.ocks.org/mbostock/3887193
		var data = this.props.poll.options;

		// COLOR NOT WORKING, add text percentages
		var colors = d3.scale.category10()
			.domain(data.map(function(d) { return d.name; }))

		var width = 300, height = 300, radius = 150;

		var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(radius - 70);

		var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) { return d.votes; });

		var chart = d3.select(".circleChart")
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var g = chart.selectAll(".arc")
			.data(pie(data))
		  .enter().append("g")
			.attr("class", "arc");

		g.append("path")
			.attr("d", arc)
			.style("fill", function(d) { return colors(d.name); });

        return (
                <div>
					<svg className = "circleChart" />
				</div>
        )
    }
});
