import React from 'react';

class Footer extends React.Component {
    render() {
		return (
			<div id="footer">
				<p>
					Email <a href = 'mailto:chris.witulski@gmail.com'>chris.witulski@gmail.com</a> with any questions or comments.<br/>
					Website by <a href = 'http://cjwit.github.io' target = '_blank'>Christopher Witulski</a>
				</p>
			</div>
		);
    }
}

export default Footer;
