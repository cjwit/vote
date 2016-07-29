var React = require('react');

module.exports = React.createClass({
	render: function() {
		// http://bl.ocks.org/dbuezas/9306799
		var data = this.props.poll.options,
			margin = { top: 30, right: 30, bottom: 30, left: 30 },
			width = 200 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom;

		var colors = d3.scale.category10();

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
		  .enter().append('g')
			.attr('class', 'bar')
			.attr('transform', function(d) { return 'translate(' + x(d.name) + ',' + y(d.votes) + ')'; })

		bar.append('rect')
			.attr('x', 1)
			.attr('width', x.rangeBand())
			.attr('height', function(d) { return height - y(d.votes); })
			.attr('fill', function (d) { return colors(d.name); })

		bar.append('text')
			.attr('dy', '.75em')
			.attr('class', function(d) {
				var rectHeight = height - y(d.votes);
				if (rectHeight < 15) {
					return 'chart-text-black';
				}
				return 'chart-text-white';
			})
			.attr('y', function(d) {
				var rectHeight = height - y(d.votes);
				if (rectHeight < 15) {
					return -12;
				}
				return 6;
			})
			.attr('x', function(d) { return (x.rangeBand() / 2 )})
			.attr('text-anchor', 'middle')
			.text(function(d) { return d.votes; });

        return (
                <div>
					<svg className = "barChart" />
				</div>
        )
    }
});
