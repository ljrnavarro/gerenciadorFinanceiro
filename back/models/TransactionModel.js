module.exports =  (mongoose) => {
  const schema = mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      //Valida se a nota inserida e' menor que zero
      validate(value) {
        if (value < 0) throw new Error('Valor negativo para nota');
      }
    },
      month: {
        type: Number,
        required: true,
        //Valida se a nota inserida e' menor que zero
        validate(value) {
          if (value < 0) throw new Error('Valor negativo para nota');
        }
      },
        day: {
          type: Number,
          required: true,
          //Valida se a nota inserida e' menor que zero
          validate(value) {
            if (value < 0) throw new Error('Valor negativo para nota');
          },
        },
        yearMonth: {
          type: String,
          required: true,
        },
        yearMonthDay: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        }
      });

  /*schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });*/
  const Transaction = mongoose.model('transactions', schema, 'transactions');
  return Transaction;
};
