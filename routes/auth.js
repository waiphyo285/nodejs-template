const express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config/index')
const UserModel = require('@models/mongodb/schemas/user')
const { signToken_1 } = require('@middleware/token/jwt-token')
const { generateCsrf } = require('@middleware/token/csrf-token')

class AuthHandler {
    static signupPage(req, res, next) {
        res.render('auth/signup', {
            title: 'Create new account',
            buttonText: 'Sign Up',
            app: config.APP,
        })
    }

    static signup(req, res) {
        // handle the case where we don't detect the browser
        const message = 'Username or phone is already existed'

        const user = new UserModel({
            ...req.body,
            role: 'developer', // just dev
        })

        user.save(function (err, user) {
            if (err) {
                console.error('Registration Error ', err)
                res.redirect('/signup?message=' + message)
            } else {
                user['csrf'] = generateCsrf(res, req)
                user['latmat'] = signToken_1({
                    userrole: user.role,
                    username: user.username,
                    password: user.password,
                })

                req.session.user = user
                res.redirect('/')
            }
        })
    }

    static loginPage(req, res, next) {
        res.render('auth/login', {
            title: 'Welcome back',
            buttonText: 'Sign In',
            app: config.APP,
        })
    }

    static login(req, res, next) {
        // handle the case where we don't detect the browser
        const message = 'Sorry, incorrect access was found'
        const redirectTo = req.session.redirectTo

        passport.authenticate(
            'local',
            { failureRedirect: '/login' },
            (err, user, info) => {
                if (err) return next(err)
                if (!user) return res.redirect('/login?message=' + message)

                req.logIn(user, (err) => {
                    if (err) return next(err)

                    delete req.session.redirectTo

                    user['csrf'] = generateCsrf(res, req)

                    user['latmat'] = signToken_1({
                        userrole: user.role,
                        username: user.username,
                        password: user.password,
                    })

                    req.session.user = user
                    res.redirect(redirectTo || '/')
                })
            }
        )(req, res, next)
    }

    static logout(req, res, next) {
        req.logout()
        res.redirect('/')
    }
}

router
    .get('/signup', AuthHandler.signupPage)
    .post('/signup', AuthHandler.signup)

router.get('/login', AuthHandler.loginPage).post('/login', AuthHandler.login)

router.get('/logout', AuthHandler.logout)

module.exports = router
