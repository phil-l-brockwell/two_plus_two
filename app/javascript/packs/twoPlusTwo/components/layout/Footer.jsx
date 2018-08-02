import React from "react";

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
  },
  {
    name: "stack-overflow",
    url: "https://stackoverflow.com/users/4543415/phil-brockwell"
  }
];

class Footer extends React.Component {
  render() {
    return (
      <footer>
        {socialMediaLinks.map((link, i) => (
          <a href={link["url"]} key={i}>
            <i className={`fa fa-${link["name"]} fa-lg`} aria-hidden="true" />
          </a>
        ))}
      </footer>
    );
  }
}

export default Footer;
