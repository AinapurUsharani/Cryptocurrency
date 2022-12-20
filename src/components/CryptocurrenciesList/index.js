import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {currencyList: [], isLoading: true}

  componentDidMount() {
    this.renderItemsFromServer()
  }

  renderItemsFromServer = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()

    const AllCurrencyItems = data.map(each => ({
      currencyName: each.currency_name,
      usdValue: each.usd_value,
      euroValue: each.euro_value,
      id: each.id,
      currencyLogo: each.currency_logo,
    }))

    this.setState({currencyList: AllCurrencyItems, isLoading: false})
  }

  getAllItems = () => {
    const {currencyList} = this.state

    return (
      <div className="response">
        <h1 className="heading">Cryptocurrency Tracker</h1>

        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="logo-image"
        />
        <div className="items-container">
          <li className="list-container">
            <h1 className="name1">Coin Type</h1>
            <div className="value-container">
              <h1 className="name">USD</h1>
              <h1 className="name">EURO</h1>
            </div>
          </li>

          {currencyList.map(each => (
            <CryptocurrencyItem details={each} key={each.id} />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="responsive-container">
        {isLoading ? (
          <div testid="loader">
            >
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.getAllItems()
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
