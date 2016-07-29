var React = require('react');

module.exports = React.createClass({
	render: function() {
		var data = this.props.poll.options,
			margin = { top: 20, right: 30, bottom: 30, left: 30 },
			width = 300 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom;

		console.log("rendering", data);
		
		var x = d3.scale.ordinal()
			.domain(data.map(function(d) { return d.name; }))
			.rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d) { return d.votes; })])
			.range([height, 0]);

		var chart = d3.select('.barChart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
		  .append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		var bar = chart.selectAll('.bar')
			.data(data)
		  .enter().append('rect')
			.attr('class', 'bar')
			.attr('x', function(d) { return x(d.name); })
			.attr('width', x.rangeBand())
			.attr('y', function(d) { return y(d.votes); })
			.attr('height', function(d) { return height - y(d.votes); })

/*
		bar.append('text')
			.attr('dy', '.75em')
			.attr('y', 6)
			.attr('x', (x(bins[0].x1) - x(bins[0].x0)) / 2)
			.attr('text-anchor', 'middle')
			.text(function(d) { return formatCount(d.length); });
*/
        return (
                <div>
					<svg className = "barChart" />
				</div>
        )
    }
});
