import React from 'react'
//hook pro použití kontextu
import {useContext} from 'react'
//importovaný objekt s kontextem
import {RoomContext} from '../context'
import Title from '../components/Title'

//get unique values
//z pole, do kterého jsme vložily hodnoty určitého typu, vytvoříme Set
//objekt Set obsahuje jen unikátní hodnoty
const getUnique = (items, value) => {
    //console.log(items);
    //pro přístup k objektu item musíme použít bracket notation, protože vlastnost je definována dynamicky
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {

    //do proměnné context přiřaď hodnoty objektu RoomContext
    const context = useContext(RoomContext)
    //console.log(context);
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context

   
    //vytvoř pole typů 
    let types = getUnique(rooms,'type')
    //console.log(types);
    //přidej "typ" all
    types = ['all', ...types]
    //vytvoř JSX
    types = types.map((item,index) => {
        return(
        <option key={index} value={item}>{item}</option>
        )
    })
    //vytvoř pole dostupných kapicit pokojů
    let people = getUnique(rooms, 'capacity')
    people = people.map((item, index) => {
        return(
            <option key={index} value={item}>{item}</option>
        )
    })

    return(
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                        name="type" 
                        id="type" 
                        value={type}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* guests */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select 
                        name="capacity" 
                        id="capacity" 
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* price filter                 */}
                <div className="form-group">
                    <label htmlFor="price">Room Price ${price}</label>
                    <input 
                        type="range" 
                        name="price" 
                        id="price"
                        min={minPrice}
                        max={maxPrice}
                        value={price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* size filter */}
                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input 
                            type="number" 
                            name="minSize" 
                            id="size"
                            value={minSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                        <input 
                            type="number" 
                            name="maxSize" 
                            id="size"
                            value={maxSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                    </div>
                </div>
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input 
                            type="checkbox" 
                            name="breakfast" 
                            id="breakfast"
                            checked={breakfast}
                            onChange={handleChange}
                        />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input 
                            type="checkbox" 
                            name="pets" 
                            id="pets"
                            checked={pets}
                            onChange={handleChange}
                        />
                        <label htmlFor="pets">pets</label>
                    </div>                    
                </div>
            </form>
        </section>
    )
}
