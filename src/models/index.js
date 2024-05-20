const UserModel = require('./user.model');
const TokenModel = require('./token.model');
const CompanyModel = require('./company.model');
const QuizModel = require('./quiz.model');

// no es necesario y es redundante, ya se hace en el modelo de una forma más especifica.
// UserModel.hasMany(TokenModel);
// TokenModel.belongsTo(UserModel);
// QuizModel.belongsTo(CompanyModel);

module.exports = {
  User: UserModel,
  Token: TokenModel,
  Company: CompanyModel,
  Quiz: QuizModel,
};
