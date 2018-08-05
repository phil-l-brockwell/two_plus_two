import React from "react";

class Footer extends React.Component {
  constructor() {
    super();
    this.socialMediaLinks = [
      {
        name: "youtube",
        url: "https://www.youtube.com/channel/UCJVckPp2VNERm639Cj8-j7A"
      },
      {
        name: "linkedin",
        url: "https://uk.linkedin.com/in/phil-brockwell-18676087"
      },
      {
        name: "github",
        url: "https://github.com/phil-l-brockwell"
      },
      {
        name: "twitter",
        url: "https://twitter.com/pokerengineer"
      },
      {
        name: "stack-overflow",
        url: "https://stackoverflow.com/users/4543415/phil-brockwell"
      }
    ];
  }

  render() {
    return (
      <footer>
        {this.socialMediaLinks.map((link, i) => (
          <a href={link["url"]} key={i}>
            <i className={`fa fa-${link["name"]} fa-lg`} aria-hidden="true" />
          </a>
        ))}
      </footer>
    );
  }
}

export default Footer;
