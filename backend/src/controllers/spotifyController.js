const axios = require('axios');
const GenericController = require("./genericController");


const Controller = class spotifyController extends GenericController{

    constructor() {
        super();
        this.startSearch = this.startSearch.bind(this);
        this.searchAnything = this.searchAnything.bind(this);

    }

    async searchAnything(req, res) {
        const searchValue = req.query.searchValue;
        const searchOption = req.query.selectedOption.toLowerCase();
        const access_token = req.query.access_token

        await this.startSearch(searchValue, searchOption, access_token, res)
    }


    async startSearch(searchValue, searchOption, access_token, res) {
        console.log(access_token)
        const headers = {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        };

        if (searchOption === 'all') {
            searchOption = 'search';
            console.log(`https://api.spotify.com/v1/${searchOption}/${searchValue}`)
        }

        try {
            const response = await axios.get(`https://api.spotify.com/v1/${searchOption}/${searchValue}`, {headers});
            res.status(200).json({data: response.data, access_token: access_token});
        } catch (error) {
            // check if the text 'token expired' is in error
            if (error.response.data.error.message.includes('token expired')) {
                const newToken = await this.getAccessToken();
                await this.startSearch(searchValue, searchOption, newToken, res);
            } else {
                console.error('Error getting artist info', error);
                res.status(500).json({message: 'Error getting artist info', access_token: access_token});
            }
        }
        }
}

module.exports = {
    Controller
}