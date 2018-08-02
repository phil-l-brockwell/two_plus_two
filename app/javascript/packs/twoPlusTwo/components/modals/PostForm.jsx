import React from "react";
import axios from "axios";

class PostForm extends React.Component {
	constructor() {
		super();
		this.state = {
			style: { display: "none" },
			errorMessage: ""
		};
	}

	render() {
		return (
			<div className="modal" style={this.state.style}>
				<form>
					<i
						className="fa fa-close"
						aria-hidden="true"
						onClick={this.hide.bind(this)}
					/>
					<input id="title" placeholder="enter title..." type="text" />
					<input id="subtitle" placeholder="enter subtitle..." type="text" />
					<textarea
						id="text"
						placeholder="enter text..."
						rows="10"
						cols="70"
						wrap="soft"
					/>
					<input
						onClick={this._send.bind(this)}
						value="Publish"
						type="submit"
					/>
					<p>{this.state.errorMessage}</p>
				</form>
			</div>
		);
	}

	show() {
		this.setState({ style: { display: "block" } });
	}

	hide(e) {
		if (e) {
			e.preventDefault();
		}

		this.setState({ style: { display: "none" }, errorMessage: "" });
	}

	clear() {
		document.getElementById("title").value = "";
		document.getElementById("subtitle").value = "";
		document.getElementById("text").value = "";
	}

	_send(e) {
		e.preventDefault();
		const that = this;

		axios
			.post("/api/posts", this._payload())
			.then(function(response) {
				that.hide();
				that.clear();
				that.props.fetchPosts();
			})
			.catch(function(response) {
				that.setState({ errorMessage: "Ensure all fields are completed" });
			});
	}

	_payload() {
		return {
			post: {
				title: document.getElementById("title").value,
				subtitle: document.getElementById("subtitle").value,
				text: document.getElementById("text").value
			}
		};
	}
}

export default PostForm;
