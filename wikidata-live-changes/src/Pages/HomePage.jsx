import React, { Component } from 'react'
import GraphCard from '../Components/GraphCard'

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = { history: this.props.history }
	}

	render() {
		return (
			<div className="HomePage">
				<p>Wikidata Live Changes</p>
				<GraphCard
					title="Card"
					history={this.state.history}
					pageLink="page"
				/>
			</div>
		)
	}
}

export default HomePage
