import React from 'react'
import getWords from '../api/getWords'
import './Autocomplete.style.css'
import debounce from '../utils/debounce'
import highlightWord from '../utils/highlightWord'

export default class AutocompleteWithClass extends React.Component {

    constructor() {
        super()
        this.state = {
            autocomplete: '',
            loading: false,
            showList: false,
            list: []
        }
    }

    _onChange(e) {
        this.updateField(e.target.value)
    }

    _onBlur() {
        setTimeout(() => {
            this.setState({showList: false})
        },250)
    }

    _onFocus() {
        if(this.state?.list?.length > 0) {
            this.setState({showList: true})
        }
    }

    _onClick(value) {
        this.setState({
            autocomplete: value
        })
    }

    searchWords = debounce(async value => {
        const list = await getWords(value)
        
        this.setState({ 
            loading: false,
            list
        })
    }, 500)

    updateField(value) {
        try {
            this.setState({ 
                autocomplete: value,
                showList: value !== '',
                loading: true,
                list: value === '' && []
            })
            value !== '' && this.searchWords(value)
        } catch (error) {
            alert('Server offline, restart server and try again!')
            throw new Error(error)
        }
    }

    renderList() {
        if(this.state?.list?.length > 0) {
            return this.state?.list?.map((word) => (
                <li 
                    key={word?.id}
                    dangerouslySetInnerHTML={{__html: highlightWord(word?.value, this.state.autocomplete)}}
                    onClick={() => this._onClick(word?.value)}
                />)
            )
        }
        return <li>No matches</li>
    }
    
    render() {
        return (
            <div className="input-container">
                <input 
                    autoComplete="off"
                    className="input-field"
                    type="text" 
                    placeholder="Insert text here"
                    name="autocomplete" 
                    value={this.state.autocomplete} 
                    onChange={(e) => this._onChange(e)}
                    onBlur={() => this._onBlur()}
                    onFocus={() => this._onFocus()}
                />
                {
                    this.state.showList && (
                        <ul className="list-container">
                            {
                                this.state.loading 
                                    ? <li>Loading...</li> 
                                    : this.renderList()
                            }
                        </ul>
                    )
                }
            </div>
        )
    }
}