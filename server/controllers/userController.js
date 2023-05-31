const { User, sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    const { username, email, password, phone, address } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create({ username, email, password, phoneNumber: phone, address }, { transaction });
      const access_token = encodeToken({ id: user.id });

      await transaction.commit();

      res.status(201).json({ access_token });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: '!email' };

      if (!password) throw { name: '!password' };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: '!user' };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: '!isValidPassword' };

      const access_token = encodeToken({ id: user.id });

      res.json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
