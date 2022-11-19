/*
 * AUTH ROUTES:
 * host + /api/auth
 */
import { Request, Response } from "express";

namespace AuthCntroller {
  const bcrypt = require('bcryptjs');
  const { createJWT } = require('../helpers/jwt')
  const User = require('../models/User');

  const createUser = async (req: Request, res:Response) => {

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email });
      if ( user ) {
        return res.status(400).json({
          ok: false,
          msg: 'This user already exists'
        })
      }

      user = new User( req.body );

      //Encrypt password
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      //Generate JWT token
      const token = await createJWT(user.id, user.name)

      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        email: user.email,
        token
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Something went wrong'
      })
    }
  }

  const loginUser = async (req: Request, res: Response) => {

      const { email, password } = req.body

      try {

        let user = await User.findOne({ email });
        if ( !user ) {
          return res.status(400).json({
            ok: false,
            msg: 'User not found'
          })
        }
        
        //Check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if ( !validPassword ) {
          return res.status(400).json({
            ok: false,
            msg: 'Invalid password'
          })
        }

        //Generate JWT token
        const token = await createJWT(user.id, user.name)

        res.json({
          ok: true,
          uid:user.id,
          name: user.name,
          email: user.email,
          token
        });
        
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Something went wrong'
        })
      }
    }

    const revalidateToken = async (req: any, res: Response) => {

      const { uid, name } = req;
      
      //Generate JWT token
      const token = await createJWT(uid, name)

      res.json({
        ok: true,
        token
      });
    }

    module.exports = {
      createUser,
      loginUser,
      revalidateToken
    };
}