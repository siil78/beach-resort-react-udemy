import React, { Component } from 'react'
//import items from './data'
import Client from './Contentful'

//ukázka získání dat z contentful
// Client.getEntries({
//     //upřesnění typu obsahu
//     //bez upřesnění vrací všechen náš obsah
//     //https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/content-type/query-entries/console/js
//     content_type: 'beachResortRoom'
// })
//     .then(response => console.log(response.items))
//     .catch(err => console.log(err))

//vytvoření objektu kontextu
const RoomContext = React.createContext()

//pomůžeme si, že vytvoříme třídu RommProvider, která bude moci jako hodnotu použít svůj stav
class RoomProvider extends Component {

    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        //položky pro filtry
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0, 
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                //upřesnění typu obsahu
                //bez upřesnění vrací všechen náš obsah
                //https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/content-type/query-entries/console/js
                content_type: 'beachResortRoom',
                //seřaď data
                //https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/order/query-entries/console/js
                order: 'sys.createdAt'
            })            
            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured === true)
            //přiřaď do maximální ceny maximální cenu z dat o pokojích
            //analogicky maximální velikost
            let maxPrice = Math.max(...rooms.map(item => item.price))
            let maxSize = Math.max(...rooms.map(item => item.size))
    
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false, 
                //nastav nejvyšší zjištěné výchozí hodnoty
                price: maxPrice,
                maxPrice,
                maxSize
            })
        } catch(error) {
            console.log(error)
        }
    }

    //získá data a nastaví stav komponenty
    componentDidMount() {
        this.getData()
    }

    //připraví data do potřebného formátu
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id 
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = {...item.fields, images, id}
            return room
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        // find vrací objekt a první výskyt který odpovídá dotazu
        //pro nás výhodné
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }

    handleChange = event => {
        const target = event.target
        //podle typu target získej hodnotu
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name 
        //nastav stav a proveď filtr 
        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms = () => {
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state
        let tempRooms = [...rooms]
        //přetypuj, pokud je třeba
        capacity = parseInt(capacity)
        price = parseInt(price)
        //filtr pro typ pokojů
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filtr podle kapacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }
        //filtr podle ceny
        tempRooms = tempRooms.filter(room => room.price <= price)        
        //filtr podle velikosti
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
        //filtr podle extras 
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        //změň stav na základě filtrů
        this.setState({
            sortedRooms: tempRooms
        })

    }

    //musíme definovat komponentu RoomContext.Provider
    render() {
        return (
            // metodu getRoom pošleme v kontextu jako vlastnost getRoom
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//a RoomContext.Consumer
const RoomConsumer = RoomContext.Consumer

//ukázka higher order komponenty
//vyhneme se používání arrow funkce při předávání kontextu
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return(
            <RoomConsumer>
                {
                    value => <Component {...props} context={value} />
                }
            </RoomConsumer>
        )
    }
}

export { RoomProvider, RoomConsumer, RoomContext }
