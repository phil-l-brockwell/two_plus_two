import React from "react";
import PropTypes from 'prop-types';

class LandingPage extends React.Component {
  render() {
  	return (
  		<div className="content">
  			<p>This is the home page</p>
  		</div>
  	)
  }
}

LandingPage.propTypes = {
  currentUser: PropTypes.object
}

export default LandingPage;
