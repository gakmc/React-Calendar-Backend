const { response } = require("express");
const Evento = require("../models/Evento");


const getEventos = async(req, res = response)=>{

    const eventos = await Evento.find()
                                .populate('user', 'name');

    return res.status(200).json({
        ok:true,
        eventos
    });
};

const crearEvento = async(req, res = response)=>{

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Comuniquese con el administrador'
        })
    }

};

const actualizarEvento = async(req, res = response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un evento con el ID seleccionado'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene los privilegios para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok:true,
            evento: eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        })
    }

};

const eliminarEventos = async(req, res = response)=>{


    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un evento con el ID seleccionado'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene los privilegios para eliminar este evento'
            })
        }


        await Evento.findByIdAndDelete(eventoId)

        res.json({
            ok:true,
            msg: 'Evento eliminado satisfactoriamente'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        })
    }

};



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEventos
}