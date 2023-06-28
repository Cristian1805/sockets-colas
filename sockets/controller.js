const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {

        const siguiente = ticketControl.siguiente();
        callback ( siguiente ); 

        //Notificar que hay un nuevo ticket por asignar
    });

    socket.on('atender-ticket', ({ escritorio }, callback)=> {

        if (!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        //Notificar cambio en los ultimos 4 
        
        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }

    })

}



module.exports = {
    socketController
}

