import React from "react";

export default class Footer extends React.Component {
  constructor() {
    super();
    this.linkData = [
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
      },
      {
        name: "adn",
        url: "https://andiapp.co"
      }
    ];
  }

  render() {
    const links = this.linkData.map((link, i) => (
      <a href={link.url} key={i}>
        <i className={`fa fa-${link.name} fa-lg`} aria-hidden="true" />
      </a>
    ));

    return <footer>{links}</footer>;
  }
}
