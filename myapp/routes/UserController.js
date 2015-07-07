var user = require("../models/users"),
    contact = require("../models/contactus"),
    multer  = require('multer');
var likeCount = 0;
var UserController = function() {
    //Todo: Its a constructor
};

UserController.prototype = {
    indexPage: function(req, res, next) {
        res.render('index', { title: 'Express' });
    },

    signup: function(req, res, next) {
        res.render('signup', { title: 'signup' });
    },

    login: function(req, res, next) {
        res.render('login', { title: 'signup' });
    },

    signupPost: function(req, res, next) {
        if(typeof req.body.name !== "undefined" 
            && typeof req.body.username !== "undefined" 
            && typeof req.body.password !== "undefined"
            && typeof req.body.reenterpassword !== "undefined"
            && typeof req.body.age !== "undefined" 
            && typeof req.body.gender !== "undefined"
            && typeof req.body.stream !== "undefined"
            && typeof req.body.skills !== "undefined" 
            && typeof req.body.contact !== "undefined"
            && typeof req.body.email !== "undefined") {
            // console.log(req.body.skills);
            var skills_1 = req.body.skills;
            for(var i in skills_1 ){
                //console.log(skills_1[i]);
                if(skills_1[i]){
                    console.log("skills of"+skills_1[i]);
                }
            }
            //console.log(skills_1);
            var information = new user({ 
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                reenterpassword: req.body.reenterpassword,
                age: req.body.age,
                gender: req.body.gender,
                skills: [],
                stream: req.body.stream,
                contact_number:req.body.contact,
                email: req.body.email
            });
            information.save(function (err, data) {
                console.log(err, data);
                res.send({
                    'success': 'true'
                });
            });
        } else{
            res.send({
                'error':'some field are missing'
            });
        }
        
        // mkdirp('./public/uploads/dashboard_images/'+req.body.username, function (err) {
        //     if (err){
        //         console.log(err);
        //     } else {
        //         console.log('pow!');  
        //     }
        // }); 
    },

    loginPost: function(req, res, next) {
        user.findOne({ username: req.body.username, password: req.body.password }, function(err, user) {
            if (err) {
                console.log("err:",err);
            } else {
                if (user) {
                    //session create after login with username
                    req.session.username = req.body.username;
                    res.send({
                        'success':'true'
                    });
                } else {
                    res.send('username or password is wrong');
                }
            }
        });
    },

    profile: function(req, res, next) {
        if(typeof req.session.username !== "undefined") {
            user.findOne({ username: req.session.username}, function(err, users) {
                if(users) {
                    //var skills = String(users.skills).split(",");
                    res.send({
                        'username': req.session.username,
                        //img: "/uploads/profile_pictures/"+users.img,
                        //dashimg:"/uploads/dashboard_images/"+users.dashimg,
                        'name': users.name,
                        'password': users.password,
                        'reenterpassword': users.reenterpassword,
                        'age': users.age,
                        'sex': users.gender,
                        'contactnumber': users.contact_number,
                        'email': users.email,
                        'stream': users.stream
                        //skills: skills
                    });  
                }
            }); 
        } else {
            res.send({'error':'failed to send'});
        }
    },

    logout: function(req, res, next) {
        //session destroy after logout 
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },

    uploadPhoto: function(req,res,next){
        //updating image in database
        user.update({ username:req.session.username }, { $set: { img: req.files.image.name }}, function(err, user) {
            if (err || !user){
                throw err;
            } else {
                if(typeof req.files.image.path !== "undefined") {
                    res.redirect('profile');  
                } 
            }
        }); 
    },

    editprofile: function(req,res,next){
        console.log("hello i am in edit profile");
        user.update({ username:req.session.username }, { $set: { 
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            reenterpassword: req.body.reenterpassword,
            age: req.body.age,
            contact_number: req.body.contact,
            email: req.body.email,
            gender: req.body.gender,
            //skills: [req.body.Skills],
            stream: req.body.stream, 
        }}, function(err, user) {
            console.log(user);
            if (err || !user){
                res.send({
                    'error':'failed to update details'
                })
            } else {
                res.send({
                    'success':'true'
                });  
            }
        }); 
    },
    //gets all dashboard images in an array for all users
    getAllImages: function(req, res, next) {
        user.find({}, function(err, users) {
            if(!err && users) {
                var allImages = [];
                //Iterate all images of all users
                for(var count in users) {
                    allImages = allImages.concat(users[count].dashimg);
                }
                req.allImages = allImages;
                next();
            } else {
                req.allImages = [];
                next();
            }
        });
    },
    dashBoard: function(req,res,next) {
        user.findOne({ username: req.session.username}, function(err, users) {
            console.log("100====>"+(req.allImages));
            if(users) {
                // res.send({
                //     'img':users.img,
                //     'username':req.session.username,
                //     'allImages': users.dashimg,
                //     'allUsersImages': req.allImages,
                //     //'likeCount': "1",
                // });
                res.send({
                'success':'true'
                });   
            } else {
                res.send({
                    'error':'true'
                });
            }
        });   
    },

    dashBoardUpload: function(req,res,next){
        console.log(req.files.image.name);
        var temp = {
           img_url: req.files.image.name,
           likes:[],
           comments:[]
        };
        user.findOne({ username:req.session.username }, function(err, user) {
            //If user.dashimg is not array then first declare it
            if(!(user.dashimg instanceof Array)) {
                user.dashimg = [];
            }
            user.dashimg.push(temp);
            user.save(function (err) {
                if(err) {
                    console.error('ERROR!');
                }
                res.redirect('dashboard');
            });
        });
    },
    /**
    * contact us form function which will save data to database
    **/ 
    contactus: function(req, res, next) {
        var enquiry = new contact({ 
            name: req.body.name,
            email1: req.body.email,
            comment:req.body.comment,
        });
        enquiry.save(function (err, data) {
            console.log(err, data);
        });
        //this will send this message to front end (client side)
        res.send('Form Successfully submitted');
    },

    // comment:function(req,res,next){
    //     console.log("hello i am in comment");
    //     user.update({username:req.session.username},{$push:{comment:req.body.comment}},function(err,users){
    //         if (err || !user){
    //             throw err;
    //         } else {
    //             res.redirect('dashboard');  
    //         }
    //     });
    // },
};
module.exports = UserController;