import _ from 'lodash';

export default {
  validateProfileTabBasic(basicInfo) {
      if (_.isNil(basicInfo)) {
          throw new Error("Impossible de valider le profil utilisateur.");
      }
      
      if (!this.validateNom(basicInfo.nom)) {
          throw new Error("Le prénom n'est pas valid.");
      }
      
  },

  validateNom(nom) {
      return !_.isNil(nom) && !_.isEmpty(nom) ? true : false;
  }
};
