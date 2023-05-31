const { User, Post } = require('../models');
const { decodeToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) throw { name: 'InvalidToken' };

    const payload = decodeToken(access_token);

    let user = await User.findByPk(payload.id);
    if (!user) throw { name: 'InvalidToken' };

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    const { id, role } = req.user;

    const post = await Post.findByPk(req.params.id);
    if (!post) throw { name: '!post' };
    
    if (id !== post.authorId) throw { name: 'Forbidden' };

    if (id !== post.authorId && role !== 'Admin') throw { name: 'Forbidden' };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorization,
};
