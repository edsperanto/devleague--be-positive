BloodType = {
  
  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {
  
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 200,

  /**
   * returns BloodType, or false to give no BloodType
   * 
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   * 
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   * 
   */

  receive_patient : function (blood_inventory, patient) {
    
    let patientBloodType = [BloodType.AB_POS, BloodType.AB_NEG, BloodType.A_POS, BloodType.A_NEG, BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS, BloodType.O_NEG];

    let acceptType = [
      [BloodType.AB_POS, BloodType.AB_NEG, BloodType.A_POS, BloodType.A_NEG, BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS, BloodType.O_NEG],
      [BloodType.AB_NEG, BloodType.A_NEG, BloodType.B_NEG, BloodType.O_NEG],
      [BloodType.A_POS, BloodType.A_NEG, BloodType.O_POS, BloodType.O_NEG],
      [BloodType.A_NEG, BloodType.O_NEG],
      [BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS, BloodType.O_NEG],
      [BloodType.B_NEG, BloodType.O_NEG],
      [BloodType.O_POS, BloodType.O_NEG],
      [BloodType.O_NEG]
    ];

    function checkInventoryFor(acceptType) {
      for(let i = 0; i < acceptType.length; i++) {
        if(blood_inventory[acceptType[i]] > 0) { return acceptType[i]; }
        return false;
      }
    }

    return checkInventoryFor(acceptType[patientBloodType.indexOf(patient.blood_type)]);

  }

};