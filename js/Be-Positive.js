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
    
    let patientBlood = [
      {
        receiveType: BloodType.AB_POS,
        acceptType: [BloodType.AB_POS, BloodType.AB_NEG, BloodType.A_POS, BloodType.A_NEG, BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.AB_NEG,
        acceptType: [BloodType.AB_NEG, BloodType.A_NEG, BloodType.B_NEG, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.A_POS,
        acceptType: [BloodType.A_POS, BloodType.A_NEG, BloodType.O_POS, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.A_NEG,
        acceptType: [BloodType.A_NEG, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.B_POS,
        acceptType: [BloodType.B_POS, BloodType.B_NEG, BloodType.O_POS, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.B_NEG,
        acceptType: [BloodType.B_NEG, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.O_POS,
        acceptType: [BloodType.O_POS, BloodType.O_NEG]
      },
      {
        receiveType: BloodType.O_NEG,
        acceptType: [BloodType.O_NEG]
      }
    ];

    function checkInventoryFor(acceptType) {
      for(let i = 0; i < acceptType.length; i++) {
        if(blood_inventory[acceptType[i]] > 0) { return acceptType[i]; }
      }
      return false;
    }

    for(let i = 0; i < patientBlood.length; i++) {
      if(patient.blood_type === patientBlood[i].receiveType) {
        return checkInventoryFor(patientBlood[i].acceptType);
      }
    }

  }

};