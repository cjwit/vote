import React, { Component, PropTypes } from 'react';

export default class BarChart extends Component {
	static propTypes = {
		poll: PropTypes.object.isRequired
	}

	render() {
		$(".barChart").html("");
		let data = this.props.poll.options,
			margin = { top: 10, right: 0, bottom: 10, left: 20 },
			width = 300 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom;

		const x = d3.scale.ordinal()
			.domain(data.map( (d) => d.name ))
			.rangeRoundBands([0, width], .1);

		const colors = d3.scale.category10();

		const y = d3.scale.linear()
			.domain([0, d3.max(data, (d) => d.votes )])
			.range([height, 0]);

		const chart = d3.select('.barChart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
		  .append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		const bar = chart.selectAll('.bar')
			.data(data)
		  .enter().append('g')
			.attr('class', 'bar')
			.attr('transform', (d) => `translate(${x(d.name)}, ${y(d.votes)})`)

		bar.append('rect')
			.attr('x', 1)
			.attr('width', x.rangeBand())
			.attr('height', (d) => height - y(d.votes) )
			.attr('fill',  (d) => colors(d.name) )

		bar.append('text')
			.attr('dy', '.75em')
			.attr('class', (d) => {
				let rectHeight = height - y(d.votes);
				if (rectHeight < 15) {
					return 'chart-text-black';
				}
				return 'chart-text-white';
			})
			.attr('y', (d) => {
				let rectHeight = height - y(d.votes);
				if (rectHeight < 15) {
					return -12;
				}
				return 6;
			})
			.attr('x', (d) => (x.rangeBand() / 2) )
			.attr('text-anchor', 'middle')
			.text((d) => d.votes );

		return (
			<div className = "poll-chart">
				<svg className = "barChart" />
			</div>
		);
	}
}
