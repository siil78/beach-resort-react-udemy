//ukázka higher order komponenty
import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import {withRoomConsumer} from '../context'
import Loading from './Loading'

function RoomsContainer({context}) {

    const {loading, sortedRooms, rooms} = context
    
    if(loading) {
        return(
            <Loading/>
        )
    }

    return(
        <div>            
            <RoomsFilter rooms={rooms}/>
            <RoomsList rooms={sortedRooms}/>
        </div>
    )
}

export default withRoomConsumer(RoomsContainer)

// //kod bez higher order komponenty
// import React from 'react'
// import RoomsFilter from './RoomsFilter'
// import RoomsList from './RoomsList'
// //context consumer jako komponenta
// import {RoomConsumer} from '../context'
// import Loading from './Loading'

// export default function RoomsContainer() {
//     return (
//         // JSX obalíme do komponenty konzumenta kontextu
//         <RoomConsumer>            
//             {/* value představuje hodnotu předanou v providerem kontextu */}
//             {
//                 value => {
//                     const {loading, sortedRooms, rooms} = value

//                     if(loading) {
//                         return(
//                             <Loading/>
//                         )
//                     }

//                     return(
//                         <div>
//                             hello from rooms container
//                             <RoomsFilter rooms={rooms}/>
//                             <RoomsList rooms={sortedRooms}/>
//                         </div>
//                     )
//                 }
//             }
//         </RoomConsumer>

//     )
// }
