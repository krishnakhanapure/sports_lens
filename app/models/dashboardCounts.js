var queryConstant = require('../../config/queries.js');


let openPostionCountTotal='GET_OPEN_POSITION_COUNT', 
offerReleasedWithBackup='GET_COUNT_OFFER_RELEASED_WITH_BACKUP', 
	offerReleasedWithoutBackup='GET_COUNT_OFFER_RELEASED_WITHOUT_BACKUP', 
	openPositionByTechnology='GET_OPEN_POSITION_BY_TECHNOLOGY',
	offerForeachTechnologyWithoutBackup='GET_OFFER_FOR_TECHNOLOGY_WITHOUT_BACKUP',
	offerForeachTechnologyJoined = 'GET_COUNT_OFFER_RELEASED_JOINED',
	offerWhoJoined = 'GET_OFFER_WHO_JOINED',
	offerForTechnology = 'GET_ALL_OFFER';

module.exports = {openPostionCountTotal: openPostionCountTotal,
offerReleasedWithBackup: offerReleasedWithBackup,
offerReleasedWithoutBackup: offerReleasedWithoutBackup,
openPositionByTechnology: openPositionByTechnology,
offerForeachTechnologyWithoutBackup: offerForeachTechnologyWithoutBackup,
offerForeachTechnologyJoined: offerForeachTechnologyJoined,
offerWhoJoined:offerWhoJoined,
offerForTechnology:offerForTechnology};



