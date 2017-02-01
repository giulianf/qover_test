import _ from 'lodash';
import {BasicDao} from './BasicDao';
import { SimulatorInfo } from '../model/SimulatorInfo';
import async from 'async';
import Validator from '../validator/validatorBasicInfo';

export class SimulatorDao extends BasicDao {

    constructor() {
        super();

        super.setdb();
        this.queryGetCarNameList = "SELECT c.value as value, c.label as label" +
             " FROM CAR_NAME_T c order by c.value" ;
        this.queryInsertResult = "INSERT INTO CalCULATOR_T (creation_date, user_id, name, car_name, car_value, status, price) " +
        " values ($creationDate, $userId, $name, $carName, " +
            " $carValue, $status, $price)" ;
    }

    calculateData(res, simulateData, userId) {
        this.info('Entering calculateData() data: ' + JSON.stringify( simulateData ));
        let priceFinal;
        let carList=[];
        // Verify the data
        // Check BR
        // Store the result
        // Send back the price
        // Send an email
         async.series([
             (callback) => {
                 // verify data

                callback();
             },
             (callback) => {
                 // Check BR
                 this.getCarList((cars, err) => {
                     if (err) {
                         callback(err);
                         return;
                     }

                     carList = cars;
                     callback();
                 })
             },
             (callback) => {
                 try {
                     Validator.validateSimulator(simulateData, carList);

                     callback();
                 } catch(e) {
                     callback("Unable to check business rules. " + e.message);
                     return;
                 }
             },
             (callback) => {
                 priceFinal = this.calculatePrice(simulateData);
                  callback();
             },
             (callback) => {
                 this.insertResult(priceFinal, 'OK', simulateData, userId, (err) => {
                     if (err) {
                         callback(err);
                     }
                     this.debug("Data stored");
                     callback();
                 });
             },
             (callback) => {
                 // send email
                callback();
             },
            (callback) => {
                this.debug("****  final price: " + priceFinal );

                res.end( "priceFinal.toString()" );
            }
            ], (err) => {
                this.insertResult(priceFinal, 'REJECT', simulateData, userId, (err) => {
                    this.info('test');

                });

                this.responseError("Unable to calculateData. " , err, res);
            });
    }

    calculatePrice(simulateData) {
        switch (simulateData.carName) {
            case "AUDI":
            return 250 + ((parseFloat(simulateData.carValue) * 3) / 1000);
                break;
            case "BMW":
             return 150 + ((parseFloat(simulateData.carValue) * 4) / 1000);
                break;
            case "PORSCHE":
            return 500 + ((parseFloat(simulateData.carValue) * 7) / 1000);
                break;
            default:
            return 0;

        }

    }

    insertResult(priceFinal, status, simulateData, userId, callbackFunc) {
        this.info('test');

        super.getDbQover.all(this.queryInsertResult,
        {
            $creationDate: BasicDao.getLogDate(),
            $userId: userId,
            $name: simulateData.name,
            $carName: simulateData.carName,
            $carValue: simulateData.carValue ,
            $status: status,
            $price: priceFinal
           }, (err, row) => {
              if (err) {
                  return callbackFunc(err);
              }
            callbackFunc()
           });
    }

    getCarNameList(res) {
        try {
            this.info('Entering getCarNameList()');
            let carList = [];
            async.series([
                (callback) => {
                    this.getCarList((cars, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        carList = cars;
                        callback();
                    });
               },
               (callback) => {
                   this.debug("****  Car name list: " + JSON.stringify( carList ) );

                   res.end( JSON.stringify( carList ) );
               }
               ], (err) => {
                   this.responseError("Unable to getCarNameList. " , err, res);
               });
        } catch (e) {
            this.responseError("Unable to getCarNameList. " , e, res);
        }
    }

    /**
     * getCarList - query to have all car name list
     *
     * @return {type}  description
     */
    getCarList(callback) {
        try {
            this.info('Entering getCarList()');
            let carList = [];
            super.getDbQover.all(this.queryGetCarNameList, (err, rows) => {
                   if (err) {
                       return callback(err);
                   }
                   _.forEach(rows, carName => {
                       carList.push(carName);
                   });

                    callback(carList);
               });
        } catch (e) {
            callback(null, e);
        }
    }

}
