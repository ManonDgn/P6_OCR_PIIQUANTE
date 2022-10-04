const MongooseErrors = require('mongoose-errors')

// Modèle-type des remontées d'erreurs
const ModelSchema = new Schema({
    requiredField: {
        type: String,
        required: true
    }
});

ModelSchema.plugin(MongooseErrors);

Model = mongoose.model('ModelName', ModelSchema);
Model
    .create(test)
    .catch(error => {
        console.log(error.statusCode);
        done();
    });
