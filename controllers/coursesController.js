const Course = require('../models/course'), 
httpStatus = require('http-status-codes'), 
User = require('../models/user'),
getCourseParams = (body) => {
    return ({
        title : body.title, 
        description : body.description, 
        maxStudents : body.maxStudents, 
        cost : body.cost
    });
};

module.exports={
    index:(req,res,next)=>{
        Course.find()
        .then(courses=>{
            res.locals.courses=courses;
            next();
        })
        .catch(error=>{
            console.log(`Error fertching courses:${error.message}`);
            next(error);
        });
    },
    indexView:(req,res)=>{
           if(req.query.format==="json"){
               res.send(res.locals.courses);
           } else{
               res.render("courses/index");
         }
    },
    new:(req,res)=>{
        res.render("courses/new");
    },
    create:(req,res,next)=>{
      Course.create(getCourseParams(req.body))
      .then(course=>{
          res.locals.redirect='/courses';
          next();
      }).catch(error=>{
          console.log('Error creating course : ${error.message}');
          next(error);
      });
    },
    redirectView:(req,res)=>{
        let redirectPath=res.locals.redirect;
        if(redirectPath!==undefined) res.redirect(redirectPath);
        else res.render('error');
    },
    show : (request, response, next) => {
        let courseId = request.params.id;
        Course.findById(courseId)
        .then(course => {
            response.locals.course = course;
            next();
        }).catch(error => {
            console.log(`Error fetching course by id : ${error.message}`);
            next(error);
        });
    },
    showView:(req,res)=>{
        res.render("courses/show");
    },
    edit : (request, response, next) => {
        let courseId= request.params.id;
        Course.findById(courseId)
        .then(course => {
            response.render('courses/edit', {
                course : course
            });
        }).catch(error => {
            console.log(`Error fetching course by id : ${error.message}`);
            next(error);
        });
    },
    update:(req,res,next)=>{
        let  courseId=req.params.id;
        let coursesParams=getCourseParams(req.body);
        Course.findByIdAndUpdate(courseId,{
            $set:coursesParams
        })
        .then(course=>{
            res.locals.course=course;
            res.locals.redirect='/courses/${courseId}';
            next();
        })
        .catch(error=>{
            console.log(`Error updating  courses by ID: ${error.message}`);
            next(error);
        });
    },
    delete:(req,res,next)=>{
        let courseId=req.params.id;
        Course.findByIdAndRemove(courseId)
        .then(()=>{
            res.locals.redirect="/courses";
            next();
        })
        .catch(error => {
            console.log(`Error deleting course by ID: ${error.message}`);
            next(error);
          });
    },
    respondJSON:(req,res)=>{
        res.json({
            status:httpStatus.OK,
            data:res.locals
        });
    },
    errorJSON:(error,req,res,next)=>{
        let errorObject;
        if(error){
            errorObject={
                status:httpStatus.INTERNAL_SERVER_ERROR,
                message:error.message
            };
        }
        else{
            errorObject={
                status:httpStatus.OK,
                message:"Unkown Error."
            };
        }
        res.json(errorObject);
    },
    filterUserCourses:(req,res,next)=>{
        let currentUser=res.locals.currentUser;
        if(currentUser){
            let mappedCourses=res.locals.courses.map((course)=>{
                let userJoined=currentUser.courses.some((userCourse)=>{
                    return userCourse.equals(course._id);
                });
                return Oject.assign(coursetoObject(),{joined:userJoined});
            });
            res.locals.courses=mappedCourses;
            next();
        }
        else{
            next();
        }
    },
    join:(req,res,next)=>{
        let courseId=req.params.id;
        currentUser=req.user;

        if(currentUser){
            User.findByIdAndUpdate(currentUser,{
                $addToSet:{
                    courses:courseId
                }
            })
            .then(()=>{
                res.locals.success=true;
                next();
            })
            .catch(error=>{
                next(error);
            });
        } else{
            next(new  Error("User must log in."));
        }
    },

};

