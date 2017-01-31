import { getDateISO } from '../common/Utility';
import _ from 'lodash';

export class BasicInfo {
    /**
     * constructor - description
     *
     * @param  {Object} client      description
     * @param  {string} id      description
     * @param  {string} user_id      description
     * @param  {string} nom           description
     * @param  {Date} createDate                       creation date
     */
    constructor(client, user_id, nom, createDate) {
        if (!_.isNil(client)) {
            this.id = client._id;
            this.user_id = client.user_id;
            this.nom = client.nom;
            this.createDate= client.createDate;
        } else {
            this.user_id= user_id;
            this.nom= nom;
            this.createDate = createDate;
        }
    }

    toLog() {
        return 'id: ' + this.id + ' user_id: ' + this.user_id + ' nom: ' + this.nom +
        ' createDate ' + this.createDate ;
    }
}
