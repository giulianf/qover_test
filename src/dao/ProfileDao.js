import _ from 'lodash';
import { createDateMongo } from '../common/Utility';
import { BasicInfo } from '../model/BasicInfo';
import async from 'async';
import ValidatorBasic from '../validator/validatorBasicInfo';

export class ProfileDao extends BasicDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }


    /**
     * getBasicInfo - Get Basic Info by User id
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    getBasicInfo(res, user, email) {
        info('Entering getBasicInfo() data: ' + JSON.stringify( user ) + ' email: ' + email);

         try {
             const userId = user;
             let basicProfil = null;

             if (_.isNil(this._mongodb)) {
                 throw new Error("La base de données n'est pas connectée.");
             }

            async.series([
                (callback) => {
                    this.getClientByUserId( userId, email, (profile, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicProfil = profile;
                        callback();
                    });
                },
                (callback) => {
                    debug("****  BasicProfil: " + JSON.stringify( basicProfil ) );

                    res.end( JSON.stringify( basicProfil ) );
                }
            ], (err) => {
                error("Unable to getBasicInfo. " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des infos. ' + e.message);
        }
    }


}
