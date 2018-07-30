import React from "react";
import { Link } from "react-router-dom";

let socialMediaLinks = [
	{
		name: "youtube",
		url: "https://www.youtube.com/channel/UCJVckPp2VNERm639Cj8-j7A"
	},
	{
		name: "linkedin",
		url: "https://uk.linkedin.com/in/phil-brockwell-18676087"
	},
	{ name: "github",
		url: "https://github.com/phil-l-brockwell"
	},
	{ name: "twitter",
		url: "https://twitter.com/pokerengineer"
	}
];

class Footer extends React.Component {
	render() {
		return (
			<footer>
				{socialMediaLinks.map((link, i) => (
					<Link to={link["url"]} key={i}>
						<i className={`fa fa-${link["name"]} fa-lg`} aria-hidden="true" />
					</Link>
				))}
			</footer>
		);
	}
}

export default Footer;
