import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import {store} from '../redux_guts/redux'
import { v4 as uuidv4 } from 'uuid'

const mapStyles = {
    width: '100%',
    height: '100%'
}

class GMaps extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zoom: 15,
            location: {
                lat: 28.5385,
                lng: -81.3972
            },
            markerList: []
        }
        this.unsub = undefined
    }

    handleMarkerClick = () => {
        this.setState({
            zoom: 20
        })
    }

    onReduxChange = () => {
        if (store.getState().cardSelectedID !== "") {
            let activeCard = store.getState().infoList.allCards[store.getState().cardSelectedID]
            if (activeCard.address !== undefined)  {
                let url = new URL("https://api.geocod.io/v1.6/geocode")
                let params = {q: activeCard.address, api_key:"afb2b5b6ba6f4525df26fa56fb2d6aad6a22b6f"}
                url.search = new URLSearchParams(params).toString()

                fetch(url).then(response => response.json()).then(data => {
                    this.setState({
                        location: {
                            lat: data.results[0].location.lat,
                            lng: data.results[0].location.lng
                        }
                    }, () => {
                        let temp = [];
                        temp.push(<Marker onClick={this.handleMarkerClick} key={uuidv4()} title={activeCard.address} position={{lat: this.state.location.lat, lng: this.state.location.lng}}/>)
                        this.setState({markerList: temp})
                    })
                })
            }
        }
    }

    componentDidMount() {
        this.unsub = store.subscribe(this.onReduxChange)
    }

    render() {
        return (
            <Map 
                mapTypeControl={false}
                fullscreenControl={false}
                google = {this.props.google}
                zoom = {this.state.zoom}
                style= {mapStyles}
                center = {
                    {
                        lat: this.state.location.lat,
                        lng: this.state.location.lng
                    }
                }

                initialCenter = {
                    {
                        lat: 28.5385,
                        lng: -81.3972
                    }
                }
            >
            {this.state.markerList}                
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC8NuoBbOoM93jhrshg0rC6GlPcgpQ0dgg'
})(GMaps)