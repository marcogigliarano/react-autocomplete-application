import React, { useState, useRef } from 'react'
import getWords from '../api/getWords'
import './Autocomplete.style.css'
import debounce from '../utils/debounce'
import highlightWord from '../utils/highlightWord'

const AutocompleteWithFunc = () => {

    const [state, setState] = useState({
        autocomplete: '',
        loading: false,
        showList: false,
        list: []
    })

    const _onChange = (e) => {
        updateField(e.target.value)
    }

    const _onBlur = () => {
        setTimeout(() => {
            setState((prev) => ({
                ...prev,
                showList: false
            }))
        },250)
    }

    const _onFocus = () => {
        if(state.list.length > 0) {
            setState((prev) => ({
                ...prev,
                showList: true
            }))
        }
    }

    const _onClick = (value) => {
        setState((prev) => ({
            ...prev,
            autocomplete: value
        }))
    }

    const searchWords = useRef(debounce(async value => {
        const list = await getWords(value)
        setState((prev) => ({
            ...prev,
            loading: false, 
            list: list
        }))
    }, 500)).current

    const updateField = (value) => {
        try {
            setState({ 
                autocomplete: value,
                showList: value !== '',
                loading: true,
                list: value === '' && []
            })
            value !== '' && searchWords(value)
        } catch (error) {
            throw new Error(error)
        }
    }

    const renderList = () => {
        if(state?.list?.length > 0) {
            return state?.list?.map((word) => (
                <li 
                    key={word?.id}
                    dangerouslySetInnerHTML={{__html: highlightWord(word?.value, state.autocomplete)}}
                    onClick={() => _onClick(word?.value)}
                />)
            )
        }
        return <li>No matches</li>
    }
    
    
    return (
        <div className="input-container">
            <input 
                autoComplete="off"
                className="input-field"
                type="text" 
                placeholder="Insert text here"
                name="autocomplete" 
                value={state.autocomplete} 
                onChange={(e) => _onChange(e)}
                onBlur={() => _onBlur()}
                onFocus={() => _onFocus()}
            />
            {
                state.showList && (
                    <ul className="list-container">
                        {
                            state.loading 
                                ? <li>Loading...</li> 
                                : renderList()
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default AutocompleteWithFunc