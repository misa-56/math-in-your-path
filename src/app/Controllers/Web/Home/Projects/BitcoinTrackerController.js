const axios = require('axios');

class BitcoinTrackerController {
    index(req, res) {
        res.render('partials/user/main/articles/bitcoin-tracker', {});
    }

    handleSocketConnection(socket) {
        console.log('A user connected.');

        const getPriceUpdates = async () => {
        try {
            while (true) {
            const response = await axios.get(
                'https://api.coincap.io/v2/assets/bitcoin'
            );
            const bitcoinPrice = response.data.data.priceUsd;
            socket.emit('bitcoinData', bitcoinPrice);
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay for 3 second
            }
        } catch (error) {
            console.error('Error fetching Bitcoin price:', error);
        }
        };

        getPriceUpdates();

        socket.on('disconnect', () => {
        console.log('A user disconnected.');
        });
    }
}

module.exports = new BitcoinTrackerController();
