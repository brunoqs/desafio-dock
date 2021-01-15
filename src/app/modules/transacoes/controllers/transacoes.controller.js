const debug = require('debug')('app:icmbio');

const extrato = async (req, res, next) => {
    try {


        return res.status(200).json('TODO');
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

const extratoPeriodo = async (req, res, next) => {
    try {


        return res.status(200).json('TODO');
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    extrato,
    extratoPeriodo
}